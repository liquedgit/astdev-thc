use std::collections::HashMap;
use std::time::Duration;
use actix::{Actor, ActorContext, AsyncContext, StreamHandler, prelude::*};
use actix::clock::Instant;
use actix_web::{web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

struct MyWs{
    hb:Instant,
    server_addr: Addr<WServer>
}
#[derive(Debug,Clone, Serialize,Deserialize,Message)]
#[rtype(result = "()")]
struct ConnectedPlayer{
    id: Uuid,
    x : f32,
    y : f32,
    width : f32,
    height : f32,
    current_stage: i8
}

#[derive(Message)]
#[rtype(result = "()")]
struct PlayerUpdate(ConnectedPlayer);
#[derive(Message)]
#[rtype(result = "()")]
struct Connect {
    id: Uuid,
    addr: Addr<MyWs>,
}

struct WServer{
    sessions : HashMap<Uuid, Addr<MyWs>>,
}


impl Handler<PlayerUpdate> for MyWs {
    type Result = ();

    fn handle(&mut self, msg: PlayerUpdate, ctx: &mut Self::Context) {
        let player_json = match serde_json::to_string(&msg.0) {
            Ok(json) => json,
            Err(e) => {
                eprintln!("Error serializing player update: {}", e);
                return;
            }
        };

        ctx.text(player_json);
    }
}

impl Handler<PlayerUpdate> for WServer {
    type Result = ();

    fn handle(&mut self, msg: PlayerUpdate, _: &mut Self::Context) {
        let player = msg.0;
        self.send_to_all(&player);
    }
}

impl Actor for WServer{
    type Context = Context<Self>;
}

impl Handler<ConnectedPlayer> for WServer{
    type Result = ();
    fn handle(&mut self, msg: ConnectedPlayer, ctx: &mut Self::Context) -> Self::Result {
        self.send_to_all(&msg)
    }
}

impl Handler<Connect> for WServer {
    type Result = ();
    fn handle(&mut self, msg: Connect, _: &mut Context<Self>) {
        self.add_session(msg.id, msg.addr);

    }
}

impl WServer{
    fn send_to_all(&self, player: &ConnectedPlayer) {
        // Serialize the player object to a JSON string
        for addr in self.sessions.values() {
            addr.do_send(PlayerUpdate(player.clone()))
        }
    }


    fn add_session(&mut self, id: Uuid, addr: Addr<MyWs>) {
        self.sessions.insert(id, addr);
    }

}

fn generate_unique_id() -> Uuid {
    Uuid::new_v4()
}
impl Actor for MyWs {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        self.hb(ctx);
        let new_id = generate_unique_id();

        self.server_addr.do_send(Connect{
            id: new_id,
            addr : ctx.address()
        });

        ctx.text(new_id.to_string());
    }
}

/// Handler for ws::Message message
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWs {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Pong(_)) => {
                self.hb = Instant::now();
            },
            Ok(ws::Message::Ping(msg)) => {
                ctx.pong(&msg);
            },
            Ok(ws::Message::Text(text)) => {
                match serde_json::from_str::<ConnectedPlayer>(&text) {
                    Ok(player) => {
                        self.server_addr.do_send(PlayerUpdate(player))
                    },
                    Err(e) => {
                        eprintln!("Error deserializing ConnectedPlayer: {}", e);
                    },
                }
            },
            Ok(ws::Message::Binary(bin)) => {
                ctx.binary(bin);
            },
            _ => (),
        }
    }
}

impl MyWs {

    fn new(server_addr: Addr<WServer>) -> Self {
        MyWs {
            hb: Instant::now(),
            server_addr,
        }
    }
    fn hb(&self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(Duration::from_secs(10), |act, ctx| {

            if Instant::now().duration_since(act.hb) > Duration::from_secs(30) {
                // Heartbeat timed out
                println!("Websocket Client heartbeat failed, disconnecting!");
                ctx.stop();
                return;
            }
            ctx.ping(b"PING");
        });
    }
}

async fn index(req: HttpRequest, stream: web::Payload, server: web::Data<Addr<WServer>>) -> Result<HttpResponse, Error> {
    let server_addr = server.get_ref().clone();
    let ws_actor = MyWs::new(server_addr);
    let resp = ws::start(ws_actor, &req, stream)?;
    Ok(resp)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let server = WServer{
        sessions: HashMap::new(),
    };
    let server_addr = server.start();

    HttpServer::new(move || App::new().app_data(web::Data::new(server_addr.clone()))
        .route("/ws/", web::get().to(index)))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
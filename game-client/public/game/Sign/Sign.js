import { Sprite } from "../utils/Sprite";

export class Sign extends Sprite {
  constructor({ modalid, position, sprite, autoplay = false }) {
    super({ position, sprite, autoplay });
    this.audio = new Audio("../../assets/audio/Fruit collect 1.wav");
    this.played = false;
    this.modalid = modalid;
  }

  playSound() {
    if (!this.played) {
      this.audio.play();
      this.played = true;
    }
  }

  showModal(manager) {
    let modal = document.getElementsByClassName(this.modalid);
    console.log(modal);
    modal.set;
    modal[0].style.display = "flex";
    manager.pause.bind(manager);
  }
}

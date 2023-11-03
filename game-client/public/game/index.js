// import {  Player  } from './player/Player'
import { GameManager } from "./GameManager";

const ws = new WebSocket("ws://127.0.0.1:8080/ws/");
let id;
let manager;
ws.onopen = () => {
  console.log("Connected to WebSocket server.");
};

ws.onmessage = (event) => {
  if (!manager) {
    try {
      const data = event.data;
      manager = new GameManager(data, ws);
      manager.run();
      console.log(data);
    } catch (err) {}
  } else {
    manager.receiveConnectedPlayerData(event.data);
  }
};

function closeModal(modalID) {
  const modal = document.getElementById(modalID);
  //   modal.style.display = "none";
  modal.classList.add("fade-out");
  modal.style.opacity = "1";
  modal.addEventListener("transitionend", function () {
    modal.style.display = "none";
    modal.remove();
  });
  setTimeout(() => {
    modal.style.opacity = "0";
  }, 10);
}

const advModal = document.getElementById("closeAdvModal");
advModal.addEventListener("click", () => {
  closeModal("advModal");
});

const profileModalBtn = document.getElementById("closeProfileBtn");
profileModalBtn.addEventListener("click", () => {
  closeModal("profileModal");
});

const workPModal = document.getElementById("closeworkPModal");
workPModal.addEventListener("click", () => {
  closeModal("workplanModal");
});

const workP2Modal = document.getElementById("closeworkP2Modal");
workP2Modal.addEventListener("click", () => {
  closeModal("workplanModal2");
});

const inovationModal = document.getElementById("closeInovationModal");
inovationModal.addEventListener("click", () => {
  closeModal("inovationModal");
});

const newTpaModal = document.getElementById("closenewTpaModal");
newTpaModal.addEventListener("click", () => {
  closeModal("newTpaModal");
});

const whyMeModal = document.getElementById("closewhyMeModal");
whyMeModal.addEventListener("click", () => {
  closeModal("whyMeModal");
});

// import {  Player  } from './player/Player'
import { GameManager } from "./GameManager";
const manager = new GameManager();
manager.run();

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
  manager.resume;
}

const advModal = document.getElementById("closeAdvModal");
advModal.addEventListener("click", () => {
  closeModal("advModal");
  manager.resume();
});

const profileModalBtn = document.getElementById("closeProfileBtn");
profileModalBtn.addEventListener("click", () => {
  closeModal("profileModal");
  manager.resume();
});

const workPModal = document.getElementById("closeworkPModal");
workPModal.addEventListener("click", () => {
  closeModal("workplanModal");
  manager.resume();
});

const workP2Modal = document.getElementById("closeworkP2Modal");
workP2Modal.addEventListener("click", () => {
  closeModal("workplanModal2");
  manager.resume();
});

const inovationModal = document.getElementById("closeInovationModal");
inovationModal.addEventListener("click", () => {
  closeModal("inovationModal");
  manager.resume();
});

const newTpaModal = document.getElementById("closenewTpaModal");
newTpaModal.addEventListener("click", () => {
  closeModal("newTpaModal");
});

const whyMeModal = document.getElementById("closewhyMeModal");
whyMeModal.addEventListener("click", () => {
  closeModal("whyMeModal");
});

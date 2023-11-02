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
    modal.set;
    modal[0].style.display = "flex";
    modal[0].style.opacity = "0";
    setTimeout(() => {
      modal[0].style.opacity = "1";
    }, 0);
    modal[0].classList.add("fade-in");
    manager.pause();
  }
}

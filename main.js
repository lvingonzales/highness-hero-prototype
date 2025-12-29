let domProjectContainers = document.querySelectorAll(".project-container");
const heroContainer = document.querySelector("#hero-container");
let domTimer = document.querySelector(".timer");
let containers = [];
let remainingTime = 5000;
let currentProgress = 0;
let finishedContainers = 0;
domTimer.innerHTML = currentProgress;
let intervalCarousel;
let intervalTimer;

// document.querySelectorAll(".artist-icon").addEventListener('mouseenter', () => {

// })

window.addEventListener("load", () => {
  domProjectContainers.forEach((container) => {
    containers.push(new Container(container));
  });

  setTimeout(() => {
    containers.forEach((container) => {
      container.addAnims();
    });
    containers.forEach((container) => {
      container.updatePosition();
    });
  }, 500);
});

heroContainer.addEventListener("mouseleave", () => {});

// Helper Function
function chooseTransform() {
  let dice = Math.floor(Math.random() * (100 - 1) + 1);
  if (dice % 2 == 1) {
    return -100;
  } else {
    return 100;
  }
}

//  Container class
class Container {
  constructor(domElement) {
    this.container = domElement;
    this.projectInfo = this.container.querySelector(
      ".project-thumb-info-container"
    );
    this.initialPosition = chooseTransform();
    this.currentPosition = this.initialPosition;

    this.container.style.transform = `translateY(${this.initialPosition}%)`;

    this.container.addEventListener("transitionend", () => {
      if (this.currentPosition == 0) {
        this.container.classList.add("active");

        if (this.container.classList.contains("focus")) {
          this.projectInfo.style.transition = "opacity 250ms linear";
          this.projectInfo.style.opacity = 1;
        }
      } else {
        this.container.classList.remove("active");
      }
    });

    this.container.addEventListener("mouseover", () => {
      this.container.classList.add("focus");
    });

    this.container.addEventListener("mouseleave", () => {
      this.container.classList.remove("focus");
      this.projectInfo.style.transition = "";
      this.projectInfo.style.opacity = 0;
    });
  }

  updatePosition() {
    if (this.currentPosition != 0) {
      this.currentPosition = 0;
    } else {
      this.currentPosition = this.initialPosition;
    }

    this.container.style.transform = `translateY(${this.currentPosition}%)`;
  }

  addAnims() {
    this.container.style.transition = `transform ${Math.floor(
      Math.random() * (2 - 1) + 1
    )}s ${Math.random()}s ease-out, flex 0.5s ease-out`;
  }
}

let currentIndex = 0;
let images = [];

function getOverlayComponent() {
  const overlay = document.createElement("dialog");
  overlay.id = "gallerify-overlay";
  overlay.style = `display: flex;flex-direction: row; margin: 0; justify-content: center; align-items: center; min-width: 100% !important; min-height: 100% !important; background-color: rgba(0, 0, 0, 0.85); justify-content: center; align-items: center;`;

  const prev = document.createElement("p");
  prev.id = "gallerify-prev";
  prev.textContent = "[PREV]";
  prev.style.fontSize = "x-large";
  prev.style.cursor = "pointer";
  prev.addEventListener("click", async () => {
    await prevImage();
  });
  overlay.appendChild(prev);

  const overlayContent = document.createElement("div");
  overlayContent.id = "gallerify-overlay-content";
  overlayContent.style.display = "flex";
  overlayContent.style.flexDirection = "column";
  overlayContent.style.justifyContent = "space-evenly";
  overlayContent.style.alignItems = "center";
  overlayContent.style.width = "100%";
  overlayContent.style.height = "100%";

  overlay.appendChild(overlayContent);

  const fullscreenButton = document.createElement("button");
  fullscreenButton.id = "gallerify-fullscreen";
  fullscreenButton.textContent = "[Go Fullscreen]";
  fullscreenButton.style.fontSize = "x-large";
  fullscreenButton.style.position = "absolute";
  fullscreenButton.style.top = "1rem";
  fullscreenButton.style.right = "1rem";

  fullscreenButton.addEventListener("click", () => {
    const currentImageElement = document.getElementById(
      `currentImage${currentIndex}`
    );
    if (currentImageElement) {
      currentImageElement.parentElement?.requestFullscreen();
    }
  });
  overlay.appendChild(fullscreenButton);

  const closeButton = document.createElement("button");
  closeButton.id = "gallerify-close";
  closeButton.textContent = "[Close]";
  closeButton.style.fontSize = "x-large";
  closeButton.style.position = "absolute";
  closeButton.style.top = "1rem";
  closeButton.style.left = "1rem";
  closeButton.addEventListener("click", async () => {
    await closeGallery();
  });
  overlay.appendChild(closeButton);

  const next = document.createElement("p");
  next.id = "gallerify-next";
  next.textContent = "[NEXT]";
  next.style.fontSize = "x-large";
  next.style.cursor = "pointer";
  next.addEventListener("click", async () => {
    await nextImage();
  });
  overlay.appendChild(next);

  return overlay;
}

async function setup() {
  images = document.getElementsByTagName("img");
  console.log("images", images);

  document.body.prepend(getOverlayComponent());

  window.addEventListener("keydown", async (e) => {
    const currentImageElement = document.getElementById(
      `currentImage${currentIndex}`
    );
    if (currentImageElement) {
      if (e.key === "ArrowLeft") {
        await prevImage();
      } else if (e.key === "ArrowRight") {
        await nextImage();
      }
    }
  });

  await gallerify();
}

function clearImage() {
  const currentImageElement = document.getElementById(
    `currentImage${currentIndex}`
  );

  if (currentImageElement) {
    currentImageElement.remove();
  }
  images = document.getElementsByTagName("img");
}

async function gallerify() {
  if (currentIndex >= 0 && images.length > currentIndex) {
    const currentImage = images[currentIndex].cloneNode(true);
    currentImage.setAttribute("id", `currentImage${currentIndex}`);
    currentImage.style.width = "auto";
    currentImage.style.maxHeight = "90vh";
    const closeButton = document.getElementById("gallerify-close");
    closeButton.innerText = `[Close] (${currentIndex + 1}/${images.length})`;
    const overlayContent = document.getElementById("gallerify-overlay-content");
    overlayContent.prepend(currentImage);
    const overlay = document.getElementById("gallerify-overlay");
    overlay.showModal();
  } else {
    closeGallery();
  }
}

async function prevImage() {
  clearImage();
  currentIndex--;
  await gallerify();
}

async function nextImage() {
  clearImage();
  currentIndex++;
  await gallerify();
}

async function closeGallery() {
  clearImage();
  const overlay = document.getElementById("gallerify-overlay");
  overlay.close();
  overlay.remove();
  currentIndex = 0;
  window.removeEventListener("keydown", () => {});
}

setup();

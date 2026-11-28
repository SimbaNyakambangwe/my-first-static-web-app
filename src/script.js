const photoLinks = [...document.querySelectorAll(".gallery-photo")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const caption = document.querySelector("#photo-caption");
const position = document.querySelector("#photo-position");
const photoError = lightbox.querySelector(".photo-error");
let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto = (index + photoLinks.length) % photoLinks.length;
  const photo = photoLinks[currentPhoto];
  const description = photo.querySelector("img").alt;
  photoError.hidden = true;
  lightboxImage.hidden = false;
  lightboxImage.alt = description;
  lightboxImage.src = photo.href;
  caption.textContent = description;
  position.textContent = `${currentPhoto + 1} / ${photoLinks.length}`;
}

lightboxImage.addEventListener("error", () => {
  lightboxImage.hidden = true;
  photoError.hidden = false;
});

// Keep ordinary image links working in browsers without native dialog support.
if (typeof lightbox.showModal === "function") {
  photoLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showPhoto(index);
      lightbox.showModal();
    });
  });
  lightbox.querySelector(".close-photo").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".previous-photo").addEventListener("click", () => showPhoto(currentPhoto - 1));
  lightbox.querySelector(".next-photo").addEventListener("click", () => showPhoto(currentPhoto + 1));
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(currentPhoto + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
}

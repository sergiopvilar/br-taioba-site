"use strict";

function createOverlay(image) {
  var overlayImage = document.createElement('img');
  overlayImage.setAttribute('src', "".concat(image.src));
  overlay = document.createElement('div');
  prepareOverlay(overlay, overlayImage);
  image.style.opacity = '50%';
  toggleLoadingSpinner(image);
  overlayImage.onload = function () {
    toggleLoadingSpinner(image);
    image.parentElement.insertBefore(overlay, image);
    image.style.opacity = '100%';
  };
  return overlay;
}
function prepareOverlay(container, image) {
  container.setAttribute('class', 'image-magnify-full-size');
  container.setAttribute('aria-hidden', 'true');
  container.style.backgroundImage = "url('".concat(image.src, "')");
  container.style.backgroundColor = 'var(--gradient-background)';
}
function toggleLoadingSpinner(image) {
  var loadingSpinner = image.parentElement.parentElement.querySelector(".loading__spinner");
  loadingSpinner.classList.toggle('hidden');
}
function moveWithHover(image, event, zoomRatio) {
  var ratio = image.height / image.width;
  var container = event.target.getBoundingClientRect();
  var xPosition = event.clientX - container.left;
  var yPosition = event.clientY - container.top;
  var xPercent = "".concat(xPosition / (image.clientWidth / 100), "%");
  var yPercent = "".concat(yPosition / (image.clientWidth * ratio / 100), "%");
  overlay.style.backgroundPosition = "".concat(xPercent, " ").concat(yPercent);
  overlay.style.backgroundSize = "".concat(image.width * zoomRatio, "px");
}
function magnify(image, zoomRatio) {
  var overlay = createOverlay(image);
  overlay.onclick = function () {
    return overlay.remove();
  };
  overlay.onmousemove = function (event) {
    return moveWithHover(image, event, zoomRatio);
  };
  overlay.onmouseleave = function () {
    return overlay.remove();
  };
}
function enableZoomOnHover(zoomRatio) {
  var images = document.querySelectorAll('.image-magnify-hover');
  images.forEach(function (image) {
    image.onclick = function (event) {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };
  });
}
enableZoomOnHover(2);
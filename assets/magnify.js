// create a container and set the full-size image as its background
function createOverlay(image) {
  var overlayImage = document.createElement('img');
  overlayImage.setAttribute('src', ("" + (image.src)));
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
  container.style.backgroundImage = "url('" + (image.src) + "')";
  container.style.backgroundColor = 'var(--gradient-background)';
}

function toggleLoadingSpinner(image) {
  var loadingSpinner = image.parentElement.parentElement.querySelector(".loading__spinner");
  loadingSpinner.classList.toggle('hidden');
}

function moveWithHover(image, event, zoomRatio) {
  // calculate mouse position
  var ratio = image.height / image.width;
  var container = event.target.getBoundingClientRect();
  var xPosition = event.clientX - container.left;
  var yPosition = event.clientY - container.top;
  var xPercent = (xPosition / (image.clientWidth / 100)) + "%";
  var yPercent = (yPosition / ((image.clientWidth * ratio) / 100)) + "%";

  // determine what to show in the frame
  overlay.style.backgroundPosition = xPercent + " " + yPercent;
  overlay.style.backgroundSize = (image.width * zoomRatio) + "px";
}

function magnify(image, zoomRatio) {
  var overlay = createOverlay(image);
  overlay.onclick = function () { return overlay.remove(); };
  overlay.onmousemove = function (event) { return moveWithHover(image, event, zoomRatio); };
  overlay.onmouseleave = function () { return overlay.remove(); };
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


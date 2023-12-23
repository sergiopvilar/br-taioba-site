if (!customElements.get('media-gallery')) {
  customElements.define(
    'media-gallery',
    /*@__PURE__*/(function (HTMLElement) {
    function MediaGallery() {
        var this$1 = this;

        HTMLElement.call(this);
        this.elements = {
          liveRegion: this.querySelector('[id^="GalleryStatus"]'),
          viewer: this.querySelector('[id^="GalleryViewer"]'),
          thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
        };
        this.mql = window.matchMedia('(min-width: 750px)');
        if (!this.elements.thumbnails) { return; }

        this.elements.viewer.addEventListener('slideChanged', debounce(this.onSlideChanged.bind(this), 500));
        this.elements.thumbnails.querySelectorAll('[data-target]').forEach(function (mediaToSwitch) {
          mediaToSwitch
            .querySelector('button')
            .addEventListener('click', this$1.setActiveMedia.bind(this$1, mediaToSwitch.dataset.target, false));
        });
        if (this.dataset.desktopLayout.includes('thumbnail') && this.mql.matches) { this.removeListSemantic(); }
      }

    if ( HTMLElement ) MediaGallery.__proto__ = HTMLElement;
    MediaGallery.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    MediaGallery.prototype.constructor = MediaGallery;

      MediaGallery.prototype.onSlideChanged = function onSlideChanged (event) {
        var thumbnail = this.elements.thumbnails.querySelector(
          ("[data-target=\"" + (event.detail.currentElement.dataset.mediaId) + "\"]")
        );
        this.setActiveThumbnail(thumbnail);
      };

      MediaGallery.prototype.setActiveMedia = function setActiveMedia (mediaId, prepend) {
        var this$1 = this;

        var activeMedia = this.elements.viewer.querySelector(("[data-media-id=\"" + mediaId + "\"]"));
        this.elements.viewer.querySelectorAll('[data-media-id]').forEach(function (element) {
          element.classList.remove('is-active');
        });
        activeMedia.classList.add('is-active');

        if (prepend) {
          activeMedia.parentElement.prepend(activeMedia);
          if (this.elements.thumbnails) {
            var activeThumbnail$1 = this.elements.thumbnails.querySelector(("[data-target=\"" + mediaId + "\"]"));
            activeThumbnail$1.parentElement.prepend(activeThumbnail$1);
          }
          if (this.elements.viewer.slider) { this.elements.viewer.resetPages(); }
        }

        this.preventStickyHeader();
        window.setTimeout(function () {
          if (this$1.elements.thumbnails) {
            activeMedia.parentElement.scrollTo({ left: activeMedia.offsetLeft });
          }
          if (!this$1.elements.thumbnails || this$1.dataset.desktopLayout === 'stacked') {
            activeMedia.scrollIntoView({ behavior: 'smooth' });
          }
        });
        this.playActiveMedia(activeMedia);

        if (!this.elements.thumbnails) { return; }
        var activeThumbnail = this.elements.thumbnails.querySelector(("[data-target=\"" + mediaId + "\"]"));
        this.setActiveThumbnail(activeThumbnail);
        this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
      };

      MediaGallery.prototype.setActiveThumbnail = function setActiveThumbnail (thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) { return; }

        this.elements.thumbnails
          .querySelectorAll('button')
          .forEach(function (element) { return element.removeAttribute('aria-current'); });
        thumbnail.querySelector('button').setAttribute('aria-current', true);
        if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) { return; }

        this.elements.thumbnails.slider.scrollTo({ left: thumbnail.offsetLeft });
      };

      MediaGallery.prototype.announceLiveRegion = function announceLiveRegion (activeItem, position) {
        var this$1 = this;

        var image = activeItem.querySelector('.product__modal-opener--image img');
        if (!image) { return; }
        image.onload = function () {
          this$1.elements.liveRegion.setAttribute('aria-hidden', false);
          this$1.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace('[index]', position);
          setTimeout(function () {
            this$1.elements.liveRegion.setAttribute('aria-hidden', true);
          }, 2000);
        };
        image.src = image.src;
      };

      MediaGallery.prototype.playActiveMedia = function playActiveMedia (activeItem) {
        window.pauseAllMedia();
        var deferredMedia = activeItem.querySelector('.deferred-media');
        if (deferredMedia) { deferredMedia.loadContent(false); }
      };

      MediaGallery.prototype.preventStickyHeader = function preventStickyHeader () {
        this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
        if (!this.stickyHeader) { return; }
        this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
      };

      MediaGallery.prototype.removeListSemantic = function removeListSemantic () {
        if (!this.elements.viewer.slider) { return; }
        this.elements.viewer.slider.setAttribute('role', 'presentation');
        this.elements.viewer.sliderItems.forEach(function (slide) { return slide.setAttribute('role', 'presentation'); });
      };

    return MediaGallery;
  }(HTMLElement))
  );
}


'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('media-gallery')) {
  customElements.define('media-gallery', function (_HTMLElement) {
    _inherits(MediaGallery, _HTMLElement);

    function MediaGallery() {
      _classCallCheck(this, MediaGallery);

      var _this = _possibleConstructorReturn(this, (MediaGallery.__proto__ || Object.getPrototypeOf(MediaGallery)).call(this));

      _this.elements = {
        liveRegion: _this.querySelector('[id^="GalleryStatus"]'),
        viewer: _this.querySelector('[id^="GalleryViewer"]'),
        thumbnails: _this.querySelector('[id^="GalleryThumbnails"]')
      };
      _this.mql = window.matchMedia('(min-width: 750px)');
      if (!_this.elements.thumbnails) return _possibleConstructorReturn(_this);

      _this.elements.viewer.addEventListener('slideChanged', debounce(_this.onSlideChanged.bind(_this), 500));
      _this.elements.thumbnails.querySelectorAll('[data-target]').forEach(function (mediaToSwitch) {
        mediaToSwitch.querySelector('button').addEventListener('click', _this.setActiveMedia.bind(_this, mediaToSwitch.dataset.target, false));
      });
      if (_this.dataset.desktopLayout.includes('thumbnail') && _this.mql.matches) _this.removeListSemantic();
      return _this;
    }

    _createClass(MediaGallery, [{
      key: 'onSlideChanged',
      value: function onSlideChanged(event) {
        var thumbnail = this.elements.thumbnails.querySelector('[data-target="' + event.detail.currentElement.dataset.mediaId + '"]');
        this.setActiveThumbnail(thumbnail);
      }
    }, {
      key: 'setActiveMedia',
      value: function setActiveMedia(mediaId, prepend) {
        var _this2 = this;

        var activeMedia = this.elements.viewer.querySelector('[data-media-id="' + mediaId + '"]');
        this.elements.viewer.querySelectorAll('[data-media-id]').forEach(function (element) {
          element.classList.remove('is-active');
        });
        activeMedia.classList.add('is-active');

        if (prepend) {
          activeMedia.parentElement.prepend(activeMedia);
          if (this.elements.thumbnails) {
            var _activeThumbnail = this.elements.thumbnails.querySelector('[data-target="' + mediaId + '"]');
            _activeThumbnail.parentElement.prepend(_activeThumbnail);
          }
          if (this.elements.viewer.slider) this.elements.viewer.resetPages();
        }

        this.preventStickyHeader();
        window.setTimeout(function () {
          if (_this2.elements.thumbnails) {
            activeMedia.parentElement.scrollTo({ left: activeMedia.offsetLeft });
          }
          if (!_this2.elements.thumbnails || _this2.dataset.desktopLayout === 'stacked') {
            activeMedia.scrollIntoView({ behavior: 'smooth' });
          }
        });
        this.playActiveMedia(activeMedia);

        if (!this.elements.thumbnails) return;
        var activeThumbnail = this.elements.thumbnails.querySelector('[data-target="' + mediaId + '"]');
        this.setActiveThumbnail(activeThumbnail);
        this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
      }
    }, {
      key: 'setActiveThumbnail',
      value: function setActiveThumbnail(thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) return;

        this.elements.thumbnails.querySelectorAll('button').forEach(function (element) {
          return element.removeAttribute('aria-current');
        });
        thumbnail.querySelector('button').setAttribute('aria-current', true);
        if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;

        this.elements.thumbnails.slider.scrollTo({ left: thumbnail.offsetLeft });
      }
    }, {
      key: 'announceLiveRegion',
      value: function announceLiveRegion(activeItem, position) {
        var _this3 = this;

        var image = activeItem.querySelector('.product__modal-opener--image img');
        if (!image) return;
        image.onload = function () {
          _this3.elements.liveRegion.setAttribute('aria-hidden', false);
          _this3.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace('[index]', position);
          setTimeout(function () {
            _this3.elements.liveRegion.setAttribute('aria-hidden', true);
          }, 2000);
        };
        image.src = image.src;
      }
    }, {
      key: 'playActiveMedia',
      value: function playActiveMedia(activeItem) {
        window.pauseAllMedia();
        var deferredMedia = activeItem.querySelector('.deferred-media');
        if (deferredMedia) deferredMedia.loadContent(false);
      }
    }, {
      key: 'preventStickyHeader',
      value: function preventStickyHeader() {
        this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
        if (!this.stickyHeader) return;
        this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
      }
    }, {
      key: 'removeListSemantic',
      value: function removeListSemantic() {
        if (!this.elements.viewer.slider) return;
        this.elements.viewer.slider.setAttribute('role', 'presentation');
        this.elements.viewer.sliderItems.forEach(function (slide) {
          return slide.setAttribute('role', 'presentation');
        });
      }
    }]);

    return MediaGallery;
  }(HTMLElement));
}
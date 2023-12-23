"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}
;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);
if (!customElements.get('media-gallery')) {
  customElements.define('media-gallery', function (_CustomElement2) {
    _inherits(MediaGallery, _CustomElement2);
    var _super = _createSuper(MediaGallery);
    function MediaGallery() {
      var _this;
      _classCallCheck(this, MediaGallery);
      _this = _super.call(this);
      _this.elements = {
        liveRegion: _this.querySelector('[id^="GalleryStatus"]'),
        viewer: _this.querySelector('[id^="GalleryViewer"]'),
        thumbnails: _this.querySelector('[id^="GalleryThumbnails"]')
      };
      _this.mql = window.matchMedia('(min-width: 750px)');
      if (!_this.elements.thumbnails) return _possibleConstructorReturn(_this);
      _this.elements.viewer.addEventListener('slideChanged', debounce(_this.onSlideChanged.bind(_assertThisInitialized(_this)), 500));
      _this.elements.thumbnails.querySelectorAll('[data-target]').forEach(function (mediaToSwitch) {
        mediaToSwitch.querySelector('button').addEventListener('click', _this.setActiveMedia.bind(_assertThisInitialized(_this), mediaToSwitch.dataset.target, false));
      });
      if (_this.dataset.desktopLayout.includes('thumbnail') && _this.mql.matches) _this.removeListSemantic();
      return _this;
    }
    _createClass(MediaGallery, [{
      key: "onSlideChanged",
      value: function onSlideChanged(event) {
        var thumbnail = this.elements.thumbnails.querySelector("[data-target=\"".concat(event.detail.currentElement.dataset.mediaId, "\"]"));
        this.setActiveThumbnail(thumbnail);
      }
    }, {
      key: "setActiveMedia",
      value: function setActiveMedia(mediaId, prepend) {
        var _this2 = this;
        var activeMedia = this.elements.viewer.querySelector("[data-media-id=\"".concat(mediaId, "\"]"));
        this.elements.viewer.querySelectorAll('[data-media-id]').forEach(function (element) {
          element.classList.remove('is-active');
        });
        activeMedia.classList.add('is-active');
        if (prepend) {
          activeMedia.parentElement.prepend(activeMedia);
          if (this.elements.thumbnails) {
            var _activeThumbnail = this.elements.thumbnails.querySelector("[data-target=\"".concat(mediaId, "\"]"));
            _activeThumbnail.parentElement.prepend(_activeThumbnail);
          }
          if (this.elements.viewer.slider) this.elements.viewer.resetPages();
        }
        this.preventStickyHeader();
        window.setTimeout(function () {
          if (_this2.elements.thumbnails) {
            activeMedia.parentElement.scrollTo({
              left: activeMedia.offsetLeft
            });
          }
          if (!_this2.elements.thumbnails || _this2.dataset.desktopLayout === 'stacked') {
            activeMedia.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
        this.playActiveMedia(activeMedia);
        if (!this.elements.thumbnails) return;
        var activeThumbnail = this.elements.thumbnails.querySelector("[data-target=\"".concat(mediaId, "\"]"));
        this.setActiveThumbnail(activeThumbnail);
        this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
      }
    }, {
      key: "setActiveThumbnail",
      value: function setActiveThumbnail(thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) return;
        this.elements.thumbnails.querySelectorAll('button').forEach(function (element) {
          return element.removeAttribute('aria-current');
        });
        thumbnail.querySelector('button').setAttribute('aria-current', true);
        if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;
        this.elements.thumbnails.slider.scrollTo({
          left: thumbnail.offsetLeft
        });
      }
    }, {
      key: "announceLiveRegion",
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
      key: "playActiveMedia",
      value: function playActiveMedia(activeItem) {
        window.pauseAllMedia();
        var deferredMedia = activeItem.querySelector('.deferred-media');
        if (deferredMedia) deferredMedia.loadContent(false);
      }
    }, {
      key: "preventStickyHeader",
      value: function preventStickyHeader() {
        this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
        if (!this.stickyHeader) return;
        this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
      }
    }, {
      key: "removeListSemantic",
      value: function removeListSemantic() {
        if (!this.elements.viewer.slider) return;
        this.elements.viewer.slider.setAttribute('role', 'presentation');
        this.elements.viewer.sliderItems.forEach(function (slide) {
          return slide.setAttribute('role', 'presentation');
        });
      }
    }]);
    return MediaGallery;
  }(_CustomElement));
}
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
if (!customElements.get('share-button')) {
  customElements.define('share-button', function (_DetailsDisclosure) {
    _inherits(ShareButton, _DetailsDisclosure);
    var _super = _createSuper(ShareButton);
    function ShareButton() {
      var _this;
      _classCallCheck(this, ShareButton);
      _this = _super.call(this);
      _this.elements = {
        shareButton: _this.querySelector('button'),
        shareSummary: _this.querySelector('summary'),
        closeButton: _this.querySelector('.share-button__close'),
        successMessage: _this.querySelector('[id^="ShareMessage"]'),
        urlInput: _this.querySelector('input')
      };
      _this.urlToShare = _this.elements.urlInput ? _this.elements.urlInput.value : document.location.href;
      if (navigator.share) {
        _this.mainDetailsToggle.setAttribute('hidden', '');
        _this.elements.shareButton.classList.remove('hidden');
        _this.elements.shareButton.addEventListener('click', function () {
          navigator.share({
            url: _this.urlToShare,
            title: document.title
          });
        });
      } else {
        _this.mainDetailsToggle.addEventListener('toggle', _this.toggleDetails.bind(_assertThisInitialized(_this)));
        _this.mainDetailsToggle.querySelector('.share-button__copy').addEventListener('click', _this.copyToClipboard.bind(_assertThisInitialized(_this)));
        _this.mainDetailsToggle.querySelector('.share-button__close').addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));
      }
      return _this;
    }
    _createClass(ShareButton, [{
      key: "toggleDetails",
      value: function toggleDetails() {
        if (!this.mainDetailsToggle.open) {
          this.elements.successMessage.classList.add('hidden');
          this.elements.successMessage.textContent = '';
          this.elements.closeButton.classList.add('hidden');
          this.elements.shareSummary.focus();
        }
      }
    }, {
      key: "copyToClipboard",
      value: function copyToClipboard() {
        var _this2 = this;
        navigator.clipboard.writeText(this.elements.urlInput.value).then(function () {
          _this2.elements.successMessage.classList.remove('hidden');
          _this2.elements.successMessage.textContent = window.accessibilityStrings.shareSuccess;
          _this2.elements.closeButton.classList.remove('hidden');
          _this2.elements.closeButton.focus();
        });
      }
    }, {
      key: "updateUrl",
      value: function updateUrl(url) {
        this.urlToShare = url;
        this.elements.urlInput.value = url;
      }
    }]);
    return ShareButton;
  }(DetailsDisclosure));
}
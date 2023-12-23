"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
if (!customElements.get('quick-add-modal')) {
  customElements.define('quick-add-modal', function (_ModalDialog) {
    _inherits(QuickAddModal, _ModalDialog);
    var _super = _createSuper(QuickAddModal);
    function QuickAddModal() {
      var _this;
      _classCallCheck(this, QuickAddModal);
      _this = _super.call(this);
      _this.modalContent = _this.querySelector('[id^="QuickAddInfo-"]');
      return _this;
    }
    _createClass(QuickAddModal, [{
      key: "hide",
      value: function hide() {
        var preventFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        if (cartNotification) cartNotification.setActiveElement(this.openedBy);
        this.modalContent.innerHTML = '';
        if (preventFocus) this.openedBy = null;
        _get(_getPrototypeOf(QuickAddModal.prototype), "hide", this).call(this);
      }
    }, {
      key: "show",
      value: function show(opener) {
        var _this2 = this;
        opener.setAttribute('aria-disabled', true);
        opener.classList.add('loading');
        opener.querySelector('.loading__spinner').classList.remove('hidden');
        fetch(opener.getAttribute('data-product-url')).then(function (response) {
          return response.text();
        }).then(function (responseText) {
          var responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
          _this2.productElement = responseHTML.querySelector('section[id^="MainProduct-"]');
          _this2.productElement.classList.forEach(function (classApplied) {
            if (classApplied.startsWith('color-') || classApplied === 'gradient') _this2.modalContent.classList.add(classApplied);
          });
          _this2.preventDuplicatedIDs();
          _this2.removeDOMElements();
          _this2.setInnerHTML(_this2.modalContent, _this2.productElement.innerHTML);
          if (window.Shopify && Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
          }
          if (window.ProductModel) window.ProductModel.loadShopifyXR();
          _this2.removeGalleryListSemantic();
          _this2.updateImageSizes();
          _this2.preventVariantURLSwitching();
          _get(_getPrototypeOf(QuickAddModal.prototype), "show", _this2).call(_this2, opener);
        })["finally"](function () {
          opener.removeAttribute('aria-disabled');
          opener.classList.remove('loading');
          opener.querySelector('.loading__spinner').classList.add('hidden');
        });
      }
    }, {
      key: "setInnerHTML",
      value: function setInnerHTML(element, html) {
        element.innerHTML = html;
        element.querySelectorAll('script').forEach(function (oldScriptTag) {
          var newScriptTag = document.createElement('script');
          Array.from(oldScriptTag.attributes).forEach(function (attribute) {
            newScriptTag.setAttribute(attribute.name, attribute.value);
          });
          newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
          oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
        });
      }
    }, {
      key: "preventVariantURLSwitching",
      value: function preventVariantURLSwitching() {
        var variantPicker = this.modalContent.querySelector('variant-radios,variant-selects');
        if (!variantPicker) return;
        variantPicker.setAttribute('data-update-url', 'false');
      }
    }, {
      key: "removeDOMElements",
      value: function removeDOMElements() {
        var pickupAvailability = this.productElement.querySelector('pickup-availability');
        if (pickupAvailability) pickupAvailability.remove();
        var productModal = this.productElement.querySelector('product-modal');
        if (productModal) productModal.remove();
        var modalDialog = this.productElement.querySelectorAll('modal-dialog');
        if (modalDialog) modalDialog.forEach(function (modal) {
          return modal.remove();
        });
      }
    }, {
      key: "preventDuplicatedIDs",
      value: function preventDuplicatedIDs() {
        var sectionId = this.productElement.dataset.section;
        this.productElement.innerHTML = this.productElement.innerHTML.replaceAll(sectionId, "quickadd-".concat(sectionId));
        this.productElement.querySelectorAll('variant-selects, variant-radios, product-info').forEach(function (element) {
          element.dataset.originalSection = sectionId;
        });
      }
    }, {
      key: "removeGalleryListSemantic",
      value: function removeGalleryListSemantic() {
        var galleryList = this.modalContent.querySelector('[id^="Slider-Gallery"]');
        if (!galleryList) return;
        galleryList.setAttribute('role', 'presentation');
        galleryList.querySelectorAll('[id^="Slide-"]').forEach(function (li) {
          return li.setAttribute('role', 'presentation');
        });
      }
    }, {
      key: "updateImageSizes",
      value: function updateImageSizes() {
        var product = this.modalContent.querySelector('.product');
        var desktopColumns = product.classList.contains('product--columns');
        if (!desktopColumns) return;
        var mediaImages = product.querySelectorAll('.product__media img');
        if (!mediaImages.length) return;
        var mediaImageSizes = '(min-width: 1000px) 715px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)';
        if (product.classList.contains('product--medium')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '605px');
        } else if (product.classList.contains('product--small')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '495px');
        }
        mediaImages.forEach(function (img) {
          return img.setAttribute('sizes', mediaImageSizes);
        });
      }
    }]);
    return QuickAddModal;
  }(ModalDialog));
}
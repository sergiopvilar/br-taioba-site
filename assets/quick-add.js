'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('quick-add-modal')) {
  customElements.define('quick-add-modal', function (_ModalDialog) {
    _inherits(QuickAddModal, _ModalDialog);

    function QuickAddModal() {
      _classCallCheck(this, QuickAddModal);

      var _this = _possibleConstructorReturn(this, (QuickAddModal.__proto__ || Object.getPrototypeOf(QuickAddModal)).call(this));

      _this.modalContent = _this.querySelector('[id^="QuickAddInfo-"]');
      return _this;
    }

    _createClass(QuickAddModal, [{
      key: 'hide',
      value: function hide() {
        var preventFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        if (cartNotification) cartNotification.setActiveElement(this.openedBy);
        this.modalContent.innerHTML = '';

        if (preventFocus) this.openedBy = null;
        _get(QuickAddModal.prototype.__proto__ || Object.getPrototypeOf(QuickAddModal.prototype), 'hide', this).call(this);
      }
    }, {
      key: 'show',
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
          _get(QuickAddModal.prototype.__proto__ || Object.getPrototypeOf(QuickAddModal.prototype), 'show', _this2).call(_this2, opener);
        }).finally(function () {
          opener.removeAttribute('aria-disabled');
          opener.classList.remove('loading');
          opener.querySelector('.loading__spinner').classList.add('hidden');
        });
      }
    }, {
      key: 'setInnerHTML',
      value: function setInnerHTML(element, html) {
        element.innerHTML = html;

        // Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
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
      key: 'preventVariantURLSwitching',
      value: function preventVariantURLSwitching() {
        var variantPicker = this.modalContent.querySelector('variant-radios,variant-selects');
        if (!variantPicker) return;

        variantPicker.setAttribute('data-update-url', 'false');
      }
    }, {
      key: 'removeDOMElements',
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
      key: 'preventDuplicatedIDs',
      value: function preventDuplicatedIDs() {
        var sectionId = this.productElement.dataset.section;
        this.productElement.innerHTML = this.productElement.innerHTML.replaceAll(sectionId, 'quickadd-' + sectionId);
        this.productElement.querySelectorAll('variant-selects, variant-radios, product-info').forEach(function (element) {
          element.dataset.originalSection = sectionId;
        });
      }
    }, {
      key: 'removeGalleryListSemantic',
      value: function removeGalleryListSemantic() {
        var galleryList = this.modalContent.querySelector('[id^="Slider-Gallery"]');
        if (!galleryList) return;

        galleryList.setAttribute('role', 'presentation');
        galleryList.querySelectorAll('[id^="Slide-"]').forEach(function (li) {
          return li.setAttribute('role', 'presentation');
        });
      }
    }, {
      key: 'updateImageSizes',
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
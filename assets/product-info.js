'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('product-info')) {
  customElements.define('product-info', function (_HTMLElement) {
    _inherits(ProductInfo, _HTMLElement);

    function ProductInfo() {
      _classCallCheck(this, ProductInfo);

      var _this = _possibleConstructorReturn(this, (ProductInfo.__proto__ || Object.getPrototypeOf(ProductInfo)).call(this));

      _this.input = _this.querySelector('.quantity__input');
      _this.currentVariant = _this.querySelector('.product-variant-id');
      _this.variantSelects = _this.querySelector('variant-radios');
      _this.submitButton = _this.querySelector('[type="submit"]');
      _this.cartUpdateUnsubscriber = undefined;
      _this.variantChangeUnsubscriber = undefined;
      return _this;
    }

    _createClass(ProductInfo, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        var _this2 = this;

        if (!this.input) return;
        this.quantityForm = this.querySelector('.product-form__quantity');
        if (!this.quantityForm) return;
        this.setQuantityBoundries();
        if (!this.dataset.originalSection) {
          this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, this.fetchQuantityRules.bind(this));
        }
        this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          var sectionId = _this2.dataset.originalSection ? _this2.dataset.originalSection : _this2.dataset.section;
          if (event.data.sectionId !== sectionId) return;
          _this2.updateQuantityRules(event.data.sectionId, event.data.html);
          _this2.setQuantityBoundries();
        });
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        if (this.cartUpdateUnsubscriber) {
          this.cartUpdateUnsubscriber();
        }
        if (this.variantChangeUnsubscriber) {
          this.variantChangeUnsubscriber();
        }
      }
    }, {
      key: 'setQuantityBoundries',
      value: function setQuantityBoundries() {
        var data = {
          cartQuantity: this.input.dataset.cartQuantity ? parseInt(this.input.dataset.cartQuantity) : 0,
          min: this.input.dataset.min ? parseInt(this.input.dataset.min) : 1,
          max: this.input.dataset.max ? parseInt(this.input.dataset.max) : null,
          step: this.input.step ? parseInt(this.input.step) : 1
        };

        var min = data.min;
        var max = data.max === null ? data.max : data.max - data.cartQuantity;
        if (max !== null) min = Math.min(min, max);
        if (data.cartQuantity >= data.min) min = Math.min(min, data.step);

        this.input.min = min;
        this.input.max = max;
        this.input.value = min;
        publish(PUB_SUB_EVENTS.quantityUpdate, undefined);
      }
    }, {
      key: 'fetchQuantityRules',
      value: function fetchQuantityRules() {
        var _this3 = this;

        if (!this.currentVariant || !this.currentVariant.value) return;
        this.querySelector('.quantity__rules-cart .loading__spinner').classList.remove('hidden');
        fetch(this.dataset.url + '?variant=' + this.currentVariant.value + '&section_id=' + this.dataset.section).then(function (response) {
          return response.text();
        }).then(function (responseText) {
          var html = new DOMParser().parseFromString(responseText, 'text/html');
          _this3.updateQuantityRules(_this3.dataset.section, html);
          _this3.setQuantityBoundries();
        }).catch(function (e) {
          console.error(e);
        }).finally(function () {
          _this3.querySelector('.quantity__rules-cart .loading__spinner').classList.add('hidden');
        });
      }
    }, {
      key: 'updateQuantityRules',
      value: function updateQuantityRules(sectionId, html) {
        var quantityFormUpdated = html.getElementById('Quantity-Form-' + sectionId);
        var selectors = ['.quantity__input', '.quantity__rules', '.quantity__label'];
        for (var selector in selectors) {
          var current = this.quantityForm.querySelector(selector);
          var updated = quantityFormUpdated.querySelector(selector);
          if (!current || !updated) continue;
          if (selector === '.quantity__input') {
            var attributes = ['data-cart-quantity', 'data-min', 'data-max', 'step'];
            for (var attribute in attributes) {
              var valueUpdated = updated.getAttribute(attribute);
              if (valueUpdated !== null) current.setAttribute(attribute, valueUpdated);
            }
          } else {
            current.innerHTML = updated.innerHTML;
          }
        }
      }
    }]);

    return ProductInfo;
  }(HTMLElement));
}
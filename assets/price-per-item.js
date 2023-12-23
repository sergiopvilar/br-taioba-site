'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('price-per-item')) {
  customElements.define('price-per-item', function (_HTMLElement) {
    _inherits(PricePerItem, _HTMLElement);

    function PricePerItem() {
      _classCallCheck(this, PricePerItem);

      var _this = _possibleConstructorReturn(this, (PricePerItem.__proto__ || Object.getPrototypeOf(PricePerItem)).call(this));

      _this.variantId = _this.dataset.variantId;
      _this.input = document.getElementById('Quantity-' + (_this.dataset.sectionId || _this.dataset.variantId));
      if (_this.input) {
        _this.input.addEventListener('change', _this.onInputChange.bind(_this));
      }

      _this.getVolumePricingArray();

      _this.updatePricePerItemUnsubscriber = undefined;
      _this.variantIdChangedUnsubscriber = undefined;
      return _this;
    }

    _createClass(PricePerItem, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        var _this2 = this;

        // Update variantId if variant is switched on product page
        this.variantIdChangedUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          _this2.variantId = event.data.variant.id.toString();
          _this2.getVolumePricingArray();
        });

        this.updatePricePerItemUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (response) {
          if (!response.cartData) return;

          // Item was added to cart via product page
          if (response.cartData['variant_id'] !== undefined) {
            if (response.productVariantId === _this2.variantId) _this2.updatePricePerItem(response.cartData.quantity);
            // Qty was updated in cart
          } else if (response.cartData.item_count !== 0) {
            var isVariant = response.cartData.items.find(function (item) {
              return item.variant_id.toString() === _this2.variantId;
            });
            if (isVariant && isVariant.id.toString() === _this2.variantId) {
              // The variant is still in cart
              _this2.updatePricePerItem(isVariant.quantity);
            } else {
              // The variant was removed from cart, qty is 0
              _this2.updatePricePerItem(0);
            }
            // All items were removed from cart
          } else {
            _this2.updatePricePerItem(0);
          }
        });
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        if (this.updatePricePerItemUnsubscriber) {
          this.updatePricePerItemUnsubscriber();
        }
        if (this.variantIdChangedUnsubscriber) {
          this.variantIdChangedUnsubscriber();
        }
      }
    }, {
      key: 'onInputChange',
      value: function onInputChange() {
        this.updatePricePerItem();
      }
    }, {
      key: 'updatePricePerItem',
      value: function updatePricePerItem(updatedCartQuantity) {
        if (this.input) {
          this.enteredQty = parseInt(this.input.value);
          this.step = parseInt(this.input.step);
        }

        // updatedCartQuantity is undefined when qty is updated on product page. We need to sum entered qty and current qty in cart.
        // updatedCartQuantity is not undefined when qty is updated in cart. We need to sum qty in cart and min qty for product.
        this.currentQtyForVolumePricing = updatedCartQuantity === undefined ? this.getCartQuantity(updatedCartQuantity) + this.enteredQty : this.getCartQuantity(updatedCartQuantity) + parseInt(this.step);

        if (this.classList.contains('variant-item__price-per-item')) {
          this.currentQtyForVolumePricing = this.getCartQuantity(updatedCartQuantity);
        }
        for (var pair in this.qtyPricePairs) {
          if (this.currentQtyForVolumePricing >= pair[0]) {
            var pricePerItemCurrent = document.querySelector('price-per-item[id^="Price-Per-Item-' + (this.dataset.sectionId || this.dataset.variantId) + '"] .price-per-item span');
            this.classList.contains('variant-item__price-per-item') ? pricePerItemCurrent.innerHTML = window.quickOrderListStrings.each.replace('[money]', pair[1]) : pricePerItemCurrent.innerHTML = pair[1];
            break;
          }
        }
      }
    }, {
      key: 'getCartQuantity',
      value: function getCartQuantity(updatedCartQuantity) {
        return updatedCartQuantity || updatedCartQuantity === 0 ? updatedCartQuantity : parseInt(this.input.dataset.cartQuantity);
      }
    }, {
      key: 'getVolumePricingArray',
      value: function getVolumePricingArray() {
        var _this3 = this;

        var volumePricing = document.getElementById('Volume-' + (this.dataset.sectionId || this.dataset.variantId));
        this.qtyPricePairs = [];

        if (volumePricing) {
          volumePricing.querySelectorAll('li').forEach(function (li) {
            var qty = parseInt(li.querySelector('span:first-child').textContent);
            var price = li.querySelector('span:not(:first-child):last-child').dataset.text;
            _this3.qtyPricePairs.push([qty, price]);
          });
        }
        this.qtyPricePairs.reverse();
      }
    }]);

    return PricePerItem;
  }(HTMLElement));
}
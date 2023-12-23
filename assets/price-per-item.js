if (!customElements.get('price-per-item')) {
  customElements.define(
    'price-per-item',
    /*@__PURE__*/(function (HTMLElement) {
    function PricePerItem() {
        HTMLElement.call(this);
        this.variantId = this.dataset.variantId;
        this.input = document.getElementById(("Quantity-" + (this.dataset.sectionId || this.dataset.variantId)));
        if (this.input) {
          this.input.addEventListener('change', this.onInputChange.bind(this));
        }

        this.getVolumePricingArray();

        this.updatePricePerItemUnsubscriber = undefined;
        this.variantIdChangedUnsubscriber = undefined;
      }

    if ( HTMLElement ) PricePerItem.__proto__ = HTMLElement;
    PricePerItem.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    PricePerItem.prototype.constructor = PricePerItem;

      PricePerItem.prototype.connectedCallback = function connectedCallback () {
        var this$1 = this;

        // Update variantId if variant is switched on product page
        this.variantIdChangedUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          this$1.variantId = event.data.variant.id.toString();
          this$1.getVolumePricingArray();
        });

        this.updatePricePerItemUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (response) {
          if (!response.cartData) { return; }

          // Item was added to cart via product page
          if (response.cartData['variant_id'] !== undefined) {
            if (response.productVariantId === this$1.variantId) { this$1.updatePricePerItem(response.cartData.quantity); }
            // Qty was updated in cart
          } else if (response.cartData.item_count !== 0) {
            var isVariant = response.cartData.items.find(function (item) { return item.variant_id.toString() === this$1.variantId; });
            if (isVariant && isVariant.id.toString() === this$1.variantId) {
              // The variant is still in cart
              this$1.updatePricePerItem(isVariant.quantity);
            } else {
              // The variant was removed from cart, qty is 0
              this$1.updatePricePerItem(0);
            }
            // All items were removed from cart
          } else {
            this$1.updatePricePerItem(0);
          }
        });
      };

      PricePerItem.prototype.disconnectedCallback = function disconnectedCallback () {
        if (this.updatePricePerItemUnsubscriber) {
          this.updatePricePerItemUnsubscriber();
        }
        if (this.variantIdChangedUnsubscriber) {
          this.variantIdChangedUnsubscriber();
        }
      };

      PricePerItem.prototype.onInputChange = function onInputChange () {
        this.updatePricePerItem();
      };

      PricePerItem.prototype.updatePricePerItem = function updatePricePerItem (updatedCartQuantity) {
        if (this.input) {
          this.enteredQty = parseInt(this.input.value);
          this.step = parseInt(this.input.step)
        }

        // updatedCartQuantity is undefined when qty is updated on product page. We need to sum entered qty and current qty in cart.
        // updatedCartQuantity is not undefined when qty is updated in cart. We need to sum qty in cart and min qty for product.
        this.currentQtyForVolumePricing = updatedCartQuantity === undefined ? this.getCartQuantity(updatedCartQuantity) + this.enteredQty : this.getCartQuantity(updatedCartQuantity) + parseInt(this.step);

        if (this.classList.contains('variant-item__price-per-item')) {
          this.currentQtyForVolumePricing = this.getCartQuantity(updatedCartQuantity);
        }
        for (var pair in this.qtyPricePairs) {
          if (this.currentQtyForVolumePricing >= pair[0]) {
            var pricePerItemCurrent = document.querySelector(("price-per-item[id^=\"Price-Per-Item-" + (this.dataset.sectionId || this.dataset.variantId) + "\"] .price-per-item span"));
            this.classList.contains('variant-item__price-per-item') ? pricePerItemCurrent.innerHTML = window.quickOrderListStrings.each.replace('[money]', pair[1]) : pricePerItemCurrent.innerHTML = pair[1];
            break;
          }
        }
      };

      PricePerItem.prototype.getCartQuantity = function getCartQuantity (updatedCartQuantity) {
        return (updatedCartQuantity || updatedCartQuantity === 0) ? updatedCartQuantity : parseInt(this.input.dataset.cartQuantity);
      };

      PricePerItem.prototype.getVolumePricingArray = function getVolumePricingArray () {
        var this$1 = this;

        var volumePricing = document.getElementById(("Volume-" + (this.dataset.sectionId || this.dataset.variantId)));
        this.qtyPricePairs = [];

        if (volumePricing) {
          volumePricing.querySelectorAll('li').forEach(function (li) {
            var qty = parseInt(li.querySelector('span:first-child').textContent);
            var price = (li.querySelector('span:not(:first-child):last-child').dataset.text);
            this$1.qtyPricePairs.push([qty, price]);
          });
        }
        this.qtyPricePairs.reverse();
      };

    return PricePerItem;
  }(HTMLElement))
  );
}


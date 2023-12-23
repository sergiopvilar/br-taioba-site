if (!customElements.get('product-info')) {
  customElements.define(
    'product-info',
    /*@__PURE__*/(function (HTMLElement) {
    function ProductInfo() {
        HTMLElement.call(this);
        this.input = this.querySelector('.quantity__input');
        this.currentVariant = this.querySelector('.product-variant-id');
        this.variantSelects = this.querySelector('variant-radios');
        this.submitButton = this.querySelector('[type="submit"]');
        this.cartUpdateUnsubscriber = undefined;
        this.variantChangeUnsubscriber = undefined;
      }

    if ( HTMLElement ) ProductInfo.__proto__ = HTMLElement;
    ProductInfo.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    ProductInfo.prototype.constructor = ProductInfo;

      ProductInfo.prototype.connectedCallback = function connectedCallback () {
        var this$1 = this;

        if (!this.input) { return; }
        this.quantityForm = this.querySelector('.product-form__quantity');
        if (!this.quantityForm) { return; }
        this.setQuantityBoundries();
        if (!this.dataset.originalSection) {
          this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, this.fetchQuantityRules.bind(this));
        }
        this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          var sectionId = this$1.dataset.originalSection ? this$1.dataset.originalSection : this$1.dataset.section;
          if (event.data.sectionId !== sectionId) { return; }
          this$1.updateQuantityRules(event.data.sectionId, event.data.html);
          this$1.setQuantityBoundries();
        });
      };

      ProductInfo.prototype.disconnectedCallback = function disconnectedCallback () {
        if (this.cartUpdateUnsubscriber) {
          this.cartUpdateUnsubscriber();
        }
        if (this.variantChangeUnsubscriber) {
          this.variantChangeUnsubscriber();
        }
      };

      ProductInfo.prototype.setQuantityBoundries = function setQuantityBoundries () {
        var data = {
          cartQuantity: this.input.dataset.cartQuantity ? parseInt(this.input.dataset.cartQuantity) : 0,
          min: this.input.dataset.min ? parseInt(this.input.dataset.min) : 1,
          max: this.input.dataset.max ? parseInt(this.input.dataset.max) : null,
          step: this.input.step ? parseInt(this.input.step) : 1,
        };

        var min = data.min;
        var max = data.max === null ? data.max : data.max - data.cartQuantity;
        if (max !== null) { min = Math.min(min, max); }
        if (data.cartQuantity >= data.min) { min = Math.min(min, data.step); }

        this.input.min = min;
        this.input.max = max;
        this.input.value = min;
        publish(PUB_SUB_EVENTS.quantityUpdate, undefined);
      };

      ProductInfo.prototype.fetchQuantityRules = function fetchQuantityRules () {
        var this$1 = this;

        if (!this.currentVariant || !this.currentVariant.value) { return; }
        this.querySelector('.quantity__rules-cart .loading__spinner').classList.remove('hidden');
        fetch(((this.dataset.url) + "?variant=" + (this.currentVariant.value) + "&section_id=" + (this.dataset.section)))
          .then(function (response) {
            return response.text();
          })
          .then(function (responseText) {
            var html = new DOMParser().parseFromString(responseText, 'text/html');
            this$1.updateQuantityRules(this$1.dataset.section, html);
            this$1.setQuantityBoundries();
          })
          .catch(function (e) {
            console.error(e);
          })
          .finally(function () {
            this$1.querySelector('.quantity__rules-cart .loading__spinner').classList.add('hidden');
          });
      };

      ProductInfo.prototype.updateQuantityRules = function updateQuantityRules (sectionId, html) {
        var quantityFormUpdated = html.getElementById(("Quantity-Form-" + sectionId));
        var selectors = ['.quantity__input', '.quantity__rules', '.quantity__label'];
        for (var selector in selectors) {
          var current = this.quantityForm.querySelector(selector);
          var updated = quantityFormUpdated.querySelector(selector);
          if (!current || !updated) { continue; }
          if (selector === '.quantity__input') {
            var attributes = ['data-cart-quantity', 'data-min', 'data-max', 'step'];
            for (var attribute in attributes) {
              var valueUpdated = updated.getAttribute(attribute);
              if (valueUpdated !== null) { current.setAttribute(attribute, valueUpdated); }
            }
          } else {
            current.innerHTML = updated.innerHTML;
          }
        }
      };

    return ProductInfo;
  }(HTMLElement))
  );
}


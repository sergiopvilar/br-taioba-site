if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    /*@__PURE__*/(function (HTMLElement) {
    function ProductForm() {
        HTMLElement.call(this);

        this.form = this.querySelector('form');
        this.form.querySelector('[name=id]').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');

        if (document.querySelector('cart-drawer')) { this.submitButton.setAttribute('aria-haspopup', 'dialog'); }

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

    if ( HTMLElement ) ProductForm.__proto__ = HTMLElement;
    ProductForm.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    ProductForm.prototype.constructor = ProductForm;

      ProductForm.prototype.onSubmitHandler = function onSubmitHandler (evt) {
        var this$1 = this;

        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') { return; }

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        var config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        var formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map(function (section) { return section.id; })
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(("" + (routes.cart_add_url)), config)
          .then(function (response) { return response.json(); })
          .then(function (response) {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this$1.handleErrorMessage(response.description);

              var soldOutMessage = this$1.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) { return; }
              this$1.submitButton.setAttribute('aria-disabled', true);
              this$1.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this$1.error = true;
              return;
            } else if (!this$1.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            if (!this$1.error)
              { publish(PUB_SUB_EVENTS.cartUpdate, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                cartData: response,
              }); }
            this$1.error = false;
            var quickAddModal = this$1.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                function () {
                  setTimeout(function () {
                    this$1.cart.renderContents(response);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              this$1.cart.renderContents(response);
            }
          })
          .catch(function (e) {
            console.error(e);
          })
          .finally(function () {
            this$1.submitButton.classList.remove('loading');
            if (this$1.cart && this$1.cart.classList.contains('is-empty')) { this$1.cart.classList.remove('is-empty'); }
            if (!this$1.error) { this$1.submitButton.removeAttribute('aria-disabled'); }
            this$1.querySelector('.loading__spinner').classList.add('hidden');
          });
      };

      ProductForm.prototype.handleErrorMessage = function handleErrorMessage (errorMessage) {
        if ( errorMessage === void 0 ) errorMessage = false;

        if (this.hideErrors) { return; }

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) { return; }
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      };

    return ProductForm;
  }(HTMLElement))
  );
}


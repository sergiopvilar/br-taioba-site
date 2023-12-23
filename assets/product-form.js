'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('product-form')) {
  customElements.define('product-form', function (_HTMLElement) {
    _inherits(ProductForm, _HTMLElement);

    function ProductForm() {
      _classCallCheck(this, ProductForm);

      var _this = _possibleConstructorReturn(this, (ProductForm.__proto__ || Object.getPrototypeOf(ProductForm)).call(this));

      _this.form = _this.querySelector('form');
      _this.form.querySelector('[name=id]').disabled = false;
      _this.form.addEventListener('submit', _this.onSubmitHandler.bind(_this));
      _this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      _this.submitButton = _this.querySelector('[type="submit"]');

      if (document.querySelector('cart-drawer')) _this.submitButton.setAttribute('aria-haspopup', 'dialog');

      _this.hideErrors = _this.dataset.hideErrors === 'true';
      return _this;
    }

    _createClass(ProductForm, [{
      key: 'onSubmitHandler',
      value: function onSubmitHandler(evt) {
        var _this2 = this;

        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        var config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        var formData = new FormData(this.form);
        if (this.cart) {
          formData.append('sections', this.cart.getSectionsToRender().map(function (section) {
            return section.id;
          }));
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch('' + routes.cart_add_url, config).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.status) {
            publish(PUB_SUB_EVENTS.cartError, {
              source: 'product-form',
              productVariantId: formData.get('id'),
              errors: response.errors || response.description,
              message: response.message
            });
            _this2.handleErrorMessage(response.description);

            var soldOutMessage = _this2.submitButton.querySelector('.sold-out-message');
            if (!soldOutMessage) return;
            _this2.submitButton.setAttribute('aria-disabled', true);
            _this2.submitButton.querySelector('span').classList.add('hidden');
            soldOutMessage.classList.remove('hidden');
            _this2.error = true;
            return;
          } else if (!_this2.cart) {
            window.location = window.routes.cart_url;
            return;
          }

          if (!_this2.error) publish(PUB_SUB_EVENTS.cartUpdate, {
            source: 'product-form',
            productVariantId: formData.get('id'),
            cartData: response
          });
          _this2.error = false;
          var quickAddModal = _this2.closest('quick-add-modal');
          if (quickAddModal) {
            document.body.addEventListener('modalClosed', function () {
              setTimeout(function () {
                _this2.cart.renderContents(response);
              });
            }, { once: true });
            quickAddModal.hide(true);
          } else {
            _this2.cart.renderContents(response);
          }
        }).catch(function (e) {
          console.error(e);
        }).finally(function () {
          _this2.submitButton.classList.remove('loading');
          if (_this2.cart && _this2.cart.classList.contains('is-empty')) _this2.cart.classList.remove('is-empty');
          if (!_this2.error) _this2.submitButton.removeAttribute('aria-disabled');
          _this2.querySelector('.loading__spinner').classList.add('hidden');
        });
      }
    }, {
      key: 'handleErrorMessage',
      value: function handleErrorMessage() {
        var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this.hideErrors) return;

        this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }]);

    return ProductForm;
  }(HTMLElement));
}
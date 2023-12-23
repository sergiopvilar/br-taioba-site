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
if (!customElements.get('product-form')) {
  customElements.define('product-form', function (_CustomElement2) {
    _inherits(ProductForm, _CustomElement2);
    var _super = _createSuper(ProductForm);
    function ProductForm() {
      var _this;
      _classCallCheck(this, ProductForm);
      _this = _super.call(this);
      _this.form = _this.querySelector('form');
      _this.form.querySelector('[name=id]').disabled = false;
      _this.form.addEventListener('submit', _this.onSubmitHandler.bind(_assertThisInitialized(_this)));
      _this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      _this.submitButton = _this.querySelector('[type="submit"]');
      if (document.querySelector('cart-drawer')) _this.submitButton.setAttribute('aria-haspopup', 'dialog');
      _this.hideErrors = _this.dataset.hideErrors === 'true';
      return _this;
    }
    _createClass(ProductForm, [{
      key: "onSubmitHandler",
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
        fetch("".concat(routes.cart_add_url), config).then(function (response) {
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
            }, {
              once: true
            });
            quickAddModal.hide(true);
          } else {
            _this2.cart.renderContents(response);
          }
        })["catch"](function (e) {
          console.error(e);
        })["finally"](function () {
          _this2.submitButton.classList.remove('loading');
          if (_this2.cart && _this2.cart.classList.contains('is-empty')) _this2.cart.classList.remove('is-empty');
          if (!_this2.error) _this2.submitButton.removeAttribute('aria-disabled');
          _this2.querySelector('.loading__spinner').classList.add('hidden');
        });
      }
    }, {
      key: "handleErrorMessage",
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
  }(_CustomElement));
}
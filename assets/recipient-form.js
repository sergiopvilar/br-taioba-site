"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}
;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);
if (!customElements.get('recipient-form')) {
  customElements.define('recipient-form', function (_CustomElement2) {
    _inherits(RecipientForm, _CustomElement2);
    var _super = _createSuper(RecipientForm);
    function RecipientForm() {
      var _this$errorMessageWra, _this$errorMessageWra2, _this$errorMessage;
      var _this;
      _classCallCheck(this, RecipientForm);
      _this = _super.call(this);
      _defineProperty(_assertThisInitialized(_this), "cartUpdateUnsubscriber", undefined);
      _defineProperty(_assertThisInitialized(_this), "variantChangeUnsubscriber", undefined);
      _defineProperty(_assertThisInitialized(_this), "cartErrorUnsubscriber", undefined);
      _this.recipientFieldsLiveRegion = _this.querySelector("#Recipient-fields-live-region-".concat(_this.dataset.sectionId));
      _this.checkboxInput = _this.querySelector("#Recipient-checkbox-".concat(_this.dataset.sectionId));
      _this.checkboxInput.disabled = false;
      _this.hiddenControlField = _this.querySelector("#Recipient-control-".concat(_this.dataset.sectionId));
      _this.hiddenControlField.disabled = true;
      _this.emailInput = _this.querySelector("#Recipient-email-".concat(_this.dataset.sectionId));
      _this.nameInput = _this.querySelector("#Recipient-name-".concat(_this.dataset.sectionId));
      _this.messageInput = _this.querySelector("#Recipient-message-".concat(_this.dataset.sectionId));
      _this.sendonInput = _this.querySelector("#Recipient-send-on-".concat(_this.dataset.sectionId));
      _this.offsetProperty = _this.querySelector("#Recipient-timezone-offset-".concat(_this.dataset.sectionId));
      if (_this.offsetProperty) _this.offsetProperty.value = new Date().getTimezoneOffset().toString();
      _this.errorMessageWrapper = _this.querySelector('.product-form__recipient-error-message-wrapper');
      _this.errorMessageList = (_this$errorMessageWra = _this.errorMessageWrapper) === null || _this$errorMessageWra === void 0 ? void 0 : _this$errorMessageWra.querySelector('ul');
      _this.errorMessage = (_this$errorMessageWra2 = _this.errorMessageWrapper) === null || _this$errorMessageWra2 === void 0 ? void 0 : _this$errorMessageWra2.querySelector('.error-message');
      _this.defaultErrorHeader = (_this$errorMessage = _this.errorMessage) === null || _this$errorMessage === void 0 ? void 0 : _this$errorMessage.innerText;
      _this.currentProductVariantId = _this.dataset.productVariantId;
      _this.addEventListener('change', _this.onChange.bind(_assertThisInitialized(_this)));
      _this.onChange();
      return _this;
    }
    _createClass(RecipientForm, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;
        this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
          if (event.source === 'product-form' && event.productVariantId.toString() === _this2.currentProductVariantId) {
            _this2.resetRecipientForm();
          }
        });
        this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          if (event.data.sectionId === _this2.dataset.sectionId) {
            _this2.currentProductVariantId = event.data.variant.id.toString();
          }
        });
        this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartError, function (event) {
          if (event.source === 'product-form' && event.productVariantId.toString() === _this2.currentProductVariantId) {
            _this2.displayErrorMessage(event.message, event.errors);
          }
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.cartUpdateUnsubscriber) {
          this.cartUpdateUnsubscriber();
        }
        if (this.variantChangeUnsubscriber) {
          this.variantChangeUnsubscriber();
        }
        if (this.cartErrorUnsubscriber) {
          this.cartErrorUnsubscriber();
        }
      }
    }, {
      key: "onChange",
      value: function onChange() {
        if (this.checkboxInput.checked) {
          this.enableInputFields();
          this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormExpanded;
        } else {
          this.clearInputFields();
          this.disableInputFields();
          this.clearErrorMessage();
          this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormCollapsed;
        }
      }
    }, {
      key: "inputFields",
      value: function inputFields() {
        return [this.emailInput, this.nameInput, this.messageInput, this.sendonInput];
      }
    }, {
      key: "disableableFields",
      value: function disableableFields() {
        return [].concat(_toConsumableArray(this.inputFields()), [this.offsetProperty]);
      }
    }, {
      key: "clearInputFields",
      value: function clearInputFields() {
        this.inputFields().forEach(function (field) {
          return field.value = '';
        });
      }
    }, {
      key: "enableInputFields",
      value: function enableInputFields() {
        this.disableableFields().forEach(function (field) {
          return field.disabled = false;
        });
      }
    }, {
      key: "disableInputFields",
      value: function disableInputFields() {
        this.disableableFields().forEach(function (field) {
          return field.disabled = true;
        });
      }
    }, {
      key: "displayErrorMessage",
      value: function displayErrorMessage(title, body) {
        var _this3 = this;
        this.clearErrorMessage();
        this.errorMessageWrapper.hidden = false;
        if (_typeof(body) === 'object') {
          this.errorMessage.innerText = this.defaultErrorHeader;
          return Object.entries(body).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            var errorMessageId = "RecipientForm-".concat(key, "-error-").concat(_this3.dataset.sectionId);
            var fieldSelector = "#Recipient-".concat(key, "-").concat(_this3.dataset.sectionId);
            var message = "".concat(value.join(', '));
            var errorMessageElement = _this3.querySelector("#".concat(errorMessageId));
            var errorTextElement = errorMessageElement === null || errorMessageElement === void 0 ? void 0 : errorMessageElement.querySelector('.error-message');
            if (!errorTextElement) return;
            if (_this3.errorMessageList) {
              _this3.errorMessageList.appendChild(_this3.createErrorListItem(fieldSelector, message));
            }
            errorTextElement.innerText = "".concat(message, ".");
            errorMessageElement.classList.remove('hidden');
            var inputElement = _this3["".concat(key, "Input")];
            if (!inputElement) return;
            inputElement.setAttribute('aria-invalid', true);
            inputElement.setAttribute('aria-describedby', errorMessageId);
          });
        }
        this.errorMessage.innerText = body;
      }
    }, {
      key: "createErrorListItem",
      value: function createErrorListItem(target, message) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.setAttribute('href', target);
        a.innerText = message;
        li.appendChild(a);
        li.className = 'error-message';
        return li;
      }
    }, {
      key: "clearErrorMessage",
      value: function clearErrorMessage() {
        this.errorMessageWrapper.hidden = true;
        if (this.errorMessageList) this.errorMessageList.innerHTML = '';
        this.querySelectorAll('.recipient-fields .form__message').forEach(function (field) {
          field.classList.add('hidden');
          var textField = field.querySelector('.error-message');
          if (textField) textField.innerText = '';
        });
        [this.emailInput, this.messageInput, this.nameInput, this.sendonInput].forEach(function (inputElement) {
          inputElement.setAttribute('aria-invalid', false);
          inputElement.removeAttribute('aria-describedby');
        });
      }
    }, {
      key: "resetRecipientForm",
      value: function resetRecipientForm() {
        if (this.checkboxInput.checked) {
          this.checkboxInput.checked = false;
          this.clearInputFields();
          this.clearErrorMessage();
        }
      }
    }]);
    return RecipientForm;
  }(_CustomElement));
}
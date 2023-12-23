'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('recipient-form')) {
  customElements.define('recipient-form', function (_HTMLElement) {
    _inherits(RecipientForm, _HTMLElement);

    function RecipientForm() {
      _classCallCheck(this, RecipientForm);

      var _this = _possibleConstructorReturn(this, (RecipientForm.__proto__ || Object.getPrototypeOf(RecipientForm)).call(this));

      _this.recipientFieldsLiveRegion = _this.querySelector('#Recipient-fields-live-region-' + _this.dataset.sectionId);
      _this.checkboxInput = _this.querySelector('#Recipient-checkbox-' + _this.dataset.sectionId);
      _this.checkboxInput.disabled = false;
      _this.hiddenControlField = _this.querySelector('#Recipient-control-' + _this.dataset.sectionId);
      _this.hiddenControlField.disabled = true;
      _this.emailInput = _this.querySelector('#Recipient-email-' + _this.dataset.sectionId);
      _this.nameInput = _this.querySelector('#Recipient-name-' + _this.dataset.sectionId);
      _this.messageInput = _this.querySelector('#Recipient-message-' + _this.dataset.sectionId);
      _this.sendonInput = _this.querySelector('#Recipient-send-on-' + _this.dataset.sectionId);
      _this.offsetProperty = _this.querySelector('#Recipient-timezone-offset-' + _this.dataset.sectionId);
      if (_this.offsetProperty) _this.offsetProperty.value = new Date().getTimezoneOffset().toString();

      _this.errorMessageWrapper = _this.querySelector('.product-form__recipient-error-message-wrapper');
      _this.errorMessageList = _this.errorMessageWrapper ? _this.errorMessageWrapper.querySelector('ul') : undefined;
      _this.errorMessage = _this.errorMessageWrapper ? _this.errorMessageWrapper.querySelector('.error-message') : undefined;
      _this.defaultErrorHeader = _this.errorMessage ? _this.errorMessage.innerText : undefined;
      _this.currentProductVariantId = _this.dataset.productVariantId;
      _this.addEventListener('change', _this.onChange.bind(_this));
      _this.onChange();

      _this.cartUpdateUnsubscriber = undefined;
      _this.variantChangeUnsubscriber = undefined;
      _this.cartErrorUnsubscriber = undefined;
      return _this;
    }

    _createClass(RecipientForm, [{
      key: 'connectedCallback',
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
      key: 'disconnectedCallback',
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
      key: 'onChange',
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
      key: 'inputFields',
      value: function inputFields() {
        return [this.emailInput, this.nameInput, this.messageInput, this.sendonInput];
      }
    }, {
      key: 'disableableFields',
      value: function disableableFields() {
        return [].concat(_toConsumableArray(this.inputFields()), [this.offsetProperty]);
      }
    }, {
      key: 'clearInputFields',
      value: function clearInputFields() {
        this.inputFields().forEach(function (field) {
          return field.value = '';
        });
      }
    }, {
      key: 'enableInputFields',
      value: function enableInputFields() {
        this.disableableFields().forEach(function (field) {
          return field.disabled = false;
        });
      }
    }, {
      key: 'disableInputFields',
      value: function disableInputFields() {
        this.disableableFields().forEach(function (field) {
          return field.disabled = true;
        });
      }
    }, {
      key: 'displayErrorMessage',
      value: function displayErrorMessage(title, body) {
        var _this3 = this;

        this.clearErrorMessage();
        this.errorMessageWrapper.hidden = false;
        if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
          this.errorMessage.innerText = this.defaultErrorHeader;
          return Object.entries(body).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            var errorMessageId = 'RecipientForm-' + key + '-error-' + _this3.dataset.sectionId;
            var fieldSelector = '#Recipient-' + key + '-' + _this3.dataset.sectionId;
            var message = '' + value.join(', ');
            var errorMessageElement = _this3.querySelector('#' + errorMessageId);
            var errorTextElement = errorMessageElement ? errorMessageElement.querySelector('.error-message') : undefined;
            if (!errorTextElement) return;

            if (_this3.errorMessageList) {
              _this3.errorMessageList.appendChild(_this3.createErrorListItem(fieldSelector, message));
            }

            errorTextElement.innerText = message + '.';
            errorMessageElement.classList.remove('hidden');

            var inputElement = _this3[key + 'Input'];
            if (!inputElement) return;

            inputElement.setAttribute('aria-invalid', true);
            inputElement.setAttribute('aria-describedby', errorMessageId);
          });
        }

        this.errorMessage.innerText = body;
      }
    }, {
      key: 'createErrorListItem',
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
      key: 'clearErrorMessage',
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
      key: 'resetRecipientForm',
      value: function resetRecipientForm() {
        if (this.checkboxInput.checked) {
          this.checkboxInput.checked = false;
          this.clearInputFields();
          this.clearErrorMessage();
        }
      }
    }]);

    return RecipientForm;
  }(HTMLElement));
}
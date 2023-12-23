"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
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
var QuickOrderListRemoveButton = function (_CustomElement2) {
  _inherits(QuickOrderListRemoveButton, _CustomElement2);
  var _super = _createSuper(QuickOrderListRemoveButton);
  function QuickOrderListRemoveButton() {
    var _this;
    _classCallCheck(this, QuickOrderListRemoveButton);
    _this = _super.call(this);
    _this.addEventListener('click', function (event) {
      event.preventDefault();
      var quickOrderList = _this.closest('quick-order-list');
      quickOrderList.updateQuantity(_this.dataset.index, 0);
    });
    return _this;
  }
  return _createClass(QuickOrderListRemoveButton);
}(_CustomElement);
customElements.define('quick-order-list-remove-button', QuickOrderListRemoveButton);
var QuickOrderListRemoveAllButton = function (_CustomElement3) {
  _inherits(QuickOrderListRemoveAllButton, _CustomElement3);
  var _super2 = _createSuper(QuickOrderListRemoveAllButton);
  function QuickOrderListRemoveAllButton() {
    var _this2;
    _classCallCheck(this, QuickOrderListRemoveAllButton);
    _this2 = _super2.call(this);
    var allVariants = Array.from(document.querySelectorAll('[data-variant-id]'));
    var items = {};
    var hasVariantsInCart = false;
    _this2.quickOrderList = _this2.closest('quick-order-list');
    allVariants.forEach(function (variant) {
      var cartQty = parseInt(variant.dataset.cartQty);
      if (cartQty > 0) {
        hasVariantsInCart = true;
        items[parseInt(variant.dataset.variantId)] = 0;
      }
    });
    if (!hasVariantsInCart) {
      _this2.classList.add('hidden');
    }
    _this2.actions = {
      confirm: 'confirm',
      remove: 'remove',
      cancel: 'cancel'
    };
    _this2.addEventListener('click', function (event) {
      event.preventDefault();
      if (_this2.dataset.action === _this2.actions.confirm) {
        _this2.toggleConfirmation(false, true);
      } else if (_this2.dataset.action === _this2.actions.remove) {
        _this2.quickOrderList.updateMultipleQty(items);
        _this2.toggleConfirmation(true, false);
      } else if (_this2.dataset.action === _this2.actions.cancel) {
        _this2.toggleConfirmation(true, false);
      }
    });
    return _this2;
  }
  _createClass(QuickOrderListRemoveAllButton, [{
    key: "toggleConfirmation",
    value: function toggleConfirmation(showConfirmation, showInfo) {
      this.quickOrderList.querySelector('.quick-order-list-total__confirmation').classList.toggle('hidden', showConfirmation);
      this.quickOrderList.querySelector('.quick-order-list-total__info').classList.toggle('hidden', showInfo);
    }
  }]);
  return QuickOrderListRemoveAllButton;
}(_CustomElement);
customElements.define('quick-order-list-remove-all-button', QuickOrderListRemoveAllButton);
var QuickOrderList = function (_CustomElement4) {
  _inherits(QuickOrderList, _CustomElement4);
  var _super3 = _createSuper(QuickOrderList);
  function QuickOrderList() {
    var _this3;
    _classCallCheck(this, QuickOrderList);
    _this3 = _super3.call(this);
    _defineProperty(_assertThisInitialized(_this3), "cartUpdateUnsubscriber", undefined);
    _this3.cart = document.querySelector('cart-drawer');
    _this3.actions = {
      add: 'ADD',
      update: 'UPDATE'
    };
    _this3.quickOrderListId = 'quick-order-list';
    _this3.variantItemStatusElement = document.getElementById('shopping-cart-variant-item-status');
    var form = _this3.querySelector('form');
    form.addEventListener('submit', _this3.onSubmit.bind(_assertThisInitialized(_this3)));
    var debouncedOnChange = debounce(function (event) {
      _this3.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);
    _this3.addEventListener('change', debouncedOnChange.bind(_assertThisInitialized(_this3)));
    return _this3;
  }
  _createClass(QuickOrderList, [{
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this4 = this;
      this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
        if (event.source === _this4.quickOrderListId) {
          return;
        }
        _this4.onCartUpdate();
      });
      this.sectionId = this.dataset.id;
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      if (this.cartUpdateUnsubscriber) {
        this.cartUpdateUnsubscriber();
      }
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var inputValue = parseInt(event.target.value);
      var cartQuantity = parseInt(event.target.dataset.cartQuantity);
      var index = event.target.dataset.index;
      var name = document.activeElement.getAttribute('name');
      var quantity = inputValue - cartQuantity;
      if (cartQuantity > 0) {
        this.updateQuantity(index, inputValue, name, this.actions.update);
      } else {
        this.updateQuantity(index, quantity, name, this.actions.add);
      }
    }
  }, {
    key: "onCartUpdate",
    value: function onCartUpdate() {
      var _this5 = this;
      fetch("".concat(window.location.pathname, "?section_id=").concat(this.sectionId)).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var html = new DOMParser().parseFromString(responseText, 'text/html');
        var sourceQty = html.querySelector(_this5.quickOrderListId);
        _this5.innerHTML = sourceQty.innerHTML;
      })["catch"](function (e) {
        console.error(e);
      });
    }
  }, {
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: this.quickOrderListId,
        section: document.getElementById(this.quickOrderListId).dataset.id,
        selector: '.js-contents'
      }, {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }, {
        id: 'quick-order-list-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      }, {
        id: 'quick-order-list-total',
        section: document.getElementById(this.quickOrderListId).dataset.id,
        selector: '.quick-order-list__total'
      }, {
        id: 'CartDrawer',
        selector: '#CartDrawer',
        section: 'cart-drawer'
      }];
    }
  }, {
    key: "renderSections",
    value: function renderSections(parsedState) {
      var _this6 = this;
      this.getSectionsToRender().forEach(function (section) {
        var sectionElement = document.getElementById(section.id);
        if (sectionElement && sectionElement.parentElement && sectionElement.parentElement.classList.contains('drawer')) {
          parsedState.items.length > 0 ? sectionElement.parentElement.classList.remove('is-empty') : sectionElement.parentElement.classList.add('is-empty');
          setTimeout(function () {
            document.querySelector('#CartDrawer-Overlay').addEventListener('click', _this6.cart.close.bind(_this6.cart));
          });
        }
        var elementToReplace = sectionElement && sectionElement.querySelector(section.selector) ? sectionElement.querySelector(section.selector) : sectionElement;
        if (elementToReplace) {
          elementToReplace.innerHTML = _this6.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }
      });
    }
  }, {
    key: "updateMultipleQty",
    value: function updateMultipleQty(items) {
      var _this7 = this;
      this.querySelector('.variant-remove-total .loading__spinner').classList.remove('hidden');
      var body = JSON.stringify({
        updates: items,
        sections: this.getSectionsToRender().map(function (section) {
          return section.section;
        }),
        sections_url: window.location.pathname
      });
      this.updateMessage();
      this.setErrorMessage();
      fetch("".concat(routes.cart_update_url), _objectSpread(_objectSpread({}, fetchConfig()), {
        body: body
      })).then(function (response) {
        return response.text();
      }).then(function (state) {
        var parsedState = JSON.parse(state);
        _this7.renderSections(parsedState);
      })["catch"](function () {
        _this7.setErrorMessage(window.cartStrings.error);
      })["finally"](function () {
        _this7.querySelector('.variant-remove-total .loading__spinner').classList.add('hidden');
      });
    }
  }, {
    key: "updateQuantity",
    value: function updateQuantity(id, quantity, name, action) {
      var _this8 = this;
      this.toggleLoading(id, true);
      var routeUrl = routes.cart_change_url;
      var body = JSON.stringify({
        quantity: quantity,
        id: id,
        sections: this.getSectionsToRender().map(function (section) {
          return section.section;
        }),
        sections_url: window.location.pathname
      });
      var fetchConfigType;
      if (action === this.actions.add) {
        fetchConfigType = 'javascript';
        routeUrl = routes.cart_add_url;
        body = JSON.stringify({
          items: [{
            quantity: parseInt(quantity),
            id: parseInt(id)
          }],
          sections: this.getSectionsToRender().map(function (section) {
            return section.section;
          }),
          sections_url: window.location.pathname
        });
      }
      this.updateMessage();
      this.setErrorMessage();
      fetch("".concat(routeUrl), _objectSpread(_objectSpread({}, fetchConfig(fetchConfigType)), {
        body: body
      })).then(function (response) {
        return response.text();
      }).then(function (state) {
        var parsedState = JSON.parse(state);
        var quantityElement = document.getElementById("Quantity-".concat(id));
        var items = document.querySelectorAll('.variant-item');
        if (parsedState.description || parsedState.errors) {
          var _variantItem = document.querySelector("[id^=\"Variant-".concat(id, "\"] .variant-item__totals.small-hide .loading__spinner"));
          _variantItem.classList.add('loading__spinner--error');
          _this8.resetQuantityInput(id, quantityElement);
          if (parsedState.errors) {
            _this8.updateLiveRegions(id, parsedState.errors);
          } else {
            _this8.updateLiveRegions(id, parsedState.description);
          }
          return;
        }
        _this8.classList.toggle('is-empty', parsedState.item_count === 0);
        _this8.renderSections(parsedState);
        var hasError = false;
        var currentItem = parsedState.items.find(function (item) {
          return item.variant_id === parseInt(id);
        });
        var updatedValue = currentItem ? currentItem.quantity : undefined;
        if (updatedValue && updatedValue !== quantity) {
          _this8.updateError(updatedValue, id);
          hasError = true;
        }
        var variantItem = document.getElementById("Variant-".concat(id));
        if (variantItem && variantItem.querySelector("[name=\"".concat(name, "\"]"))) {
          variantItem.querySelector("[name=\"".concat(name, "\"]")).focus();
        }
        publish(PUB_SUB_EVENTS.cartUpdate, {
          source: _this8.quickOrderListId,
          cartData: parsedState
        });
        if (hasError) {
          _this8.updateMessage();
        } else if (action === _this8.actions.add) {
          _this8.updateMessage(parseInt(quantity));
        } else if (action === _this8.actions.update) {
          _this8.updateMessage(parseInt(quantity - quantityElement.dataset.cartQuantity));
        } else {
          _this8.updateMessage(-parseInt(quantityElement.dataset.cartQuantity));
        }
      })["catch"](function (error) {
        _this8.querySelectorAll('.loading__spinner').forEach(function (overlay) {
          return overlay.classList.add('hidden');
        });
        _this8.resetQuantityInput(id);
        console.error(error);
        _this8.setErrorMessage(window.cartStrings.error);
      })["finally"](function () {
        _this8.toggleLoading(id);
      });
    }
  }, {
    key: "resetQuantityInput",
    value: function resetQuantityInput(id, quantityElement) {
      var input = quantityElement !== null && quantityElement !== void 0 ? quantityElement : document.getElementById("Quantity-".concat(id));
      input.value = input.getAttribute('value');
    }
  }, {
    key: "setErrorMessage",
    value: function setErrorMessage() {
      var _this$errorMessageTem,
        _this9 = this;
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.errorMessageTemplate = (_this$errorMessageTem = this.errorMessageTemplate) !== null && _this$errorMessageTem !== void 0 ? _this$errorMessageTem : document.getElementById("QuickOrderListErrorTemplate-".concat(this.sectionId)).cloneNode(true);
      var errorElements = document.querySelectorAll('.quick-order-list-error');
      errorElements.forEach(function (errorElement) {
        errorElement.innerHTML = '';
        if (!message) return;
        var updatedMessageElement = _this9.errorMessageTemplate.cloneNode(true);
        updatedMessageElement.content.querySelector('.quick-order-list-error-message').innerText = message;
        errorElement.appendChild(updatedMessageElement.content);
      });
    }
  }, {
    key: "updateMessage",
    value: function updateMessage() {
      var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var messages = this.querySelectorAll('.quick-order-list__message-text');
      var icons = this.querySelectorAll('.quick-order-list__message-icon');
      if (quantity === null || isNaN(quantity)) {
        messages.forEach(function (message) {
          return message.innerHTML = '';
        });
        icons.forEach(function (icon) {
          return icon.classList.add('hidden');
        });
        return;
      }
      var isQuantityNegative = quantity < 0;
      var absQuantity = Math.abs(quantity);
      var textTemplate = isQuantityNegative ? absQuantity === 1 ? window.quickOrderListStrings.itemRemoved : window.quickOrderListStrings.itemsRemoved : quantity === 1 ? window.quickOrderListStrings.itemAdded : window.quickOrderListStrings.itemsAdded;
      messages.forEach(function (msg) {
        return msg.innerHTML = textTemplate.replace('[quantity]', absQuantity);
      });
      if (!isQuantityNegative) {
        icons.forEach(function (i) {
          return i.classList.remove('hidden');
        });
      }
    }
  }, {
    key: "updateError",
    value: function updateError(updatedValue, id) {
      var message = '';
      if (typeof updatedValue === 'undefined') {
        message = window.cartStrings.error;
      } else {
        message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
      }
      this.updateLiveRegions(id, message);
    }
  }, {
    key: "updateLiveRegions",
    value: function updateLiveRegions(id, message) {
      var variantItemErrorDesktop = document.getElementById("Quick-order-list-item-error-desktop-".concat(id));
      var variantItemErrorMobile = document.getElementById("Quick-order-list-item-error-mobile-".concat(id));
      if (variantItemErrorDesktop) {
        variantItemErrorDesktop.querySelector('.variant-item__error-text').innerHTML = message;
        variantItemErrorDesktop.closest('tr').classList.remove('hidden');
      }
      if (variantItemErrorMobile) variantItemErrorMobile.querySelector('.variant-item__error-text').innerHTML = message;
      this.variantItemStatusElement.setAttribute('aria-hidden', true);
      var cartStatus = document.getElementById('quick-order-list-live-region-text');
      cartStatus.setAttribute('aria-hidden', false);
      setTimeout(function () {
        cartStatus.setAttribute('aria-hidden', true);
      }, 1000);
    }
  }, {
    key: "getSectionInnerHTML",
    value: function getSectionInnerHTML(html, selector) {
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: "toggleLoading",
    value: function toggleLoading(id, enable) {
      var quickOrderList = document.getElementById(this.quickOrderListId);
      var quickOrderListItems = this.querySelectorAll("#Variant-".concat(id, " .loading__spinner"));
      if (enable) {
        quickOrderList.classList.add('quick-order-list__container--disabled');
        _toConsumableArray(quickOrderListItems).forEach(function (overlay) {
          return overlay.classList.remove('hidden');
        });
        document.activeElement.blur();
        this.variantItemStatusElement.setAttribute('aria-hidden', false);
      } else {
        quickOrderList.classList.remove('quick-order-list__container--disabled');
        quickOrderListItems.forEach(function (overlay) {
          return overlay.classList.add('hidden');
        });
      }
    }
  }]);
  return QuickOrderList;
}(_CustomElement);
customElements.define('quick-order-list', QuickOrderList);
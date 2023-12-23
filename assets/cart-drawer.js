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
var CartDrawer = function (_CustomElement2) {
  _inherits(CartDrawer, _CustomElement2);
  var _super = _createSuper(CartDrawer);
  function CartDrawer() {
    var _this;
    _classCallCheck(this, CartDrawer);
    _this = _super.call(this);
    _this.addEventListener('keyup', function (evt) {
      return evt.code === 'Escape' && _this.close();
    });
    _this.querySelector('#CartDrawer-Overlay').addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));
    _this.setHeaderCartIconAccessibility();
    return _this;
  }
  _createClass(CartDrawer, [{
    key: "setHeaderCartIconAccessibility",
    value: function setHeaderCartIconAccessibility() {
      var _this2 = this;
      var cartLink = document.querySelector('#cart-icon-bubble');
      cartLink.setAttribute('role', 'button');
      cartLink.setAttribute('aria-haspopup', 'dialog');
      cartLink.addEventListener('click', function (event) {
        event.preventDefault();
        _this2.open(cartLink);
      });
      cartLink.addEventListener('keydown', function (event) {
        if (event.code.toUpperCase() === 'SPACE') {
          event.preventDefault();
          _this2.open(cartLink);
        }
      });
    }
  }, {
    key: "open",
    value: function open(triggeredBy) {
      var _this3 = this;
      if (triggeredBy) this.setActiveElement(triggeredBy);
      var cartDrawerNote = this.querySelector('[id^="Details-"] summary');
      if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
      setTimeout(function () {
        _this3.classList.add('animate', 'active');
      });
      this.addEventListener('transitionend', function () {
        var containerToTrapFocusOn = _this3.classList.contains('is-empty') ? _this3.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
        var focusElement = _this3.querySelector('.drawer__inner') || _this3.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      }, {
        once: true
      });
      document.body.classList.add('overflow-hidden');
    }
  }, {
    key: "close",
    value: function close() {
      this.classList.remove('active');
      removeTrapFocus(this.activeElement);
      document.body.classList.remove('overflow-hidden');
    }
  }, {
    key: "setSummaryAccessibility",
    value: function setSummaryAccessibility(cartDrawerNote) {
      cartDrawerNote.setAttribute('role', 'button');
      cartDrawerNote.setAttribute('aria-expanded', 'false');
      if (cartDrawerNote.nextElementSibling.getAttribute('id')) {
        cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
      }
      cartDrawerNote.addEventListener('click', function (event) {
        event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
      });
      cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
    }
  }, {
    key: "renderContents",
    value: function renderContents(parsedState) {
      var _this4 = this;
      this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
      this.productId = parsedState.id;
      this.getSectionsToRender().forEach(function (section) {
        var sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
        sectionElement.innerHTML = _this4.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      });
      setTimeout(function () {
        _this4.querySelector('#CartDrawer-Overlay').addEventListener('click', _this4.close.bind(_this4));
        _this4.open();
      });
    }
  }, {
    key: "getSectionInnerHTML",
    value: function getSectionInnerHTML(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'cart-drawer',
        selector: '#CartDrawer'
      }, {
        id: 'cart-icon-bubble'
      }];
    }
  }, {
    key: "getSectionDOM",
    value: function getSectionDOM(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
    }
  }, {
    key: "setActiveElement",
    value: function setActiveElement(element) {
      this.activeElement = element;
    }
  }]);
  return CartDrawer;
}(_CustomElement);
customElements.define('cart-drawer', CartDrawer);
var CartDrawerItems = function (_CartItems) {
  _inherits(CartDrawerItems, _CartItems);
  var _super2 = _createSuper(CartDrawerItems);
  function CartDrawerItems() {
    _classCallCheck(this, CartDrawerItems);
    return _super2.apply(this, arguments);
  }
  _createClass(CartDrawerItems, [{
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner'
      }, {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }];
    }
  }]);
  return CartDrawerItems;
}(CartItems);
customElements.define('cart-drawer-items', CartDrawerItems);
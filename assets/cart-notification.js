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
var CartNotification = function (_CustomElement2) {
  _inherits(CartNotification, _CustomElement2);
  var _super = _createSuper(CartNotification);
  function CartNotification() {
    var _this;
    _classCallCheck(this, CartNotification);
    _this = _super.call(this);
    _this.notification = document.getElementById('cart-notification');
    _this.header = document.querySelector('sticky-header');
    _this.onBodyClick = _this.handleBodyClick.bind(_assertThisInitialized(_this));
    _this.notification.addEventListener('keyup', function (evt) {
      return evt.code === 'Escape' && _this.close();
    });
    _this.querySelectorAll('button[type="button"]').forEach(function (closeButton) {
      return closeButton.addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));
    });
    return _this;
  }
  _createClass(CartNotification, [{
    key: "open",
    value: function open() {
      var _this2 = this;
      this.notification.classList.add('animate', 'active');
      this.notification.addEventListener('transitionend', function () {
        _this2.notification.focus();
        trapFocus(_this2.notification);
      }, {
        once: true
      });
      document.body.addEventListener('click', this.onBodyClick);
    }
  }, {
    key: "close",
    value: function close() {
      this.notification.classList.remove('active');
      document.body.removeEventListener('click', this.onBodyClick);
      removeTrapFocus(this.activeElement);
    }
  }, {
    key: "renderContents",
    value: function renderContents(parsedState) {
      var _this3 = this;
      this.cartItemKey = parsedState.key;
      this.getSectionsToRender().forEach(function (section) {
        document.getElementById(section.id).innerHTML = _this3.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      });
      if (this.header) this.header.reveal();
      this.open();
    }
  }, {
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'cart-notification-product',
        selector: "[id=\"cart-notification-product-".concat(this.cartItemKey, "\"]")
      }, {
        id: 'cart-notification-button'
      }, {
        id: 'cart-icon-bubble'
      }];
    }
  }, {
    key: "getSectionInnerHTML",
    value: function getSectionInnerHTML(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: "handleBodyClick",
    value: function handleBodyClick(evt) {
      var target = evt.target;
      if (target !== this.notification && !target.closest('cart-notification')) {
        var disclosure = target.closest('details-disclosure, header-menu');
        this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
        this.close();
      }
    }
  }, {
    key: "setActiveElement",
    value: function setActiveElement(element) {
      this.activeElement = element;
    }
  }]);
  return CartNotification;
}(_CustomElement);
customElements.define('cart-notification', CartNotification);
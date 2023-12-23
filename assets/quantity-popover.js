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
if (!customElements.get('quantity-popover')) {
  customElements.define('quantity-popover', function (_CustomElement2) {
    _inherits(QuantityPopover, _CustomElement2);
    var _super = _createSuper(QuantityPopover);
    function QuantityPopover() {
      var _this;
      _classCallCheck(this, QuantityPopover);
      _this = _super.call(this);
      _this.mql = window.matchMedia('(min-width: 990px)');
      _this.mqlTablet = window.matchMedia('(min-width: 750px)');
      _this.infoButtonDesktop = _this.querySelector('.quantity-popover__info-button--icon-only');
      _this.infoButtonMobile = _this.querySelector('.quantity-popover__info-button--icon-with-label');
      _this.popoverInfo = _this.querySelector('.quantity-popover__info');
      _this.closeButton = _this.querySelector('.button-close');
      _this.variantInfo = _this.querySelector('.quantity-popover-container');
      _this.eventMouseEnterHappened = false;
      if (_this.closeButton) {
        _this.closeButton.addEventListener('click', _this.closePopover.bind(_assertThisInitialized(_this)));
      }
      if (_this.popoverInfo && _this.infoButtonDesktop && _this.mql.matches) {
        _this.popoverInfo.addEventListener('mouseenter', _this.closePopover.bind(_assertThisInitialized(_this)));
      }
      if (_this.infoButtonDesktop) {
        _this.infoButtonDesktop.addEventListener('click', _this.togglePopover.bind(_assertThisInitialized(_this)));
        _this.infoButtonDesktop.addEventListener('focusout', _this.closePopover.bind(_assertThisInitialized(_this)));
      }
      if (_this.infoButtonMobile) {
        _this.infoButtonMobile.addEventListener('click', _this.togglePopover.bind(_assertThisInitialized(_this)));
        _this.infoButtonMobile.addEventListener('focusout', _this.closePopover.bind(_assertThisInitialized(_this)));
      }
      if (_this.infoButtonDesktop && _this.mqlTablet.matches) {
        _this.variantInfo.addEventListener('mouseenter', _this.togglePopover.bind(_assertThisInitialized(_this)));
        _this.variantInfo.addEventListener('mouseleave', _this.closePopover.bind(_assertThisInitialized(_this)));
      }
      return _this;
    }
    _createClass(QuantityPopover, [{
      key: "togglePopover",
      value: function togglePopover(event) {
        event.preventDefault();
        if (event.type === 'mouseenter') {
          this.eventMouseEnterHappened = true;
        }
        if (event.type === 'click' && this.eventMouseEnterHappened) return;
        var button = this.infoButtonDesktop && this.mql.matches ? this.infoButtonDesktop : this.infoButtonMobile;
        var isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        this.popoverInfo.toggleAttribute('hidden');
        var isOpen = button.getAttribute('aria-expanded') === 'true';
        button.classList.toggle('quantity-popover__info-button--open');
        if (isOpen && event.type !== 'mouseenter') {
          button.focus();
        }
      }
    }, {
      key: "closePopover",
      value: function closePopover(event) {
        event.preventDefault();
        var isChild = this.variantInfo.contains(event.relatedTarget);
        var button = this.infoButtonDesktop && this.mql.matches ? this.infoButtonDesktop : this.infoButtonMobile;
        if (!event.relatedTarget || !isChild) {
          button.setAttribute('aria-expanded', 'false');
          button.classList.remove('quantity-popover__info-button--open');
          this.popoverInfo.setAttribute('hidden', '');
        }
        this.eventMouseEnterHappened = false;
      }
    }]);
    return QuantityPopover;
  }(_CustomElement));
}
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
if (!customElements.get('product-info')) {
  customElements.define('product-info', function (_CustomElement2) {
    _inherits(ProductInfo, _CustomElement2);
    var _super = _createSuper(ProductInfo);
    function ProductInfo() {
      var _this;
      _classCallCheck(this, ProductInfo);
      _this = _super.call(this);
      _defineProperty(_assertThisInitialized(_this), "cartUpdateUnsubscriber", undefined);
      _defineProperty(_assertThisInitialized(_this), "variantChangeUnsubscriber", undefined);
      _this.input = _this.querySelector('.quantity__input');
      _this.currentVariant = _this.querySelector('.product-variant-id');
      _this.variantSelects = _this.querySelector('variant-radios');
      _this.submitButton = _this.querySelector('[type="submit"]');
      return _this;
    }
    _createClass(ProductInfo, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;
        if (!this.input) return;
        this.quantityForm = this.querySelector('.product-form__quantity');
        if (!this.quantityForm) return;
        this.setQuantityBoundries();
        if (!this.dataset.originalSection) {
          this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, this.fetchQuantityRules.bind(this));
        }
        this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          var sectionId = _this2.dataset.originalSection ? _this2.dataset.originalSection : _this2.dataset.section;
          if (event.data.sectionId !== sectionId) return;
          _this2.updateQuantityRules(event.data.sectionId, event.data.html);
          _this2.setQuantityBoundries();
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
      }
    }, {
      key: "setQuantityBoundries",
      value: function setQuantityBoundries() {
        var data = {
          cartQuantity: this.input.dataset.cartQuantity ? parseInt(this.input.dataset.cartQuantity) : 0,
          min: this.input.dataset.min ? parseInt(this.input.dataset.min) : 1,
          max: this.input.dataset.max ? parseInt(this.input.dataset.max) : null,
          step: this.input.step ? parseInt(this.input.step) : 1
        };
        var min = data.min;
        var max = data.max === null ? data.max : data.max - data.cartQuantity;
        if (max !== null) min = Math.min(min, max);
        if (data.cartQuantity >= data.min) min = Math.min(min, data.step);
        this.input.min = min;
        this.input.max = max;
        this.input.value = min;
        publish(PUB_SUB_EVENTS.quantityUpdate, undefined);
      }
    }, {
      key: "fetchQuantityRules",
      value: function fetchQuantityRules() {
        var _this3 = this;
        if (!this.currentVariant || !this.currentVariant.value) return;
        this.querySelector('.quantity__rules-cart .loading__spinner').classList.remove('hidden');
        fetch("".concat(this.dataset.url, "?variant=").concat(this.currentVariant.value, "&section_id=").concat(this.dataset.section)).then(function (response) {
          return response.text();
        }).then(function (responseText) {
          var html = new DOMParser().parseFromString(responseText, 'text/html');
          _this3.updateQuantityRules(_this3.dataset.section, html);
          _this3.setQuantityBoundries();
        })["catch"](function (e) {
          console.error(e);
        })["finally"](function () {
          _this3.querySelector('.quantity__rules-cart .loading__spinner').classList.add('hidden');
        });
      }
    }, {
      key: "updateQuantityRules",
      value: function updateQuantityRules(sectionId, html) {
        var quantityFormUpdated = html.getElementById("Quantity-Form-".concat(sectionId));
        var selectors = ['.quantity__input', '.quantity__rules', '.quantity__label'];
        for (var _i = 0, _selectors = selectors; _i < _selectors.length; _i++) {
          var selector = _selectors[_i];
          var current = this.quantityForm.querySelector(selector);
          var updated = quantityFormUpdated.querySelector(selector);
          if (!current || !updated) continue;
          if (selector === '.quantity__input') {
            var attributes = ['data-cart-quantity', 'data-min', 'data-max', 'step'];
            for (var _i2 = 0, _attributes = attributes; _i2 < _attributes.length; _i2++) {
              var attribute = _attributes[_i2];
              var valueUpdated = updated.getAttribute(attribute);
              if (valueUpdated !== null) current.setAttribute(attribute, valueUpdated);
            }
          } else {
            current.innerHTML = updated.innerHTML;
          }
        }
      }
    }]);
    return ProductInfo;
  }(_CustomElement));
}
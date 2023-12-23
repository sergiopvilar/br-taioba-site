"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
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
if (!customElements.get('price-per-item')) {
  customElements.define('price-per-item', function (_CustomElement2) {
    _inherits(PricePerItem, _CustomElement2);
    var _super = _createSuper(PricePerItem);
    function PricePerItem() {
      var _this;
      _classCallCheck(this, PricePerItem);
      _this = _super.call(this);
      _defineProperty(_assertThisInitialized(_this), "updatePricePerItemUnsubscriber", undefined);
      _defineProperty(_assertThisInitialized(_this), "variantIdChangedUnsubscriber", undefined);
      _this.variantId = _this.dataset.variantId;
      _this.input = document.getElementById("Quantity-".concat(_this.dataset.sectionId || _this.dataset.variantId));
      if (_this.input) {
        _this.input.addEventListener('change', _this.onInputChange.bind(_assertThisInitialized(_this)));
      }
      _this.getVolumePricingArray();
      return _this;
    }
    _createClass(PricePerItem, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;
        this.variantIdChangedUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          _this2.variantId = event.data.variant.id.toString();
          _this2.getVolumePricingArray();
        });
        this.updatePricePerItemUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (response) {
          if (!response.cartData) return;
          if (response.cartData['variant_id'] !== undefined) {
            if (response.productVariantId === _this2.variantId) _this2.updatePricePerItem(response.cartData.quantity);
          } else if (response.cartData.item_count !== 0) {
            var isVariant = response.cartData.items.find(function (item) {
              return item.variant_id.toString() === _this2.variantId;
            });
            if (isVariant && isVariant.id.toString() === _this2.variantId) {
              _this2.updatePricePerItem(isVariant.quantity);
            } else {
              _this2.updatePricePerItem(0);
            }
          } else {
            _this2.updatePricePerItem(0);
          }
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.updatePricePerItemUnsubscriber) {
          this.updatePricePerItemUnsubscriber();
        }
        if (this.variantIdChangedUnsubscriber) {
          this.variantIdChangedUnsubscriber();
        }
      }
    }, {
      key: "onInputChange",
      value: function onInputChange() {
        this.updatePricePerItem();
      }
    }, {
      key: "updatePricePerItem",
      value: function updatePricePerItem(updatedCartQuantity) {
        if (this.input) {
          this.enteredQty = parseInt(this.input.value);
          this.step = parseInt(this.input.step);
        }
        this.currentQtyForVolumePricing = updatedCartQuantity === undefined ? this.getCartQuantity(updatedCartQuantity) + this.enteredQty : this.getCartQuantity(updatedCartQuantity) + parseInt(this.step);
        if (this.classList.contains('variant-item__price-per-item')) {
          this.currentQtyForVolumePricing = this.getCartQuantity(updatedCartQuantity);
        }
        var _iterator = _createForOfIteratorHelper(this.qtyPricePairs),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var pair = _step.value;
            if (this.currentQtyForVolumePricing >= pair[0]) {
              var pricePerItemCurrent = document.querySelector("price-per-item[id^=\"Price-Per-Item-".concat(this.dataset.sectionId || this.dataset.variantId, "\"] .price-per-item span"));
              this.classList.contains('variant-item__price-per-item') ? pricePerItemCurrent.innerHTML = window.quickOrderListStrings.each.replace('[money]', pair[1]) : pricePerItemCurrent.innerHTML = pair[1];
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "getCartQuantity",
      value: function getCartQuantity(updatedCartQuantity) {
        return updatedCartQuantity || updatedCartQuantity === 0 ? updatedCartQuantity : parseInt(this.input.dataset.cartQuantity);
      }
    }, {
      key: "getVolumePricingArray",
      value: function getVolumePricingArray() {
        var _this3 = this;
        var volumePricing = document.getElementById("Volume-".concat(this.dataset.sectionId || this.dataset.variantId));
        this.qtyPricePairs = [];
        if (volumePricing) {
          volumePricing.querySelectorAll('li').forEach(function (li) {
            var qty = parseInt(li.querySelector('span:first-child').textContent);
            var price = li.querySelector('span:not(:first-child):last-child').dataset.text;
            _this3.qtyPricePairs.push([qty, price]);
          });
        }
        this.qtyPricePairs.reverse();
      }
    }]);
    return PricePerItem;
  }(_CustomElement));
}
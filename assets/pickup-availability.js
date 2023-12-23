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
if (!customElements.get('pickup-availability')) {
  customElements.define('pickup-availability', function (_CustomElement2) {
    _inherits(PickupAvailability, _CustomElement2);
    var _super = _createSuper(PickupAvailability);
    function PickupAvailability() {
      var _this;
      _classCallCheck(this, PickupAvailability);
      _this = _super.call(this);
      if (!_this.hasAttribute('available')) return _possibleConstructorReturn(_this);
      _this.errorHtml = _this.querySelector('template').content.firstElementChild.cloneNode(true);
      _this.onClickRefreshList = _this.onClickRefreshList.bind(_assertThisInitialized(_this));
      _this.fetchAvailability(_this.dataset.variantId);
      return _this;
    }
    _createClass(PickupAvailability, [{
      key: "fetchAvailability",
      value: function fetchAvailability(variantId) {
        var _this2 = this;
        var rootUrl = this.dataset.rootUrl;
        if (!rootUrl.endsWith('/')) {
          rootUrl = rootUrl + '/';
        }
        var variantSectionUrl = "".concat(rootUrl, "variants/").concat(variantId, "/?section_id=pickup-availability");
        fetch(variantSectionUrl).then(function (response) {
          return response.text();
        }).then(function (text) {
          var sectionInnerHTML = new DOMParser().parseFromString(text, 'text/html').querySelector('.shopify-section');
          _this2.renderPreview(sectionInnerHTML);
        })["catch"](function (e) {
          var button = _this2.querySelector('button');
          if (button) button.removeEventListener('click', _this2.onClickRefreshList);
          _this2.renderError();
        });
      }
    }, {
      key: "onClickRefreshList",
      value: function onClickRefreshList(evt) {
        this.fetchAvailability(this.dataset.variantId);
      }
    }, {
      key: "renderError",
      value: function renderError() {
        this.innerHTML = '';
        this.appendChild(this.errorHtml);
        this.querySelector('button').addEventListener('click', this.onClickRefreshList);
      }
    }, {
      key: "renderPreview",
      value: function renderPreview(sectionInnerHTML) {
        var drawer = document.querySelector('pickup-availability-drawer');
        if (drawer) drawer.remove();
        if (!sectionInnerHTML.querySelector('pickup-availability-preview')) {
          this.innerHTML = '';
          this.removeAttribute('available');
          return;
        }
        this.innerHTML = sectionInnerHTML.querySelector('pickup-availability-preview').outerHTML;
        this.setAttribute('available', '');
        document.body.appendChild(sectionInnerHTML.querySelector('pickup-availability-drawer'));
        var colorClassesToApply = this.dataset.productPageColorScheme.split(' ');
        colorClassesToApply.forEach(function (colorClass) {
          document.querySelector('pickup-availability-drawer').classList.add(colorClass);
        });
        var button = this.querySelector('button');
        if (button) button.addEventListener('click', function (evt) {
          document.querySelector('pickup-availability-drawer').show(evt.target);
        });
      }
    }]);
    return PickupAvailability;
  }(_CustomElement));
}
if (!customElements.get('pickup-availability-drawer')) {
  customElements.define('pickup-availability-drawer', function (_CustomElement3) {
    _inherits(PickupAvailabilityDrawer, _CustomElement3);
    var _super2 = _createSuper(PickupAvailabilityDrawer);
    function PickupAvailabilityDrawer() {
      var _this3;
      _classCallCheck(this, PickupAvailabilityDrawer);
      _this3 = _super2.call(this);
      _this3.onBodyClick = _this3.handleBodyClick.bind(_assertThisInitialized(_this3));
      _this3.querySelector('button').addEventListener('click', function () {
        _this3.hide();
      });
      _this3.addEventListener('keyup', function (event) {
        if (event.code.toUpperCase() === 'ESCAPE') _this3.hide();
      });
      return _this3;
    }
    _createClass(PickupAvailabilityDrawer, [{
      key: "handleBodyClick",
      value: function handleBodyClick(evt) {
        var target = evt.target;
        if (target != this && !target.closest('pickup-availability-drawer') && target.id != 'ShowPickupAvailabilityDrawer') {
          this.hide();
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this.removeAttribute('open');
        document.body.removeEventListener('click', this.onBodyClick);
        document.body.classList.remove('overflow-hidden');
        removeTrapFocus(this.focusElement);
      }
    }, {
      key: "show",
      value: function show(focusElement) {
        this.focusElement = focusElement;
        this.setAttribute('open', '');
        document.body.addEventListener('click', this.onBodyClick);
        document.body.classList.add('overflow-hidden');
        trapFocus(this);
      }
    }]);
    return PickupAvailabilityDrawer;
  }(_CustomElement));
}
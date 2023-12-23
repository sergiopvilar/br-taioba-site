"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
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
function getFocusableElements(container) {
  return Array.from(container.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"));
}
document.querySelectorAll('[id^="Details-"] summary').forEach(function (summary) {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));
  if (summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }
  summary.addEventListener('click', function (event) {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });
  if (summary.closest('header-drawer, menu-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});
var trapFocusHandlers = {};
function trapFocus(container) {
  var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];
  removeTrapFocus();
  trapFocusHandlers.focusin = function (event) {
    if (event.target !== container && event.target !== last && event.target !== first) return;
    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };
  trapFocusHandlers.focusout = function () {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };
  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') return;
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };
  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);
  elementToFocus.focus();
  if (elementToFocus.tagName === 'INPUT' && ['search', 'text', 'email', 'url'].includes(elementToFocus.type) && elementToFocus.value) {
    elementToFocus.setSelectionRange(0, elementToFocus.value.length);
  }
}
try {
  document.querySelector(':focus-visible');
} catch (e) {
  focusVisiblePolyfill();
}
function focusVisiblePolyfill() {
  var navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN'];
  var currentFocusedElement = null;
  var mouseClick = null;
  window.addEventListener('keydown', function (event) {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });
  window.addEventListener('mousedown', function (event) {
    mouseClick = true;
  });
  window.addEventListener('focus', function () {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');
    if (mouseClick) return;
    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');
  }, true);
}
function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach(function (video) {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach(function (video) {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach(function (video) {
    return video.pause();
  });
  document.querySelectorAll('product-model').forEach(function (model) {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}
function removeTrapFocus() {
  var elementToFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
  if (elementToFocus) elementToFocus.focus();
}
function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;
  var openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;
  var summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}
var QuantityInput = function (_CustomElement2) {
  _inherits(QuantityInput, _CustomElement2);
  var _super = _createSuper(QuantityInput);
  function QuantityInput() {
    var _this;
    _classCallCheck(this, QuantityInput);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "quantityUpdateUnsubscriber", undefined);
    _this.input = _this.querySelector('input');
    _this.changeEvent = new Event('change', {
      bubbles: true
    });
    _this.input.addEventListener('change', _this.onInputChange.bind(_assertThisInitialized(_this)));
    _this.querySelectorAll('button').forEach(function (button) {
      return button.addEventListener('click', _this.onButtonClick.bind(_assertThisInitialized(_this)));
    });
    return _this;
  }
  _createClass(QuantityInput, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.validateQtyRules();
      this.quantityUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.quantityUpdate, this.validateQtyRules.bind(this));
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      if (this.quantityUpdateUnsubscriber) {
        this.quantityUpdateUnsubscriber();
      }
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(event) {
      this.validateQtyRules();
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var previousValue = this.input.value;
      event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
      if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
    }
  }, {
    key: "validateQtyRules",
    value: function validateQtyRules() {
      var value = parseInt(this.input.value);
      if (this.input.min) {
        var min = parseInt(this.input.min);
        var buttonMinus = this.querySelector(".quantity__button[name='minus']");
        buttonMinus.classList.toggle('disabled', value <= min);
      }
      if (this.input.max) {
        var max = parseInt(this.input.max);
        var buttonPlus = this.querySelector(".quantity__button[name='plus']");
        buttonPlus.classList.toggle('disabled', value >= max);
      }
    }
  }]);
  return QuantityInput;
}(_CustomElement);
customElements.define('quantity-input', QuantityInput);
function debounce(fn, wait) {
  var _this2 = this;
  var t;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(t);
    t = setTimeout(function () {
      return fn.apply(_this2, args);
    }, wait);
  };
}
function throttle(fn, delay) {
  var lastCall = 0;
  return function () {
    var now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn.apply(void 0, arguments);
  };
}
function fetchConfig() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/".concat(type)
    }
  };
}
if (typeof window.Shopify == 'undefined') {
  window.Shopify = {};
}
Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};
Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};
Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on' + eventName, callback);
};
Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};
  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);
  for (var key in params) {
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);
  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));
  this.initCountry();
  this.initProvince();
};
Shopify.CountryProvinceSelector.prototype = {
  initCountry: function initCountry() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },
  initProvince: function initProvince() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },
  countryHandler: function countryHandler(e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);
    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }
      this.provinceContainer.style.display = '';
    }
  },
  clearOptions: function clearOptions(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },
  setOptions: function setOptions(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};
var MenuDrawer = function (_CustomElement3) {
  _inherits(MenuDrawer, _CustomElement3);
  var _super2 = _createSuper(MenuDrawer);
  function MenuDrawer() {
    var _this3;
    _classCallCheck(this, MenuDrawer);
    _this3 = _super2.call(this);
    _this3.mainDetailsToggle = _this3.querySelector('details');
    _this3.addEventListener('keyup', _this3.onKeyUp.bind(_assertThisInitialized(_this3)));
    _this3.addEventListener('focusout', _this3.onFocusOut.bind(_assertThisInitialized(_this3)));
    _this3.bindEvents();
    return _this3;
  }
  _createClass(MenuDrawer, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this4 = this;
      this.querySelectorAll('summary').forEach(function (summary) {
        return summary.addEventListener('click', _this4.onSummaryClick.bind(_this4));
      });
      this.querySelectorAll('button:not(.localization-selector)').forEach(function (button) {
        return button.addEventListener('click', _this4.onCloseButtonClick.bind(_this4));
      });
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;
      var openDetailsElement = event.target.closest('details[open]');
      if (!openDetailsElement) return;
      openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
    }
  }, {
    key: "onSummaryClick",
    value: function onSummaryClick(event) {
      var summaryElement = event.currentTarget;
      var detailsElement = summaryElement.parentNode;
      var parentMenuElement = detailsElement.closest('.has-submenu');
      var isOpen = detailsElement.hasAttribute('open');
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      function addTrapFocus() {
        trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
        summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
      }
      if (detailsElement === this.mainDetailsToggle) {
        if (isOpen) event.preventDefault();
        isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
        if (window.matchMedia('(max-width: 990px)')) {
          document.documentElement.style.setProperty('--viewport-height', "".concat(window.innerHeight, "px"));
        }
      } else {
        setTimeout(function () {
          detailsElement.classList.add('menu-opening');
          summaryElement.setAttribute('aria-expanded', true);
          parentMenuElement && parentMenuElement.classList.add('submenu-open');
          !reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
        }, 100);
      }
    }
  }, {
    key: "openMenuDrawer",
    value: function openMenuDrawer(summaryElement) {
      var _this5 = this;
      setTimeout(function () {
        _this5.mainDetailsToggle.classList.add('menu-opening');
      });
      summaryElement.setAttribute('aria-expanded', true);
      trapFocus(this.mainDetailsToggle, summaryElement);
      document.body.classList.add("overflow-hidden-".concat(this.dataset.breakpoint));
    }
  }, {
    key: "closeMenuDrawer",
    value: function closeMenuDrawer(event) {
      var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (event === undefined) return;
      this.mainDetailsToggle.classList.remove('menu-opening');
      this.mainDetailsToggle.querySelectorAll('details').forEach(function (details) {
        details.removeAttribute('open');
        details.classList.remove('menu-opening');
      });
      this.mainDetailsToggle.querySelectorAll('.submenu-open').forEach(function (submenu) {
        submenu.classList.remove('submenu-open');
      });
      document.body.classList.remove("overflow-hidden-".concat(this.dataset.breakpoint));
      removeTrapFocus(elementToFocus);
      this.closeAnimation(this.mainDetailsToggle);
      if (event instanceof KeyboardEvent) elementToFocus === null || elementToFocus === void 0 || elementToFocus.setAttribute('aria-expanded', false);
    }
  }, {
    key: "onFocusOut",
    value: function onFocusOut() {
      var _this6 = this;
      setTimeout(function () {
        if (_this6.mainDetailsToggle.hasAttribute('open') && !_this6.mainDetailsToggle.contains(document.activeElement)) _this6.closeMenuDrawer();
      });
    }
  }, {
    key: "onCloseButtonClick",
    value: function onCloseButtonClick(event) {
      var detailsElement = event.currentTarget.closest('details');
      this.closeSubmenu(detailsElement);
    }
  }, {
    key: "closeSubmenu",
    value: function closeSubmenu(detailsElement) {
      var parentMenuElement = detailsElement.closest('.submenu-open');
      parentMenuElement && parentMenuElement.classList.remove('submenu-open');
      detailsElement.classList.remove('menu-opening');
      detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
      removeTrapFocus(detailsElement.querySelector('summary'));
      this.closeAnimation(detailsElement);
    }
  }, {
    key: "closeAnimation",
    value: function closeAnimation(detailsElement) {
      var animationStart;
      var handleAnimation = function handleAnimation(time) {
        if (animationStart === undefined) {
          animationStart = time;
        }
        var elapsedTime = time - animationStart;
        if (elapsedTime < 400) {
          window.requestAnimationFrame(handleAnimation);
        } else {
          detailsElement.removeAttribute('open');
          if (detailsElement.closest('details[open]')) {
            trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
          }
        }
      };
      window.requestAnimationFrame(handleAnimation);
    }
  }]);
  return MenuDrawer;
}(_CustomElement);
customElements.define('menu-drawer', MenuDrawer);
var HeaderDrawer = function (_MenuDrawer) {
  _inherits(HeaderDrawer, _MenuDrawer);
  var _super3 = _createSuper(HeaderDrawer);
  function HeaderDrawer() {
    var _this7;
    _classCallCheck(this, HeaderDrawer);
    _this7 = _super3.call(this);
    _defineProperty(_assertThisInitialized(_this7), "onResize", function () {
      _this7.header && document.documentElement.style.setProperty('--header-bottom-position', "".concat(parseInt(_this7.header.getBoundingClientRect().bottom - _this7.borderOffset), "px"));
      document.documentElement.style.setProperty('--viewport-height', "".concat(window.innerHeight, "px"));
    });
    return _this7;
  }
  _createClass(HeaderDrawer, [{
    key: "openMenuDrawer",
    value: function openMenuDrawer(summaryElement) {
      var _this8 = this;
      this.header = this.header || document.querySelector('.section-header');
      this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
      document.documentElement.style.setProperty('--header-bottom-position', "".concat(parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset), "px"));
      this.header.classList.add('menu-open');
      setTimeout(function () {
        _this8.mainDetailsToggle.classList.add('menu-opening');
      });
      summaryElement.setAttribute('aria-expanded', true);
      window.addEventListener('resize', this.onResize);
      trapFocus(this.mainDetailsToggle, summaryElement);
      document.body.classList.add("overflow-hidden-".concat(this.dataset.breakpoint));
    }
  }, {
    key: "closeMenuDrawer",
    value: function closeMenuDrawer(event, elementToFocus) {
      if (!elementToFocus) return;
      _get(_getPrototypeOf(HeaderDrawer.prototype), "closeMenuDrawer", this).call(this, event, elementToFocus);
      this.header.classList.remove('menu-open');
      window.removeEventListener('resize', this.onResize);
    }
  }]);
  return HeaderDrawer;
}(MenuDrawer);
customElements.define('header-drawer', HeaderDrawer);
var ModalDialog = function (_CustomElement4) {
  _inherits(ModalDialog, _CustomElement4);
  var _super4 = _createSuper(ModalDialog);
  function ModalDialog() {
    var _this9;
    _classCallCheck(this, ModalDialog);
    _this9 = _super4.call(this);
    _this9.querySelector('[id^="ModalClose-"]').addEventListener('click', _this9.hide.bind(_assertThisInitialized(_this9), false));
    _this9.addEventListener('keyup', function (event) {
      if (event.code.toUpperCase() === 'ESCAPE') _this9.hide();
    });
    if (_this9.classList.contains('media-modal')) {
      _this9.addEventListener('pointerup', function (event) {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) _this9.hide();
      });
    } else {
      _this9.addEventListener('click', function (event) {
        if (event.target === _assertThisInitialized(_this9)) _this9.hide();
      });
    }
    return _this9;
  }
  _createClass(ModalDialog, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.moved) return;
      this.moved = true;
      document.body.appendChild(this);
    }
  }, {
    key: "show",
    value: function show(opener) {
      this.openedBy = opener;
      var popup = this.querySelector('.template-popup');
      document.body.classList.add('overflow-hidden');
      this.setAttribute('open', '');
      if (popup) popup.loadContent();
      trapFocus(this, this.querySelector('[role="dialog"]'));
      window.pauseAllMedia();
    }
  }, {
    key: "hide",
    value: function hide() {
      document.body.classList.remove('overflow-hidden');
      document.body.dispatchEvent(new CustomEvent('modalClosed'));
      this.removeAttribute('open');
      removeTrapFocus(this.openedBy);
      window.pauseAllMedia();
    }
  }]);
  return ModalDialog;
}(_CustomElement);
customElements.define('modal-dialog', ModalDialog);
var ModalOpener = function (_CustomElement5) {
  _inherits(ModalOpener, _CustomElement5);
  var _super5 = _createSuper(ModalOpener);
  function ModalOpener() {
    var _this10;
    _classCallCheck(this, ModalOpener);
    _this10 = _super5.call(this);
    var button = _this10.querySelector('button');
    if (!button) return _possibleConstructorReturn(_this10);
    button.addEventListener('click', function () {
      var modal = document.querySelector(_this10.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
    return _this10;
  }
  return _createClass(ModalOpener);
}(_CustomElement);
customElements.define('modal-opener', ModalOpener);
var DeferredMedia = function (_CustomElement6) {
  _inherits(DeferredMedia, _CustomElement6);
  var _super6 = _createSuper(DeferredMedia);
  function DeferredMedia() {
    var _this11;
    _classCallCheck(this, DeferredMedia);
    _this11 = _super6.call(this);
    var poster = _this11.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return _possibleConstructorReturn(_this11);
    poster.addEventListener('click', _this11.loadContent.bind(_assertThisInitialized(_this11)));
    return _this11;
  }
  _createClass(DeferredMedia, [{
    key: "loadContent",
    value: function loadContent() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      window.pauseAllMedia();
      if (!this.getAttribute('loaded')) {
        var content = document.createElement('div');
        content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));
        this.setAttribute('loaded', true);
        var deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
        if (focus) deferredElement.focus();
        if (deferredElement.nodeName == 'VIDEO' && deferredElement.getAttribute('autoplay')) {
          deferredElement.play();
        }
      }
    }
  }]);
  return DeferredMedia;
}(_CustomElement);
customElements.define('deferred-media', DeferredMedia);
var SliderComponent = function (_CustomElement7) {
  _inherits(SliderComponent, _CustomElement7);
  var _super7 = _createSuper(SliderComponent);
  function SliderComponent() {
    var _this12;
    _classCallCheck(this, SliderComponent);
    _this12 = _super7.call(this);
    _this12.slider = _this12.querySelector('[id^="Slider-"]');
    _this12.sliderItems = _this12.querySelectorAll('[id^="Slide-"]');
    _this12.enableSliderLooping = false;
    _this12.currentPageElement = _this12.querySelector('.slider-counter--current');
    _this12.pageTotalElement = _this12.querySelector('.slider-counter--total');
    _this12.prevButton = _this12.querySelector('button[name="previous"]');
    _this12.nextButton = _this12.querySelector('button[name="next"]');
    if (!_this12.slider || !_this12.nextButton) return _possibleConstructorReturn(_this12);
    _this12.initPages();
    var resizeObserver = new ResizeObserver(function (entries) {
      return _this12.initPages();
    });
    resizeObserver.observe(_this12.slider);
    _this12.slider.addEventListener('scroll', _this12.update.bind(_assertThisInitialized(_this12)));
    _this12.prevButton.addEventListener('click', _this12.onButtonClick.bind(_assertThisInitialized(_this12)));
    _this12.nextButton.addEventListener('click', _this12.onButtonClick.bind(_assertThisInitialized(_this12)));
    return _this12;
  }
  _createClass(SliderComponent, [{
    key: "initPages",
    value: function initPages() {
      this.sliderItemsToShow = Array.from(this.sliderItems).filter(function (element) {
        return element.clientWidth > 0;
      });
      if (this.sliderItemsToShow.length < 2) return;
      this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
      this.slidesPerPage = Math.floor((this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset);
      this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
      this.update();
    }
  }, {
    key: "resetPages",
    value: function resetPages() {
      this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
      this.initPages();
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.slider || !this.nextButton) return;
      var previousPage = this.currentPage;
      this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;
      if (this.currentPageElement && this.pageTotalElement) {
        this.currentPageElement.textContent = this.currentPage;
        this.pageTotalElement.textContent = this.totalPages;
      }
      if (this.currentPage != previousPage) {
        this.dispatchEvent(new CustomEvent('slideChanged', {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1]
          }
        }));
      }
      if (this.enableSliderLooping) return;
      if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
        this.prevButton.setAttribute('disabled', 'disabled');
      } else {
        this.prevButton.removeAttribute('disabled');
      }
      if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
        this.nextButton.setAttribute('disabled', 'disabled');
      } else {
        this.nextButton.removeAttribute('disabled');
      }
    }
  }, {
    key: "isSlideVisible",
    value: function isSlideVisible(element) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
      return element.offsetLeft + element.clientWidth <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var step = event.currentTarget.dataset.step || 1;
      this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + step * this.sliderItemOffset : this.slider.scrollLeft - step * this.sliderItemOffset;
      this.setSlidePosition(this.slideScrollPosition);
    }
  }, {
    key: "setSlidePosition",
    value: function setSlidePosition(position) {
      this.slider.scrollTo({
        left: position
      });
    }
  }]);
  return SliderComponent;
}(_CustomElement);
customElements.define('slider-component', SliderComponent);
var SlideshowComponent = function (_SliderComponent) {
  _inherits(SlideshowComponent, _SliderComponent);
  var _super8 = _createSuper(SlideshowComponent);
  function SlideshowComponent() {
    var _this13;
    _classCallCheck(this, SlideshowComponent);
    _this13 = _super8.call(this);
    _this13.sliderControlWrapper = _this13.querySelector('.slider-buttons');
    _this13.enableSliderLooping = true;
    if (!_this13.sliderControlWrapper) return _possibleConstructorReturn(_this13);
    _this13.sliderFirstItemNode = _this13.slider.querySelector('.slideshow__slide');
    if (_this13.sliderItemsToShow.length > 0) _this13.currentPage = 1;
    _this13.announcementBarSlider = _this13.querySelector('.announcement-bar-slider');
    _this13.announcerBarAnimationDelay = _this13.announcementBarSlider ? 250 : 0;
    _this13.sliderControlLinksArray = Array.from(_this13.sliderControlWrapper.querySelectorAll('.slider-counter__link'));
    _this13.sliderControlLinksArray.forEach(function (link) {
      return link.addEventListener('click', _this13.linkToSlide.bind(_assertThisInitialized(_this13)));
    });
    _this13.slider.addEventListener('scroll', _this13.setSlideVisibility.bind(_assertThisInitialized(_this13)));
    _this13.setSlideVisibility();
    if (_this13.announcementBarSlider) {
      _this13.announcementBarArrowButtonWasClicked = false;
      _this13.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      _this13.reducedMotion.addEventListener('change', function () {
        if (_this13.slider.getAttribute('data-autoplay') === 'true') _this13.setAutoPlay();
      });
      [_this13.prevButton, _this13.nextButton].forEach(function (button) {
        button.addEventListener('click', function () {
          _this13.announcementBarArrowButtonWasClicked = true;
        }, {
          once: true
        });
      });
    }
    if (_this13.slider.getAttribute('data-autoplay') === 'true') _this13.setAutoPlay();
    return _this13;
  }
  _createClass(SlideshowComponent, [{
    key: "setAutoPlay",
    value: function setAutoPlay() {
      this.autoplaySpeed = this.slider.dataset.speed * 1000;
      this.addEventListener('mouseover', this.focusInHandling.bind(this));
      this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
      this.addEventListener('focusin', this.focusInHandling.bind(this));
      this.addEventListener('focusout', this.focusOutHandling.bind(this));
      if (this.querySelector('.slideshow__autoplay')) {
        this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
        this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
        this.autoplayButtonIsSetToPlay = true;
        this.play();
      } else {
        this.reducedMotion.matches || this.announcementBarArrowButtonWasClicked ? this.pause() : this.play();
      }
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      _get(_getPrototypeOf(SlideshowComponent.prototype), "onButtonClick", this).call(this, event);
      this.wasClicked = true;
      var isFirstSlide = this.currentPage === 1;
      var isLastSlide = this.currentPage === this.sliderItemsToShow.length;
      if (!isFirstSlide && !isLastSlide) {
        this.applyAnimationToAnnouncementBar(event.currentTarget.name);
        return;
      }
      if (isFirstSlide && event.currentTarget.name === 'previous') {
        this.slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
      } else if (isLastSlide && event.currentTarget.name === 'next') {
        this.slideScrollPosition = 0;
      }
      this.setSlidePosition(this.slideScrollPosition);
      this.applyAnimationToAnnouncementBar(event.currentTarget.name);
    }
  }, {
    key: "setSlidePosition",
    value: function setSlidePosition(position) {
      var _this14 = this;
      if (this.setPositionTimeout) clearTimeout(this.setPositionTimeout);
      this.setPositionTimeout = setTimeout(function () {
        _this14.slider.scrollTo({
          left: position
        });
      }, this.announcerBarAnimationDelay);
    }
  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(SlideshowComponent.prototype), "update", this).call(this);
      this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
      this.prevButton.removeAttribute('disabled');
      if (!this.sliderControlButtons.length) return;
      this.sliderControlButtons.forEach(function (link) {
        link.classList.remove('slider-counter__link--active');
        link.removeAttribute('aria-current');
      });
      this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
      this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
    }
  }, {
    key: "autoPlayToggle",
    value: function autoPlayToggle() {
      this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
      this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
      this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
    }
  }, {
    key: "focusOutHandling",
    value: function focusOutHandling(event) {
      if (this.sliderAutoplayButton) {
        var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
        if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
        this.play();
      } else if (!this.reducedMotion.matches && !this.announcementBarArrowButtonWasClicked) {
        this.play();
      }
    }
  }, {
    key: "focusInHandling",
    value: function focusInHandling(event) {
      if (this.sliderAutoplayButton) {
        var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
        if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
          this.play();
        } else if (this.autoplayButtonIsSetToPlay) {
          this.pause();
        }
      } else if (this.announcementBarSlider.contains(event.target)) {
        this.pause();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.slider.setAttribute('aria-live', 'off');
      clearInterval(this.autoplay);
      this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.slider.setAttribute('aria-live', 'polite');
      clearInterval(this.autoplay);
    }
  }, {
    key: "togglePlayButtonState",
    value: function togglePlayButtonState(pauseAutoplay) {
      if (pauseAutoplay) {
        this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
      } else {
        this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
      }
    }
  }, {
    key: "autoRotateSlides",
    value: function autoRotateSlides() {
      var slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.sliderItemOffset;
      this.setSlidePosition(slideScrollPosition);
      this.applyAnimationToAnnouncementBar();
    }
  }, {
    key: "setSlideVisibility",
    value: function setSlideVisibility(event) {
      var _this15 = this;
      this.sliderItemsToShow.forEach(function (item, index) {
        var linkElements = item.querySelectorAll('a');
        if (index === _this15.currentPage - 1) {
          if (linkElements.length) linkElements.forEach(function (button) {
            button.removeAttribute('tabindex');
          });
          item.setAttribute('aria-hidden', 'false');
          item.removeAttribute('tabindex');
        } else {
          if (linkElements.length) linkElements.forEach(function (button) {
            button.setAttribute('tabindex', '-1');
          });
          item.setAttribute('aria-hidden', 'true');
          item.setAttribute('tabindex', '-1');
        }
      });
      this.wasClicked = false;
    }
  }, {
    key: "applyAnimationToAnnouncementBar",
    value: function applyAnimationToAnnouncementBar() {
      var button = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';
      if (!this.announcementBarSlider) return;
      var itemsCount = this.sliderItems.length;
      var increment = button === 'next' ? 1 : -1;
      var currentIndex = this.currentPage - 1;
      var nextIndex = (currentIndex + increment) % itemsCount;
      nextIndex = nextIndex === -1 ? itemsCount - 1 : nextIndex;
      var nextSlide = this.sliderItems[nextIndex];
      var currentSlide = this.sliderItems[currentIndex];
      var animationClassIn = 'announcement-bar-slider--fade-in';
      var animationClassOut = 'announcement-bar-slider--fade-out';
      var isFirstSlide = currentIndex === 0;
      var isLastSlide = currentIndex === itemsCount - 1;
      var shouldMoveNext = button === 'next' && !isLastSlide || button === 'previous' && isFirstSlide;
      var direction = shouldMoveNext ? 'next' : 'previous';
      currentSlide.classList.add("".concat(animationClassOut, "-").concat(direction));
      nextSlide.classList.add("".concat(animationClassIn, "-").concat(direction));
      setTimeout(function () {
        currentSlide.classList.remove("".concat(animationClassOut, "-").concat(direction));
        nextSlide.classList.remove("".concat(animationClassIn, "-").concat(direction));
      }, this.announcerBarAnimationDelay * 2);
    }
  }, {
    key: "linkToSlide",
    value: function linkToSlide(event) {
      event.preventDefault();
      var slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }]);
  return SlideshowComponent;
}(SliderComponent);
customElements.define('slideshow-component', SlideshowComponent);
var VariantSelects = function (_CustomElement8) {
  _inherits(VariantSelects, _CustomElement8);
  var _super9 = _createSuper(VariantSelects);
  function VariantSelects() {
    var _this16;
    _classCallCheck(this, VariantSelects);
    _this16 = _super9.call(this);
    _this16.addEventListener('change', _this16.onVariantChange);
    return _this16;
  }
  _createClass(VariantSelects, [{
    key: "onVariantChange",
    value: function onVariantChange() {
      this.updateOptions();
      this.updateMasterId();
      this.toggleAddButton(true, '', false);
      this.updatePickupAvailability();
      this.removeErrorMessage();
      this.updateVariantStatuses();
      if (!this.currentVariant) {
        this.toggleAddButton(true, '', true);
        this.setUnavailable();
      } else {
        this.updateMedia();
        this.updateURL();
        this.updateVariantInput();
        this.renderProductInfo();
        this.updateShareUrl();
      }
    }
  }, {
    key: "updateOptions",
    value: function updateOptions() {
      this.options = Array.from(this.querySelectorAll('select'), function (select) {
        return select.value;
      });
    }
  }, {
    key: "updateMasterId",
    value: function updateMasterId() {
      var _this17 = this;
      this.currentVariant = this.getVariantData().find(function (variant) {
        return !variant.options.map(function (option, index) {
          return _this17.options[index] === option;
        }).includes(false);
      });
    }
  }, {
    key: "updateMedia",
    value: function updateMedia() {
      var _this18 = this;
      if (!this.currentVariant) return;
      if (!this.currentVariant.featured_media) return;
      var mediaGalleries = document.querySelectorAll("[id^=\"MediaGallery-".concat(this.dataset.section, "\"]"));
      mediaGalleries.forEach(function (mediaGallery) {
        return mediaGallery.setActiveMedia("".concat(_this18.dataset.section, "-").concat(_this18.currentVariant.featured_media.id), true);
      });
      var modalContent = document.querySelector("#ProductModal-".concat(this.dataset.section, " .product-media-modal__content"));
      if (!modalContent) return;
      var newMediaModal = modalContent.querySelector("[data-media-id=\"".concat(this.currentVariant.featured_media.id, "\"]"));
      modalContent.prepend(newMediaModal);
    }
  }, {
    key: "updateURL",
    value: function updateURL() {
      if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
      window.history.replaceState({}, '', "".concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updateShareUrl",
    value: function updateShareUrl() {
      var shareButton = document.getElementById("Share-".concat(this.dataset.section));
      if (!shareButton || !shareButton.updateUrl) return;
      shareButton.updateUrl("".concat(window.shopUrl).concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updateVariantInput",
    value: function updateVariantInput() {
      var _this19 = this;
      var productForms = document.querySelectorAll("#product-form-".concat(this.dataset.section, ", #product-form-installment-").concat(this.dataset.section));
      productForms.forEach(function (productForm) {
        var input = productForm.querySelector('input[name="id"]');
        input.value = _this19.currentVariant.id;
        input.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      });
    }
  }, {
    key: "updateVariantStatuses",
    value: function updateVariantStatuses() {
      var _this20 = this;
      var selectedOptionOneVariants = this.variantData.filter(function (variant) {
        return _this20.querySelector(':checked').value === variant.option1;
      });
      var inputWrappers = _toConsumableArray(this.querySelectorAll('.product-form__input'));
      inputWrappers.forEach(function (option, index) {
        if (index === 0) return;
        var optionInputs = _toConsumableArray(option.querySelectorAll('input[type="radio"], option'));
        var previousOptionSelected = inputWrappers[index - 1].querySelector(':checked').value;
        var availableOptionInputsValue = selectedOptionOneVariants.filter(function (variant) {
          return variant.available && variant["option".concat(index)] === previousOptionSelected;
        }).map(function (variantOption) {
          return variantOption["option".concat(index + 1)];
        });
        _this20.setInputAvailability(optionInputs, availableOptionInputsValue);
      });
    }
  }, {
    key: "setInputAvailability",
    value: function setInputAvailability(listOfOptions, listOfAvailableOptions) {
      listOfOptions.forEach(function (input) {
        if (listOfAvailableOptions.includes(input.getAttribute('value'))) {
          input.innerText = input.getAttribute('value');
        } else {
          input.innerText = window.variantStrings.unavailable_with_option.replace('[value]', input.getAttribute('value'));
        }
      });
    }
  }, {
    key: "updatePickupAvailability",
    value: function updatePickupAvailability() {
      var pickUpAvailability = document.querySelector('pickup-availability');
      if (!pickUpAvailability) return;
      if (this.currentVariant && this.currentVariant.available) {
        pickUpAvailability.fetchAvailability(this.currentVariant.id);
      } else {
        pickUpAvailability.removeAttribute('available');
        pickUpAvailability.innerHTML = '';
      }
    }
  }, {
    key: "removeErrorMessage",
    value: function removeErrorMessage() {
      var section = this.closest('section');
      if (!section) return;
      var productForm = section.querySelector('product-form');
      if (productForm) productForm.handleErrorMessage();
    }
  }, {
    key: "renderProductInfo",
    value: function renderProductInfo() {
      var _this21 = this;
      var requestedVariantId = this.currentVariant.id;
      var sectionId = this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section;
      fetch("".concat(this.dataset.url, "?variant=").concat(requestedVariantId, "&section_id=").concat(this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section)).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        if (_this21.currentVariant.id !== requestedVariantId) return;
        var html = new DOMParser().parseFromString(responseText, 'text/html');
        var destination = document.getElementById("price-".concat(_this21.dataset.section));
        var source = html.getElementById("price-".concat(_this21.dataset.originalSection ? _this21.dataset.originalSection : _this21.dataset.section));
        var skuSource = html.getElementById("Sku-".concat(_this21.dataset.originalSection ? _this21.dataset.originalSection : _this21.dataset.section));
        var skuDestination = document.getElementById("Sku-".concat(_this21.dataset.section));
        var inventorySource = html.getElementById("Inventory-".concat(_this21.dataset.originalSection ? _this21.dataset.originalSection : _this21.dataset.section));
        var inventoryDestination = document.getElementById("Inventory-".concat(_this21.dataset.section));
        var volumePricingSource = html.getElementById("Volume-".concat(_this21.dataset.originalSection ? _this21.dataset.originalSection : _this21.dataset.section));
        var pricePerItemDestination = document.getElementById("Price-Per-Item-".concat(_this21.dataset.section));
        var pricePerItemSource = html.getElementById("Price-Per-Item-".concat(_this21.dataset.originalSection ? _this21.dataset.originalSection : _this21.dataset.section));
        var volumePricingDestination = document.getElementById("Volume-".concat(_this21.dataset.section));
        var qtyRules = document.getElementById("Quantity-Rules-".concat(_this21.dataset.section));
        var volumeNote = document.getElementById("Volume-Note-".concat(_this21.dataset.section));
        if (volumeNote) volumeNote.classList.remove('hidden');
        if (volumePricingDestination) volumePricingDestination.classList.remove('hidden');
        if (qtyRules) qtyRules.classList.remove('hidden');
        if (source && destination) destination.innerHTML = source.innerHTML;
        if (inventorySource && inventoryDestination) inventoryDestination.innerHTML = inventorySource.innerHTML;
        if (skuSource && skuDestination) {
          skuDestination.innerHTML = skuSource.innerHTML;
          skuDestination.classList.toggle('hidden', skuSource.classList.contains('hidden'));
        }
        if (volumePricingSource && volumePricingDestination) {
          volumePricingDestination.innerHTML = volumePricingSource.innerHTML;
        }
        if (pricePerItemSource && pricePerItemDestination) {
          pricePerItemDestination.innerHTML = pricePerItemSource.innerHTML;
          pricePerItemDestination.classList.toggle('hidden', pricePerItemSource.classList.contains('hidden'));
        }
        var price = document.getElementById("price-".concat(_this21.dataset.section));
        if (price) price.classList.remove('hidden');
        if (inventoryDestination) inventoryDestination.classList.toggle('hidden', inventorySource.innerText === '');
        var addButtonUpdated = html.getElementById("ProductSubmitButton-".concat(sectionId));
        _this21.toggleAddButton(addButtonUpdated ? addButtonUpdated.hasAttribute('disabled') : true, window.variantStrings.soldOut);
        publish(PUB_SUB_EVENTS.variantChange, {
          data: {
            sectionId: sectionId,
            html: html,
            variant: _this21.currentVariant
          }
        });
      });
    }
  }, {
    key: "toggleAddButton",
    value: function toggleAddButton() {
      var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var text = arguments.length > 1 ? arguments[1] : undefined;
      var modifyClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var productForm = document.getElementById("product-form-".concat(this.dataset.section));
      if (!productForm) return;
      var addButton = productForm.querySelector('[name="add"]');
      var addButtonText = productForm.querySelector('[name="add"] > span');
      if (!addButton) return;
      if (disable) {
        addButton.setAttribute('disabled', 'disabled');
        if (text) addButtonText.textContent = text;
      } else {
        addButton.removeAttribute('disabled');
        addButtonText.textContent = window.variantStrings.addToCart;
      }
      if (!modifyClass) return;
    }
  }, {
    key: "setUnavailable",
    value: function setUnavailable() {
      var button = document.getElementById("product-form-".concat(this.dataset.section));
      var addButton = button.querySelector('[name="add"]');
      var addButtonText = button.querySelector('[name="add"] > span');
      var price = document.getElementById("price-".concat(this.dataset.section));
      var inventory = document.getElementById("Inventory-".concat(this.dataset.section));
      var sku = document.getElementById("Sku-".concat(this.dataset.section));
      var pricePerItem = document.getElementById("Price-Per-Item-".concat(this.dataset.section));
      var volumeNote = document.getElementById("Volume-Note-".concat(this.dataset.section));
      var volumeTable = document.getElementById("Volume-".concat(this.dataset.section));
      var qtyRules = document.getElementById("Quantity-Rules-".concat(this.dataset.section));
      if (!addButton) return;
      addButtonText.textContent = window.variantStrings.unavailable;
      if (price) price.classList.add('hidden');
      if (inventory) inventory.classList.add('hidden');
      if (sku) sku.classList.add('hidden');
      if (pricePerItem) pricePerItem.classList.add('hidden');
      if (volumeNote) volumeNote.classList.add('hidden');
      if (volumeTable) volumeTable.classList.add('hidden');
      if (qtyRules) qtyRules.classList.add('hidden');
    }
  }, {
    key: "getVariantData",
    value: function getVariantData() {
      this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }
  }]);
  return VariantSelects;
}(_CustomElement);
customElements.define('variant-selects', VariantSelects);
var VariantRadios = function (_VariantSelects) {
  _inherits(VariantRadios, _VariantSelects);
  var _super10 = _createSuper(VariantRadios);
  function VariantRadios() {
    _classCallCheck(this, VariantRadios);
    return _super10.call(this);
  }
  _createClass(VariantRadios, [{
    key: "setInputAvailability",
    value: function setInputAvailability(listOfOptions, listOfAvailableOptions) {
      listOfOptions.forEach(function (input) {
        if (listOfAvailableOptions.includes(input.getAttribute('value'))) {
          input.classList.remove('disabled');
        } else {
          input.classList.add('disabled');
        }
      });
    }
  }, {
    key: "updateOptions",
    value: function updateOptions() {
      var fieldsets = Array.from(this.querySelectorAll('fieldset'));
      this.options = fieldsets.map(function (fieldset) {
        return Array.from(fieldset.querySelectorAll('input')).find(function (radio) {
          return radio.checked;
        }).value;
      });
    }
  }]);
  return VariantRadios;
}(VariantSelects);
customElements.define('variant-radios', VariantRadios);
var ProductRecommendations = function (_CustomElement9) {
  _inherits(ProductRecommendations, _CustomElement9);
  var _super11 = _createSuper(ProductRecommendations);
  function ProductRecommendations() {
    _classCallCheck(this, ProductRecommendations);
    return _super11.call(this);
  }
  _createClass(ProductRecommendations, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this22 = this;
      var handleIntersection = function handleIntersection(entries, observer) {
        if (!entries[0].isIntersecting) return;
        observer.unobserve(_this22);
        fetch(_this22.dataset.url).then(function (response) {
          return response.text();
        }).then(function (text) {
          var html = document.createElement('div');
          html.innerHTML = text;
          var recommendations = html.querySelector('product-recommendations');
          if (recommendations && recommendations.innerHTML.trim().length) {
            _this22.innerHTML = recommendations.innerHTML;
          }
          if (!_this22.querySelector('slideshow-component') && _this22.classList.contains('complementary-products')) {
            _this22.remove();
          }
          if (html.querySelector('.grid__item')) {
            _this22.classList.add('product-recommendations--loaded');
          }
        })["catch"](function (e) {
          console.error(e);
        });
      };
      new IntersectionObserver(handleIntersection.bind(this), {
        rootMargin: '0px 0px 400px 0px'
      }).observe(this);
    }
  }]);
  return ProductRecommendations;
}(_CustomElement);
customElements.define('product-recommendations', ProductRecommendations);
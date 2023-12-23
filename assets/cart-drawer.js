'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartDrawer = function (_HTMLElement) {
  _inherits(CartDrawer, _HTMLElement);

  function CartDrawer() {
    _classCallCheck(this, CartDrawer);

    var _this = _possibleConstructorReturn(this, (CartDrawer.__proto__ || Object.getPrototypeOf(CartDrawer)).call(this));

    _this.addEventListener('keyup', function (evt) {
      return evt.code === 'Escape' && _this.close();
    });
    _this.querySelector('#CartDrawer-Overlay').addEventListener('click', _this.close.bind(_this));
    _this.setHeaderCartIconAccessibility();
    return _this;
  }

  _createClass(CartDrawer, [{
    key: 'setHeaderCartIconAccessibility',
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
    key: 'open',
    value: function open(triggeredBy) {
      var _this3 = this;

      if (triggeredBy) this.setActiveElement(triggeredBy);
      var cartDrawerNote = this.querySelector('[id^="Details-"] summary');
      if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
      // here the animation doesn't seem to always get triggered. A timeout seem to help
      setTimeout(function () {
        _this3.classList.add('animate', 'active');
      });

      this.addEventListener('transitionend', function () {
        var containerToTrapFocusOn = _this3.classList.contains('is-empty') ? _this3.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
        var focusElement = _this3.querySelector('.drawer__inner') || _this3.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      }, { once: true });

      document.body.classList.add('overflow-hidden');
    }
  }, {
    key: 'close',
    value: function close() {
      this.classList.remove('active');
      removeTrapFocus(this.activeElement);
      document.body.classList.remove('overflow-hidden');
    }
  }, {
    key: 'setSummaryAccessibility',
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
    key: 'renderContents',
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
    key: 'getSectionInnerHTML',
    value: function getSectionInnerHTML(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';

      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: 'getSectionsToRender',
    value: function getSectionsToRender() {
      return [{
        id: 'cart-drawer',
        selector: '#CartDrawer'
      }, {
        id: 'cart-icon-bubble'
      }];
    }
  }, {
    key: 'getSectionDOM',
    value: function getSectionDOM(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';

      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
    }
  }, {
    key: 'setActiveElement',
    value: function setActiveElement(element) {
      this.activeElement = element;
    }
  }]);

  return CartDrawer;
}(HTMLElement);

customElements.define('cart-drawer', CartDrawer);

var CartDrawerItems = function (_CartItems) {
  _inherits(CartDrawerItems, _CartItems);

  function CartDrawerItems() {
    _classCallCheck(this, CartDrawerItems);

    return _possibleConstructorReturn(this, (CartDrawerItems.__proto__ || Object.getPrototypeOf(CartDrawerItems)).apply(this, arguments));
  }

  _createClass(CartDrawerItems, [{
    key: 'getSectionsToRender',
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
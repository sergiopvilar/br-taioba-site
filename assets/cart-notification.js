'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartNotification = function (_HTMLElement) {
  _inherits(CartNotification, _HTMLElement);

  function CartNotification() {
    _classCallCheck(this, CartNotification);

    var _this = _possibleConstructorReturn(this, (CartNotification.__proto__ || Object.getPrototypeOf(CartNotification)).call(this));

    _this.notification = document.getElementById('cart-notification');
    _this.header = document.querySelector('sticky-header');
    _this.onBodyClick = _this.handleBodyClick.bind(_this);

    _this.notification.addEventListener('keyup', function (evt) {
      return evt.code === 'Escape' && _this.close();
    });
    _this.querySelectorAll('button[type="button"]').forEach(function (closeButton) {
      return closeButton.addEventListener('click', _this.close.bind(_this));
    });
    return _this;
  }

  _createClass(CartNotification, [{
    key: 'open',
    value: function open() {
      var _this2 = this;

      this.notification.classList.add('animate', 'active');

      this.notification.addEventListener('transitionend', function () {
        _this2.notification.focus();
        trapFocus(_this2.notification);
      }, { once: true });

      document.body.addEventListener('click', this.onBodyClick);
    }
  }, {
    key: 'close',
    value: function close() {
      this.notification.classList.remove('active');
      document.body.removeEventListener('click', this.onBodyClick);

      removeTrapFocus(this.activeElement);
    }
  }, {
    key: 'renderContents',
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
    key: 'getSectionsToRender',
    value: function getSectionsToRender() {
      return [{
        id: 'cart-notification-product',
        selector: '[id="cart-notification-product-' + this.cartItemKey + '"]'
      }, {
        id: 'cart-notification-button'
      }, {
        id: 'cart-icon-bubble'
      }];
    }
  }, {
    key: 'getSectionInnerHTML',
    value: function getSectionInnerHTML(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';

      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: 'handleBodyClick',
    value: function handleBodyClick(evt) {
      var target = evt.target;
      if (target !== this.notification && !target.closest('cart-notification')) {
        var disclosure = target.closest('details-disclosure, header-menu');
        this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
        this.close();
      }
    }
  }, {
    key: 'setActiveElement',
    value: function setActiveElement(element) {
      this.activeElement = element;
    }
  }]);

  return CartNotification;
}(HTMLElement);

customElements.define('cart-notification', CartNotification);
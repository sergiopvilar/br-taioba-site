'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DetailsDisclosure = function (_HTMLElement) {
  _inherits(DetailsDisclosure, _HTMLElement);

  function DetailsDisclosure() {
    _classCallCheck(this, DetailsDisclosure);

    var _this = _possibleConstructorReturn(this, (DetailsDisclosure.__proto__ || Object.getPrototypeOf(DetailsDisclosure)).call(this));

    _this.mainDetailsToggle = _this.querySelector('details');
    _this.content = _this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    _this.mainDetailsToggle.addEventListener('focusout', _this.onFocusOut.bind(_this));
    _this.mainDetailsToggle.addEventListener('toggle', _this.onToggle.bind(_this));
    return _this;
  }

  _createClass(DetailsDisclosure, [{
    key: 'onFocusOut',
    value: function onFocusOut() {
      var _this2 = this;

      setTimeout(function () {
        if (!_this2.contains(document.activeElement)) _this2.close();
      });
    }
  }, {
    key: 'onToggle',
    value: function onToggle() {
      if (!this.animations) this.animations = this.content.getAnimations();

      if (this.mainDetailsToggle.hasAttribute('open')) {
        this.animations.forEach(function (animation) {
          return animation.play();
        });
      } else {
        this.animations.forEach(function (animation) {
          return animation.cancel();
        });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      this.mainDetailsToggle.removeAttribute('open');
      this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
    }
  }]);

  return DetailsDisclosure;
}(HTMLElement);

customElements.define('details-disclosure', DetailsDisclosure);

var HeaderMenu = function (_DetailsDisclosure) {
  _inherits(HeaderMenu, _DetailsDisclosure);

  function HeaderMenu() {
    _classCallCheck(this, HeaderMenu);

    var _this3 = _possibleConstructorReturn(this, (HeaderMenu.__proto__ || Object.getPrototypeOf(HeaderMenu)).call(this));

    _this3.header = document.querySelector('.header-wrapper');
    return _this3;
  }

  _createClass(HeaderMenu, [{
    key: 'onToggle',
    value: function onToggle() {
      if (!this.header) return;
      this.header.preventHide = this.mainDetailsToggle.open;

      if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
      document.documentElement.style.setProperty('--header-bottom-position-desktop', Math.floor(this.header.getBoundingClientRect().bottom) + 'px');
    }
  }]);

  return HeaderMenu;
}(DetailsDisclosure);

customElements.define('header-menu', HeaderMenu);
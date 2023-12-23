'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('quantity-popover')) {
  customElements.define('quantity-popover', function (_HTMLElement) {
    _inherits(QuantityPopover, _HTMLElement);

    function QuantityPopover() {
      _classCallCheck(this, QuantityPopover);

      var _this = _possibleConstructorReturn(this, (QuantityPopover.__proto__ || Object.getPrototypeOf(QuantityPopover)).call(this));

      _this.mql = window.matchMedia('(min-width: 990px)');
      _this.mqlTablet = window.matchMedia('(min-width: 750px)');
      _this.infoButtonDesktop = _this.querySelector('.quantity-popover__info-button--icon-only');
      _this.infoButtonMobile = _this.querySelector('.quantity-popover__info-button--icon-with-label');
      _this.popoverInfo = _this.querySelector('.quantity-popover__info');
      _this.closeButton = _this.querySelector('.button-close');
      _this.variantInfo = _this.querySelector('.quantity-popover-container');
      _this.eventMouseEnterHappened = false;

      if (_this.closeButton) {
        _this.closeButton.addEventListener('click', _this.closePopover.bind(_this));
      }

      if (_this.popoverInfo && _this.infoButtonDesktop && _this.mql.matches) {
        _this.popoverInfo.addEventListener('mouseenter', _this.closePopover.bind(_this));
      }

      if (_this.infoButtonDesktop) {
        _this.infoButtonDesktop.addEventListener('click', _this.togglePopover.bind(_this));
        _this.infoButtonDesktop.addEventListener('focusout', _this.closePopover.bind(_this));
      }

      if (_this.infoButtonMobile) {
        _this.infoButtonMobile.addEventListener('click', _this.togglePopover.bind(_this));
        _this.infoButtonMobile.addEventListener('focusout', _this.closePopover.bind(_this));
      }

      if (_this.infoButtonDesktop && _this.mqlTablet.matches) {
        _this.variantInfo.addEventListener('mouseenter', _this.togglePopover.bind(_this));
        _this.variantInfo.addEventListener('mouseleave', _this.closePopover.bind(_this));
      }
      return _this;
    }

    _createClass(QuantityPopover, [{
      key: 'togglePopover',
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
      key: 'closePopover',
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
  }(HTMLElement));
}
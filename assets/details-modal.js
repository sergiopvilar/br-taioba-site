'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DetailsModal = function (_HTMLElement) {
  _inherits(DetailsModal, _HTMLElement);

  function DetailsModal() {
    _classCallCheck(this, DetailsModal);

    var _this = _possibleConstructorReturn(this, (DetailsModal.__proto__ || Object.getPrototypeOf(DetailsModal)).call(this));

    _this.detailsContainer = _this.querySelector('details');
    _this.summaryToggle = _this.querySelector('summary');

    _this.detailsContainer.addEventListener('keyup', function (event) {
      return event.code.toUpperCase() === 'ESCAPE' && _this.close();
    });
    _this.summaryToggle.addEventListener('click', _this.onSummaryClick.bind(_this));
    _this.querySelector('button[type="button"]').addEventListener('click', _this.close.bind(_this));

    _this.summaryToggle.setAttribute('role', 'button');
    return _this;
  }

  _createClass(DetailsModal, [{
    key: 'isOpen',
    value: function isOpen() {
      return this.detailsContainer.hasAttribute('open');
    }
  }, {
    key: 'onSummaryClick',
    value: function onSummaryClick(event) {
      event.preventDefault();
      event.target.closest('details').hasAttribute('open') ? this.close() : this.open(event);
    }
  }, {
    key: 'onBodyClick',
    value: function onBodyClick(event) {
      if (!this.contains(event.target) || event.target.classList.contains('modal-overlay')) this.close(false);
    }
  }, {
    key: 'open',
    value: function open(event) {
      this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this);
      event.target.closest('details').setAttribute('open', true);
      document.body.addEventListener('click', this.onBodyClickEvent);
      document.body.classList.add('overflow-hidden');

      trapFocus(this.detailsContainer.querySelector('[tabindex="-1"]'), this.detailsContainer.querySelector('input:not([type="hidden"])'));
    }
  }, {
    key: 'close',
    value: function close() {
      var focusToggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      removeTrapFocus(focusToggle ? this.summaryToggle : null);
      this.detailsContainer.removeAttribute('open');
      document.body.removeEventListener('click', this.onBodyClickEvent);
      document.body.classList.remove('overflow-hidden');
    }
  }]);

  return DetailsModal;
}(HTMLElement);

customElements.define('details-modal', DetailsModal);
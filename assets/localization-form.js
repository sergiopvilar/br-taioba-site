'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('localization-form')) {
  customElements.define('localization-form', function (_HTMLElement) {
    _inherits(LocalizationForm, _HTMLElement);

    function LocalizationForm() {
      _classCallCheck(this, LocalizationForm);

      var _this = _possibleConstructorReturn(this, (LocalizationForm.__proto__ || Object.getPrototypeOf(LocalizationForm)).call(this));

      _this.elements = {
        input: _this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: _this.querySelector('button'),
        panel: _this.querySelector('.disclosure__list-wrapper')
      };
      _this.elements.button.addEventListener('click', _this.openSelector.bind(_this));
      _this.elements.button.addEventListener('focusout', _this.closeSelector.bind(_this));
      _this.addEventListener('keyup', _this.onContainerKeyUp.bind(_this));

      _this.querySelectorAll('a').forEach(function (item) {
        return item.addEventListener('click', _this.onItemClick.bind(_this));
      });
      return _this;
    }

    _createClass(LocalizationForm, [{
      key: 'hidePanel',
      value: function hidePanel() {
        this.elements.button.setAttribute('aria-expanded', 'false');
        this.elements.panel.setAttribute('hidden', true);
      }
    }, {
      key: 'onContainerKeyUp',
      value: function onContainerKeyUp(event) {
        if (event.code.toUpperCase() !== 'ESCAPE') return;

        if (this.elements.button.getAttribute('aria-expanded') == 'false') return;
        this.hidePanel();
        event.stopPropagation();
        this.elements.button.focus();
      }
    }, {
      key: 'onItemClick',
      value: function onItemClick(event) {
        event.preventDefault();
        var form = this.querySelector('form');
        this.elements.input.value = event.currentTarget.dataset.value;
        if (form) form.submit();
      }
    }, {
      key: 'openSelector',
      value: function openSelector() {
        this.elements.button.focus();
        this.elements.panel.toggleAttribute('hidden');
        this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
      }
    }, {
      key: 'closeSelector',
      value: function closeSelector(event) {
        var isChild = this.elements.panel.contains(event.relatedTarget) || this.elements.button.contains(event.relatedTarget);
        if (!event.relatedTarget || !isChild) {
          this.hidePanel();
        }
      }
    }]);

    return LocalizationForm;
  }(HTMLElement));
}
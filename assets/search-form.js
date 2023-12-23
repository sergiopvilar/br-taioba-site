'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchForm = function (_HTMLElement) {
  _inherits(SearchForm, _HTMLElement);

  function SearchForm() {
    _classCallCheck(this, SearchForm);

    var _this = _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).call(this));

    _this.input = _this.querySelector('input[type="search"]');
    _this.resetButton = _this.querySelector('button[type="reset"]');

    if (_this.input) {
      _this.input.form.addEventListener('reset', _this.onFormReset.bind(_this));
      _this.input.addEventListener('input', debounce(function (event) {
        _this.onChange(event);
      }, 300).bind(_this));
    }
    return _this;
  }

  _createClass(SearchForm, [{
    key: 'toggleResetButton',
    value: function toggleResetButton() {
      var resetIsHidden = this.resetButton.classList.contains('hidden');
      if (this.input.value.length > 0 && resetIsHidden) {
        this.resetButton.classList.remove('hidden');
      } else if (this.input.value.length === 0 && !resetIsHidden) {
        this.resetButton.classList.add('hidden');
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.toggleResetButton();
    }
  }, {
    key: 'shouldResetForm',
    value: function shouldResetForm() {
      return !document.querySelector('[aria-selected="true"] a');
    }
  }, {
    key: 'onFormReset',
    value: function onFormReset(event) {
      // Prevent default so the form reset doesn't set the value gotten from the url on page load
      event.preventDefault();
      // Don't reset if the user has selected an element on the predictive search dropdown
      if (this.shouldResetForm()) {
        this.input.value = '';
        this.input.focus();
        this.toggleResetButton();
      }
    }
  }]);

  return SearchForm;
}(HTMLElement);

customElements.define('search-form', SearchForm);
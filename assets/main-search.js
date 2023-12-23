'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainSearch = function (_SearchForm) {
  _inherits(MainSearch, _SearchForm);

  function MainSearch() {
    _classCallCheck(this, MainSearch);

    var _this = _possibleConstructorReturn(this, (MainSearch.__proto__ || Object.getPrototypeOf(MainSearch)).call(this));

    _this.allSearchInputs = document.querySelectorAll('input[type="search"]');
    _this.setupEventListeners();
    return _this;
  }

  _createClass(MainSearch, [{
    key: 'setupEventListeners',
    value: function setupEventListeners() {
      var _this2 = this;

      var allSearchForms = [];
      this.allSearchInputs.forEach(function (input) {
        return allSearchForms.push(input.form);
      });
      this.input.addEventListener('focus', this.onInputFocus.bind(this));
      if (allSearchForms.length < 2) return;
      allSearchForms.forEach(function (form) {
        return form.addEventListener('reset', _this2.onFormReset.bind(_this2));
      });
      this.allSearchInputs.forEach(function (input) {
        return input.addEventListener('input', _this2.onInput.bind(_this2));
      });
    }
  }, {
    key: 'onFormReset',
    value: function onFormReset(event) {
      _get(MainSearch.prototype.__proto__ || Object.getPrototypeOf(MainSearch.prototype), 'onFormReset', this).call(this, event);
      if (_get(MainSearch.prototype.__proto__ || Object.getPrototypeOf(MainSearch.prototype), 'shouldResetForm', this).call(this)) {
        this.keepInSync('', this.input);
      }
    }
  }, {
    key: 'onInput',
    value: function onInput(event) {
      var target = event.target;
      this.keepInSync(target.value, target);
    }
  }, {
    key: 'onInputFocus',
    value: function onInputFocus() {
      var isSmallScreen = window.innerWidth < 750;
      if (isSmallScreen) {
        this.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, {
    key: 'keepInSync',
    value: function keepInSync(value, target) {
      this.allSearchInputs.forEach(function (input) {
        if (input !== target) {
          input.value = value;
        }
      });
    }
  }]);

  return MainSearch;
}(SearchForm);

customElements.define('main-search', MainSearch);
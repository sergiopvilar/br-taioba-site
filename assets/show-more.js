'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('show-more-button')) {
  customElements.define('show-more-button', function (_HTMLElement) {
    _inherits(ShowMoreButton, _HTMLElement);

    function ShowMoreButton() {
      _classCallCheck(this, ShowMoreButton);

      var _this = _possibleConstructorReturn(this, (ShowMoreButton.__proto__ || Object.getPrototypeOf(ShowMoreButton)).call(this));

      var button = _this.querySelector('button');
      button.addEventListener('click', function (event) {
        _this.expandShowMore(event);
        var nextElementToFocus = event.target.closest('.parent-display').querySelector('.show-more-item');
        if (nextElementToFocus && !nextElementToFocus.classList.contains('hidden') && nextElementToFocus.querySelector('input')) {
          nextElementToFocus.querySelector('input').focus();
        }
      });
      return _this;
    }

    _createClass(ShowMoreButton, [{
      key: 'expandShowMore',
      value: function expandShowMore(event) {
        var parentDisplay = event.target.closest('[id^="Show-More-"]').closest('.parent-display');
        var parentWrap = parentDisplay.querySelector('.parent-wrap');
        this.querySelectorAll('.label-text').forEach(function (element) {
          return element.classList.toggle('hidden');
        });
        parentDisplay.querySelectorAll('.show-more-item').forEach(function (item) {
          return item.classList.toggle('hidden');
        });
        if (!this.querySelector('.label-show-less')) {
          this.classList.add('hidden');
        }
      }
    }]);

    return ShowMoreButton;
  }(HTMLElement));
}
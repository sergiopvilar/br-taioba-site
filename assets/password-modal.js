'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasswordModal = function (_DetailsModal) {
  _inherits(PasswordModal, _DetailsModal);

  function PasswordModal() {
    _classCallCheck(this, PasswordModal);

    var _this = _possibleConstructorReturn(this, (PasswordModal.__proto__ || Object.getPrototypeOf(PasswordModal)).call(this));

    if (_this.querySelector('input[aria-invalid="true"]')) _this.open({ target: _this.querySelector('details') });
    return _this;
  }

  return PasswordModal;
}(DetailsModal);

customElements.define('password-modal', PasswordModal);
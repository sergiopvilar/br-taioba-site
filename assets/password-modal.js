var PasswordModal = /*@__PURE__*/(function (DetailsModal) {
  function PasswordModal() {
    DetailsModal.call(this);

    if (this.querySelector('input[aria-invalid="true"]')) { this.open({ target: this.querySelector('details') }); }
  }

  if ( DetailsModal ) PasswordModal.__proto__ = DetailsModal;
  PasswordModal.prototype = Object.create( DetailsModal && DetailsModal.prototype );
  PasswordModal.prototype.constructor = PasswordModal;

  return PasswordModal;
}(DetailsModal));

customElements.define('password-modal', PasswordModal);


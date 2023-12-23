var DetailsModal = /*@__PURE__*/(function (HTMLElement) {
  function DetailsModal() {
    var this$1 = this;

    HTMLElement.call(this);
    this.detailsContainer = this.querySelector('details');
    this.summaryToggle = this.querySelector('summary');

    this.detailsContainer.addEventListener('keyup', function (event) { return event.code.toUpperCase() === 'ESCAPE' && this$1.close(); });
    this.summaryToggle.addEventListener('click', this.onSummaryClick.bind(this));
    this.querySelector('button[type="button"]').addEventListener('click', this.close.bind(this));

    this.summaryToggle.setAttribute('role', 'button');
  }

  if ( HTMLElement ) DetailsModal.__proto__ = HTMLElement;
  DetailsModal.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  DetailsModal.prototype.constructor = DetailsModal;

  DetailsModal.prototype.isOpen = function isOpen () {
    return this.detailsContainer.hasAttribute('open');
  };

  DetailsModal.prototype.onSummaryClick = function onSummaryClick (event) {
    event.preventDefault();
    event.target.closest('details').hasAttribute('open') ? this.close() : this.open(event);
  };

  DetailsModal.prototype.onBodyClick = function onBodyClick (event) {
    if (!this.contains(event.target) || event.target.classList.contains('modal-overlay')) { this.close(false); }
  };

  DetailsModal.prototype.open = function open (event) {
    this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this);
    event.target.closest('details').setAttribute('open', true);
    document.body.addEventListener('click', this.onBodyClickEvent);
    document.body.classList.add('overflow-hidden');

    trapFocus(
      this.detailsContainer.querySelector('[tabindex="-1"]'),
      this.detailsContainer.querySelector('input:not([type="hidden"])')
    );
  };

  DetailsModal.prototype.close = function close (focusToggle) {
    if ( focusToggle === void 0 ) focusToggle = true;

    removeTrapFocus(focusToggle ? this.summaryToggle : null);
    this.detailsContainer.removeAttribute('open');
    document.body.removeEventListener('click', this.onBodyClickEvent);
    document.body.classList.remove('overflow-hidden');
  };

  return DetailsModal;
}(HTMLElement));

customElements.define('details-modal', DetailsModal);


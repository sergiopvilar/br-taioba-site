var selectors = {
  customerAddresses: '[data-customer-addresses]',
  addressCountrySelect: '[data-address-country-select]',
  addressContainer: '[data-address]',
  toggleAddressButton: 'button[aria-expanded]',
  cancelAddressButton: 'button[type="reset"]',
  deleteAddressButton: 'button[data-confirm-message]',
};

var attributes = {
  expanded: 'aria-expanded',
  confirmMessage: 'data-confirm-message',
};

var CustomerAddresses = function CustomerAddresses() {
  this.elements = this._getElements();
  if (Object.keys(this.elements).length === 0) { return; }
  this._setupCountries();
  this._setupEventListeners();
};

CustomerAddresses.prototype._getElements = function _getElements () {
  var container = document.querySelector(selectors.customerAddresses);
  return container
    ? {
        container: container,
        addressContainer: container.querySelector(selectors.addressContainer),
        toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
        cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
        deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
        countrySelects: container.querySelectorAll(selectors.addressCountrySelect),
      }
    : {};
};

CustomerAddresses.prototype._setupCountries = function _setupCountries () {
  if (Shopify && Shopify.CountryProvinceSelector) {
    // eslint-disable-next-line no-new
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew',
    });
    this.elements.countrySelects.forEach(function (select) {
      var formId = select.dataset.formId;
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(("AddressCountry_" + formId), ("AddressProvince_" + formId), {
        hideElement: ("AddressProvinceContainer_" + formId),
      });
    });
  }
};

CustomerAddresses.prototype._setupEventListeners = function _setupEventListeners () {
    var this$1 = this;

  this.elements.toggleButtons.forEach(function (element) {
    element.addEventListener('click', this$1._handleAddEditButtonClick);
  });
  this.elements.cancelButtons.forEach(function (element) {
    element.addEventListener('click', this$1._handleCancelButtonClick);
  });
  this.elements.deleteButtons.forEach(function (element) {
    element.addEventListener('click', this$1._handleDeleteButtonClick);
  });
};

CustomerAddresses.prototype._toggleExpanded = function _toggleExpanded (target) {
  target.setAttribute(attributes.expanded, (target.getAttribute(attributes.expanded) === 'false').toString());
};

CustomerAddresses.prototype._handleAddEditButtonClick = function _handleAddEditButtonClick (args) {
  this._toggleExpanded(args.currentTarget);
};;

CustomerAddresses.prototype._handleCancelButtonClick = function _handleCancelButtonClick (args) {
  this._toggleExpanded(args.currentTarget.closest(selectors.addressContainer).querySelector(("[" + (attributes.expanded) + "]")));
};;

CustomerAddresses.prototype._handleDeleteButtonClick = function _handleDeleteButtonClick (args) {
  // eslint-disable-next-line no-alert
  if (confirm(args.currentTarget.getAttribute(attributes.confirmMessage))) {
    Shopify.postLink(args.currentTarget.dataset.target, {
      parameters: { _method: 'delete' },
    });
  }
};


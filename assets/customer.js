'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selectors = {
  customerAddresses: '[data-customer-addresses]',
  addressCountrySelect: '[data-address-country-select]',
  addressContainer: '[data-address]',
  toggleAddressButton: 'button[aria-expanded]',
  cancelAddressButton: 'button[type="reset"]',
  deleteAddressButton: 'button[data-confirm-message]'
};

var attributes = {
  expanded: 'aria-expanded',
  confirmMessage: 'data-confirm-message'
};

var CustomerAddresses = function () {
  function CustomerAddresses() {
    _classCallCheck(this, CustomerAddresses);

    this.elements = this._getElements();
    if (Object.keys(this.elements).length === 0) return;
    this._setupCountries();
    this._setupEventListeners();
  }

  _createClass(CustomerAddresses, [{
    key: '_getElements',
    value: function _getElements() {
      var container = document.querySelector(selectors.customerAddresses);
      return container ? {
        container: container,
        addressContainer: container.querySelector(selectors.addressContainer),
        toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
        cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
        deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
        countrySelects: container.querySelectorAll(selectors.addressCountrySelect)
      } : {};
    }
  }, {
    key: '_setupCountries',
    value: function _setupCountries() {
      if (Shopify && Shopify.CountryProvinceSelector) {
        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
          hideElement: 'AddressProvinceContainerNew'
        });
        this.elements.countrySelects.forEach(function (select) {
          var formId = select.dataset.formId;
          // eslint-disable-next-line no-new
          new Shopify.CountryProvinceSelector('AddressCountry_' + formId, 'AddressProvince_' + formId, {
            hideElement: 'AddressProvinceContainer_' + formId
          });
        });
      }
    }
  }, {
    key: '_setupEventListeners',
    value: function _setupEventListeners() {
      var _this = this;

      this.elements.toggleButtons.forEach(function (element) {
        element.addEventListener('click', _this._handleAddEditButtonClick);
      });
      this.elements.cancelButtons.forEach(function (element) {
        element.addEventListener('click', _this._handleCancelButtonClick);
      });
      this.elements.deleteButtons.forEach(function (element) {
        element.addEventListener('click', _this._handleDeleteButtonClick);
      });
    }
  }, {
    key: '_toggleExpanded',
    value: function _toggleExpanded(target) {
      target.setAttribute(attributes.expanded, (target.getAttribute(attributes.expanded) === 'false').toString());
    }
  }, {
    key: '_handleAddEditButtonClick',
    value: function _handleAddEditButtonClick(args) {
      this._toggleExpanded(args.currentTarget);
    }
  }, {
    key: '_handleCancelButtonClick',
    value: function _handleCancelButtonClick(args) {
      this._toggleExpanded(args.currentTarget.closest(selectors.addressContainer).querySelector('[' + attributes.expanded + ']'));
    }
  }, {
    key: '_handleDeleteButtonClick',
    value: function _handleDeleteButtonClick(args) {
      // eslint-disable-next-line no-alert
      if (confirm(args.currentTarget.getAttribute(attributes.confirmMessage))) {
        Shopify.postLink(args.currentTarget.dataset.target, {
          parameters: { _method: 'delete' }
        });
      }
    }
  }]);

  return CustomerAddresses;
}();
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    var _this = this;
    _classCallCheck(this, CustomerAddresses);
    _defineProperty(this, "_handleAddEditButtonClick", function (_ref) {
      var currentTarget = _ref.currentTarget;
      _this._toggleExpanded(currentTarget);
    });
    _defineProperty(this, "_handleCancelButtonClick", function (_ref2) {
      var currentTarget = _ref2.currentTarget;
      _this._toggleExpanded(currentTarget.closest(selectors.addressContainer).querySelector("[".concat(attributes.expanded, "]")));
    });
    _defineProperty(this, "_handleDeleteButtonClick", function (_ref3) {
      var currentTarget = _ref3.currentTarget;
      if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
        Shopify.postLink(currentTarget.dataset.target, {
          parameters: {
            _method: 'delete'
          }
        });
      }
    });
    this.elements = this._getElements();
    if (Object.keys(this.elements).length === 0) return;
    this._setupCountries();
    this._setupEventListeners();
  }
  _createClass(CustomerAddresses, [{
    key: "_getElements",
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
    key: "_setupCountries",
    value: function _setupCountries() {
      if (Shopify && Shopify.CountryProvinceSelector) {
        new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
          hideElement: 'AddressProvinceContainerNew'
        });
        this.elements.countrySelects.forEach(function (select) {
          var formId = select.dataset.formId;
          new Shopify.CountryProvinceSelector("AddressCountry_".concat(formId), "AddressProvince_".concat(formId), {
            hideElement: "AddressProvinceContainer_".concat(formId)
          });
        });
      }
    }
  }, {
    key: "_setupEventListeners",
    value: function _setupEventListeners() {
      var _this2 = this;
      this.elements.toggleButtons.forEach(function (element) {
        element.addEventListener('click', _this2._handleAddEditButtonClick);
      });
      this.elements.cancelButtons.forEach(function (element) {
        element.addEventListener('click', _this2._handleCancelButtonClick);
      });
      this.elements.deleteButtons.forEach(function (element) {
        element.addEventListener('click', _this2._handleDeleteButtonClick);
      });
    }
  }, {
    key: "_toggleExpanded",
    value: function _toggleExpanded(target) {
      target.setAttribute(attributes.expanded, (target.getAttribute(attributes.expanded) === 'false').toString());
    }
  }]);
  return CustomerAddresses;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuickOrderListRemoveButton = function (_HTMLElement) {
  _inherits(QuickOrderListRemoveButton, _HTMLElement);

  function QuickOrderListRemoveButton() {
    _classCallCheck(this, QuickOrderListRemoveButton);

    var _this = _possibleConstructorReturn(this, (QuickOrderListRemoveButton.__proto__ || Object.getPrototypeOf(QuickOrderListRemoveButton)).call(this));

    _this.addEventListener('click', function (event) {
      event.preventDefault();
      var quickOrderList = _this.closest('quick-order-list');
      quickOrderList.updateQuantity(_this.dataset.index, 0);
    });
    return _this;
  }

  return QuickOrderListRemoveButton;
}(HTMLElement);

customElements.define('quick-order-list-remove-button', QuickOrderListRemoveButton);

var QuickOrderListRemoveAllButton = function (_HTMLElement2) {
  _inherits(QuickOrderListRemoveAllButton, _HTMLElement2);

  function QuickOrderListRemoveAllButton() {
    _classCallCheck(this, QuickOrderListRemoveAllButton);

    var _this2 = _possibleConstructorReturn(this, (QuickOrderListRemoveAllButton.__proto__ || Object.getPrototypeOf(QuickOrderListRemoveAllButton)).call(this));

    var allVariants = Array.from(document.querySelectorAll('[data-variant-id]'));
    var items = {};
    var hasVariantsInCart = false;
    _this2.quickOrderList = _this2.closest('quick-order-list');

    allVariants.forEach(function (variant) {
      var cartQty = parseInt(variant.dataset.cartQty);
      if (cartQty > 0) {
        hasVariantsInCart = true;
        items[parseInt(variant.dataset.variantId)] = 0;
      }
    });

    if (!hasVariantsInCart) {
      _this2.classList.add('hidden');
    }

    _this2.actions = {
      confirm: 'confirm',
      remove: 'remove',
      cancel: 'cancel'
    };

    _this2.addEventListener('click', function (event) {
      event.preventDefault();
      if (_this2.dataset.action === _this2.actions.confirm) {
        _this2.toggleConfirmation(false, true);
      } else if (_this2.dataset.action === _this2.actions.remove) {
        _this2.quickOrderList.updateMultipleQty(items);
        _this2.toggleConfirmation(true, false);
      } else if (_this2.dataset.action === _this2.actions.cancel) {
        _this2.toggleConfirmation(true, false);
      }
    });
    return _this2;
  }

  _createClass(QuickOrderListRemoveAllButton, [{
    key: 'toggleConfirmation',
    value: function toggleConfirmation(showConfirmation, showInfo) {
      this.quickOrderList.querySelector('.quick-order-list-total__confirmation').classList.toggle('hidden', showConfirmation);
      this.quickOrderList.querySelector('.quick-order-list-total__info').classList.toggle('hidden', showInfo);
    }
  }]);

  return QuickOrderListRemoveAllButton;
}(HTMLElement);

customElements.define('quick-order-list-remove-all-button', QuickOrderListRemoveAllButton);

var QuickOrderList = function (_HTMLElement3) {
  _inherits(QuickOrderList, _HTMLElement3);

  function QuickOrderList() {
    _classCallCheck(this, QuickOrderList);

    var _this3 = _possibleConstructorReturn(this, (QuickOrderList.__proto__ || Object.getPrototypeOf(QuickOrderList)).call(this));

    _this3.cart = document.querySelector('cart-drawer');
    _this3.actions = {
      add: 'ADD',
      update: 'UPDATE'
    };
    _this3.quickOrderListId = 'quick-order-list';
    _this3.variantItemStatusElement = document.getElementById('shopping-cart-variant-item-status');
    var form = _this3.querySelector('form');

    form.addEventListener('submit', _this3.onSubmit.bind(_this3));

    var debouncedOnChange = debounce(function (event) {
      _this3.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);
    _this3.addEventListener('change', debouncedOnChange.bind(_this3));
    _this3.cartUpdateUnsubscriber = undefined;
    return _this3;
  }

  _createClass(QuickOrderList, [{
    key: 'onSubmit',
    value: function onSubmit(event) {
      event.preventDefault();
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this4 = this;

      this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
        if (event.source === _this4.quickOrderListId) {
          return;
        }
        // If its another section that made the update
        _this4.onCartUpdate();
      });
      this.sectionId = this.dataset.id;
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      if (this.cartUpdateUnsubscriber) {
        this.cartUpdateUnsubscriber();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var inputValue = parseInt(event.target.value);
      var cartQuantity = parseInt(event.target.dataset.cartQuantity);
      var index = event.target.dataset.index;
      var name = document.activeElement.getAttribute('name');

      var quantity = inputValue - cartQuantity;

      if (cartQuantity > 0) {
        this.updateQuantity(index, inputValue, name, this.actions.update);
      } else {
        this.updateQuantity(index, quantity, name, this.actions.add);
      }
    }
  }, {
    key: 'onCartUpdate',
    value: function onCartUpdate() {
      var _this5 = this;

      fetch(window.location.pathname + '?section_id=' + this.sectionId).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var html = new DOMParser().parseFromString(responseText, 'text/html');
        var sourceQty = html.querySelector(_this5.quickOrderListId);
        _this5.innerHTML = sourceQty.innerHTML;
      }).catch(function (e) {
        console.error(e);
      });
    }
  }, {
    key: 'getSectionsToRender',
    value: function getSectionsToRender() {
      return [{
        id: this.quickOrderListId,
        section: document.getElementById(this.quickOrderListId).dataset.id,
        selector: '.js-contents'
      }, {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }, {
        id: 'quick-order-list-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      }, {
        id: 'quick-order-list-total',
        section: document.getElementById(this.quickOrderListId).dataset.id,
        selector: '.quick-order-list__total'
      }, {
        id: 'CartDrawer',
        selector: '#CartDrawer',
        section: 'cart-drawer'
      }];
    }
  }, {
    key: 'renderSections',
    value: function renderSections(parsedState) {
      var _this6 = this;

      this.getSectionsToRender().forEach(function (section) {
        var sectionElement = document.getElementById(section.id);
        if (sectionElement && sectionElement.parentElement && sectionElement.parentElement.classList.contains('drawer')) {
          parsedState.items.length > 0 ? sectionElement.parentElement.classList.remove('is-empty') : sectionElement.parentElement.classList.add('is-empty');

          setTimeout(function () {
            document.querySelector('#CartDrawer-Overlay').addEventListener('click', _this6.cart.close.bind(_this6.cart));
          });
        }
        var elementToReplace = sectionElement && sectionElement.querySelector(section.selector) ? sectionElement.querySelector(section.selector) : sectionElement;
        if (elementToReplace) {
          elementToReplace.innerHTML = _this6.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }
      });
    }
  }, {
    key: 'updateMultipleQty',
    value: function updateMultipleQty(items) {
      var _this7 = this;

      this.querySelector('.variant-remove-total .loading__spinner').classList.remove('hidden');

      var body = JSON.stringify({
        updates: items,
        sections: this.getSectionsToRender().map(function (section) {
          return section.section;
        }),
        sections_url: window.location.pathname
      });

      this.updateMessage();
      this.setErrorMessage();
      var options = Object.assign.apply(Object, _toConsumableArray(fetchConfig()).concat(_toConsumableArray({ body: body })));

      fetch('' + routes.cart_update_url, options).then(function (response) {
        return response.text();
      }).then(function (state) {
        var parsedState = JSON.parse(state);
        _this7.renderSections(parsedState);
      }).catch(function () {
        _this7.setErrorMessage(window.cartStrings.error);
      }).finally(function () {
        _this7.querySelector('.variant-remove-total .loading__spinner').classList.add('hidden');
      });
    }
  }, {
    key: 'updateQuantity',
    value: function updateQuantity(id, quantity, name, action) {
      var _this8 = this;

      this.toggleLoading(id, true);

      var routeUrl = routes.cart_change_url;
      var body = JSON.stringify({
        quantity: quantity,
        id: id,
        sections: this.getSectionsToRender().map(function (section) {
          return section.section;
        }),
        sections_url: window.location.pathname
      });
      var fetchConfigType = void 0;
      if (action === this.actions.add) {
        fetchConfigType = 'javascript';
        routeUrl = routes.cart_add_url;
        body = JSON.stringify({
          items: [{
            quantity: parseInt(quantity),
            id: parseInt(id)
          }],
          sections: this.getSectionsToRender().map(function (section) {
            return section.section;
          }),
          sections_url: window.location.pathname
        });
      }

      this.updateMessage();
      this.setErrorMessage();
      var options = Object.assign.apply(Object, _toConsumableArray(fetchConfig(fetchConfigType)).concat(_toConsumableArray({ body: body })));
      fetch('' + routeUrl, options).then(function (response) {
        return response.text();
      }).then(function (state) {
        var parsedState = JSON.parse(state);
        var quantityElement = document.getElementById('Quantity-' + id);
        var items = document.querySelectorAll('.variant-item');

        if (parsedState.description || parsedState.errors) {
          var _variantItem = document.querySelector('[id^="Variant-' + id + '"] .variant-item__totals.small-hide .loading__spinner');
          _variantItem.classList.add('loading__spinner--error');
          _this8.resetQuantityInput(id, quantityElement);
          if (parsedState.errors) {
            _this8.updateLiveRegions(id, parsedState.errors);
          } else {
            _this8.updateLiveRegions(id, parsedState.description);
          }
          return;
        }

        _this8.classList.toggle('is-empty', parsedState.item_count === 0);

        _this8.renderSections(parsedState);

        var hasError = false;

        var currentItem = parsedState.items.find(function (item) {
          return item.variant_id === parseInt(id);
        });
        var updatedValue = currentItem ? currentItem.quantity : undefined;
        if (updatedValue && updatedValue !== quantity) {
          _this8.updateError(updatedValue, id);
          hasError = true;
        }

        var variantItem = document.getElementById('Variant-' + id);
        if (variantItem && variantItem.querySelector('[name="' + name + '"]')) {
          variantItem.querySelector('[name="' + name + '"]').focus();
        }
        publish(PUB_SUB_EVENTS.cartUpdate, { source: _this8.quickOrderListId, cartData: parsedState });

        if (hasError) {
          _this8.updateMessage();
        } else if (action === _this8.actions.add) {
          _this8.updateMessage(parseInt(quantity));
        } else if (action === _this8.actions.update) {
          _this8.updateMessage(parseInt(quantity - quantityElement.dataset.cartQuantity));
        } else {
          _this8.updateMessage(-parseInt(quantityElement.dataset.cartQuantity));
        }
      }).catch(function (error) {
        _this8.querySelectorAll('.loading__spinner').forEach(function (overlay) {
          return overlay.classList.add('hidden');
        });
        _this8.resetQuantityInput(id);
        console.error(error);
        _this8.setErrorMessage(window.cartStrings.error);
      }).finally(function () {
        _this8.toggleLoading(id);
      });
    }
  }, {
    key: 'resetQuantityInput',
    value: function resetQuantityInput(id, quantityElement) {
      var input = quantityElement ? quantityElement : document.getElementById('Quantity-' + id);
      input.value = input.getAttribute('value');
    }
  }, {
    key: 'setErrorMessage',
    value: function setErrorMessage() {
      var _this9 = this;

      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.errorMessageTemplate = this.errorMessageTemplate ? this.errorMessageTemplate : document.getElementById('QuickOrderListErrorTemplate-' + this.sectionId).cloneNode(true);
      var errorElements = document.querySelectorAll('.quick-order-list-error');

      errorElements.forEach(function (errorElement) {
        errorElement.innerHTML = '';
        if (!message) return;
        var updatedMessageElement = _this9.errorMessageTemplate.cloneNode(true);
        updatedMessageElement.content.querySelector('.quick-order-list-error-message').innerText = message;
        errorElement.appendChild(updatedMessageElement.content);
      });
    }
  }, {
    key: 'updateMessage',
    value: function updateMessage() {
      var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var messages = this.querySelectorAll('.quick-order-list__message-text');
      var icons = this.querySelectorAll('.quick-order-list__message-icon');

      if (quantity === null || isNaN(quantity)) {
        messages.forEach(function (message) {
          return message.innerHTML = '';
        });
        icons.forEach(function (icon) {
          return icon.classList.add('hidden');
        });
        return;
      }

      var isQuantityNegative = quantity < 0;
      var absQuantity = Math.abs(quantity);

      var textTemplate = isQuantityNegative ? absQuantity === 1 ? window.quickOrderListStrings.itemRemoved : window.quickOrderListStrings.itemsRemoved : quantity === 1 ? window.quickOrderListStrings.itemAdded : window.quickOrderListStrings.itemsAdded;

      messages.forEach(function (msg) {
        return msg.innerHTML = textTemplate.replace('[quantity]', absQuantity);
      });

      if (!isQuantityNegative) {
        icons.forEach(function (i) {
          return i.classList.remove('hidden');
        });
      }
    }
  }, {
    key: 'updateError',
    value: function updateError(updatedValue, id) {
      var message = '';
      if (typeof updatedValue === 'undefined') {
        message = window.cartStrings.error;
      } else {
        message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
      }
      this.updateLiveRegions(id, message);
    }
  }, {
    key: 'updateLiveRegions',
    value: function updateLiveRegions(id, message) {
      var variantItemErrorDesktop = document.getElementById('Quick-order-list-item-error-desktop-' + id);
      var variantItemErrorMobile = document.getElementById('Quick-order-list-item-error-mobile-' + id);
      if (variantItemErrorDesktop) {
        variantItemErrorDesktop.querySelector('.variant-item__error-text').innerHTML = message;
        variantItemErrorDesktop.closest('tr').classList.remove('hidden');
      }
      if (variantItemErrorMobile) variantItemErrorMobile.querySelector('.variant-item__error-text').innerHTML = message;

      this.variantItemStatusElement.setAttribute('aria-hidden', true);

      var cartStatus = document.getElementById('quick-order-list-live-region-text');
      cartStatus.setAttribute('aria-hidden', false);

      setTimeout(function () {
        cartStatus.setAttribute('aria-hidden', true);
      }, 1000);
    }
  }, {
    key: 'getSectionInnerHTML',
    value: function getSectionInnerHTML(html, selector) {
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: 'toggleLoading',
    value: function toggleLoading(id, enable) {
      var quickOrderList = document.getElementById(this.quickOrderListId);
      var quickOrderListItems = this.querySelectorAll('#Variant-' + id + ' .loading__spinner');

      if (enable) {
        quickOrderList.classList.add('quick-order-list__container--disabled');
        [].concat(_toConsumableArray(quickOrderListItems)).forEach(function (overlay) {
          return overlay.classList.remove('hidden');
        });
        document.activeElement.blur();
        this.variantItemStatusElement.setAttribute('aria-hidden', false);
      } else {
        quickOrderList.classList.remove('quick-order-list__container--disabled');
        quickOrderListItems.forEach(function (overlay) {
          return overlay.classList.add('hidden');
        });
      }
    }
  }]);

  return QuickOrderList;
}(HTMLElement);

customElements.define('quick-order-list', QuickOrderList);
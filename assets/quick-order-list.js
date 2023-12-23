var QuickOrderListRemoveButton = /*@__PURE__*/(function (HTMLElement) {
  function QuickOrderListRemoveButton() {
    var this$1 = this;

    HTMLElement.call(this);
    this.addEventListener('click', function (event) {
      event.preventDefault();
      var quickOrderList = this$1.closest('quick-order-list');
      quickOrderList.updateQuantity(this$1.dataset.index, 0);
    });
  }

  if ( HTMLElement ) QuickOrderListRemoveButton.__proto__ = HTMLElement;
  QuickOrderListRemoveButton.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  QuickOrderListRemoveButton.prototype.constructor = QuickOrderListRemoveButton;

  return QuickOrderListRemoveButton;
}(HTMLElement));

customElements.define('quick-order-list-remove-button', QuickOrderListRemoveButton);

var QuickOrderListRemoveAllButton = /*@__PURE__*/(function (HTMLElement) {
  function QuickOrderListRemoveAllButton() {
    var this$1 = this;

    HTMLElement.call(this);
    var allVariants = Array.from(document.querySelectorAll('[data-variant-id]'));
    var items = {}
    var hasVariantsInCart = false;
    this.quickOrderList = this.closest('quick-order-list');

    allVariants.forEach(function (variant) {
      var cartQty = parseInt(variant.dataset.cartQty);
      if (cartQty > 0) {
        hasVariantsInCart = true;
        items[parseInt(variant.dataset.variantId)] = 0;
      }
    });

    if (!hasVariantsInCart) {
      this.classList.add('hidden');
    }

    this.actions = {
      confirm: 'confirm',
      remove: 'remove',
      cancel: 'cancel'
    }

    this.addEventListener('click', function (event) {
      event.preventDefault();
      if (this$1.dataset.action === this$1.actions.confirm) {
        this$1.toggleConfirmation(false, true);
      } else if (this$1.dataset.action === this$1.actions.remove) {
        this$1.quickOrderList.updateMultipleQty(items);
        this$1.toggleConfirmation(true, false);
      } else if (this$1.dataset.action === this$1.actions.cancel) {
        this$1.toggleConfirmation(true, false);
      }
    });
  }

  if ( HTMLElement ) QuickOrderListRemoveAllButton.__proto__ = HTMLElement;
  QuickOrderListRemoveAllButton.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  QuickOrderListRemoveAllButton.prototype.constructor = QuickOrderListRemoveAllButton;

  QuickOrderListRemoveAllButton.prototype.toggleConfirmation = function toggleConfirmation (showConfirmation, showInfo) {
    this.quickOrderList.querySelector('.quick-order-list-total__confirmation').classList.toggle('hidden', showConfirmation);
    this.quickOrderList.querySelector('.quick-order-list-total__info').classList.toggle('hidden', showInfo)
  };

  return QuickOrderListRemoveAllButton;
}(HTMLElement));

customElements.define('quick-order-list-remove-all-button', QuickOrderListRemoveAllButton);


var QuickOrderList = /*@__PURE__*/(function (HTMLElement) {
  function QuickOrderList() {
    var this$1 = this;

    HTMLElement.call(this);
    this.cart = document.querySelector('cart-drawer');
    this.actions = {
      add: 'ADD',
      update: 'UPDATE'
    }
    this.quickOrderListId = 'quick-order-list'
    this.variantItemStatusElement = document.getElementById('shopping-cart-variant-item-status');
    var form = this.querySelector('form');

    form.addEventListener('submit', this.onSubmit.bind(this));

    var debouncedOnChange = debounce(function (event) {
      this$1.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);
    this.addEventListener('change', debouncedOnChange.bind(this));
    this.cartUpdateUnsubscriber = undefined;
  }

  if ( HTMLElement ) QuickOrderList.__proto__ = HTMLElement;
  QuickOrderList.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  QuickOrderList.prototype.constructor = QuickOrderList;

  QuickOrderList.prototype.onSubmit = function onSubmit (event) {
    event.preventDefault();
  };

  QuickOrderList.prototype.connectedCallback = function connectedCallback () {
    var this$1 = this;

    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
      if (event.source === this$1.quickOrderListId) {
        return;
      }
      // If its another section that made the update
      this$1.onCartUpdate();
    });
    this.sectionId = this.dataset.id;
  };

  QuickOrderList.prototype.disconnectedCallback = function disconnectedCallback () {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  };

  QuickOrderList.prototype.onChange = function onChange (event) {
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
  };

  QuickOrderList.prototype.onCartUpdate = function onCartUpdate () {
    var this$1 = this;

    fetch(((window.location.pathname) + "?section_id=" + (this.sectionId)))
      .then(function (response) { return response.text(); })
      .then(function (responseText) {
        var html = new DOMParser().parseFromString(responseText, 'text/html');
        var sourceQty = html.querySelector(this$1.quickOrderListId);
        this$1.innerHTML = sourceQty.innerHTML;
      })
      .catch(function (e) {
        console.error(e);
      });
  };

  QuickOrderList.prototype.getSectionsToRender = function getSectionsToRender () {
    return [
      {
        id: this.quickOrderListId,
        section: document.getElementById(this.quickOrderListId).dataset.id,
        selector: '.js-contents'
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'quick-order-list-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'quick-order-list-total',
        section: document.getElementById(this.quickOrderListId).dataset.id,
        selector: '.quick-order-list__total'
      },
      {
        id: 'CartDrawer',
        selector: '#CartDrawer',
        section: 'cart-drawer'
      }
    ];
  };

  QuickOrderList.prototype.renderSections = function renderSections (parsedState) {
    var this$1 = this;

    this.getSectionsToRender().forEach((function (section) {
      var sectionElement = document.getElementById(section.id);
      if (sectionElement && sectionElement.parentElement && sectionElement.parentElement.classList.contains('drawer')) {
        parsedState.items.length > 0 ? sectionElement.parentElement.classList.remove('is-empty') : sectionElement.parentElement.classList.add('is-empty');

        setTimeout(function () {
          document.querySelector('#CartDrawer-Overlay').addEventListener('click', this$1.cart.close.bind(this$1.cart));
        });
      }
      var elementToReplace = sectionElement && sectionElement.querySelector(section.selector) ? sectionElement.querySelector(section.selector) : sectionElement;
      if (elementToReplace) {
        elementToReplace.innerHTML =
          this$1.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
      }
    }));

  };

  QuickOrderList.prototype.updateMultipleQty = function updateMultipleQty (items) {
    var this$1 = this;

    this.querySelector('.variant-remove-total .loading__spinner').classList.remove('hidden');

    var body = JSON.stringify({
      updates: items,
      sections: this.getSectionsToRender().map(function (section) { return section.section; }),
      sections_url: window.location.pathname
    });

    this.updateMessage();
    this.setErrorMessage();
    var options = Object.assign.apply(Object, fetchConfig().concat( { body: body } ));

    fetch(("" + (routes.cart_update_url)), options)
      .then(function (response) {
        return response.text();
      })
      .then(function (state) {
        var parsedState = JSON.parse(state);
        this$1.renderSections(parsedState);
      }).catch(function () {
        this$1.setErrorMessage(window.cartStrings.error);
      })
      .finally(function () {
        this$1.querySelector('.variant-remove-total .loading__spinner').classList.add('hidden');
      });
  };

  QuickOrderList.prototype.updateQuantity = function updateQuantity (id, quantity, name, action) {
    var this$1 = this;

    this.toggleLoading(id, true);

    var routeUrl = routes.cart_change_url;
    var body = JSON.stringify({
      quantity: quantity,
      id: id,
      sections: this.getSectionsToRender().map(function (section) { return section.section; }),
      sections_url: window.location.pathname
    });
    var fetchConfigType;
    if (action === this.actions.add) {
      fetchConfigType = 'javascript';
      routeUrl = routes.cart_add_url;
      body = JSON.stringify({
        items: [
          {
            quantity: parseInt(quantity),
            id: parseInt(id)
          }
        ],
        sections: this.getSectionsToRender().map(function (section) { return section.section; }),
        sections_url: window.location.pathname
      });
    }

    this.updateMessage();
    this.setErrorMessage();
    var options = Object.assign.apply(Object, fetchConfig(fetchConfigType).concat( { body: body } ));
    fetch(("" + routeUrl), options)
      .then(function (response) {
        return response.text();
      })
      .then(function (state) {
        var parsedState = JSON.parse(state);
        var quantityElement = document.getElementById(("Quantity-" + id));
        var items = document.querySelectorAll('.variant-item');

        if (parsedState.description || parsedState.errors) {
          var variantItem$1 = document.querySelector(("[id^=\"Variant-" + id + "\"] .variant-item__totals.small-hide .loading__spinner"));
          variantItem$1.classList.add('loading__spinner--error');
          this$1.resetQuantityInput(id, quantityElement);
          if (parsedState.errors) {
            this$1.updateLiveRegions(id, parsedState.errors);
          } else {
            this$1.updateLiveRegions(id, parsedState.description);
          }
          return;
        }

        this$1.classList.toggle('is-empty', parsedState.item_count === 0);

        this$1.renderSections(parsedState);

        var hasError = false;

        var currentItem = parsedState.items.find(function (item) { return item.variant_id === parseInt(id); });
        var updatedValue = currentItem ? currentItem.quantity : undefined;
        if (updatedValue && updatedValue !== quantity) {
          this$1.updateError(updatedValue, id);
          hasError = true;
        }

        var variantItem = document.getElementById(("Variant-" + id));
        if (variantItem && variantItem.querySelector(("[name=\"" + name + "\"]"))) {
          variantItem.querySelector(("[name=\"" + name + "\"]")).focus();
        }
        publish(PUB_SUB_EVENTS.cartUpdate, { source: this$1.quickOrderListId, cartData: parsedState });

        if (hasError) {
          this$1.updateMessage();
        } else if (action === this$1.actions.add) {
          this$1.updateMessage(parseInt(quantity))
        } else if (action === this$1.actions.update) {
          this$1.updateMessage(parseInt(quantity - quantityElement.dataset.cartQuantity))
        } else {
          this$1.updateMessage(-parseInt(quantityElement.dataset.cartQuantity))
        }
      }).catch(function (error) {
        this$1.querySelectorAll('.loading__spinner').forEach(function (overlay) { return overlay.classList.add('hidden'); });
        this$1.resetQuantityInput(id);
        console.error(error);
        this$1.setErrorMessage(window.cartStrings.error);
      })
      .finally(function () {
        this$1.toggleLoading(id);
      });
  };

  QuickOrderList.prototype.resetQuantityInput = function resetQuantityInput (id, quantityElement) {
    var input = quantityElement ? quantityElement : document.getElementById(("Quantity-" + id));
    input.value = input.getAttribute('value');
  };

  QuickOrderList.prototype.setErrorMessage = function setErrorMessage (message) {
    var this$1 = this;
    if ( message === void 0 ) message = null;

    this.errorMessageTemplate = this.errorMessageTemplate ? this.errorMessageTemplate : document.getElementById(("QuickOrderListErrorTemplate-" + (this.sectionId))).cloneNode(true);
    var errorElements = document.querySelectorAll('.quick-order-list-error');

    errorElements.forEach(function (errorElement) {
      errorElement.innerHTML = '';
      if (!message) { return; }
      var updatedMessageElement = this$1.errorMessageTemplate.cloneNode(true);
      updatedMessageElement.content.querySelector('.quick-order-list-error-message').innerText = message;
      errorElement.appendChild(updatedMessageElement.content);
    });
  };

  QuickOrderList.prototype.updateMessage = function updateMessage (quantity) {
    if ( quantity === void 0 ) quantity = null;

    var messages = this.querySelectorAll('.quick-order-list__message-text');
    var icons = this.querySelectorAll('.quick-order-list__message-icon');

    if (quantity === null || isNaN(quantity)) {
      messages.forEach(function (message) { return message.innerHTML = ''; });
      icons.forEach(function (icon) { return icon.classList.add('hidden'); });
      return;
    }

    var isQuantityNegative = quantity < 0;
    var absQuantity = Math.abs(quantity);

    var textTemplate = isQuantityNegative
      ? (absQuantity === 1 ? window.quickOrderListStrings.itemRemoved : window.quickOrderListStrings.itemsRemoved)
      : (quantity === 1 ? window.quickOrderListStrings.itemAdded : window.quickOrderListStrings.itemsAdded);

    messages.forEach(function (msg) { return msg.innerHTML = textTemplate.replace('[quantity]', absQuantity); });

    if (!isQuantityNegative) {
      icons.forEach(function (i) { return i.classList.remove('hidden'); });
    }

  };

  QuickOrderList.prototype.updateError = function updateError (updatedValue, id) {
    var message = '';
    if (typeof updatedValue === 'undefined') {
      message = window.cartStrings.error;
    } else {
      message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
    }
    this.updateLiveRegions(id, message);
  };

  QuickOrderList.prototype.updateLiveRegions = function updateLiveRegions (id, message) {
    var variantItemErrorDesktop = document.getElementById(("Quick-order-list-item-error-desktop-" + id));
    var variantItemErrorMobile = document.getElementById(("Quick-order-list-item-error-mobile-" + id));
    if (variantItemErrorDesktop) {
      variantItemErrorDesktop.querySelector('.variant-item__error-text').innerHTML = message;
      variantItemErrorDesktop.closest('tr').classList.remove('hidden');
    }
    if (variantItemErrorMobile) { variantItemErrorMobile.querySelector('.variant-item__error-text').innerHTML = message; }

    this.variantItemStatusElement.setAttribute('aria-hidden', true);

    var cartStatus = document.getElementById('quick-order-list-live-region-text');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(function () {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  };

  QuickOrderList.prototype.getSectionInnerHTML = function getSectionInnerHTML (html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  };

  QuickOrderList.prototype.toggleLoading = function toggleLoading (id, enable) {
    var quickOrderList = document.getElementById(this.quickOrderListId);
    var quickOrderListItems = this.querySelectorAll(("#Variant-" + id + " .loading__spinner"));

    if (enable) {
      quickOrderList.classList.add('quick-order-list__container--disabled');
      [].concat( quickOrderListItems ).forEach(function (overlay) { return overlay.classList.remove('hidden'); });
      document.activeElement.blur();
      this.variantItemStatusElement.setAttribute('aria-hidden', false);
    } else {
      quickOrderList.classList.remove('quick-order-list__container--disabled');
      quickOrderListItems.forEach(function (overlay) { return overlay.classList.add('hidden'); });
    }
  };

  return QuickOrderList;
}(HTMLElement));

customElements.define('quick-order-list', QuickOrderList);


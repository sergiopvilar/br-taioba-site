var CartDrawer = /*@__PURE__*/(function (HTMLElement) {
  function CartDrawer() {
    var this$1 = this;

    HTMLElement.call(this);

    this.addEventListener('keyup', function (evt) { return evt.code === 'Escape' && this$1.close(); });
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.setHeaderCartIconAccessibility();
  }

  if ( HTMLElement ) CartDrawer.__proto__ = HTMLElement;
  CartDrawer.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  CartDrawer.prototype.constructor = CartDrawer;

  CartDrawer.prototype.setHeaderCartIconAccessibility = function setHeaderCartIconAccessibility () {
    var this$1 = this;

    var cartLink = document.querySelector('#cart-icon-bubble');
    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', function (event) {
      event.preventDefault();
      this$1.open(cartLink);
    });
    cartLink.addEventListener('keydown', function (event) {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this$1.open(cartLink);
      }
    });
  };

  CartDrawer.prototype.open = function open (triggeredBy) {
    var this$1 = this;

    if (triggeredBy) { this.setActiveElement(triggeredBy); }
    var cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) { this.setSummaryAccessibility(cartDrawerNote); }
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(function () {
      this$1.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      function () {
        var containerToTrapFocusOn = this$1.classList.contains('is-empty')
          ? this$1.querySelector('.drawer__inner-empty')
          : document.getElementById('CartDrawer');
        var focusElement = this$1.querySelector('.drawer__inner') || this$1.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      },
      { once: true }
    );

    document.body.classList.add('overflow-hidden');
  };

  CartDrawer.prototype.close = function close () {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  };

  CartDrawer.prototype.setSummaryAccessibility = function setSummaryAccessibility (cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if (cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', function (event) {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  };

  CartDrawer.prototype.renderContents = function renderContents (parsedState) {
    var this$1 = this;

    this.querySelector('.drawer__inner').classList.contains('is-empty') &&
      this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach(function (section) {
      var sectionElement = section.selector
        ? document.querySelector(section.selector)
        : document.getElementById(section.id);
      sectionElement.innerHTML = this$1.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    });

    setTimeout(function () {
      this$1.querySelector('#CartDrawer-Overlay').addEventListener('click', this$1.close.bind(this$1));
      this$1.open();
    });
  };

  CartDrawer.prototype.getSectionInnerHTML = function getSectionInnerHTML (html, selector) {
    if ( selector === void 0 ) selector = '.shopify-section';

    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  };

  CartDrawer.prototype.getSectionsToRender = function getSectionsToRender () {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer',
      },
      {
        id: 'cart-icon-bubble',
      } ];
  };

  CartDrawer.prototype.getSectionDOM = function getSectionDOM (html, selector) {
    if ( selector === void 0 ) selector = '.shopify-section';

    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
  };

  CartDrawer.prototype.setActiveElement = function setActiveElement (element) {
    this.activeElement = element;
  };

  return CartDrawer;
}(HTMLElement));

customElements.define('cart-drawer', CartDrawer);

var CartDrawerItems = /*@__PURE__*/(function (CartItems) {
  function CartDrawerItems () {
    CartItems.apply(this, arguments);
  }

  if ( CartItems ) CartDrawerItems.__proto__ = CartItems;
  CartDrawerItems.prototype = Object.create( CartItems && CartItems.prototype );
  CartDrawerItems.prototype.constructor = CartDrawerItems;

  CartDrawerItems.prototype.getSectionsToRender = function getSectionsToRender () {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      } ];
  };

  return CartDrawerItems;
}(CartItems));

customElements.define('cart-drawer-items', CartDrawerItems);


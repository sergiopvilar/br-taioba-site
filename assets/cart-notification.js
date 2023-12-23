var CartNotification = /*@__PURE__*/(function (HTMLElement) {
  function CartNotification() {
    var this$1 = this;

    HTMLElement.call(this);

    this.notification = document.getElementById('cart-notification');
    this.header = document.querySelector('sticky-header');
    this.onBodyClick = this.handleBodyClick.bind(this);

    this.notification.addEventListener('keyup', function (evt) { return evt.code === 'Escape' && this$1.close(); });
    this.querySelectorAll('button[type="button"]').forEach(function (closeButton) { return closeButton.addEventListener('click', this$1.close.bind(this$1)); }
    );
  }

  if ( HTMLElement ) CartNotification.__proto__ = HTMLElement;
  CartNotification.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  CartNotification.prototype.constructor = CartNotification;

  CartNotification.prototype.open = function open () {
    var this$1 = this;

    this.notification.classList.add('animate', 'active');

    this.notification.addEventListener(
      'transitionend',
      function () {
        this$1.notification.focus();
        trapFocus(this$1.notification);
      },
      { once: true }
    );

    document.body.addEventListener('click', this.onBodyClick);
  };

  CartNotification.prototype.close = function close () {
    this.notification.classList.remove('active');
    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  };

  CartNotification.prototype.renderContents = function renderContents (parsedState) {
    var this$1 = this;

    this.cartItemKey = parsedState.key;
    this.getSectionsToRender().forEach(function (section) {
      document.getElementById(section.id).innerHTML = this$1.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector
      );
    });

    if (this.header) { this.header.reveal(); }
    this.open();
  };

  CartNotification.prototype.getSectionsToRender = function getSectionsToRender () {
    return [
      {
        id: 'cart-notification-product',
        selector: ("[id=\"cart-notification-product-" + (this.cartItemKey) + "\"]"),
      },
      {
        id: 'cart-notification-button',
      },
      {
        id: 'cart-icon-bubble',
      } ];
  };

  CartNotification.prototype.getSectionInnerHTML = function getSectionInnerHTML (html, selector) {
    if ( selector === void 0 ) selector = '.shopify-section';

    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  };

  CartNotification.prototype.handleBodyClick = function handleBodyClick (evt) {
    var target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      var disclosure = target.closest('details-disclosure, header-menu');
      this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
      this.close();
    }
  };

  CartNotification.prototype.setActiveElement = function setActiveElement (element) {
    this.activeElement = element;
  };

  return CartNotification;
}(HTMLElement));

customElements.define('cart-notification', CartNotification);


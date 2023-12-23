if (!customElements.get('quantity-popover')) {
  customElements.define(
    'quantity-popover',
    /*@__PURE__*/(function (HTMLElement) {
    function QuantityPopover() {
        HTMLElement.call(this);
        this.mql = window.matchMedia('(min-width: 990px)');
        this.mqlTablet = window.matchMedia('(min-width: 750px)');
        this.infoButtonDesktop = this.querySelector('.quantity-popover__info-button--icon-only');
        this.infoButtonMobile = this.querySelector('.quantity-popover__info-button--icon-with-label');
        this.popoverInfo = this.querySelector('.quantity-popover__info');
        this.closeButton = this.querySelector('.button-close');
        this.variantInfo = this.querySelector('.quantity-popover-container');
        this.eventMouseEnterHappened = false;

        if (this.closeButton) {
          this.closeButton.addEventListener('click', this.closePopover.bind(this));
        }

        if (this.popoverInfo && this.infoButtonDesktop && this.mql.matches) {
          this.popoverInfo.addEventListener('mouseenter', this.closePopover.bind(this));
        }

        if (this.infoButtonDesktop) {
          this.infoButtonDesktop.addEventListener('click', this.togglePopover.bind(this));
          this.infoButtonDesktop.addEventListener('focusout', this.closePopover.bind(this));
        }

        if (this.infoButtonMobile) {
          this.infoButtonMobile.addEventListener('click', this.togglePopover.bind(this));
          this.infoButtonMobile.addEventListener('focusout', this.closePopover.bind(this));
        }

        if (this.infoButtonDesktop && this.mqlTablet.matches) {
          this.variantInfo.addEventListener('mouseenter', this.togglePopover.bind(this));
          this.variantInfo.addEventListener('mouseleave', this.closePopover.bind(this));
        }
      }

    if ( HTMLElement ) QuantityPopover.__proto__ = HTMLElement;
    QuantityPopover.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    QuantityPopover.prototype.constructor = QuantityPopover;

      QuantityPopover.prototype.togglePopover = function togglePopover (event) {
        event.preventDefault();
        if (event.type === 'mouseenter') {
          this.eventMouseEnterHappened = true;
        }

        if (event.type === 'click' && this.eventMouseEnterHappened) { return; }

        var button = this.infoButtonDesktop && this.mql.matches ? this.infoButtonDesktop : this.infoButtonMobile;
        var isExpanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', !isExpanded);

        this.popoverInfo.toggleAttribute('hidden');

        var isOpen = button.getAttribute('aria-expanded') === 'true';

        button.classList.toggle('quantity-popover__info-button--open');

        if (isOpen && event.type !== 'mouseenter') {
          button.focus();
        }
      };

      QuantityPopover.prototype.closePopover = function closePopover (event) {
        event.preventDefault();
        var isChild = this.variantInfo.contains(event.relatedTarget);

        var button = this.infoButtonDesktop && this.mql.matches ? this.infoButtonDesktop : this.infoButtonMobile;

        if (!event.relatedTarget || !isChild) {
          button.setAttribute('aria-expanded', 'false');
          button.classList.remove('quantity-popover__info-button--open');
          this.popoverInfo.setAttribute('hidden', '');
        }

        this.eventMouseEnterHappened = false;
      };

    return QuantityPopover;
  }(HTMLElement))
  );
}


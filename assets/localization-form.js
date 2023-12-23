if (!customElements.get('localization-form')) {
  customElements.define(
    'localization-form',
    /*@__PURE__*/(function (HTMLElement) {
    function LocalizationForm() {
        var this$1 = this;

        HTMLElement.call(this);
        this.elements = {
          input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
          button: this.querySelector('button'),
          panel: this.querySelector('.disclosure__list-wrapper'),
        };
        this.elements.button.addEventListener('click', this.openSelector.bind(this));
        this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
        this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

        this.querySelectorAll('a').forEach(function (item) { return item.addEventListener('click', this$1.onItemClick.bind(this$1)); });
      }

    if ( HTMLElement ) LocalizationForm.__proto__ = HTMLElement;
    LocalizationForm.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    LocalizationForm.prototype.constructor = LocalizationForm;

      LocalizationForm.prototype.hidePanel = function hidePanel () {
        this.elements.button.setAttribute('aria-expanded', 'false');
        this.elements.panel.setAttribute('hidden', true);
      };

      LocalizationForm.prototype.onContainerKeyUp = function onContainerKeyUp (event) {
        if (event.code.toUpperCase() !== 'ESCAPE') { return; }

        if (this.elements.button.getAttribute('aria-expanded') == 'false') { return; }
        this.hidePanel();
        event.stopPropagation();
        this.elements.button.focus();
      };

      LocalizationForm.prototype.onItemClick = function onItemClick (event) {
        event.preventDefault();
        var form = this.querySelector('form');
        this.elements.input.value = event.currentTarget.dataset.value;
        if (form) { form.submit(); }
      };

      LocalizationForm.prototype.openSelector = function openSelector () {
        this.elements.button.focus();
        this.elements.panel.toggleAttribute('hidden');
        this.elements.button.setAttribute(
          'aria-expanded',
          (this.elements.button.getAttribute('aria-expanded') === 'false').toString()
        );
      };

      LocalizationForm.prototype.closeSelector = function closeSelector (event) {
        var isChild =
          this.elements.panel.contains(event.relatedTarget) || this.elements.button.contains(event.relatedTarget);
        if (!event.relatedTarget || !isChild) {
          this.hidePanel();
        }
      };

    return LocalizationForm;
  }(HTMLElement))
  );
}


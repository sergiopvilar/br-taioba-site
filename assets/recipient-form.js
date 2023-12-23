if (!customElements.get('recipient-form')) {
  customElements.define(
    'recipient-form',
    /*@__PURE__*/(function (HTMLElement) {
    function RecipientForm() {
        HTMLElement.call(this);
        this.recipientFieldsLiveRegion = this.querySelector(("#Recipient-fields-live-region-" + (this.dataset.sectionId)));
        this.checkboxInput = this.querySelector(("#Recipient-checkbox-" + (this.dataset.sectionId)));
        this.checkboxInput.disabled = false;
        this.hiddenControlField = this.querySelector(("#Recipient-control-" + (this.dataset.sectionId)));
        this.hiddenControlField.disabled = true;
        this.emailInput = this.querySelector(("#Recipient-email-" + (this.dataset.sectionId)));
        this.nameInput = this.querySelector(("#Recipient-name-" + (this.dataset.sectionId)));
        this.messageInput = this.querySelector(("#Recipient-message-" + (this.dataset.sectionId)));
        this.sendonInput = this.querySelector(("#Recipient-send-on-" + (this.dataset.sectionId)));
        this.offsetProperty = this.querySelector(("#Recipient-timezone-offset-" + (this.dataset.sectionId)));
        if (this.offsetProperty) { this.offsetProperty.value = new Date().getTimezoneOffset().toString(); }

        this.errorMessageWrapper = this.querySelector('.product-form__recipient-error-message-wrapper');
        this.errorMessageList = this.errorMessageWrapper ? this.errorMessageWrapper.querySelector('ul') : undefined;
        this.errorMessage = this.errorMessageWrapper ? this.errorMessageWrapper.querySelector('.error-message') : undefined;
        this.defaultErrorHeader = this.errorMessage ? this.errorMessage.innerText : undefined;
        this.currentProductVariantId = this.dataset.productVariantId;
        this.addEventListener('change', this.onChange.bind(this));
        this.onChange();

        this.cartUpdateUnsubscriber = undefined;
        this.variantChangeUnsubscriber = undefined;
        this.cartErrorUnsubscriber = undefined;
      }

    if ( HTMLElement ) RecipientForm.__proto__ = HTMLElement;
    RecipientForm.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    RecipientForm.prototype.constructor = RecipientForm;

      RecipientForm.prototype.connectedCallback = function connectedCallback () {
        var this$1 = this;

        this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
          if (event.source === 'product-form' && event.productVariantId.toString() === this$1.currentProductVariantId) {
            this$1.resetRecipientForm();
          }
        });

        this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
          if (event.data.sectionId === this$1.dataset.sectionId) {
            this$1.currentProductVariantId = event.data.variant.id.toString();
          }
        });

        this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartError, function (event) {
          if (event.source === 'product-form' && event.productVariantId.toString() === this$1.currentProductVariantId) {
            this$1.displayErrorMessage(event.message, event.errors);
          }
        });
      };

      RecipientForm.prototype.disconnectedCallback = function disconnectedCallback () {
        if (this.cartUpdateUnsubscriber) {
          this.cartUpdateUnsubscriber();
        }

        if (this.variantChangeUnsubscriber) {
          this.variantChangeUnsubscriber();
        }

        if (this.cartErrorUnsubscriber) {
          this.cartErrorUnsubscriber();
        }
      };

      RecipientForm.prototype.onChange = function onChange () {
        if (this.checkboxInput.checked) {
          this.enableInputFields();
          this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormExpanded;
        } else {
          this.clearInputFields();
          this.disableInputFields();
          this.clearErrorMessage();
          this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormCollapsed;
        }
      };

      RecipientForm.prototype.inputFields = function inputFields () {
        return [this.emailInput, this.nameInput, this.messageInput, this.sendonInput];
      };

      RecipientForm.prototype.disableableFields = function disableableFields () {
        return this.inputFields().concat( [this.offsetProperty]);
      };

      RecipientForm.prototype.clearInputFields = function clearInputFields () {
        this.inputFields().forEach(function (field) { return (field.value = ''); });
      };

      RecipientForm.prototype.enableInputFields = function enableInputFields () {
        this.disableableFields().forEach(function (field) { return (field.disabled = false); });
      };

      RecipientForm.prototype.disableInputFields = function disableInputFields () {
        this.disableableFields().forEach(function (field) { return (field.disabled = true); });
      };

      RecipientForm.prototype.displayErrorMessage = function displayErrorMessage (title, body) {
        var this$1 = this;

        this.clearErrorMessage();
        this.errorMessageWrapper.hidden = false;
        if (typeof body === 'object') {
          this.errorMessage.innerText = this.defaultErrorHeader;
          return Object.entries(body).forEach(function (ref) {
            var key = ref[0];
            var value = ref[1];

            var errorMessageId = "RecipientForm-" + key + "-error-" + (this$1.dataset.sectionId);
            var fieldSelector = "#Recipient-" + key + "-" + (this$1.dataset.sectionId);
            var message = "" + (value.join(', '));
            var errorMessageElement = this$1.querySelector(("#" + errorMessageId));
            var errorTextElement = errorMessageElement ? errorMessageElement.querySelector('.error-message') : undefined;
            if (!errorTextElement) { return; }

            if (this$1.errorMessageList) {
              this$1.errorMessageList.appendChild(this$1.createErrorListItem(fieldSelector, message));
            }

            errorTextElement.innerText = message + ".";
            errorMessageElement.classList.remove('hidden');

            var inputElement = this$1[(key + "Input")];
            if (!inputElement) { return; }

            inputElement.setAttribute('aria-invalid', true);
            inputElement.setAttribute('aria-describedby', errorMessageId);
          });
        }

        this.errorMessage.innerText = body;
      };

      RecipientForm.prototype.createErrorListItem = function createErrorListItem (target, message) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.setAttribute('href', target);
        a.innerText = message;
        li.appendChild(a);
        li.className = 'error-message';
        return li;
      };

      RecipientForm.prototype.clearErrorMessage = function clearErrorMessage () {
        this.errorMessageWrapper.hidden = true;

        if (this.errorMessageList) { this.errorMessageList.innerHTML = ''; }

        this.querySelectorAll('.recipient-fields .form__message').forEach(function (field) {
          field.classList.add('hidden');
          var textField = field.querySelector('.error-message');
          if (textField) { textField.innerText = ''; }
        });

        [this.emailInput, this.messageInput, this.nameInput, this.sendonInput].forEach(function (inputElement) {
          inputElement.setAttribute('aria-invalid', false);
          inputElement.removeAttribute('aria-describedby');
        });
      };

      RecipientForm.prototype.resetRecipientForm = function resetRecipientForm () {
        if (this.checkboxInput.checked) {
          this.checkboxInput.checked = false;
          this.clearInputFields();
          this.clearErrorMessage();
        }
      };

    return RecipientForm;
  }(HTMLElement))
  );
}


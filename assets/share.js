if (!customElements.get('share-button')) {
  customElements.define(
    'share-button',
    /*@__PURE__*/(function (DetailsDisclosure) {
    function ShareButton() {
        var this$1 = this;

        DetailsDisclosure.call(this);

        this.elements = {
          shareButton: this.querySelector('button'),
          shareSummary: this.querySelector('summary'),
          closeButton: this.querySelector('.share-button__close'),
          successMessage: this.querySelector('[id^="ShareMessage"]'),
          urlInput: this.querySelector('input'),
        };
        this.urlToShare = this.elements.urlInput ? this.elements.urlInput.value : document.location.href;

        if (navigator.share) {
          this.mainDetailsToggle.setAttribute('hidden', '');
          this.elements.shareButton.classList.remove('hidden');
          this.elements.shareButton.addEventListener('click', function () {
            navigator.share({ url: this$1.urlToShare, title: document.title });
          });
        } else {
          this.mainDetailsToggle.addEventListener('toggle', this.toggleDetails.bind(this));
          this.mainDetailsToggle
            .querySelector('.share-button__copy')
            .addEventListener('click', this.copyToClipboard.bind(this));
          this.mainDetailsToggle.querySelector('.share-button__close').addEventListener('click', this.close.bind(this));
        }
      }

    if ( DetailsDisclosure ) ShareButton.__proto__ = DetailsDisclosure;
    ShareButton.prototype = Object.create( DetailsDisclosure && DetailsDisclosure.prototype );
    ShareButton.prototype.constructor = ShareButton;

      ShareButton.prototype.toggleDetails = function toggleDetails () {
        if (!this.mainDetailsToggle.open) {
          this.elements.successMessage.classList.add('hidden');
          this.elements.successMessage.textContent = '';
          this.elements.closeButton.classList.add('hidden');
          this.elements.shareSummary.focus();
        }
      };

      ShareButton.prototype.copyToClipboard = function copyToClipboard () {
        var this$1 = this;

        navigator.clipboard.writeText(this.elements.urlInput.value).then(function () {
          this$1.elements.successMessage.classList.remove('hidden');
          this$1.elements.successMessage.textContent = window.accessibilityStrings.shareSuccess;
          this$1.elements.closeButton.classList.remove('hidden');
          this$1.elements.closeButton.focus();
        });
      };

      ShareButton.prototype.updateUrl = function updateUrl (url) {
        this.urlToShare = url;
        this.elements.urlInput.value = url;
      };

    return ShareButton;
  }(DetailsDisclosure))
  );
}


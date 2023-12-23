if (!customElements.get('quick-add-modal')) {
  customElements.define(
    'quick-add-modal',
    /*@__PURE__*/(function (ModalDialog) {
    function QuickAddModal() {
        ModalDialog.call(this);
        this.modalContent = this.querySelector('[id^="QuickAddInfo-"]');
      }

    if ( ModalDialog ) QuickAddModal.__proto__ = ModalDialog;
    QuickAddModal.prototype = Object.create( ModalDialog && ModalDialog.prototype );
    QuickAddModal.prototype.constructor = QuickAddModal;

      QuickAddModal.prototype.hide = function hide (preventFocus) {
        if ( preventFocus === void 0 ) preventFocus = false;

        var cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        if (cartNotification) { cartNotification.setActiveElement(this.openedBy); }
        this.modalContent.innerHTML = '';

        if (preventFocus) { this.openedBy = null; }
        ModalDialog.prototype.hide.call(this);
      };

      QuickAddModal.prototype.show = function show (opener) {
        var this$1 = this;

        opener.setAttribute('aria-disabled', true);
        opener.classList.add('loading');
        opener.querySelector('.loading__spinner').classList.remove('hidden');

        fetch(opener.getAttribute('data-product-url'))
          .then(function (response) { return response.text(); })
          .then(function (responseText) {
            var responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
            this$1.productElement = responseHTML.querySelector('section[id^="MainProduct-"]');
            this$1.productElement.classList.forEach(function (classApplied) {
              if (classApplied.startsWith('color-') || classApplied === 'gradient')
                { this$1.modalContent.classList.add(classApplied); }
            });
            this$1.preventDuplicatedIDs();
            this$1.removeDOMElements();
            this$1.setInnerHTML(this$1.modalContent, this$1.productElement.innerHTML);

            if (window.Shopify && Shopify.PaymentButton) {
              Shopify.PaymentButton.init();
            }

            if (window.ProductModel) { window.ProductModel.loadShopifyXR(); }

            this$1.removeGalleryListSemantic();
            this$1.updateImageSizes();
            this$1.preventVariantURLSwitching();
            ModalDialog.prototype.show.call(this$1, opener);
          })
          .finally(function () {
            opener.removeAttribute('aria-disabled');
            opener.classList.remove('loading');
            opener.querySelector('.loading__spinner').classList.add('hidden');
          });
      };

      QuickAddModal.prototype.setInnerHTML = function setInnerHTML (element, html) {
        element.innerHTML = html;

        // Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
        element.querySelectorAll('script').forEach(function (oldScriptTag) {
          var newScriptTag = document.createElement('script');
          Array.from(oldScriptTag.attributes).forEach(function (attribute) {
            newScriptTag.setAttribute(attribute.name, attribute.value);
          });
          newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
          oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
        });
      };

      QuickAddModal.prototype.preventVariantURLSwitching = function preventVariantURLSwitching () {
        var variantPicker = this.modalContent.querySelector('variant-radios,variant-selects');
        if (!variantPicker) { return; }

        variantPicker.setAttribute('data-update-url', 'false');
      };

      QuickAddModal.prototype.removeDOMElements = function removeDOMElements () {
        var pickupAvailability = this.productElement.querySelector('pickup-availability');
        if (pickupAvailability) { pickupAvailability.remove(); }

        var productModal = this.productElement.querySelector('product-modal');
        if (productModal) { productModal.remove(); }

        var modalDialog = this.productElement.querySelectorAll('modal-dialog');
        if (modalDialog) { modalDialog.forEach(function (modal) { return modal.remove(); }); }
      };

      QuickAddModal.prototype.preventDuplicatedIDs = function preventDuplicatedIDs () {
        var sectionId = this.productElement.dataset.section;
        this.productElement.innerHTML = this.productElement.innerHTML.replaceAll(sectionId, ("quickadd-" + sectionId));
        this.productElement.querySelectorAll('variant-selects, variant-radios, product-info').forEach(function (element) {
          element.dataset.originalSection = sectionId;
        });
      };

      QuickAddModal.prototype.removeGalleryListSemantic = function removeGalleryListSemantic () {
        var galleryList = this.modalContent.querySelector('[id^="Slider-Gallery"]');
        if (!galleryList) { return; }

        galleryList.setAttribute('role', 'presentation');
        galleryList.querySelectorAll('[id^="Slide-"]').forEach(function (li) { return li.setAttribute('role', 'presentation'); });
      };

      QuickAddModal.prototype.updateImageSizes = function updateImageSizes () {
        var product = this.modalContent.querySelector('.product');
        var desktopColumns = product.classList.contains('product--columns');
        if (!desktopColumns) { return; }

        var mediaImages = product.querySelectorAll('.product__media img');
        if (!mediaImages.length) { return; }

        var mediaImageSizes =
          '(min-width: 1000px) 715px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)';

        if (product.classList.contains('product--medium')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '605px');
        } else if (product.classList.contains('product--small')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '495px');
        }

        mediaImages.forEach(function (img) { return img.setAttribute('sizes', mediaImageSizes); });
      };

    return QuickAddModal;
  }(ModalDialog))
  );
}


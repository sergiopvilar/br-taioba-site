if (!customElements.get('product-modal')) {
  customElements.define(
    'product-modal',
    /*@__PURE__*/(function (ModalDialog) {
    function ProductModal() {
        ModalDialog.call(this);
      }

    if ( ModalDialog ) ProductModal.__proto__ = ModalDialog;
    ProductModal.prototype = Object.create( ModalDialog && ModalDialog.prototype );
    ProductModal.prototype.constructor = ProductModal;

      ProductModal.prototype.hide = function hide () {
        ModalDialog.prototype.hide.call(this);
      };

      ProductModal.prototype.show = function show (opener) {
        ModalDialog.prototype.show.call(this, opener);
        this.showActiveMedia();
      };

      ProductModal.prototype.showActiveMedia = function showActiveMedia () {
        this.querySelectorAll(
          ("[data-media-id]:not([data-media-id=\"" + (this.openedBy.getAttribute('data-media-id')) + "\"])")
        ).forEach(function (element) {
          element.classList.remove('active');
        });
        var activeMedia = this.querySelector(("[data-media-id=\"" + (this.openedBy.getAttribute('data-media-id')) + "\"]"));
        var activeMediaTemplate = activeMedia.querySelector('template');
        var activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
        activeMedia.classList.add('active');
        activeMedia.scrollIntoView();

        var container = this.querySelector('[role="document"]');
        container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

        if (
          activeMedia.nodeName == 'DEFERRED-MEDIA' &&
          activeMediaContent &&
          activeMediaContent.querySelector('.js-youtube')
        )
          { activeMedia.loadContent(); }
      };

    return ProductModal;
  }(ModalDialog))
  );
}


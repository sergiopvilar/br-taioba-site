if (!customElements.get('product-model')) {
  customElements.define(
    'product-model',
    /*@__PURE__*/(function (DeferredMedia) {
    function ProductModel() {
        DeferredMedia.call(this);
      }

    if ( DeferredMedia ) ProductModel.__proto__ = DeferredMedia;
    ProductModel.prototype = Object.create( DeferredMedia && DeferredMedia.prototype );
    ProductModel.prototype.constructor = ProductModel;

      ProductModel.prototype.loadContent = function loadContent () {
        DeferredMedia.prototype.loadContent.call(this);

        Shopify.loadFeatures([
          {
            name: 'model-viewer-ui',
            version: '1.0',
            onLoad: this.setupModelViewerUI.bind(this),
          } ]);
      };

      ProductModel.prototype.setupModelViewerUI = function setupModelViewerUI (errors) {
        if (errors) { return; }

        this.modelViewerUI = new Shopify.ModelViewerUI(this.querySelector('model-viewer'));
      };

    return ProductModel;
  }(DeferredMedia))
  );
}

window.ProductModel = {
  loadShopifyXR: function loadShopifyXR() {
    Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: this.setupShopifyXR.bind(this),
      } ]);
  },

  setupShopifyXR: function setupShopifyXR(errors) {
    var this$1 = this;

    if (errors) { return; }

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function () { return this$1.setupShopifyXR(); });
      return;
    }

    document.querySelectorAll('[id^="ProductJSON-"]').forEach(function (modelJSON) {
      window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
      modelJSON.remove();
    });
    window.ShopifyXR.setupXRElements();
  },
};

window.addEventListener('DOMContentLoaded', function () {
  if (window.ProductModel) { window.ProductModel.loadShopifyXR(); }
});


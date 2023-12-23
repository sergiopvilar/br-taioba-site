'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('product-model')) {
  customElements.define('product-model', function (_DeferredMedia) {
    _inherits(ProductModel, _DeferredMedia);

    function ProductModel() {
      _classCallCheck(this, ProductModel);

      return _possibleConstructorReturn(this, (ProductModel.__proto__ || Object.getPrototypeOf(ProductModel)).call(this));
    }

    _createClass(ProductModel, [{
      key: 'loadContent',
      value: function loadContent() {
        _get(ProductModel.prototype.__proto__ || Object.getPrototypeOf(ProductModel.prototype), 'loadContent', this).call(this);

        Shopify.loadFeatures([{
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: this.setupModelViewerUI.bind(this)
        }]);
      }
    }, {
      key: 'setupModelViewerUI',
      value: function setupModelViewerUI(errors) {
        if (errors) return;

        this.modelViewerUI = new Shopify.ModelViewerUI(this.querySelector('model-viewer'));
      }
    }]);

    return ProductModel;
  }(DeferredMedia));
}

window.ProductModel = {
  loadShopifyXR: function loadShopifyXR() {
    Shopify.loadFeatures([{
      name: 'shopify-xr',
      version: '1.0',
      onLoad: this.setupShopifyXR.bind(this)
    }]);
  },
  setupShopifyXR: function setupShopifyXR(errors) {
    var _this2 = this;

    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function () {
        return _this2.setupShopifyXR();
      });
      return;
    }

    document.querySelectorAll('[id^="ProductJSON-"]').forEach(function (modelJSON) {
      window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
      modelJSON.remove();
    });
    window.ShopifyXR.setupXRElements();
  }
};

window.addEventListener('DOMContentLoaded', function () {
  if (window.ProductModel) window.ProductModel.loadShopifyXR();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!customElements.get('pickup-availability')) {
  customElements.define('pickup-availability', function (_HTMLElement) {
    _inherits(PickupAvailability, _HTMLElement);

    function PickupAvailability() {
      _classCallCheck(this, PickupAvailability);

      var _this = _possibleConstructorReturn(this, (PickupAvailability.__proto__ || Object.getPrototypeOf(PickupAvailability)).call(this));

      if (!_this.hasAttribute('available')) return _possibleConstructorReturn(_this);

      _this.errorHtml = _this.querySelector('template').content.firstElementChild.cloneNode(true);
      _this.onClickRefreshList = _this.onClickRefreshList.bind(_this);
      _this.fetchAvailability(_this.dataset.variantId);
      return _this;
    }

    _createClass(PickupAvailability, [{
      key: 'fetchAvailability',
      value: function fetchAvailability(variantId) {
        var _this2 = this;

        var rootUrl = this.dataset.rootUrl;
        if (!rootUrl.endsWith('/')) {
          rootUrl = rootUrl + '/';
        }
        var variantSectionUrl = rootUrl + 'variants/' + variantId + '/?section_id=pickup-availability';

        fetch(variantSectionUrl).then(function (response) {
          return response.text();
        }).then(function (text) {
          var sectionInnerHTML = new DOMParser().parseFromString(text, 'text/html').querySelector('.shopify-section');
          _this2.renderPreview(sectionInnerHTML);
        }).catch(function (e) {
          var button = _this2.querySelector('button');
          if (button) button.removeEventListener('click', _this2.onClickRefreshList);
          _this2.renderError();
        });
      }
    }, {
      key: 'onClickRefreshList',
      value: function onClickRefreshList(evt) {
        this.fetchAvailability(this.dataset.variantId);
      }
    }, {
      key: 'renderError',
      value: function renderError() {
        this.innerHTML = '';
        this.appendChild(this.errorHtml);

        this.querySelector('button').addEventListener('click', this.onClickRefreshList);
      }
    }, {
      key: 'renderPreview',
      value: function renderPreview(sectionInnerHTML) {
        var drawer = document.querySelector('pickup-availability-drawer');
        if (drawer) drawer.remove();
        if (!sectionInnerHTML.querySelector('pickup-availability-preview')) {
          this.innerHTML = '';
          this.removeAttribute('available');
          return;
        }

        this.innerHTML = sectionInnerHTML.querySelector('pickup-availability-preview').outerHTML;
        this.setAttribute('available', '');

        document.body.appendChild(sectionInnerHTML.querySelector('pickup-availability-drawer'));
        var colorClassesToApply = this.dataset.productPageColorScheme.split(' ');
        colorClassesToApply.forEach(function (colorClass) {
          document.querySelector('pickup-availability-drawer').classList.add(colorClass);
        });

        var button = this.querySelector('button');
        if (button) button.addEventListener('click', function (evt) {
          document.querySelector('pickup-availability-drawer').show(evt.target);
        });
      }
    }]);

    return PickupAvailability;
  }(HTMLElement));
}

if (!customElements.get('pickup-availability-drawer')) {
  customElements.define('pickup-availability-drawer', function (_HTMLElement2) {
    _inherits(PickupAvailabilityDrawer, _HTMLElement2);

    function PickupAvailabilityDrawer() {
      _classCallCheck(this, PickupAvailabilityDrawer);

      var _this3 = _possibleConstructorReturn(this, (PickupAvailabilityDrawer.__proto__ || Object.getPrototypeOf(PickupAvailabilityDrawer)).call(this));

      _this3.onBodyClick = _this3.handleBodyClick.bind(_this3);

      _this3.querySelector('button').addEventListener('click', function () {
        _this3.hide();
      });

      _this3.addEventListener('keyup', function (event) {
        if (event.code.toUpperCase() === 'ESCAPE') _this3.hide();
      });
      return _this3;
    }

    _createClass(PickupAvailabilityDrawer, [{
      key: 'handleBodyClick',
      value: function handleBodyClick(evt) {
        var target = evt.target;
        if (target != this && !target.closest('pickup-availability-drawer') && target.id != 'ShowPickupAvailabilityDrawer') {
          this.hide();
        }
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.removeAttribute('open');
        document.body.removeEventListener('click', this.onBodyClick);
        document.body.classList.remove('overflow-hidden');
        removeTrapFocus(this.focusElement);
      }
    }, {
      key: 'show',
      value: function show(focusElement) {
        this.focusElement = focusElement;
        this.setAttribute('open', '');
        document.body.addEventListener('click', this.onBodyClick);
        document.body.classList.add('overflow-hidden');
        trapFocus(this);
      }
    }]);

    return PickupAvailabilityDrawer;
  }(HTMLElement));
}
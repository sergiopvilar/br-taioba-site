if (!customElements.get('pickup-availability')) {
  customElements.define(
    'pickup-availability',
    /*@__PURE__*/(function (HTMLElement) {
    function PickupAvailability() {
        HTMLElement.call(this);

        if (!this.hasAttribute('available')) { return; }

        this.errorHtml = this.querySelector('template').content.firstElementChild.cloneNode(true);
        this.onClickRefreshList = this.onClickRefreshList.bind(this);
        this.fetchAvailability(this.dataset.variantId);
      }

    if ( HTMLElement ) PickupAvailability.__proto__ = HTMLElement;
    PickupAvailability.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    PickupAvailability.prototype.constructor = PickupAvailability;

      PickupAvailability.prototype.fetchAvailability = function fetchAvailability (variantId) {
        var this$1 = this;

        var rootUrl = this.dataset.rootUrl;
        if (!rootUrl.endsWith('/')) {
          rootUrl = rootUrl + '/';
        }
        var variantSectionUrl = rootUrl + "variants/" + variantId + "/?section_id=pickup-availability";

        fetch(variantSectionUrl)
          .then(function (response) { return response.text(); })
          .then(function (text) {
            var sectionInnerHTML = new DOMParser()
              .parseFromString(text, 'text/html')
              .querySelector('.shopify-section');
            this$1.renderPreview(sectionInnerHTML);
          })
          .catch(function (e) {
            var button = this$1.querySelector('button');
            if (button) { button.removeEventListener('click', this$1.onClickRefreshList); }
            this$1.renderError();
          });
      };

      PickupAvailability.prototype.onClickRefreshList = function onClickRefreshList (evt) {
        this.fetchAvailability(this.dataset.variantId);
      };

      PickupAvailability.prototype.renderError = function renderError () {
        this.innerHTML = '';
        this.appendChild(this.errorHtml);

        this.querySelector('button').addEventListener('click', this.onClickRefreshList);
      };

      PickupAvailability.prototype.renderPreview = function renderPreview (sectionInnerHTML) {
        var drawer = document.querySelector('pickup-availability-drawer');
        if (drawer) { drawer.remove(); }
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
        if (button)
          { button.addEventListener('click', function (evt) {
            document.querySelector('pickup-availability-drawer').show(evt.target);
          }); }
      };

    return PickupAvailability;
  }(HTMLElement))
  );
}

if (!customElements.get('pickup-availability-drawer')) {
  customElements.define(
    'pickup-availability-drawer',
    /*@__PURE__*/(function (HTMLElement) {
    function PickupAvailabilityDrawer() {
        var this$1 = this;

        HTMLElement.call(this);

        this.onBodyClick = this.handleBodyClick.bind(this);

        this.querySelector('button').addEventListener('click', function () {
          this$1.hide();
        });

        this.addEventListener('keyup', function (event) {
          if (event.code.toUpperCase() === 'ESCAPE') { this$1.hide(); }
        });
      }

    if ( HTMLElement ) PickupAvailabilityDrawer.__proto__ = HTMLElement;
    PickupAvailabilityDrawer.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    PickupAvailabilityDrawer.prototype.constructor = PickupAvailabilityDrawer;

      PickupAvailabilityDrawer.prototype.handleBodyClick = function handleBodyClick (evt) {
        var target = evt.target;
        if (
          target != this &&
          !target.closest('pickup-availability-drawer') &&
          target.id != 'ShowPickupAvailabilityDrawer'
        ) {
          this.hide();
        }
      };

      PickupAvailabilityDrawer.prototype.hide = function hide () {
        this.removeAttribute('open');
        document.body.removeEventListener('click', this.onBodyClick);
        document.body.classList.remove('overflow-hidden');
        removeTrapFocus(this.focusElement);
      };

      PickupAvailabilityDrawer.prototype.show = function show (focusElement) {
        this.focusElement = focusElement;
        this.setAttribute('open', '');
        document.body.addEventListener('click', this.onBodyClick);
        document.body.classList.add('overflow-hidden');
        trapFocus(this);
      };

    return PickupAvailabilityDrawer;
  }(HTMLElement))
  );
}


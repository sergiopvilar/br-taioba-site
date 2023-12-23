function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

document.querySelectorAll('[id^="Details-"] summary').forEach(function (summary) {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

  if (summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', function (event) {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });

  if (summary.closest('header-drawer, menu-drawer')) { return; }
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});

var trapFocusHandlers = {};

function trapFocus(container, elementToFocus) {
  if ( elementToFocus === void 0 ) elementToFocus = container;

  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = function (event) {
    if (event.target !== container && event.target !== last && event.target !== first) { return; }

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function () {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') { return; } // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();

  if (
    elementToFocus.tagName === 'INPUT' &&
    ['search', 'text', 'email', 'url'].includes(elementToFocus.type) &&
    elementToFocus.value
  ) {
    elementToFocus.setSelectionRange(0, elementToFocus.value.length);
  }
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(':focus-visible');
} catch (e) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  var navKeys = [
    'ARROWUP',
    'ARROWDOWN',
    'ARROWLEFT',
    'ARROWRIGHT',
    'TAB',
    'ENTER',
    'SPACE',
    'ESCAPE',
    'HOME',
    'END',
    'PAGEUP',
    'PAGEDOWN' ];
  var currentFocusedElement = null;
  var mouseClick = null;

  window.addEventListener('keydown', function (event) {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener('mousedown', function (event) {
    mouseClick = true;
  });

  window.addEventListener(
    'focus',
    function () {
      if (currentFocusedElement) { currentFocusedElement.classList.remove('focused'); }

      if (mouseClick) { return; }

      currentFocusedElement = document.activeElement;
      currentFocusedElement.classList.add('focused');
    },
    true
  );
}

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach(function (video) {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach(function (video) {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach(function (video) { return video.pause(); });
  document.querySelectorAll('product-model').forEach(function (model) {
    if (model.modelViewerUI) { model.modelViewerUI.pause(); }
  });
}

function removeTrapFocus(elementToFocus) {
  if ( elementToFocus === void 0 ) elementToFocus = null;

  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) { elementToFocus.focus(); }
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') { return; }

  var openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) { return; }

  var summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}

var QuantityInput = /*@__PURE__*/(function (HTMLElement) {
  function QuantityInput() {
    var this$1 = this;

    HTMLElement.call(this);
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true });
    this.input.addEventListener('change', this.onInputChange.bind(this));
    this.querySelectorAll('button').forEach(function (button) { return button.addEventListener('click', this$1.onButtonClick.bind(this$1)); }
    );

    this.quantityUpdateUnsubscriber = undefined;
  }

  if ( HTMLElement ) QuantityInput.__proto__ = HTMLElement;
  QuantityInput.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  QuantityInput.prototype.constructor = QuantityInput;

  QuantityInput.prototype.connectedCallback = function connectedCallback () {
    this.validateQtyRules();
    this.quantityUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.quantityUpdate, this.validateQtyRules.bind(this));
  };

  QuantityInput.prototype.disconnectedCallback = function disconnectedCallback () {
    if (this.quantityUpdateUnsubscriber) {
      this.quantityUpdateUnsubscriber();
    }
  };

  QuantityInput.prototype.onInputChange = function onInputChange (event) {
    this.validateQtyRules();
  };

  QuantityInput.prototype.onButtonClick = function onButtonClick (event) {
    event.preventDefault();
    var previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) { this.input.dispatchEvent(this.changeEvent); }
  };

  QuantityInput.prototype.validateQtyRules = function validateQtyRules () {
    var value = parseInt(this.input.value);
    if (this.input.min) {
      var min = parseInt(this.input.min);
      var buttonMinus = this.querySelector(".quantity__button[name='minus']");
      buttonMinus.classList.toggle('disabled', value <= min);
    }
    if (this.input.max) {
      var max = parseInt(this.input.max);
      var buttonPlus = this.querySelector(".quantity__button[name='plus']");
      buttonPlus.classList.toggle('disabled', value >= max);
    }
  };

  return QuantityInput;
}(HTMLElement));

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  var this$1 = this;

  var t;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    clearTimeout(t);
    t = setTimeout(function () { return fn.apply(this$1, args); }, wait);
  };
}

function throttle(fn, delay) {
  var lastCall = 0;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn.apply(void 0, args);
  };
}

function fetchConfig(type) {
  if ( type === void 0 ) type = 'json';

  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: ("application/" + type) },
  };
}

/*
 * Shopify Common JS
 *
 */
if (typeof window.Shopify == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent('on' + eventName, callback);
};

Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);

  for (var key in params) {
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function () {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function (e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = '';
    }
  },

  clearOptions: function (selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function (selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  },
};

var MenuDrawer = /*@__PURE__*/(function (HTMLElement) {
  function MenuDrawer() {
    HTMLElement.call(this);

    this.mainDetailsToggle = this.querySelector('details');

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  if ( HTMLElement ) MenuDrawer.__proto__ = HTMLElement;
  MenuDrawer.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  MenuDrawer.prototype.constructor = MenuDrawer;

  MenuDrawer.prototype.bindEvents = function bindEvents () {
    var this$1 = this;

    this.querySelectorAll('summary').forEach(function (summary) { return summary.addEventListener('click', this$1.onSummaryClick.bind(this$1)); }
    );
    this.querySelectorAll('button:not(.localization-selector)').forEach(function (button) { return button.addEventListener('click', this$1.onCloseButtonClick.bind(this$1)); }
    );
  };

  MenuDrawer.prototype.onKeyUp = function onKeyUp (event) {
    if (event.code.toUpperCase() !== 'ESCAPE') { return; }

    var openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) { return; }

    openDetailsElement === this.mainDetailsToggle
      ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary'))
      : this.closeSubmenu(openDetailsElement);
  };

  MenuDrawer.prototype.onSummaryClick = function onSummaryClick (event) {
    var summaryElement = event.currentTarget;
    var detailsElement = summaryElement.parentNode;
    var parentMenuElement = detailsElement.closest('.has-submenu');
    var isOpen = detailsElement.hasAttribute('open');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function addTrapFocus() {
      trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
      summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
    }

    if (detailsElement === this.mainDetailsToggle) {
      if (isOpen) { event.preventDefault(); }
      isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);

      if (window.matchMedia('(max-width: 990px)')) {
        document.documentElement.style.setProperty('--viewport-height', ((window.innerHeight) + "px"));
      }
    } else {
      setTimeout(function () {
        detailsElement.classList.add('menu-opening');
        summaryElement.setAttribute('aria-expanded', true);
        parentMenuElement && parentMenuElement.classList.add('submenu-open');
        !reducedMotion || reducedMotion.matches
          ? addTrapFocus()
          : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
      }, 100);
    }
  };

  MenuDrawer.prototype.openMenuDrawer = function openMenuDrawer (summaryElement) {
    var this$1 = this;

    setTimeout(function () {
      this$1.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(("overflow-hidden-" + (this.dataset.breakpoint)));
  };

  MenuDrawer.prototype.closeMenuDrawer = function closeMenuDrawer (event, elementToFocus) {
    if ( elementToFocus === void 0 ) elementToFocus = false;

    if (event === undefined) { return; }

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach(function (details) {
      details.removeAttribute('open');
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle.querySelectorAll('.submenu-open').forEach(function (submenu) {
      submenu.classList.remove('submenu-open');
    });
    document.body.classList.remove(("overflow-hidden-" + (this.dataset.breakpoint)));
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);

    if (event instanceof KeyboardEvent && elementToFocus) { elementToFocus.setAttribute('aria-expanded', false); }
  };

  MenuDrawer.prototype.onFocusOut = function onFocusOut () {
    var this$1 = this;

    setTimeout(function () {
      if (this$1.mainDetailsToggle.hasAttribute('open') && !this$1.mainDetailsToggle.contains(document.activeElement))
        { this$1.closeMenuDrawer(); }
    });
  };

  MenuDrawer.prototype.onCloseButtonClick = function onCloseButtonClick (event) {
    var detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  };

  MenuDrawer.prototype.closeSubmenu = function closeSubmenu (detailsElement) {
    var parentMenuElement = detailsElement.closest('.submenu-open');
    parentMenuElement && parentMenuElement.classList.remove('submenu-open');
    detailsElement.classList.remove('menu-opening');
    detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
    removeTrapFocus(detailsElement.querySelector('summary'));
    this.closeAnimation(detailsElement);
  };

  MenuDrawer.prototype.closeAnimation = function closeAnimation (detailsElement) {
    var animationStart;

    var handleAnimation = function (time) {
      if (animationStart === undefined) {
        animationStart = time;
      }

      var elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
        }
      }
    };

    window.requestAnimationFrame(handleAnimation);
  };

  return MenuDrawer;
}(HTMLElement));

customElements.define('menu-drawer', MenuDrawer);

var HeaderDrawer = /*@__PURE__*/(function (MenuDrawer) {
  function HeaderDrawer() {
    MenuDrawer.call(this);
  }

  if ( MenuDrawer ) HeaderDrawer.__proto__ = MenuDrawer;
  HeaderDrawer.prototype = Object.create( MenuDrawer && MenuDrawer.prototype );
  HeaderDrawer.prototype.constructor = HeaderDrawer;

  HeaderDrawer.prototype.openMenuDrawer = function openMenuDrawer (summaryElement) {
    var this$1 = this;

    this.header = this.header || document.querySelector('.section-header');
    this.borderOffset =
      this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty(
      '--header-bottom-position',
      ((parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)) + "px")
    );
    this.header.classList.add('menu-open');

    setTimeout(function () {
      this$1.mainDetailsToggle.classList.add('menu-opening');
    });

    summaryElement.setAttribute('aria-expanded', true);
    window.addEventListener('resize', this.onResize);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(("overflow-hidden-" + (this.dataset.breakpoint)));
  };

  HeaderDrawer.prototype.closeMenuDrawer = function closeMenuDrawer (event, elementToFocus) {
    if (!elementToFocus) { return; }
    MenuDrawer.prototype.closeMenuDrawer.call(this, event, elementToFocus);
    this.header.classList.remove('menu-open');
    window.removeEventListener('resize', this.onResize);
  };

  HeaderDrawer.prototype.onResize = function onResize () {
    this.header &&
      document.documentElement.style.setProperty(
        '--header-bottom-position',
        ((parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)) + "px")
      );
    document.documentElement.style.setProperty('--viewport-height', ((window.innerHeight) + "px"));
  };

  return HeaderDrawer;
}(MenuDrawer));

customElements.define('header-drawer', HeaderDrawer);

var ModalDialog = /*@__PURE__*/(function (HTMLElement) {
  function ModalDialog() {
    var this$1 = this;

    HTMLElement.call(this);
    this.querySelector('[id^="ModalClose-"]').addEventListener('click', this.hide.bind(this, false));
    this.addEventListener('keyup', function (event) {
      if (event.code.toUpperCase() === 'ESCAPE') { this$1.hide(); }
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', function (event) {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) { this$1.hide(); }
      });
    } else {
      this.addEventListener('click', function (event) {
        if (event.target === this$1) { this$1.hide(); }
      });
    }
  }

  if ( HTMLElement ) ModalDialog.__proto__ = HTMLElement;
  ModalDialog.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  ModalDialog.prototype.constructor = ModalDialog;

  ModalDialog.prototype.connectedCallback = function connectedCallback () {
    if (this.moved) { return; }
    this.moved = true;
    document.body.appendChild(this);
  };

  ModalDialog.prototype.show = function show (opener) {
    this.openedBy = opener;
    var popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) { popup.loadContent(); }
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  };

  ModalDialog.prototype.hide = function hide () {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  };

  return ModalDialog;
}(HTMLElement));
customElements.define('modal-dialog', ModalDialog);

var ModalOpener = /*@__PURE__*/(function (HTMLElement) {
  function ModalOpener() {
    var this$1 = this;

    HTMLElement.call(this);

    var button = this.querySelector('button');

    if (!button) { return; }
    button.addEventListener('click', function () {
      var modal = document.querySelector(this$1.getAttribute('data-modal'));
      if (modal) { modal.show(button); }
    });
  }

  if ( HTMLElement ) ModalOpener.__proto__ = HTMLElement;
  ModalOpener.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  ModalOpener.prototype.constructor = ModalOpener;

  return ModalOpener;
}(HTMLElement));
customElements.define('modal-opener', ModalOpener);

var DeferredMedia = /*@__PURE__*/(function (HTMLElement) {
  function DeferredMedia() {
    HTMLElement.call(this);
    var poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) { return; }
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  if ( HTMLElement ) DeferredMedia.__proto__ = HTMLElement;
  DeferredMedia.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  DeferredMedia.prototype.constructor = DeferredMedia;

  DeferredMedia.prototype.loadContent = function loadContent (focus) {
    if ( focus === void 0 ) focus = true;

    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      var content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      var deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
      if (focus) { deferredElement.focus(); }
      if (deferredElement.nodeName == 'VIDEO' && deferredElement.getAttribute('autoplay')) {
        // force autoplay for safari
        deferredElement.play();
      }
    }
  };

  return DeferredMedia;
}(HTMLElement));

customElements.define('deferred-media', DeferredMedia);

var SliderComponent = /*@__PURE__*/(function (HTMLElement) {
  function SliderComponent() {
    var this$1 = this;

    HTMLElement.call(this);
    this.slider = this.querySelector('[id^="Slider-"]');
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.enableSliderLooping = false;
    this.currentPageElement = this.querySelector('.slider-counter--current');
    this.pageTotalElement = this.querySelector('.slider-counter--total');
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');

    if (!this.slider || !this.nextButton) { return; }

    this.initPages();
    var resizeObserver = new ResizeObserver(function (entries) { return this$1.initPages(); });
    resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', this.update.bind(this));
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
  }

  if ( HTMLElement ) SliderComponent.__proto__ = HTMLElement;
  SliderComponent.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  SliderComponent.prototype.constructor = SliderComponent;

  SliderComponent.prototype.initPages = function initPages () {
    this.sliderItemsToShow = Array.from(this.sliderItems).filter(function (element) { return element.clientWidth > 0; });
    if (this.sliderItemsToShow.length < 2) { return; }
    this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
    this.slidesPerPage = Math.floor(
      (this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset
    );
    this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
    this.update();
  };

  SliderComponent.prototype.resetPages = function resetPages () {
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.initPages();
  };

  SliderComponent.prototype.update = function update () {
    // Temporarily prevents unneeded updates resulting from variant changes
    // This should be refactored as part of https://github.com/Shopify/dawn/issues/2057
    if (!this.slider || !this.nextButton) { return; }

    var previousPage = this.currentPage;
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

    if (this.currentPageElement && this.pageTotalElement) {
      this.currentPageElement.textContent = this.currentPage;
      this.pageTotalElement.textContent = this.totalPages;
    }

    if (this.currentPage != previousPage) {
      this.dispatchEvent(
        new CustomEvent('slideChanged', {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1],
          },
        })
      );
    }

    if (this.enableSliderLooping) { return; }

    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
      this.prevButton.setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
      this.nextButton.setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  };

  SliderComponent.prototype.isSlideVisible = function isSlideVisible (element, offset) {
    if ( offset === void 0 ) offset = 0;

    var lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
    return element.offsetLeft + element.clientWidth <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
  };

  SliderComponent.prototype.onButtonClick = function onButtonClick (event) {
    event.preventDefault();
    var step = event.currentTarget.dataset.step || 1;
    this.slideScrollPosition =
      event.currentTarget.name === 'next'
        ? this.slider.scrollLeft + step * this.sliderItemOffset
        : this.slider.scrollLeft - step * this.sliderItemOffset;
    this.setSlidePosition(this.slideScrollPosition);
  };

  SliderComponent.prototype.setSlidePosition = function setSlidePosition (position) {
    this.slider.scrollTo({
      left: position,
    });
  };

  return SliderComponent;
}(HTMLElement));

customElements.define('slider-component', SliderComponent);

var SlideshowComponent = /*@__PURE__*/(function (SliderComponent) {
  function SlideshowComponent() {
    var this$1 = this;

    SliderComponent.call(this);
    this.sliderControlWrapper = this.querySelector('.slider-buttons');
    this.enableSliderLooping = true;

    if (!this.sliderControlWrapper) { return; }

    this.sliderFirstItemNode = this.slider.querySelector('.slideshow__slide');
    if (this.sliderItemsToShow.length > 0) { this.currentPage = 1; }

    this.announcementBarSlider = this.querySelector('.announcement-bar-slider');
    // Value below should match --duration-announcement-bar CSS value
    this.announcerBarAnimationDelay = this.announcementBarSlider ? 250 : 0;

    this.sliderControlLinksArray = Array.from(this.sliderControlWrapper.querySelectorAll('.slider-counter__link'));
    this.sliderControlLinksArray.forEach(function (link) { return link.addEventListener('click', this$1.linkToSlide.bind(this$1)); });
    this.slider.addEventListener('scroll', this.setSlideVisibility.bind(this));
    this.setSlideVisibility();

    if (this.announcementBarSlider) {
      this.announcementBarArrowButtonWasClicked = false;

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion.addEventListener('change', function () {
        if (this$1.slider.getAttribute('data-autoplay') === 'true') { this$1.setAutoPlay(); }
      });

      [this.prevButton, this.nextButton].forEach(function (button) {
        button.addEventListener(
          'click',
          function () {
            this$1.announcementBarArrowButtonWasClicked = true;
          },
          { once: true }
        );
      });
    }

    if (this.slider.getAttribute('data-autoplay') === 'true') { this.setAutoPlay(); }
  }

  if ( SliderComponent ) SlideshowComponent.__proto__ = SliderComponent;
  SlideshowComponent.prototype = Object.create( SliderComponent && SliderComponent.prototype );
  SlideshowComponent.prototype.constructor = SlideshowComponent;

  SlideshowComponent.prototype.setAutoPlay = function setAutoPlay () {
    this.autoplaySpeed = this.slider.dataset.speed * 1000;
    this.addEventListener('mouseover', this.focusInHandling.bind(this));
    this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
    this.addEventListener('focusin', this.focusInHandling.bind(this));
    this.addEventListener('focusout', this.focusOutHandling.bind(this));

    if (this.querySelector('.slideshow__autoplay')) {
      this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
      this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
      this.autoplayButtonIsSetToPlay = true;
      this.play();
    } else {
      this.reducedMotion.matches || this.announcementBarArrowButtonWasClicked
        ? this.pause()
        : this.play();
    }
  };

  SlideshowComponent.prototype.onButtonClick = function onButtonClick (event) {
    SliderComponent.prototype.onButtonClick.call(this, event);
    this.wasClicked = true;

    var isFirstSlide = this.currentPage === 1;
    var isLastSlide = this.currentPage === this.sliderItemsToShow.length;

    if (!isFirstSlide && !isLastSlide) {
      this.applyAnimationToAnnouncementBar(event.currentTarget.name);
      return;
    }

    if (isFirstSlide && event.currentTarget.name === 'previous') {
      this.slideScrollPosition =
        this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
    } else if (isLastSlide && event.currentTarget.name === 'next') {
      this.slideScrollPosition = 0;
    }

    this.setSlidePosition(this.slideScrollPosition);

    this.applyAnimationToAnnouncementBar(event.currentTarget.name);
  };

  SlideshowComponent.prototype.setSlidePosition = function setSlidePosition (position) {
    var this$1 = this;

    if (this.setPositionTimeout) { clearTimeout(this.setPositionTimeout); }
    this.setPositionTimeout = setTimeout(function () {
      this$1.slider.scrollTo({
        left: position,
      });
    }, this.announcerBarAnimationDelay);
  };

  SlideshowComponent.prototype.update = function update () {
    SliderComponent.prototype.update.call(this);
    this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
    this.prevButton.removeAttribute('disabled');

    if (!this.sliderControlButtons.length) { return; }

    this.sliderControlButtons.forEach(function (link) {
      link.classList.remove('slider-counter__link--active');
      link.removeAttribute('aria-current');
    });
    this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
    this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
  };

  SlideshowComponent.prototype.autoPlayToggle = function autoPlayToggle () {
    this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
    this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
    this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
  };

  SlideshowComponent.prototype.focusOutHandling = function focusOutHandling (event) {
    if (this.sliderAutoplayButton) {
      var focusedOnAutoplayButton =
        event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) { return; }
      this.play();
    } else if (
      !this.reducedMotion.matches &&
      !this.announcementBarArrowButtonWasClicked
    ) {
      this.play();
    }
  };

  SlideshowComponent.prototype.focusInHandling = function focusInHandling (event) {
    if (this.sliderAutoplayButton) {
      var focusedOnAutoplayButton =
        event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
        this.play();
      } else if (this.autoplayButtonIsSetToPlay) {
        this.pause();
      }
    } else if (this.announcementBarSlider.contains(event.target)) {
      this.pause();
    }
  };

  SlideshowComponent.prototype.play = function play () {
    this.slider.setAttribute('aria-live', 'off');
    clearInterval(this.autoplay);
    this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
  };

  SlideshowComponent.prototype.pause = function pause () {
    this.slider.setAttribute('aria-live', 'polite');
    clearInterval(this.autoplay);
  };

  SlideshowComponent.prototype.togglePlayButtonState = function togglePlayButtonState (pauseAutoplay) {
    if (pauseAutoplay) {
      this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
    } else {
      this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
    }
  };

  SlideshowComponent.prototype.autoRotateSlides = function autoRotateSlides () {
    var slideScrollPosition =
      this.currentPage === this.sliderItems.length
        ? 0
        : this.slider.scrollLeft + this.sliderItemOffset;

    this.setSlidePosition(slideScrollPosition);
    this.applyAnimationToAnnouncementBar();
  };

  SlideshowComponent.prototype.setSlideVisibility = function setSlideVisibility (event) {
    var this$1 = this;

    this.sliderItemsToShow.forEach(function (item, index) {
      var linkElements = item.querySelectorAll('a');
      if (index === this$1.currentPage - 1) {
        if (linkElements.length)
          { linkElements.forEach(function (button) {
            button.removeAttribute('tabindex');
          }); }
        item.setAttribute('aria-hidden', 'false');
        item.removeAttribute('tabindex');
      } else {
        if (linkElements.length)
          { linkElements.forEach(function (button) {
            button.setAttribute('tabindex', '-1');
          }); }
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
      }
    });
    this.wasClicked = false;
  };

  SlideshowComponent.prototype.applyAnimationToAnnouncementBar = function applyAnimationToAnnouncementBar (button) {
    if ( button === void 0 ) button = 'next';

    if (!this.announcementBarSlider) { return; }

    var itemsCount = this.sliderItems.length;
    var increment = button === 'next' ? 1 : -1;

    var currentIndex = this.currentPage - 1;
    var nextIndex = (currentIndex + increment) % itemsCount;
    nextIndex = nextIndex === -1 ? itemsCount - 1 : nextIndex;

    var nextSlide = this.sliderItems[nextIndex];
    var currentSlide = this.sliderItems[currentIndex];

    var animationClassIn = 'announcement-bar-slider--fade-in';
    var animationClassOut = 'announcement-bar-slider--fade-out';

    var isFirstSlide = currentIndex === 0;
    var isLastSlide = currentIndex === itemsCount - 1;

    var shouldMoveNext = (button === 'next' && !isLastSlide) || (button === 'previous' && isFirstSlide);
    var direction = shouldMoveNext ? 'next' : 'previous';

    currentSlide.classList.add((animationClassOut + "-" + direction));
    nextSlide.classList.add((animationClassIn + "-" + direction));

    setTimeout(function () {
      currentSlide.classList.remove((animationClassOut + "-" + direction));
      nextSlide.classList.remove((animationClassIn + "-" + direction));
    }, this.announcerBarAnimationDelay * 2);
  };

  SlideshowComponent.prototype.linkToSlide = function linkToSlide (event) {
    event.preventDefault();
    var slideScrollPosition =
      this.slider.scrollLeft +
      this.sliderFirstItemNode.clientWidth *
      (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
    this.slider.scrollTo({
      left: slideScrollPosition,
    });
  };

  return SlideshowComponent;
}(SliderComponent));

customElements.define('slideshow-component', SlideshowComponent);

var VariantSelects = /*@__PURE__*/(function (HTMLElement) {
  function VariantSelects() {
    HTMLElement.call(this);
    this.addEventListener('change', this.onVariantChange);
  }

  if ( HTMLElement ) VariantSelects.__proto__ = HTMLElement;
  VariantSelects.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  VariantSelects.prototype.constructor = VariantSelects;

  VariantSelects.prototype.onVariantChange = function onVariantChange () {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
    this.updateVariantStatuses();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  };

  VariantSelects.prototype.updateOptions = function updateOptions () {
    this.options = Array.from(this.querySelectorAll('select'), function (select) { return select.value; });
  };

  VariantSelects.prototype.updateMasterId = function updateMasterId () {
    var this$1 = this;

    this.currentVariant = this.getVariantData().find(function (variant) {
      return !variant.options
        .map(function (option, index) {
          return this$1.options[index] === option;
        })
        .includes(false);
    });
  };

  VariantSelects.prototype.updateMedia = function updateMedia () {
    var this$1 = this;

    if (!this.currentVariant) { return; }
    if (!this.currentVariant.featured_media) { return; }

    var mediaGalleries = document.querySelectorAll(("[id^=\"MediaGallery-" + (this.dataset.section) + "\"]"));
    mediaGalleries.forEach(function (mediaGallery) { return mediaGallery.setActiveMedia(((this$1.dataset.section) + "-" + (this$1.currentVariant.featured_media.id)), true); }
    );

    var modalContent = document.querySelector(("#ProductModal-" + (this.dataset.section) + " .product-media-modal__content"));
    if (!modalContent) { return; }
    var newMediaModal = modalContent.querySelector(("[data-media-id=\"" + (this.currentVariant.featured_media.id) + "\"]"));
    modalContent.prepend(newMediaModal);
  };

  VariantSelects.prototype.updateURL = function updateURL () {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') { return; }
    window.history.replaceState({}, '', ((this.dataset.url) + "?variant=" + (this.currentVariant.id)));
  };

  VariantSelects.prototype.updateShareUrl = function updateShareUrl () {
    var shareButton = document.getElementById(("Share-" + (this.dataset.section)));
    if (!shareButton || !shareButton.updateUrl) { return; }
    shareButton.updateUrl(("" + (window.shopUrl) + (this.dataset.url) + "?variant=" + (this.currentVariant.id)));
  };

  VariantSelects.prototype.updateVariantInput = function updateVariantInput () {
    var this$1 = this;

    var productForms = document.querySelectorAll(
      ("#product-form-" + (this.dataset.section) + ", #product-form-installment-" + (this.dataset.section))
    );
    productForms.forEach(function (productForm) {
      var input = productForm.querySelector('input[name="id"]');
      input.value = this$1.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  };

  VariantSelects.prototype.updateVariantStatuses = function updateVariantStatuses () {
    var this$1 = this;

    var selectedOptionOneVariants = this.variantData.filter(
      function (variant) { return this$1.querySelector(':checked').value === variant.option1; }
    );
    var inputWrappers = [].concat( this.querySelectorAll('.product-form__input') );
    inputWrappers.forEach(function (option, index) {
      if (index === 0) { return; }
      var optionInputs = [].concat( option.querySelectorAll('input[type="radio"], option') );
      var previousOptionSelected = inputWrappers[index - 1].querySelector(':checked').value;
      var availableOptionInputsValue = selectedOptionOneVariants
        .filter(function (variant) { return variant.available && variant[("option" + index)] === previousOptionSelected; })
        .map(function (variantOption) { return variantOption[("option" + (index + 1))]; });
      this$1.setInputAvailability(optionInputs, availableOptionInputsValue);
    });
  };

  VariantSelects.prototype.setInputAvailability = function setInputAvailability (listOfOptions, listOfAvailableOptions) {
    listOfOptions.forEach(function (input) {
      if (listOfAvailableOptions.includes(input.getAttribute('value'))) {
        input.innerText = input.getAttribute('value');
      } else {
        input.innerText = window.variantStrings.unavailable_with_option.replace('[value]', input.getAttribute('value'));
      }
    });
  };

  VariantSelects.prototype.updatePickupAvailability = function updatePickupAvailability () {
    var pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) { return; }

    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  };

  VariantSelects.prototype.removeErrorMessage = function removeErrorMessage () {
    var section = this.closest('section');
    if (!section) { return; }

    var productForm = section.querySelector('product-form');
    if (productForm) { productForm.handleErrorMessage(); }
  };

  VariantSelects.prototype.renderProductInfo = function renderProductInfo () {
    var this$1 = this;

    var requestedVariantId = this.currentVariant.id;
    var sectionId = this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section;

    fetch(
      ((this.dataset.url) + "?variant=" + requestedVariantId + "&section_id=" + (this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section))
    )
      .then(function (response) { return response.text(); })
      .then(function (responseText) {
        // prevent unnecessary ui changes from abandoned selections
        if (this$1.currentVariant.id !== requestedVariantId) { return; }

        var html = new DOMParser().parseFromString(responseText, 'text/html');
        var destination = document.getElementById(("price-" + (this$1.dataset.section)));
        var source = html.getElementById(
          ("price-" + (this$1.dataset.originalSection ? this$1.dataset.originalSection : this$1.dataset.section))
        );
        var skuSource = html.getElementById(
          ("Sku-" + (this$1.dataset.originalSection ? this$1.dataset.originalSection : this$1.dataset.section))
        );
        var skuDestination = document.getElementById(("Sku-" + (this$1.dataset.section)));
        var inventorySource = html.getElementById(
          ("Inventory-" + (this$1.dataset.originalSection ? this$1.dataset.originalSection : this$1.dataset.section))
        );
        var inventoryDestination = document.getElementById(("Inventory-" + (this$1.dataset.section)));

        var volumePricingSource = html.getElementById(
          ("Volume-" + (this$1.dataset.originalSection ? this$1.dataset.originalSection : this$1.dataset.section))
        );

        var pricePerItemDestination = document.getElementById(("Price-Per-Item-" + (this$1.dataset.section)));
        var pricePerItemSource = html.getElementById(("Price-Per-Item-" + (this$1.dataset.originalSection ? this$1.dataset.originalSection : this$1.dataset.section)));

        var volumePricingDestination = document.getElementById(("Volume-" + (this$1.dataset.section)));
        var qtyRules = document.getElementById(("Quantity-Rules-" + (this$1.dataset.section)));
        var volumeNote = document.getElementById(("Volume-Note-" + (this$1.dataset.section)));

        if (volumeNote) { volumeNote.classList.remove('hidden'); }
        if (volumePricingDestination) { volumePricingDestination.classList.remove('hidden'); }
        if (qtyRules) { qtyRules.classList.remove('hidden'); }

        if (source && destination) { destination.innerHTML = source.innerHTML; }
        if (inventorySource && inventoryDestination) { inventoryDestination.innerHTML = inventorySource.innerHTML; }
        if (skuSource && skuDestination) {
          skuDestination.innerHTML = skuSource.innerHTML;
          skuDestination.classList.toggle('hidden', skuSource.classList.contains('hidden'));
        }

        if (volumePricingSource && volumePricingDestination) {
          volumePricingDestination.innerHTML = volumePricingSource.innerHTML;
        }

        if (pricePerItemSource && pricePerItemDestination) {
          pricePerItemDestination.innerHTML = pricePerItemSource.innerHTML;
          pricePerItemDestination.classList.toggle('hidden', pricePerItemSource.classList.contains('hidden'));
        }

        var price = document.getElementById(("price-" + (this$1.dataset.section)));

        if (price) { price.classList.remove('hidden'); }

        if (inventoryDestination)
          { inventoryDestination.classList.toggle('hidden', inventorySource.innerText === ''); }

        var addButtonUpdated = html.getElementById(("ProductSubmitButton-" + sectionId));
        this$1.toggleAddButton(
          addButtonUpdated ? addButtonUpdated.hasAttribute('disabled') : true,
          window.variantStrings.soldOut
        );

        publish(PUB_SUB_EVENTS.variantChange, {
          data: {
            sectionId: sectionId,
            html: html,
            variant: this$1.currentVariant,
          },
        });
      });
  };

  VariantSelects.prototype.toggleAddButton = function toggleAddButton (disable, text, modifyClass) {
    if ( disable === void 0 ) disable = true;
    if ( modifyClass === void 0 ) modifyClass = true;

    var productForm = document.getElementById(("product-form-" + (this.dataset.section)));
    if (!productForm) { return; }
    var addButton = productForm.querySelector('[name="add"]');
    var addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) { return; }

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) { addButtonText.textContent = text; }
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) { return; }
  };

  VariantSelects.prototype.setUnavailable = function setUnavailable () {
    var button = document.getElementById(("product-form-" + (this.dataset.section)));
    var addButton = button.querySelector('[name="add"]');
    var addButtonText = button.querySelector('[name="add"] > span');
    var price = document.getElementById(("price-" + (this.dataset.section)));
    var inventory = document.getElementById(("Inventory-" + (this.dataset.section)));
    var sku = document.getElementById(("Sku-" + (this.dataset.section)));
    var pricePerItem = document.getElementById(("Price-Per-Item-" + (this.dataset.section)));
    var volumeNote = document.getElementById(("Volume-Note-" + (this.dataset.section)));
    var volumeTable = document.getElementById(("Volume-" + (this.dataset.section)));
    var qtyRules = document.getElementById(("Quantity-Rules-" + (this.dataset.section)));

    if (!addButton) { return; }
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) { price.classList.add('hidden'); }
    if (inventory) { inventory.classList.add('hidden'); }
    if (sku) { sku.classList.add('hidden'); }
    if (pricePerItem) { pricePerItem.classList.add('hidden'); }
    if (volumeNote) { volumeNote.classList.add('hidden'); }
    if (volumeTable) { volumeTable.classList.add('hidden'); }
    if (qtyRules) { qtyRules.classList.add('hidden'); }
  };

  VariantSelects.prototype.getVariantData = function getVariantData () {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  };

  return VariantSelects;
}(HTMLElement));

customElements.define('variant-selects', VariantSelects);

var VariantRadios = /*@__PURE__*/(function (VariantSelects) {
  function VariantRadios() {
    VariantSelects.call(this);
  }

  if ( VariantSelects ) VariantRadios.__proto__ = VariantSelects;
  VariantRadios.prototype = Object.create( VariantSelects && VariantSelects.prototype );
  VariantRadios.prototype.constructor = VariantRadios;

  VariantRadios.prototype.setInputAvailability = function setInputAvailability (listOfOptions, listOfAvailableOptions) {
    listOfOptions.forEach(function (input) {
      if (listOfAvailableOptions.includes(input.getAttribute('value'))) {
        input.classList.remove('disabled');
      } else {
        input.classList.add('disabled');
      }
    });
  };

  VariantRadios.prototype.updateOptions = function updateOptions () {
    var fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map(function (fieldset) {
      return Array.from(fieldset.querySelectorAll('input')).find(function (radio) { return radio.checked; }).value;
    });
  };

  return VariantRadios;
}(VariantSelects));

customElements.define('variant-radios', VariantRadios);

var ProductRecommendations = /*@__PURE__*/(function (HTMLElement) {
  function ProductRecommendations() {
    HTMLElement.call(this);
  }

  if ( HTMLElement ) ProductRecommendations.__proto__ = HTMLElement;
  ProductRecommendations.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  ProductRecommendations.prototype.constructor = ProductRecommendations;

  ProductRecommendations.prototype.connectedCallback = function connectedCallback () {
    var this$1 = this;

    var handleIntersection = function (entries, observer) {
      if (!entries[0].isIntersecting) { return; }
      observer.unobserve(this$1);

      fetch(this$1.dataset.url)
        .then(function (response) { return response.text(); })
        .then(function (text) {
          var html = document.createElement('div');
          html.innerHTML = text;
          var recommendations = html.querySelector('product-recommendations');

          if (recommendations && recommendations.innerHTML.trim().length) {
            this$1.innerHTML = recommendations.innerHTML;
          }

          if (!this$1.querySelector('slideshow-component') && this$1.classList.contains('complementary-products')) {
            this$1.remove();
          }

          if (html.querySelector('.grid__item')) {
            this$1.classList.add('product-recommendations--loaded');
          }
        })
        .catch(function (e) {
          console.error(e);
        });
    };

    new IntersectionObserver(handleIntersection.bind(this), { rootMargin: '0px 0px 400px 0px' }).observe(this);
  };

  return ProductRecommendations;
}(HTMLElement));

customElements.define('product-recommendations', ProductRecommendations);


var FacetFiltersForm = /*@__PURE__*/(function (HTMLElement) {
  function FacetFiltersForm() {
    var this$1 = this;

    HTMLElement.call(this);
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce(function (event) {
      this$1.onSubmitHandler(event);
    }, 500);

    var facetForm = this.querySelector('form');
    facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));

    var facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) { facetWrapper.addEventListener('keyup', onKeyUpEscape); }
  }

  if ( HTMLElement ) FacetFiltersForm.__proto__ = HTMLElement;
  FacetFiltersForm.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  FacetFiltersForm.prototype.constructor = FacetFiltersForm;

  FacetFiltersForm.setListeners = function setListeners () {
    var onHistoryChange = function (event) {
      var searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) { return; }
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener('popstate', onHistoryChange);
  };

  FacetFiltersForm.toggleActiveFacets = function toggleActiveFacets (disable) {
    if ( disable === void 0 ) disable = true;

    document.querySelectorAll('.js-facet-remove').forEach(function (element) {
      element.classList.toggle('disabled', disable);
    });
  };

  FacetFiltersForm.renderPage = function renderPage (searchParams, event, updateURLHash) {
    if ( updateURLHash === void 0 ) updateURLHash = true;

    FacetFiltersForm.searchParamsPrev = searchParams;
    var sections = FacetFiltersForm.getSections();
    var countContainer = document.getElementById('ProductCount');
    var countContainerDesktop = document.getElementById('ProductCountDesktop');
    var loadingSpinners = document.querySelectorAll('.facets-container .loading__spinner, facet-filters-form .loading__spinner');
    loadingSpinners.forEach(function (spinner) { return spinner.classList.remove('hidden'); });
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer) {
      countContainer.classList.add('loading');
    }
    if (countContainerDesktop) {
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach(function (section) {
      var url = (window.location.pathname) + "?section_id=" + (section.section) + "&" + searchParams;
      var filterDataUrl = function (element) { return element.url === url; };

      FacetFiltersForm.filterData.some(filterDataUrl)
        ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
        : FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) { FacetFiltersForm.updateURLHash(searchParams); }
  };

  FacetFiltersForm.renderSectionFromFetch = function renderSectionFromFetch (url, event) {
    fetch(url)
      .then(function (response) { return response.text(); })
      .then(function (responseText) {
        var html = responseText;
        FacetFiltersForm.filterData = ( FacetFiltersForm.filterData ).concat( [{ html: html, url: url }]);
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        if (typeof initializeScrollAnimationTrigger === 'function') { initializeScrollAnimationTrigger(html.innerHTML); }
      });
  };

  FacetFiltersForm.renderSectionFromCache = function renderSectionFromCache (filterDataUrl, event) {
    var html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
    if (typeof initializeScrollAnimationTrigger === 'function') { initializeScrollAnimationTrigger(html.innerHTML); }
  };

  FacetFiltersForm.renderProductGridContainer = function renderProductGridContainer (html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductGridContainer').innerHTML;

    document
      .getElementById('ProductGridContainer')
      .querySelectorAll('.scroll-trigger')
      .forEach(function (element) {
        element.classList.add('scroll-trigger--cancel');
      });
  };

  FacetFiltersForm.renderProductCount = function renderProductCount (html) {
    var count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
    var container = document.getElementById('ProductCount');
    var containerDesktop = document.getElementById('ProductCountDesktop');
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
    var loadingSpinners = document.querySelectorAll('.facets-container .loading__spinner, facet-filters-form .loading__spinner');
    loadingSpinners.forEach(function (spinner) { return spinner.classList.add('hidden'); });
  };

  FacetFiltersForm.renderFilters = function renderFilters (html, event) {
    var parsedHTML = new DOMParser().parseFromString(html, 'text/html');

    var facetDetailsElements = parsedHTML.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );
    var matchesIndex = function (element) {
      var jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
    };
    var facetsToRender = Array.from(facetDetailsElements).filter(function (element) { return !matchesIndex(element); });
    var countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

    facetsToRender.forEach(function (element) {
      document.querySelector((".js-filter[data-index=\"" + (element.dataset.index) + "\"]")).innerHTML = element.innerHTML;
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) {
      var closestJSFilterID = event.target.closest('.js-filter').id;

      if (closestJSFilterID) {
        FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
        FacetFiltersForm.renderMobileCounts(countsToRender, document.getElementById(closestJSFilterID));

        var newElementSelector = document
          .getElementById(closestJSFilterID)
          .classList.contains('mobile-facets__details')
          ? ("#" + closestJSFilterID + " .mobile-facets__close-button")
          : ("#" + closestJSFilterID + " .facets__summary");
        var newElementToActivate = document.querySelector(newElementSelector);
        if (newElementToActivate) { newElementToActivate.focus(); }
      }
    }
  };

  FacetFiltersForm.renderActiveFacets = function renderActiveFacets (html) {
    var activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach(function (selector) {
      var activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) { return; }
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    });

    FacetFiltersForm.toggleActiveFacets(false);
  };

  FacetFiltersForm.renderAdditionalElements = function renderAdditionalElements (html) {
    var mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach(function (selector) {
      if (!html.querySelector(selector)) { return; }
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
  };

  FacetFiltersForm.renderCounts = function renderCounts (source, target) {
    var targetSummary = target.querySelector('.facets__summary');
    var sourceSummary = source.querySelector('.facets__summary');

    if (sourceSummary && targetSummary) {
      targetSummary.outerHTML = sourceSummary.outerHTML;
    }

    var targetHeaderElement = target.querySelector('.facets__header');
    var sourceHeaderElement = source.querySelector('.facets__header');

    if (sourceHeaderElement && targetHeaderElement) {
      targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML;
    }

    var targetWrapElement = target.querySelector('.facets-wrap');
    var sourceWrapElement = source.querySelector('.facets-wrap');

    if (sourceWrapElement && targetWrapElement) {
      var isShowingMore = Boolean(target.querySelector('show-more-button .label-show-more.hidden'));
      if (isShowingMore) {
        sourceWrapElement
          .querySelectorAll('.facets__item.hidden')
          .forEach(function (hiddenItem) { return hiddenItem.classList.replace('hidden', 'show-more-item'); });
      }

      targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
    }
  };

  FacetFiltersForm.renderMobileCounts = function renderMobileCounts (source, target) {
    var targetFacetsList = target.querySelector('.mobile-facets__list');
    var sourceFacetsList = source.querySelector('.mobile-facets__list');

    if (sourceFacetsList && targetFacetsList) {
      targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
    }
  };

  FacetFiltersForm.updateURLHash = function updateURLHash (searchParams) {
    history.pushState({ searchParams: searchParams }, '', ("" + (window.location.pathname) + (searchParams && '?'.concat(searchParams))));
  };

  FacetFiltersForm.getSections = function getSections () {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      } ];
  };

  FacetFiltersForm.prototype.createSearchParams = function createSearchParams (form) {
    var formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  };

  FacetFiltersForm.prototype.onSubmitForm = function onSubmitForm (searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
  };

  FacetFiltersForm.prototype.onSubmitHandler = function onSubmitHandler (event) {
    var this$1 = this;

    event.preventDefault();
    var sortFilterForms = document.querySelectorAll('facet-filters-form form');
    if (event.srcElement.className == 'mobile-facets__checkbox') {
      var searchParams = this.createSearchParams(event.target.closest('form'));
      this.onSubmitForm(searchParams, event);
    } else {
      var forms = [];
      var isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach(function (form) {
        if (!isMobile) {
          if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
            var noJsElements = document.querySelectorAll('.no-js-list');
            noJsElements.forEach(function (el) { return el.remove(); });
            forms.push(this$1.createSearchParams(form));
          }
        } else if (form.id === 'FacetFiltersFormMobile') {
          forms.push(this$1.createSearchParams(form));
        }
      });
      this.onSubmitForm(forms.join('&'), event);
    }
  };

  FacetFiltersForm.prototype.onActiveFilterClick = function onActiveFilterClick (event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    var url =
      event.currentTarget.href.indexOf('?') == -1
        ? ''
        : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    FacetFiltersForm.renderPage(url);
  };

  return FacetFiltersForm;
}(HTMLElement));

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

var PriceRange = /*@__PURE__*/(function (HTMLElement) {
  function PriceRange() {
    var this$1 = this;

    HTMLElement.call(this);
    this.querySelectorAll('input').forEach(function (element) { return element.addEventListener('change', this$1.onRangeChange.bind(this$1)); }
    );
    this.setMinAndMaxValues();
  }

  if ( HTMLElement ) PriceRange.__proto__ = HTMLElement;
  PriceRange.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  PriceRange.prototype.constructor = PriceRange;

  PriceRange.prototype.onRangeChange = function onRangeChange (event) {
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValues();
  };

  PriceRange.prototype.setMinAndMaxValues = function setMinAndMaxValues () {
    var inputs = this.querySelectorAll('input');
    var minInput = inputs[0];
    var maxInput = inputs[1];
    if (maxInput.value) { minInput.setAttribute('max', maxInput.value); }
    if (minInput.value) { maxInput.setAttribute('min', minInput.value); }
    if (minInput.value === '') { maxInput.setAttribute('min', 0); }
    if (maxInput.value === '') { minInput.setAttribute('max', maxInput.getAttribute('max')); }
  };

  PriceRange.prototype.adjustToValidValues = function adjustToValidValues (input) {
    var value = Number(input.value);
    var min = Number(input.getAttribute('min'));
    var max = Number(input.getAttribute('max'));

    if (value < min) { input.value = min; }
    if (value > max) { input.value = max; }
  };

  return PriceRange;
}(HTMLElement));

customElements.define('price-range', PriceRange);

var FacetRemove = /*@__PURE__*/(function (HTMLElement) {
  function FacetRemove() {
    var this$1 = this;

    HTMLElement.call(this);
    var facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', function (event) {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') { this$1.closeFilter(event); }
    });
  }

  if ( HTMLElement ) FacetRemove.__proto__ = HTMLElement;
  FacetRemove.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  FacetRemove.prototype.constructor = FacetRemove;

  FacetRemove.prototype.closeFilter = function closeFilter (event) {
    event.preventDefault();
    var form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
  };

  return FacetRemove;
}(HTMLElement));

customElements.define('facet-remove', FacetRemove);


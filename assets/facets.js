'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FacetFiltersForm = function (_HTMLElement) {
  _inherits(FacetFiltersForm, _HTMLElement);

  function FacetFiltersForm() {
    _classCallCheck(this, FacetFiltersForm);

    var _this = _possibleConstructorReturn(this, (FacetFiltersForm.__proto__ || Object.getPrototypeOf(FacetFiltersForm)).call(this));

    _this.onActiveFilterClick = _this.onActiveFilterClick.bind(_this);

    _this.debouncedOnSubmit = debounce(function (event) {
      _this.onSubmitHandler(event);
    }, 500);

    var facetForm = _this.querySelector('form');
    facetForm.addEventListener('input', _this.debouncedOnSubmit.bind(_this));

    var facetWrapper = _this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
    return _this;
  }

  _createClass(FacetFiltersForm, [{
    key: 'createSearchParams',
    value: function createSearchParams(form) {
      var formData = new FormData(form);
      return new URLSearchParams(formData).toString();
    }
  }, {
    key: 'onSubmitForm',
    value: function onSubmitForm(searchParams, event) {
      FacetFiltersForm.renderPage(searchParams, event);
    }
  }, {
    key: 'onSubmitHandler',
    value: function onSubmitHandler(event) {
      var _this2 = this;

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
              noJsElements.forEach(function (el) {
                return el.remove();
              });
              forms.push(_this2.createSearchParams(form));
            }
          } else if (form.id === 'FacetFiltersFormMobile') {
            forms.push(_this2.createSearchParams(form));
          }
        });
        this.onSubmitForm(forms.join('&'), event);
      }
    }
  }, {
    key: 'onActiveFilterClick',
    value: function onActiveFilterClick(event) {
      event.preventDefault();
      FacetFiltersForm.toggleActiveFacets();
      var url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
      FacetFiltersForm.renderPage(url);
    }
  }], [{
    key: 'setListeners',
    value: function setListeners() {
      var onHistoryChange = function onHistoryChange(event) {
        var searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
        if (searchParams === FacetFiltersForm.searchParamsPrev) return;
        FacetFiltersForm.renderPage(searchParams, null, false);
      };
      window.addEventListener('popstate', onHistoryChange);
    }
  }, {
    key: 'toggleActiveFacets',
    value: function toggleActiveFacets() {
      var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      document.querySelectorAll('.js-facet-remove').forEach(function (element) {
        element.classList.toggle('disabled', disable);
      });
    }
  }, {
    key: 'renderPage',
    value: function renderPage(searchParams, event) {
      var updateURLHash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      FacetFiltersForm.searchParamsPrev = searchParams;
      var sections = FacetFiltersForm.getSections();
      var countContainer = document.getElementById('ProductCount');
      var countContainerDesktop = document.getElementById('ProductCountDesktop');
      var loadingSpinners = document.querySelectorAll('.facets-container .loading__spinner, facet-filters-form .loading__spinner');
      loadingSpinners.forEach(function (spinner) {
        return spinner.classList.remove('hidden');
      });
      document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
      if (countContainer) {
        countContainer.classList.add('loading');
      }
      if (countContainerDesktop) {
        countContainerDesktop.classList.add('loading');
      }

      sections.forEach(function (section) {
        var url = window.location.pathname + '?section_id=' + section.section + '&' + searchParams;
        var filterDataUrl = function filterDataUrl(element) {
          return element.url === url;
        };

        FacetFiltersForm.filterData.some(filterDataUrl) ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) : FacetFiltersForm.renderSectionFromFetch(url, event);
      });

      if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
    }
  }, {
    key: 'renderSectionFromFetch',
    value: function renderSectionFromFetch(url, event) {
      fetch(url).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var html = responseText;
        FacetFiltersForm.filterData = [].concat(_toConsumableArray(FacetFiltersForm.filterData), [{ html: html, url: url }]);
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
      });
    }
  }, {
    key: 'renderSectionFromCache',
    value: function renderSectionFromCache(filterDataUrl, event) {
      var html = FacetFiltersForm.filterData.find(filterDataUrl).html;
      FacetFiltersForm.renderFilters(html, event);
      FacetFiltersForm.renderProductGridContainer(html);
      FacetFiltersForm.renderProductCount(html);
      if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
    }
  }, {
    key: 'renderProductGridContainer',
    value: function renderProductGridContainer(html) {
      document.getElementById('ProductGridContainer').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').innerHTML;

      document.getElementById('ProductGridContainer').querySelectorAll('.scroll-trigger').forEach(function (element) {
        element.classList.add('scroll-trigger--cancel');
      });
    }
  }, {
    key: 'renderProductCount',
    value: function renderProductCount(html) {
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
      loadingSpinners.forEach(function (spinner) {
        return spinner.classList.add('hidden');
      });
    }
  }, {
    key: 'renderFilters',
    value: function renderFilters(html, event) {
      var parsedHTML = new DOMParser().parseFromString(html, 'text/html');

      var facetDetailsElements = parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter');
      var matchesIndex = function matchesIndex(element) {
        var jsFilter = event ? event.target.closest('.js-filter') : undefined;
        return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
      };
      var facetsToRender = Array.from(facetDetailsElements).filter(function (element) {
        return !matchesIndex(element);
      });
      var countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

      facetsToRender.forEach(function (element) {
        document.querySelector('.js-filter[data-index="' + element.dataset.index + '"]').innerHTML = element.innerHTML;
      });

      FacetFiltersForm.renderActiveFacets(parsedHTML);
      FacetFiltersForm.renderAdditionalElements(parsedHTML);

      if (countsToRender) {
        var closestJSFilterID = event.target.closest('.js-filter').id;

        if (closestJSFilterID) {
          FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
          FacetFiltersForm.renderMobileCounts(countsToRender, document.getElementById(closestJSFilterID));

          var newElementSelector = document.getElementById(closestJSFilterID).classList.contains('mobile-facets__details') ? '#' + closestJSFilterID + ' .mobile-facets__close-button' : '#' + closestJSFilterID + ' .facets__summary';
          var newElementToActivate = document.querySelector(newElementSelector);
          if (newElementToActivate) newElementToActivate.focus();
        }
      }
    }
  }, {
    key: 'renderActiveFacets',
    value: function renderActiveFacets(html) {
      var activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

      activeFacetElementSelectors.forEach(function (selector) {
        var activeFacetsElement = html.querySelector(selector);
        if (!activeFacetsElement) return;
        document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
      });

      FacetFiltersForm.toggleActiveFacets(false);
    }
  }, {
    key: 'renderAdditionalElements',
    value: function renderAdditionalElements(html) {
      var mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

      mobileElementSelectors.forEach(function (selector) {
        if (!html.querySelector(selector)) return;
        document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
      });

      document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
    }
  }, {
    key: 'renderCounts',
    value: function renderCounts(source, target) {
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
          sourceWrapElement.querySelectorAll('.facets__item.hidden').forEach(function (hiddenItem) {
            return hiddenItem.classList.replace('hidden', 'show-more-item');
          });
        }

        targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
      }
    }
  }, {
    key: 'renderMobileCounts',
    value: function renderMobileCounts(source, target) {
      var targetFacetsList = target.querySelector('.mobile-facets__list');
      var sourceFacetsList = source.querySelector('.mobile-facets__list');

      if (sourceFacetsList && targetFacetsList) {
        targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
      }
    }
  }, {
    key: 'updateURLHash',
    value: function updateURLHash(searchParams) {
      history.pushState({ searchParams: searchParams }, '', '' + window.location.pathname + (searchParams && '?'.concat(searchParams)));
    }
  }, {
    key: 'getSections',
    value: function getSections() {
      return [{
        section: document.getElementById('product-grid').dataset.id
      }];
    }
  }]);

  return FacetFiltersForm;
}(HTMLElement);

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

var PriceRange = function (_HTMLElement2) {
  _inherits(PriceRange, _HTMLElement2);

  function PriceRange() {
    _classCallCheck(this, PriceRange);

    var _this3 = _possibleConstructorReturn(this, (PriceRange.__proto__ || Object.getPrototypeOf(PriceRange)).call(this));

    _this3.querySelectorAll('input').forEach(function (element) {
      return element.addEventListener('change', _this3.onRangeChange.bind(_this3));
    });
    _this3.setMinAndMaxValues();
    return _this3;
  }

  _createClass(PriceRange, [{
    key: 'onRangeChange',
    value: function onRangeChange(event) {
      this.adjustToValidValues(event.currentTarget);
      this.setMinAndMaxValues();
    }
  }, {
    key: 'setMinAndMaxValues',
    value: function setMinAndMaxValues() {
      var inputs = this.querySelectorAll('input');
      var minInput = inputs[0];
      var maxInput = inputs[1];
      if (maxInput.value) minInput.setAttribute('max', maxInput.value);
      if (minInput.value) maxInput.setAttribute('min', minInput.value);
      if (minInput.value === '') maxInput.setAttribute('min', 0);
      if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
    }
  }, {
    key: 'adjustToValidValues',
    value: function adjustToValidValues(input) {
      var value = Number(input.value);
      var min = Number(input.getAttribute('min'));
      var max = Number(input.getAttribute('max'));

      if (value < min) input.value = min;
      if (value > max) input.value = max;
    }
  }]);

  return PriceRange;
}(HTMLElement);

customElements.define('price-range', PriceRange);

var FacetRemove = function (_HTMLElement3) {
  _inherits(FacetRemove, _HTMLElement3);

  function FacetRemove() {
    _classCallCheck(this, FacetRemove);

    var _this4 = _possibleConstructorReturn(this, (FacetRemove.__proto__ || Object.getPrototypeOf(FacetRemove)).call(this));

    var facetLink = _this4.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', _this4.closeFilter.bind(_this4));
    facetLink.addEventListener('keyup', function (event) {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') _this4.closeFilter(event);
    });
    return _this4;
  }

  _createClass(FacetRemove, [{
    key: 'closeFilter',
    value: function closeFilter(event) {
      event.preventDefault();
      var form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
      form.onActiveFilterClick(event);
    }
  }]);

  return FacetRemove;
}(HTMLElement);

customElements.define('facet-remove', FacetRemove);
var PredictiveSearch = /*@__PURE__*/(function (SearchForm) {
  function PredictiveSearch() {
    SearchForm.call(this);
    this.cachedResults = {};
    this.predictiveSearchResults = this.querySelector('[data-predictive-search]');
    this.allPredictiveSearchInstances = document.querySelectorAll('predictive-search');
    this.isOpen = false;
    this.abortController = new AbortController();
    this.searchTerm = '';

    this.setupEventListeners();
  }

  if ( SearchForm ) PredictiveSearch.__proto__ = SearchForm;
  PredictiveSearch.prototype = Object.create( SearchForm && SearchForm.prototype );
  PredictiveSearch.prototype.constructor = PredictiveSearch;

  PredictiveSearch.prototype.setupEventListeners = function setupEventListeners () {
    this.input.form.addEventListener('submit', this.onFormSubmit.bind(this));

    this.input.addEventListener('focus', this.onFocus.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.addEventListener('keyup', this.onKeyup.bind(this));
    this.addEventListener('keydown', this.onKeydown.bind(this));
  };

  PredictiveSearch.prototype.getQuery = function getQuery () {
    return this.input.value.trim();
  };

  PredictiveSearch.prototype.onChange = function onChange () {
    SearchForm.prototype.onChange.call(this);
    var newSearchTerm = this.getQuery();
    if (!this.searchTerm || !newSearchTerm.startsWith(this.searchTerm)) {
      // Remove the results when they are no longer relevant for the new search term
      // so they don't show up when the dropdown opens again
      if (this.querySelector('#predictive-search-results-groups-wrapper')) { this.querySelector('#predictive-search-results-groups-wrapper').remove(); }
    }

    // Update the term asap, don't wait for the predictive search query to finish loading
    this.updateSearchForTerm(this.searchTerm, newSearchTerm);

    this.searchTerm = newSearchTerm;

    if (!this.searchTerm.length) {
      this.close(true);
      return;
    }

    this.getSearchResults(this.searchTerm);
  };

  PredictiveSearch.prototype.onFormSubmit = function onFormSubmit (event) {
    if (!this.getQuery().length || this.querySelector('[aria-selected="true"] a')) { event.preventDefault(); }
  };

  PredictiveSearch.prototype.onFormReset = function onFormReset (event) {
    SearchForm.prototype.onFormReset.call(this, event);
    if (SearchForm.prototype.shouldResetForm.call(this)) {
      this.searchTerm = '';
      this.abortController.abort();
      this.abortController = new AbortController();
      this.closeResults(true);
    }
  };

  PredictiveSearch.prototype.onFocus = function onFocus () {
    var currentSearchTerm = this.getQuery();

    if (!currentSearchTerm.length) { return; }

    if (this.searchTerm !== currentSearchTerm) {
      // Search term was changed from other search input, treat it as a user change
      this.onChange();
    } else if (this.getAttribute('results') === 'true') {
      this.open();
    } else {
      this.getSearchResults(this.searchTerm);
    }
  };

  PredictiveSearch.prototype.onFocusOut = function onFocusOut () {
    var this$1 = this;

    setTimeout(function () {
      if (!this$1.contains(document.activeElement)) { this$1.close(); }
    });
  };

  PredictiveSearch.prototype.onKeyup = function onKeyup (event) {
    if (!this.getQuery().length) { this.close(true); }
    event.preventDefault();

    switch (event.code) {
      case 'ArrowUp':
        this.switchOption('up');
        break;
      case 'ArrowDown':
        this.switchOption('down');
        break;
      case 'Enter':
        this.selectOption();
        break;
    }
  };

  PredictiveSearch.prototype.onKeydown = function onKeydown (event) {
    // Prevent the cursor from moving in the input when using the up and down arrow keys
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      event.preventDefault();
    }
  };

  PredictiveSearch.prototype.updateSearchForTerm = function updateSearchForTerm (previousTerm, newTerm) {
    var searchForTextElement = this.querySelector('[data-predictive-search-search-for-text]');
    var currentButtonText = searchForTextElement ? searchForTextElement.innerText : undefined;
    if (currentButtonText) {
      if (currentButtonText.match(new RegExp(previousTerm, 'g')).length > 1) {
        // The new term matches part of the button text and not just the search term, do not replace to avoid mistakes
        return;
      }
      var newButtonText = currentButtonText.replace(previousTerm, newTerm);
      searchForTextElement.innerText = newButtonText;
    }
  };

  PredictiveSearch.prototype.switchOption = function switchOption (direction) {
    if (!this.getAttribute('open')) { return; }

    var moveUp = direction === 'up';
    var selectedElement = this.querySelector('[aria-selected="true"]');

    // Filter out hidden elements (duplicated page and article resources) thanks
    // to this https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
    var allVisibleElements = Array.from(this.querySelectorAll('li, button.predictive-search__item')).filter(
      function (element) { return element.offsetParent !== null; }
    );
    var activeElementIndex = 0;

    if (moveUp && !selectedElement) { return; }

    var selectedElementIndex = -1;
    var i = 0;

    while (selectedElementIndex === -1 && i <= allVisibleElements.length) {
      if (allVisibleElements[i] === selectedElement) {
        selectedElementIndex = i;
      }
      i++;
    }

    this.statusElement.textContent = '';

    if (!moveUp && selectedElement) {
      activeElementIndex = selectedElementIndex === allVisibleElements.length - 1 ? 0 : selectedElementIndex + 1;
    } else if (moveUp) {
      activeElementIndex = selectedElementIndex === 0 ? allVisibleElements.length - 1 : selectedElementIndex - 1;
    }

    if (activeElementIndex === selectedElementIndex) { return; }

    var activeElement = allVisibleElements[activeElementIndex];

    activeElement.setAttribute('aria-selected', true);
    if (selectedElement) { selectedElement.setAttribute('aria-selected', false); }

    this.input.setAttribute('aria-activedescendant', activeElement.id);
  };

  PredictiveSearch.prototype.selectOption = function selectOption () {
    var selectedOption = this.querySelector('[aria-selected="true"] a, button[aria-selected="true"]');

    if (selectedOption) { selectedOption.click(); }
  };

  PredictiveSearch.prototype.getSearchResults = function getSearchResults (searchTerm) {
    var this$1 = this;

    var queryKey = searchTerm.replace(' ', '-').toLowerCase();
    this.setLiveRegionLoadingState();

    if (this.cachedResults[queryKey]) {
      this.renderSearchResults(this.cachedResults[queryKey]);
      return;
    }

    fetch(((routes.predictive_search_url) + "?q=" + (encodeURIComponent(searchTerm)) + "&section_id=predictive-search"), {
      signal: this.abortController.signal,
    })
      .then(function (response) {
        if (!response.ok) {
          var error = new Error(response.status);
          this$1.close();
          throw error;
        }

        return response.text();
      })
      .then(function (text) {
        var resultsMarkup = new DOMParser()
          .parseFromString(text, 'text/html')
          .querySelector('#shopify-section-predictive-search').innerHTML;
        // Save bandwidth keeping the cache in all instances synced
        this$1.allPredictiveSearchInstances.forEach(function (predictiveSearchInstance) {
          predictiveSearchInstance.cachedResults[queryKey] = resultsMarkup;
        });
        this$1.renderSearchResults(resultsMarkup);
      })
      .catch(function (error) {
        if (error && error.code === 20) {
          // Code 20 means the call was aborted
          return;
        }
        this$1.close();
        throw error;
      });
  };

  PredictiveSearch.prototype.setLiveRegionLoadingState = function setLiveRegionLoadingState () {
    this.statusElement = this.statusElement || this.querySelector('.predictive-search-status');
    this.loadingText = this.loadingText || this.getAttribute('data-loading-text');

    this.setLiveRegionText(this.loadingText);
    this.setAttribute('loading', true);
  };

  PredictiveSearch.prototype.setLiveRegionText = function setLiveRegionText (statusText) {
    var this$1 = this;

    this.statusElement.setAttribute('aria-hidden', 'false');
    this.statusElement.textContent = statusText;

    setTimeout(function () {
      this$1.statusElement.setAttribute('aria-hidden', 'true');
    }, 1000);
  };

  PredictiveSearch.prototype.renderSearchResults = function renderSearchResults (resultsMarkup) {
    this.predictiveSearchResults.innerHTML = resultsMarkup;
    this.setAttribute('results', true);

    this.setLiveRegionResults();
    this.open();
  };

  PredictiveSearch.prototype.setLiveRegionResults = function setLiveRegionResults () {
    this.removeAttribute('loading');
    this.setLiveRegionText(this.querySelector('[data-predictive-search-live-region-count-value]').textContent);
  };

  PredictiveSearch.prototype.getResultsMaxHeight = function getResultsMaxHeight () {
    this.resultsMaxHeight =
      window.innerHeight - document.querySelector('.section-header').getBoundingClientRect().bottom;
    return this.resultsMaxHeight;
  };

  PredictiveSearch.prototype.open = function open () {
    this.predictiveSearchResults.style.maxHeight = this.resultsMaxHeight || ((this.getResultsMaxHeight()) + "px");
    this.setAttribute('open', true);
    this.input.setAttribute('aria-expanded', true);
    this.isOpen = true;
  };

  PredictiveSearch.prototype.close = function close (clearSearchTerm) {
    if ( clearSearchTerm === void 0 ) clearSearchTerm = false;

    this.closeResults(clearSearchTerm);
    this.isOpen = false;
  };

  PredictiveSearch.prototype.closeResults = function closeResults (clearSearchTerm) {
    if ( clearSearchTerm === void 0 ) clearSearchTerm = false;

    if (clearSearchTerm) {
      this.input.value = '';
      this.removeAttribute('results');
    }
    var selected = this.querySelector('[aria-selected="true"]');

    if (selected) { selected.setAttribute('aria-selected', false); }

    this.input.setAttribute('aria-activedescendant', '');
    this.removeAttribute('loading');
    this.removeAttribute('open');
    this.input.setAttribute('aria-expanded', false);
    this.resultsMaxHeight = false;
    this.predictiveSearchResults.removeAttribute('style');
  };

  return PredictiveSearch;
}(SearchForm));

customElements.define('predictive-search', PredictiveSearch);


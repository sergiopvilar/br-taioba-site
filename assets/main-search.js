var MainSearch = /*@__PURE__*/(function (SearchForm) {
  function MainSearch() {
    SearchForm.call(this);
    this.allSearchInputs = document.querySelectorAll('input[type="search"]');
    this.setupEventListeners();
  }

  if ( SearchForm ) MainSearch.__proto__ = SearchForm;
  MainSearch.prototype = Object.create( SearchForm && SearchForm.prototype );
  MainSearch.prototype.constructor = MainSearch;

  MainSearch.prototype.setupEventListeners = function setupEventListeners () {
    var this$1 = this;

    var allSearchForms = [];
    this.allSearchInputs.forEach(function (input) { return allSearchForms.push(input.form); });
    this.input.addEventListener('focus', this.onInputFocus.bind(this));
    if (allSearchForms.length < 2) { return; }
    allSearchForms.forEach(function (form) { return form.addEventListener('reset', this$1.onFormReset.bind(this$1)); });
    this.allSearchInputs.forEach(function (input) { return input.addEventListener('input', this$1.onInput.bind(this$1)); });
  };

  MainSearch.prototype.onFormReset = function onFormReset (event) {
    SearchForm.prototype.onFormReset.call(this, event);
    if (SearchForm.prototype.shouldResetForm.call(this)) {
      this.keepInSync('', this.input);
    }
  };

  MainSearch.prototype.onInput = function onInput (event) {
    var target = event.target;
    this.keepInSync(target.value, target);
  };

  MainSearch.prototype.onInputFocus = function onInputFocus () {
    var isSmallScreen = window.innerWidth < 750;
    if (isSmallScreen) {
      this.scrollIntoView({ behavior: 'smooth' });
    }
  };

  MainSearch.prototype.keepInSync = function keepInSync (value, target) {
    this.allSearchInputs.forEach(function (input) {
      if (input !== target) {
        input.value = value;
      }
    });
  };

  return MainSearch;
}(SearchForm));

customElements.define('main-search', MainSearch);


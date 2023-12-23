var SearchForm = /*@__PURE__*/(function (HTMLElement) {
  function SearchForm() {
    var this$1 = this;

    HTMLElement.call(this);
    this.input = this.querySelector('input[type="search"]');
    this.resetButton = this.querySelector('button[type="reset"]');

    if (this.input) {
      this.input.form.addEventListener('reset', this.onFormReset.bind(this));
      this.input.addEventListener(
        'input',
        debounce(function (event) {
          this$1.onChange(event);
        }, 300).bind(this)
      );
    }
  }

  if ( HTMLElement ) SearchForm.__proto__ = HTMLElement;
  SearchForm.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  SearchForm.prototype.constructor = SearchForm;

  SearchForm.prototype.toggleResetButton = function toggleResetButton () {
    var resetIsHidden = this.resetButton.classList.contains('hidden');
    if (this.input.value.length > 0 && resetIsHidden) {
      this.resetButton.classList.remove('hidden');
    } else if (this.input.value.length === 0 && !resetIsHidden) {
      this.resetButton.classList.add('hidden');
    }
  };

  SearchForm.prototype.onChange = function onChange () {
    this.toggleResetButton();
  };

  SearchForm.prototype.shouldResetForm = function shouldResetForm () {
    return !document.querySelector('[aria-selected="true"] a');
  };

  SearchForm.prototype.onFormReset = function onFormReset (event) {
    // Prevent default so the form reset doesn't set the value gotten from the url on page load
    event.preventDefault();
    // Don't reset if the user has selected an element on the predictive search dropdown
    if (this.shouldResetForm()) {
      this.input.value = '';
      this.input.focus();
      this.toggleResetButton();
    }
  };

  return SearchForm;
}(HTMLElement));

customElements.define('search-form', SearchForm);


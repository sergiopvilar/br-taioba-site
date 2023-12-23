if (!customElements.get('show-more-button')) {
  customElements.define(
    'show-more-button',
    /*@__PURE__*/(function (HTMLElement) {
    function ShowMoreButton() {
        var this$1 = this;

        HTMLElement.call(this);
        var button = this.querySelector('button');
        button.addEventListener('click', function (event) {
          this$1.expandShowMore(event);
          var nextElementToFocus = event.target.closest('.parent-display').querySelector('.show-more-item');
          if (nextElementToFocus && !nextElementToFocus.classList.contains('hidden') && nextElementToFocus.querySelector('input')) {
            nextElementToFocus.querySelector('input').focus();
          }
        });
      }

    if ( HTMLElement ) ShowMoreButton.__proto__ = HTMLElement;
    ShowMoreButton.prototype = Object.create( HTMLElement && HTMLElement.prototype );
    ShowMoreButton.prototype.constructor = ShowMoreButton;
      ShowMoreButton.prototype.expandShowMore = function expandShowMore (event) {
        var parentDisplay = event.target.closest('[id^="Show-More-"]').closest('.parent-display');
        var parentWrap = parentDisplay.querySelector('.parent-wrap');
        this.querySelectorAll('.label-text').forEach(function (element) { return element.classList.toggle('hidden'); });
        parentDisplay.querySelectorAll('.show-more-item').forEach(function (item) { return item.classList.toggle('hidden'); });
        if (!this.querySelector('.label-show-less')) {
          this.classList.add('hidden');
        }
      };

    return ShowMoreButton;
  }(HTMLElement))
  );
}


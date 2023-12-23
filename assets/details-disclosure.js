var DetailsDisclosure = /*@__PURE__*/(function (HTMLElement) {
  function DetailsDisclosure() {
    HTMLElement.call(this);
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  if ( HTMLElement ) DetailsDisclosure.__proto__ = HTMLElement;
  DetailsDisclosure.prototype = Object.create( HTMLElement && HTMLElement.prototype );
  DetailsDisclosure.prototype.constructor = DetailsDisclosure;

  DetailsDisclosure.prototype.onFocusOut = function onFocusOut () {
    var this$1 = this;

    setTimeout(function () {
      if (!this$1.contains(document.activeElement)) { this$1.close(); }
    });
  };

  DetailsDisclosure.prototype.onToggle = function onToggle () {
    if (!this.animations) { this.animations = this.content.getAnimations(); }

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach(function (animation) { return animation.play(); });
    } else {
      this.animations.forEach(function (animation) { return animation.cancel(); });
    }
  };

  DetailsDisclosure.prototype.close = function close () {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  };

  return DetailsDisclosure;
}(HTMLElement));

customElements.define('details-disclosure', DetailsDisclosure);

var HeaderMenu = /*@__PURE__*/(function (DetailsDisclosure) {
  function HeaderMenu() {
    DetailsDisclosure.call(this);
    this.header = document.querySelector('.header-wrapper');
  }

  if ( DetailsDisclosure ) HeaderMenu.__proto__ = DetailsDisclosure;
  HeaderMenu.prototype = Object.create( DetailsDisclosure && DetailsDisclosure.prototype );
  HeaderMenu.prototype.constructor = HeaderMenu;

  HeaderMenu.prototype.onToggle = function onToggle () {
    if (!this.header) { return; }
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') { return; }
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      ((Math.floor(this.header.getBoundingClientRect().bottom)) + "px")
    );
  };

  return HeaderMenu;
}(DetailsDisclosure));

customElements.define('header-menu', HeaderMenu);



import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autocompleteOff]'
})
export class AutocompleteOffDirective {
  constructor(private _el: ElementRef) {
    let w: any = window;
    let isChrome = w.chrome;
    if (isChrome) {
      console.log("Aplicando");
      this._el.nativeElement.setAttribute('autocomplete', 'new-password');
      this._el.nativeElement.setAttribute('autocorrect', 'new-password');
      this._el.nativeElement.setAttribute('autocapitalize', 'new-password');
      this._el.nativeElement.setAttribute('spellcheck', 'new-password');
    }
  }
}
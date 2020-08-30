import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[pxtNumber]'
})
export class PxtNumberDirective {
  
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if( [0,1,2,3,4,5,6,7,8,9].indexOf(Number.parseInt(e.key)) != -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right, up, down
        (e.keyCode >= 35 && e.keyCode <= 40) ||
        // Allow: backspace and delete
        (e.keyCode === 8 || e.keyCode === 46)) {
      return;
    } else {
      e.preventDefault();
    }
  }

}
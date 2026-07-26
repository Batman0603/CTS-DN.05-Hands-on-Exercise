import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elementRef = {
      nativeElement: document.createElement('div')
    } as ElementRef;
    const directive = new HighlightDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

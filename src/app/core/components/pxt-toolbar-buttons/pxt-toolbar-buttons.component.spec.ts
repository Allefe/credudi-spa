import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxtToolbarButtonsComponent } from './pxt-toolbar-buttons.component';

describe('PxtToolbarButtonsComponent', () => {
  let component: PxtToolbarButtonsComponent;
  let fixture: ComponentFixture<PxtToolbarButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PxtToolbarButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PxtToolbarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

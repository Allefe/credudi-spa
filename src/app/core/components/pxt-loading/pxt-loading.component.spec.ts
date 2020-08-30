import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxtLoadingComponent } from './pxt-loading.component';

describe('PxtLoadingComponent', () => {
  let component: PxtLoadingComponent;
  let fixture: ComponentFixture<PxtLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PxtLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PxtLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

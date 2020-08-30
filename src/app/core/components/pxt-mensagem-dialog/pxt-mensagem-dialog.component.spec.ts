import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxtMensagemDialogComponent } from './pxt-mensagem-dialog.component';

describe('PxtMensagemDialogComponent', () => {
  let component: PxtMensagemDialogComponent;
  let fixture: ComponentFixture<PxtMensagemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PxtMensagemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PxtMensagemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

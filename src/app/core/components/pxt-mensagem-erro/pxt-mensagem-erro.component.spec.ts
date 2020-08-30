import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxtMensagemErroComponent } from './pxt-mensagem-erro.component';

describe('PxtMensagemErroComponent', () => {
  let component: PxtMensagemErroComponent;
  let fixture: ComponentFixture<PxtMensagemErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PxtMensagemErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PxtMensagemErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

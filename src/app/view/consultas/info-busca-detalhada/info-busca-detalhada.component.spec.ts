import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBuscaDetalhadaComponent } from './info-busca-detalhada.component';

describe('InfoBuscaDetalhadaComponent', () => {
  let component: InfoBuscaDetalhadaComponent;
  let fixture: ComponentFixture<InfoBuscaDetalhadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBuscaDetalhadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBuscaDetalhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

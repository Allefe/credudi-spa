import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDinamicaComponent } from './tabela-dinamica.component';

describe('TabelaDinamicaComponent', () => {
  let component: TabelaDinamicaComponent;
  let fixture: ComponentFixture<TabelaDinamicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaDinamicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarPerfilPrivilegiosComponent } from './associar-perfil-privilegios.component';

describe('AssociarPerfilPrivilegiosComponent', () => {
  let component: AssociarPerfilPrivilegiosComponent;
  let fixture: ComponentFixture<AssociarPerfilPrivilegiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarPerfilPrivilegiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarPerfilPrivilegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

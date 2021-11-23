import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCitaMedicaComponent } from './registrar-cita-medica.component';

describe('RegistrarCitaMedicaComponent', () => {
  let component: RegistrarCitaMedicaComponent;
  let fixture: ComponentFixture<RegistrarCitaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCitaMedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCitaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

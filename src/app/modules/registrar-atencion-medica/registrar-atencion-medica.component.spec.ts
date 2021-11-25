import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAtencionMedicaComponent } from './registrar-atencion-medica.component';

describe('RegistrarAtencionMedicaComponent', () => {
  let component: RegistrarAtencionMedicaComponent;
  let fixture: ComponentFixture<RegistrarAtencionMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAtencionMedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAtencionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

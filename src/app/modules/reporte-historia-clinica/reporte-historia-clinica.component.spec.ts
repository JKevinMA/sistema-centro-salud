import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHistoriaClinicaComponent } from './reporte-historia-clinica.component';

describe('ReporteHistoriaClinicaComponent', () => {
  let component: ReporteHistoriaClinicaComponent;
  let fixture: ComponentFixture<ReporteHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

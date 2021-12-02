import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAtencionMedicaComponent } from './reporte-atencion-medica.component';

describe('ReporteAtencionMedicaComponent', () => {
  let component: ReporteAtencionMedicaComponent;
  let fixture: ComponentFixture<ReporteAtencionMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAtencionMedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAtencionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

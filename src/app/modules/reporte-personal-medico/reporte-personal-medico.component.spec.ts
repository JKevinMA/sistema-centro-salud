import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePersonalMedicoComponent } from './reporte-personal-medico.component';

describe('ReportePersonalMedicoComponent', () => {
  let component: ReportePersonalMedicoComponent;
  let fixture: ComponentFixture<ReportePersonalMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePersonalMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePersonalMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

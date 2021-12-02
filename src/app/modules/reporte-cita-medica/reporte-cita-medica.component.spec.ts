import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCitaMedicaComponent } from './reporte-cita-medica.component';

describe('ReporteCitaMedicaComponent', () => {
  let component: ReporteCitaMedicaComponent;
  let fixture: ComponentFixture<ReporteCitaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCitaMedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCitaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifTendenciaComponent } from './identif-tendencia.component';

describe('IdentifTendenciaComponent', () => {
  let component: IdentifTendenciaComponent;
  let fixture: ComponentFixture<IdentifTendenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifTendenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifTendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

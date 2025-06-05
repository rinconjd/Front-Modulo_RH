import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoVisualizacionComponent } from './empleado-visualizacion.component';

describe('EmpleadoVisualizacionComponent', () => {
  let component: EmpleadoVisualizacionComponent;
  let fixture: ComponentFixture<EmpleadoVisualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoVisualizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoVisualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

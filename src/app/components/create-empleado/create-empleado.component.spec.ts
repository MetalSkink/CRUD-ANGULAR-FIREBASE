import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpleadoComponent } from './create-empleado.component';

describe('CreateEmpleadoComponent', () => {
  let component: CreateEmpleadoComponent;
  let fixture: ComponentFixture<CreateEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted=false;
  loading=false;
  id:string | null;
  titulo:string ='Agregar Empleado';


  constructor(private fb:FormBuilder,
              private empleadoService:EmpleadoService,
              private router:Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createEmpleado=this.fb.group({
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      documento:['',Validators.required],
      salario:['',Validators.required],
    })
    this.id= this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);

  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar(){
    if(this.id !== null){
      this.titulo ='Editar Empleado';
      this.loading =true;
      this.empleadoService.getEmpleado(this.id).subscribe(data =>{
        this.loading =false;
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellidos: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
      });
    }
  }

  editarEmpleado(id:string){
    const empleado:any={
      nombre: this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellidos,
      documento:this.createEmpleado.value.documento,
      salario:this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this.empleadoService.actualizarEmpleado(id,empleado).then(() =>{
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'El empleado fue modificado!',{
        positionClass:'toast-bottom-right'
      });
      this.router.navigateByUrl("/list-empleados")
    });
  }

  agregarEditarEmpleado(){
    this.submitted=true;
    if(this.createEmpleado.invalid){
      return
    }
    if (this.id === null) {
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(){
    const empleado:any={
      nombre: this.createEmpleado.value.nombre,
      apellido:this.createEmpleado.value.apellidos,
      documento:this.createEmpleado.value.documento,
      salario:this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    console.log(empleado);

    console.log(this.createEmpleado);
    console.log(this.createEmpleado.value);
    this.loading=true;
    this.empleadoService.agregarEmpleado(empleado).then(()=>{
      console.log("empleado registrado con exito!");
      this.toastr.success('El empleado fue registrado con exito', 'El empleado fue registrado!',{
        positionClass:'toast-bottom-right'
      });
      this.loading=false;
      this.router.navigateByUrl("/list-empleados")

    }).catch(error =>{
      this.loading=false;
      console.log(error);

    })
  }
}

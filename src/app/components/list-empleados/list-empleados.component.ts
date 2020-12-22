import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados:any[]=[];


  constructor(private empleadoService:EmpleadoService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe(data =>{
      this.empleados=[];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        this.empleados.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id:string){
    this.empleadoService.eliminarEmpleado(id).then(() =>{
      console.log('empleado con el ID: '+id+' eliminado');
      this.toastr.error('Empleado eliminado del sistema', 'El empleado fue eliminado con exito!',{
        positionClass:'toast-bottom-right'
      });

    }).catch(error =>{
      console.log(error);

    })

    }
  }


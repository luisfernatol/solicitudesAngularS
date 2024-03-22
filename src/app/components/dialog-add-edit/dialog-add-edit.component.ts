import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD', // Formato de entrada para el campo de fecha
  },
  display: {
    dateInput: 'YYYY/MM/DD', // Formato de visualización para el campo de fecha
    monthYearLabel: 'YYYY MMMM ', // Formato de visualización para el selector de mes y año
    dateA11yLabel: 'YYYY/MM/DD', // Formato de accesibilidad para la fecha
    monthYearA11yLabel: 'YYYY MMMM ', // Formato de accesibilidad para el selector de mes y año
  },
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers:[{
provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS

  }]
})



export class DialogAddEditComponent  implements OnInit{
  formEmpleado:FormGroup;
  tituloaccion:string ="Nuevo"
  BotonAccion: string = "Guardar";
  listaUsuario: Usuario[] = [];
  empleado: Empleado = new Empleado();
  myDateFormat: string = 'YYYY/MM/DD';
  
  
// Asumiendo que listaUsuario es una propiedad del componente que contiene la lista de usuarios
usuariosConRolTres: any[];




  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>
    , private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioService ,   
    private _empleadoServicio: EmpleadoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado:Empleado
    
    ){
      this.formEmpleado = this.fb.group({
        documento: ['', Validators.required],
        tipoDocumento: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['', Validators.required],
        direccion: ['', Validators.required],
        fechaIngreso: ['', Validators.required], 
        fechaRetiro: ['', Validators.required],
        tipoContrato: ['', Validators.required],
        estadoEmpleado: ['', Validators.required],
        supervisorInmediato: ['', Validators.required],
        cargo: ['', Validators.required]
      })

     this._usuarioServicio.obtenerUsuarioLista().subscribe({
      next: (data) => {
        this.listaUsuario=data;
        // En algún lugar del código donde tengas acceso a listaUsuario, realiza el filtrado:
this.usuariosConRolTres = this.listaUsuario.filter(user => user.rol === 3);
      },error: (e) => {}

     });

    }
    
    ngOnInit(): void{

     
      if(this.dataEmpleado){
        this.formEmpleado.patchValue({
          documento: this.dataEmpleado.documento,
          tipoDocumento: this.dataEmpleado.tipoDocumento,
          nombre: this.dataEmpleado.nombre,
            apellido: this.dataEmpleado.apellido,
            telefono: this.dataEmpleado.telefono,
            direccion: this.dataEmpleado.direccion,
            fechaIngreso: moment(this.dataEmpleado.fechaIngreso,"YYYY/MM/DD").toDate(),
            fechaRetiro: moment(this.dataEmpleado.fechaRetiro,"YYYY/MM/DD").toDate(),
            tipoContrato: this.dataEmpleado.tipoContrato,
            estadoEmpleado: this.dataEmpleado.estadoEmpleado,
            supervisorInmediato: this.dataEmpleado.supervisorInmediato,
            cargo: this.dataEmpleado.cargo
        })
        this.tituloaccion="Editar";
        this.BotonAccion="Actualizar";
   
       

      }

       
      
    
    }

    

    mostrarAlerta(msg: string, accion: string) {
      this._snackBar.open(msg, accion, {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 3000
      });
    }
    addEditarEmpleado(){


const modelo: Empleado ={
  documento: this.formEmpleado.value.documento,
  tipoDocumento: this.formEmpleado.value.tipoDocumento,
  nombre: this.formEmpleado.value.nombre,
  apellido: this.formEmpleado.value.apellido,
  telefono: this.formEmpleado.value.telefono,
  direccion: this.formEmpleado.value.direccion,
  fechaIngreso: moment(this.formEmpleado.value.fechaIngreso, "YYYY/MM/DD").toDate(),
  fechaRetiro: moment(this.formEmpleado.value.fechaRetiro, "YYYY/MM/DD").toDate(),
  tipoContrato: this.formEmpleado.value.tipoContrato,
  estadoEmpleado: this.formEmpleado.value.estadoEmpleado,
  supervisorInmediato: this.formEmpleado.value.supervisorInmediato,
  cargo: this.formEmpleado.value.cargo,
  idEmpleado: 0
}

if(this.dataEmpleado == null){
  this._empleadoServicio.agregarEmpleado(modelo).subscribe({
    next: (data) => {
      this.mostrarAlerta("Empleado fue Creado","Listo");
      this.dialogoReferencia.close("Creado");
    },error: (e) => {
      this.mostrarAlerta("No se puede Craer","Error");
    }
  
  
  })

}else{
  this._empleadoServicio.editarEmpleado(this.dataEmpleado.idEmpleado, modelo).subscribe({
    next: (data) => {
      this.mostrarAlerta("Empleado fue editado","Listo");
      this.dialogoReferencia.close("Editado");
    },error: (e) => {
      this.mostrarAlerta("No se puede editar","Error");
    }
  
  
  })

}



    }




}



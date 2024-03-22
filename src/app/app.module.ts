import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoListaComponent } from './components/empleado-lista/empleado-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { DatePipe,CommonModule } from '@angular/common';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // MatSnackBarModule
import { MatIconModule } from '@angular/material/icon'; // MatIconModule
import { MatDialogModule } from '@angular/material/dialog'; // MatDialogModule
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogAddEditComponent } from './components/dialog-add-edit/dialog-add-edit.component';
import {MatMenuModule} from '@angular/material/menu';
import { UsarioListaComponent } from './components/usario-lista/usario-lista.component';
import { SolicitudesListaAprobacionComponent } from './components/solicitudes-lista-aprobacion/solicitudes-lista-aprobacion.component';
import { SolicitudesListaComponent } from './components/solicitudes-lista/solicitudes-lista.component';
import { DialogAddSolicitudesComponent } from './components/dialog-add-solicitudes/dialog-add-solicitudes.component';
import { DialogEditEstadoSolicitudesComponent } from './components/dialog-edit-estado-solicitudes/dialog-edit-estado-solicitudes.component';





@NgModule({
  declarations: [
    AppComponent,
    EmpleadoListaComponent,
    DialogAddEditComponent,
    UsarioListaComponent,
    SolicitudesListaAprobacionComponent,
    SolicitudesListaComponent,
    DialogAddSolicitudesComponent,
    DialogEditEstadoSolicitudesComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatMenuModule,
   
    MatSnackBarModule, // Agrega MatSnackBarModule
    MatIconModule, // Agrega MatIconModule
    MatDialogModule, // Agrega MatDialogModule
    MatGridListModule // Agrega MatGridListModule,
    ,DatePipe
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

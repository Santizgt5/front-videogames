import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PopupJuegoComponent } from './components/popup-juego/popup-juego.component';
import { PopupCompanyComponent } from './components/popup-company/popup-company.component';
import { DetalleJuegoComponent } from './components/detalle-juego/detalle-juego.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    InventoryComponent,
    PopupJuegoComponent,
    PopupCompanyComponent,
    DetalleJuegoComponent
  ],
  imports: [
    InventoryRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule
  ]
})
export class InventoryModule { }

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideogamePurchase } from '@core/modelo/videogamePurchase';
import { LocalstorageService } from '@core/services/localstorage.service';
import Swal from 'sweetalert2';
import { Videogame } from '../../shared/model/videogame';
import { CompanyService } from '../../shared/service/company.service';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css']
})
export class DetalleJuegoComponent implements OnInit {

  public cantidad = 1;
  public message = false;
  public purchase: VideogamePurchase;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Videogame,
              public dialogRef: MatDialogRef<DetalleJuegoComponent>,
              private companyService: CompanyService,
              private purchaseService: LocalstorageService ) {

   }

  ngOnInit(): void {
  }

  getFormatDate() {
    const dos = 2;
    const decimalRadix = 10;
    const spliDate = this.data.releaseDate.split('-');
    const date = new Date(parseInt(spliDate[0], decimalRadix) , parseInt(spliDate[1], decimalRadix), parseInt(spliDate[dos], decimalRadix) );
    const formatDate = (element: Date) => {
      return `${element.getDate()}/${(element.getMonth())}/${element.getFullYear()}`;
    };
    return formatDate(date);
  }

  getCompanyName() {
    if(this.companyService.companies) {
      const company = this.companyService.companies.find(x => this.data.companyId === x.id);
      return company?company.name: this.data.companyId;
    } else {
      return '';
    }
  }

  addOrSubtract(operator: boolean ) {
    if(operator) {
      if( this.cantidad < this.data.stock ) {
        this.cantidad++;
      }
    } else {
      if(this.cantidad > 0) {
        this.cantidad--;
      }
    }
  }

  public async createCart() {
    if(this.cantidad > this.data.stock) {
      this.message = true;
    } else {
      this.message = false;
      this.purchase = {
        id: 1,
        videogame: this.data.title,
        videogameId: this.data.id,
        quantity: this.cantidad,
        price: this.data.priceWithDiscountMonth ? this.data.priceWithDiscountMonth : this.data.price
      };
      this.purchaseService.add(this.purchase);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se agrego correctamente al carrito',
        showConfirmButton: false,
        timer: 1000
      });
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

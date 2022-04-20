import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideogamePurchase } from '@core/modelo/videogamePurchase';
import { LocalstorageService } from '@core/services/localstorage.service';
import Swal from 'sweetalert2';
import { Cart } from '../../shared/model/cart';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {  

  public videogames: VideogamePurchase[];
  public totalGross = 0;
  public discount = 0;
  public totalNet = 0;
  public quantity = 0;
  public cart: Cart;
  public cartData: Cart;

  constructor( private purchaseService: LocalstorageService, private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.videogames = this.purchaseService.getVideogames();
    this.videogames.forEach( video => {
      this.totalGross += (video.price * video.quantity);
      this.quantity += video.quantity;
    });
    this.loadCart();  

  }

  deleteCart() {
    this.purchaseService.removeAll();
    this.videogames = [];
  }

  async loadCart() {
    this.cart = {
       total: this.totalGross,
       cantidadTotal: this.quantity,
       videogames: this.videogames
    };
    let resp = await this.cartService.getCart(this.cart);
    if(resp) {
      this.cartData = resp;
      this.discount = this.totalGross - this.cartData.total;
    }
  }

  async buyCart() {
    let resp = await this.cartService.buyCart(this.cartData);
    if(resp) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se compraron correctamente los juegos',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/inventory']);
      this.deleteCart();
    }

  }

}

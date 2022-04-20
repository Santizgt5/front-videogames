import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartData: Cart;
  private succses = 200;

  constructor(private http: HttpClient) {

  }

  public getCart(data: Cart): Promise<Cart> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.endpoint}${environment.CART}/calculateDiscount`, data, {observe: 'response'})
                  .subscribe((response: any) => {
                    if(response.status === this.succses ) {
                      this.cartData = response.body;
                      resolve(this.cartData);
                    } else {
                      reject(undefined);
                    }
                  });
    }); 
  }

  public buyCart(data: Cart) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.endpoint}${environment.CART}/buy`, data, {observe: 'response'})
                  .subscribe((response: any) => {
                    if(response.status === this.succses) {
                      resolve(true);
                    } else {
                      reject(false);
                    }
                  });
    }); 
  } 

}

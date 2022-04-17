import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {

  }

  public getCart(data: Cart) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.endpoint}${environment.CART}/calculateDiscount`, data, {observe: 'response'})
                  .subscribe((response: any) => {
                    if(response.status === 200) {
                      resolve(response.body);
                    } else {
                      reject(undefined);
                    }
                  })
    }); 
  }

  public buyCart(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.endpoint}${environment.CART}/buy`, data, {observe: 'response'})
                  .subscribe((response: any) => {
                    if(response.status === 200) {
                      resolve(true);
                    } else {
                      reject(false);
                    }
                  })
    }); 
  } 

}

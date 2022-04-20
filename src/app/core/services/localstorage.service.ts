import { Injectable } from '@angular/core';
import { VideogamePurchase } from '@core/modelo/videogamePurchase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public quantity$: Subject<number> = new Subject(); 

  constructor() { }

  public add(videogame: VideogamePurchase ) {
    let array = [];
    if(localStorage.getItem('videogamesCart')) {
      array = JSON.parse( localStorage.getItem('videogamesCart'));
      array.push(videogame);
      localStorage.setItem('videogamesCart', JSON.stringify(array));
    } else {
      array.push(videogame);
      localStorage.setItem('videogamesCart', JSON.stringify(array));
    }
    this.quantity$.next(array.length);
  }

  public removeAll() {
    let array = [];
    if(localStorage.getItem('videogamesCart')){
      localStorage.clear();
    }
    this.quantity$.next(array.length);
  }

  public getVideogames() {
    if(localStorage.getItem('videogamesCart')) {
      return JSON.parse(localStorage.getItem('videogamesCart'));
    } else {
      return [];
    }
  }
}

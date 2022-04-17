import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '@core/services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: [`mat-icon {
    color: white;
    margin-right: 50px;
  }

  a {
    position: relative;
  }

  .notification {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 17px;
    height: 17px;
    background-color: Tomato;
    color: white;
    border-radius: 30px;
    right: 43px;
    bottom: 20px;
  }`],
})
export class NavbarComponent implements OnInit {

  public quantity = localStorage.getItem('videogamesCart') ? JSON.parse(localStorage.getItem('videogamesCart')!).length : 0;

  constructor(private purchaseService: LocalstorageService) { }

  ngOnInit(): void {
    this.purchaseService.quantity$.subscribe( quantity => {
      this.quantity = quantity;
    });
  }

}

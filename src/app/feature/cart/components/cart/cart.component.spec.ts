import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '@cart/shared/service/cart.service';
import { LocalstorageService } from '@core/services/localstorage.service';
import { InventoryComponent } from '@inventory/components/inventory/inventory.component';
import Swal from 'sweetalert2';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let element;
  let mockPurchaseService: any;
  let mockCartService: any;
  beforeEach(() => {
    mockPurchaseService = jasmine.createSpyObj<LocalstorageService>(
      'serviceMockPurchase',
      ['getVideogames', 'removeAll']
    );
    mockCartService = jasmine.createSpyObj<CartService>('serviceMockCart', [
      'getCart',
      'buyCart'
    ]);
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: LocalstorageService, useValue: mockPurchaseService },
        { provide: CartService, useValue: mockCartService },
        { provider: Router, useValue: RouterTestingModule },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{path: 'inventory', component: InventoryComponent}])],
    }).compileComponents();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  afterEach(() => {
    document.body.removeChild(element);
  })

  it('should create', fakeAsync(() => {
    const videosgamesData = [
      {
        id: 1,
        videogame: 'God of war',
        videogameId: 1,
        quantity: 2,
        price: 135000,
      },
      { id: 1, videogame: 'Halo', videogameId: 2, quantity: 2, price: 150000 },
    ];
    const getCartData = {
      total: 200000,
      cantidadTotal: 4,
      videogames: [],
    };
    mockPurchaseService.getVideogames.and.returnValue(videosgamesData);
    mockCartService.getCart.and.returnValue(getCartData);
    fixture.autoDetectChanges();
    expect(component.videogames.length).toBeGreaterThan(0);
    expect(component.totalGross).toBe(570000);
    expect(component.quantity).toBe(4);
    expect(component.cart).toBeDefined();
    expect(component.cart).toEqual(
      jasmine.objectContaining({
        total: 570000,
        cantidadTotal: 4,
        videogames: videosgamesData,
      })
    );
    tick(5000);
    expect(component.cartData).toBeDefined();
    expect(component.discount).toBe(370000);
  }));

  it('Should load cart', fakeAsync(() => {
    const videosgamesData = [
      {
        id: 1,
        videogame: 'God of war',
        videogameId: 1,
        quantity: 2,
        price: 135000,
      },
      { id: 1, videogame: 'Halo', videogameId: 2, quantity: 2, price: 150000 },
    ];
    const getCartData = {
      total: 200000,
      cantidadTotal: 4,
      videogames: [],
    };
    mockPurchaseService.getVideogames.and.returnValue(videosgamesData);
    mockCartService.getCart.and.returnValue(getCartData);
    component.loadCart();
    fixture.autoDetectChanges();
    expect(component.cart).toEqual(
      jasmine.objectContaining({
        total: 570000,
        cantidadTotal: 4,
        videogames: videosgamesData,
      })
    );
    tick(5000);
    expect(component.cartData).toBeDefined();
    expect(component.discount).toBe(370000);
  }));
  
  it('Should delete cart', () => {
    component.deleteCart();
    expect(component.videogames.length).toBe(0);
  });

  it('Should buy cart', fakeAsync(() => {
    const videosgamesData = [
      {
        id: 1,
        videogame: 'God of war',
        videogameId: 1,
        quantity: 2,
        price: 135000,
      },
      { id: 1, videogame: 'Halo', videogameId: 2, quantity: 2, price: 150000 },
    ];
    mockPurchaseService.getVideogames.and.returnValue(videosgamesData);
    mockCartService.buyCart.and.returnValue(true);
    fixture.autoDetectChanges();
    component.buyCart();
    tick(5000)
    expect(Swal.isVisible()).toBeTruthy();
  }));

});
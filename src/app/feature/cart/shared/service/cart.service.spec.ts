import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ CartService ]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("it should buy the cart", () => {
    const url = `${environment.endpoint}${environment.CART}/buy`
    const data = {
      "id": 0,
      "total": 570000,
      "cantidadTotal": 4,
      "videogames": [
          {
              "id": 1,
              "videogame": "God of war",
              "videogameId": 1,
              "quantity": 2,
              "price": 135000,
              "priceWithDiscount": 0
          },
          {
              "id": 1,
              "videogame": "Halo",
              "videogameId": 2,
              "quantity": 2,
              "price": 150000,
              "priceWithDiscount": 0
          }
      ]
  }
    service.buyCart(data).then( res => {
      expect(res).toBeTrue();
    });
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    request.flush(true);
  });

  it("it should get the cart", () => {
    const url = `${environment.endpoint}${environment.CART}/calculateDiscount`;
    const data = {
      "id": 0,
      "total": 570000,
      "cantidadTotal": 4,
      "videogames": [
          {
              "id": 1,
              "videogame": "God of war",
              "videogameId": 1,
              "quantity": 2,
              "price": 135000,
              "priceWithDiscount": 0
          },
          {
              "id": 1,
              "videogame": "Halo",
              "videogameId": 2,
              "quantity": 2,
              "price": 150000,
              "priceWithDiscount": 0
          }
      ]
    }
    const mockResponse = {
      "id": 0,
      "total": 570000,
      "cantidadTotal": 4,
      "videogames": [
          {
              "id": 1,
              "videogame": "God of war",
              "videogameId": 1,
              "quantity": 2,
              "price": 135000,
              "priceWithDiscount": 0
          },
          {
              "id": 1,
              "videogame": "Halo",
              "videogameId": 2,
              "quantity": 2,
              "price": 150000,
              "priceWithDiscount": 0
          }
      ]
    }
      service.getCart(data).then(resp => {
        expect(resp).toBe(mockResponse);
      });
      const request = httpMock.expectOne(url);
      expect(request.request.method).toBe('POST');
      request.flush(mockResponse);
    });

});

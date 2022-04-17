import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing'
import { VideogamesService } from './videogames.service';
import { environment } from 'src/environments/environment';
import { Videogame } from '../model/videogame';

describe('VideogamesService', () => {
    let service: VideogamesService;
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ VideogamesService ]
        });
        service = TestBed.inject( VideogamesService );
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        const url = `${environment.endpoint}${environment.VIDEOGAME}s`;
        const getRequest: TestRequest = httpMock.expectOne(url);
        getRequest.flush([]);
        expect(getRequest.request.method).toEqual('GET');
        expect(service).toBeDefined();
    });

    it('It should be create videogame', () => {
        const url = `${environment.endpoint}${environment.VIDEOGAME}s`;
        const url2 = `${environment.endpoint}${environment.VIDEOGAME}`;
        const getRequest: TestRequest = httpMock.expectOne(url);
        expect(getRequest.request.method).toEqual('GET');
        getRequest.flush([]);
        const data: Videogame = {
              "title": "Bungie",
              "stock": 15,
              "companyId": 1,
              "releaseDate": "4743848",
              "platform": "PS5",
              "price": 150000,
        }
        const mockResponse = {
          "valor": 2
      }
      service.createVideogame(data).then(resp => {
          expect(resp).toEqual(mockResponse);
      })
      const createVideogameTestRequest: TestRequest = httpMock.expectOne(url2);
  
      expect(createVideogameTestRequest.request.method).toEqual('POST');
      expect(createVideogameTestRequest.request.body).toEqual(data);
      createVideogameTestRequest.flush(mockResponse);
  
      const newGetTestRequest: TestRequest = httpMock.expectOne(url);
  
      expect(newGetTestRequest.request.method).toEqual('GET');
      newGetTestRequest.flush([1, 2]);
    });

});
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing'
import { CompanyService } from './company.service';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ CompanyService ]
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const url = `${environment.endpoint}${environment.COMPANY}`;
    const getRequest: TestRequest = httpMock.expectOne(url);
    getRequest.flush([]);
    expect(getRequest.request.method).toEqual('GET');
    expect(service).toBeDefined();
  });

  it('It should be create company', () => {
      const url = `${environment.endpoint}${environment.COMPANY}`;
      const getRequest: TestRequest = httpMock.expectOne(url);
      expect(getRequest.request.method).toEqual('GET');
      getRequest.flush([]);
      const data: Company = {
            "name": "Bungie",
            "description": "Ejemplo de descripcion",
            "born": "2000-10-11",
            "nit": "4743848"
      }
      const mockResponse = {
        "valor": 4
    }
    service.createCompany(data).then(resp => {
        expect(resp).toEqual(mockResponse);
    })
    const createCompanyTestRequest: TestRequest = httpMock.expectOne(url);

    expect(createCompanyTestRequest.request.method).toEqual('POST');
    expect(createCompanyTestRequest.request.body).toEqual(data);
    createCompanyTestRequest.flush(mockResponse);

    const newGetTestRequest: TestRequest = httpMock.expectOne(url);

    expect(newGetTestRequest.request.method).toEqual('GET');
    newGetTestRequest.flush([1, 2]);
  });

  // it('It should be return the companies', () => {

  // });

});

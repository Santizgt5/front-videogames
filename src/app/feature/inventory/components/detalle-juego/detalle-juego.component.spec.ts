import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '@inventory/shared/service/company.service';

import { DetalleJuegoComponent } from './detalle-juego.component';

describe('DetalleJuegoComponent', () => {
  let component: DetalleJuegoComponent;
  let element;
  let fixture: ComponentFixture<DetalleJuegoComponent>;
  let mockCompanyService: any;

  beforeEach(async () => {
    mockCompanyService = jasmine.createSpyObj<CompanyService>('serviceMockVideogame', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ DetalleJuegoComponent ],
      providers: [ MatDialog, {
        provide: MAT_DIALOG_DATA, useValue:{
          "id": 1,
          "title": "League of legends",
          "stock": 10,
          "companyId": 1,
          "releaseDate": "2022-02-17",
          "platform": "XBOX",
          "price": 150000.0,
          "priceWithDiscountMonth": 0.0
      },
      },
     {
        provide: MatDialogRef, useValue: []     
     },
     { provide: CompanyService, useValue: mockCompanyService }
    ],
      imports: [ MatDialogModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleJuegoComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.removeChild(element);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return format date', () => {
    expect(component.getFormatDate()).toEqual('17/2/2022');
  });

  
});

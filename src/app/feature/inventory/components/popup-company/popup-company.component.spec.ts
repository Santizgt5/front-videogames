import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '@inventory/shared/service/company.service';

import { PopupCompanyComponent } from './popup-company.component';

describe('PopupCompanyComponent', () => {
  let component: PopupCompanyComponent;
  let element;
  let fixture: ComponentFixture<PopupCompanyComponent>;
  let mockCompanyService: any;

  beforeEach(async () => {
    mockCompanyService = jasmine.createSpyObj<CompanyService>('serviceMockCompany', ['createCompany'],);
    await TestBed.configureTestingModule({
      declarations: [ PopupCompanyComponent ],
      providers: [ { provide: MatDialogRef, useValue: { close: () => {} }},
     { provide: CompanyService, useValue: mockCompanyService} ],
     imports: [ ReactiveFormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCompanyComponent);
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

  // it('should create company', fakeAsync(() => {
  //   const data: Company =  {
  //     "name": "Bungie",
  //     "description": "Ejemplo de descripción",
  //     "born": "2022-03-08",
  //     "nit": "231231"
  // }
  //   const ret = {"valor": 2} 
  //   component.formGroup.setValue(data);
  //   mockCompanyService.createCompany.and.returnValue(ret);
  //   component.crearDeveloper();
  //   tick(5000);
  //   expect(Swal.isVisible()).toBeTruthy();
  // }));

});

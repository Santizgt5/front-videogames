import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PopupCompanyComponent } from './popup-company.component';

describe('PopupCompanyComponent', () => {
  let component: PopupCompanyComponent;
  let element;
  let fixture: ComponentFixture<PopupCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCompanyComponent ],
      providers: [ {
        provide: MatDialogRef, useValue: []     
     }],
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
});

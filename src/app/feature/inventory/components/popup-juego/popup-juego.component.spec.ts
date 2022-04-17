import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideogamesService } from '@inventory/shared/service/videogames.service';
import Swal from 'sweetalert2';

import { PopupJuegoComponent } from './popup-juego.component';

describe('PopupJuegoComponent', () => {
  let component: PopupJuegoComponent;
  let fixture: ComponentFixture<PopupJuegoComponent>;
  let element;
  let mockVideogameService: any;

  beforeEach(async () => {
    mockVideogameService = jasmine.createSpyObj<VideogamesService>('serviceMockVideogame', ['createVideogame'],);
    await TestBed.configureTestingModule({
      declarations: [ PopupJuegoComponent ],
      providers: [ 
        { provide: MatDialogRef, useValue: { close: () => {} }},
        { provide: VideogamesService, useValue: mockVideogameService}],
     imports: [ ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupJuegoComponent);
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

  it('should create videogame', fakeAsync(() => {
    const data = {
      "title": "God of war",
      "stock": 20,
      "companyId": 2,
      "releaseDate": "2022-03-17",
      "platform": "PS5",
      "price": 150000.0,
    }
    const ret = {"valor": 2} 
    component.formGroup.setValue(data);
    mockVideogameService.createVideogame.withArgs(data).and.returnValue(ret);
    component.crearVideojuego()
    tick(5000);
    expect(component.videogame).toEqual(data);
    expect(Swal.isVisible()).toBeTruthy();
  }));

  it('should call close the dialog', () => {
    spyOn(component.dialogRef, 'close');
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

});

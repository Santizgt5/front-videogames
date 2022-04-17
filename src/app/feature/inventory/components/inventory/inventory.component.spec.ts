import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideogamesService } from '@inventory/shared/service/videogames.service';
import { Subject } from 'rxjs';

import { InventoryComponent } from './inventory.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let element;
  let mockVideogameService: any;

  beforeEach(() => {
    mockVideogameService = jasmine.createSpyObj<VideogamesService>('serviceMockVideogame', ['getAll'], { loaded$: new Subject() });

    TestBed.configureTestingModule({
      declarations: [ InventoryComponent ],
      providers: [ MatDialog,
        { provide: VideogamesService, useValue: mockVideogameService },],
      imports: [ MatDialogModule, HttpClientTestingModule, BrowserAnimationsModule, ReactiveFormsModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  afterEach(() => {
    component.dialog.closeAll();
    document.body.removeChild(element);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should format date', () => {
    let date = '1998-10-11'
    expect(component.getFormatDate(date)).toEqual('11/10/1998');
  });

  it('Should open juego dialog', () => {
    component.openDialog();
    fixture.detectChanges();
    const popupHeader = document.getElementsByTagName('h1')[0] as HTMLHeadElement;
    expect(popupHeader.innerText).toEqual('Agregar juego');
  });

  it('Should open developer dialog', () => {
    component.openDeveloperDialog();
    fixture.detectChanges();
    const popupHeader = document.getElementsByTagName('h1')[0] as HTMLHeadElement;
    expect(popupHeader.innerText).toEqual('Agregar desarrolladora');
  });

  it('Should open videogameDatail dialog', () => {
    const data = {
      "title": "God of war",
      "stock": 20,
      "companyId": 2,
      "releaseDate": "2022-03-17",
      "platform": "PS5",
      "price": 150000.0,
    }
    component.showVideogameDetail(data);
    fixture.detectChanges();
    const popupHeader = document.getElementsByTagName('h1')[0] as HTMLHeadElement;
    expect(popupHeader.innerText).toEqual('Detalle Juego');
  });

});

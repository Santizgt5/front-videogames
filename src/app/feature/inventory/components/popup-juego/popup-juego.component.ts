import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Response } from '@inventory/shared/model/response';
import { Videogame } from '@inventory/shared/model/videogame';
import { CompanyService } from '@inventory/shared/service/company.service';
import { VideogamesService } from '@inventory/shared/service/videogames.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-juego',
  templateUrl: './popup-juego.component.html',
  styleUrls: ['./popup-juego.component.css']
})
export class PopupJuegoComponent implements OnInit {

  public formGroup: FormGroup;
  public videogame: Videogame;
  public resp: Response;

  constructor(public dialogRef: MatDialogRef<PopupJuegoComponent>, 
              private videogameService: VideogamesService,
              private companyService: CompanyService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      title: ['',Validators.required],
      stock: ['', Validators.required],
      companyId: [''],
      releaseDate: ['',Validators.required],
      platform: ['', Validators.required],
      price: ['', Validators.required]

      });
  }

  public async crearVideojuego() {
    let date = new Date(this.formGroup.get('releaseDate')?.value);
    let formatIso = date.toISOString();
    let splitDate = formatIso.split('T');
    this.videogame = this.formGroup.value;
    this.videogame.releaseDate = splitDate[0];
    this.resp = await this.videogameService.createVideogame(this.videogame);
    if(this.resp) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El juego se guardo correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get companies() {
    return this.companyService.companies;
  }

}

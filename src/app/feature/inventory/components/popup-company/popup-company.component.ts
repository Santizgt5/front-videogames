import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from '@inventory/shared/model/company';
import { CompanyService } from '@inventory/shared/service/company.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-popup-company',
  templateUrl: './popup-company.component.html',
  styleUrls: ['./popup-company.component.css']
})
export class PopupCompanyComponent implements OnInit {

  public formGroup: FormGroup;
  private company: Company;

  constructor(public dialogRef: MatDialogRef<PopupCompanyComponent>,
              private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['',Validators.required],
      description: ['', Validators.required],
      born: [''],
      nit: ['',Validators.required],
      });
  }

  async crearDeveloper() {
    let date = new Date(this.formGroup.get('born')?.value);
    let formatIso = date.toISOString();
    let splitDate = formatIso.split('T');
    this.company = this.formGroup.value;
    this.company.born = splitDate[0];
    const resp = await this.companyService.createCompany(this.company);
    if(resp) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La desarrolladora se guardo correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }


}

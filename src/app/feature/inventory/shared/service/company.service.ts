import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companiess: Company[];
  public reloaded$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
    this.getAll();
      this.reloaded$.subscribe((value) => {
          if(value) {
              this.getAll();
              this.reloaded$.next(false);
          }
      });
   }

   get companies() {
     return this.companiess;
   }


  public getAll() {
    const success = 200;
    this.http.get( `${environment.endpoint}${environment.COMPANY}`, {observe: 'response'}).subscribe( (response: any) => {
        if(response.status === success) {
            this.companiess = response.body;
        }
    });
}
  public createCompany(data: Company) {
    const success = 200;
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.endpoint}${environment.COMPANY}`, data, {observe: 'response'} ).subscribe((response: any) => {
        if(response.status === success) {
            this.reloaded$.next(true);
            resolve(response.body);
        }else {
          reject(undefined);
        }
    });
    });
}

}

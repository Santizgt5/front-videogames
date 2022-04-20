import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Videogame } from '../model/videogame';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

    private videogamess: Videogame[];
    public reloaded$: Subject<boolean> = new Subject();
    public loaded$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
      this.getAll();
      this.reloaded$.subscribe((value) => {
          if(value) {
              this.getAll();
              this.reloaded$.next(false);
          }
      });
  }

  get videogames() {
      return this.videogamess;
  }

  public getAll() {
      return new Promise((resolve, reject) => {
        const success = 200;
        this.http.get( `${environment.endpoint}${environment.VIDEOGAME}s`, {observe: 'response'}).subscribe( (response: any) => {
            if(response.status === success) {
                this.videogamess = response.body;
                this.loaded$.next(true);
                resolve(true);
            } else {
                this.loaded$.next(false);
                reject(false);
            }
        });
      });
  }

  public createVideogame(data: Videogame): Promise<Response> {
      const success = 200;
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.endpoint}${environment.VIDEOGAME}`, data, {observe: 'response'}).subscribe((response: any) => {
            if(response.status === success) {
                this.reloaded$.next(true);
                resolve(response.body);
            } else {
                reject(undefined);
            }
        });
      });
  }
}

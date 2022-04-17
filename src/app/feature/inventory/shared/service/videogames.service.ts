import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Videogame } from '../model/videogame';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

    private videogames: Videogame[];
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

  get Videogames() {
      return this.videogames;
  }

  public getAll() {
      return new Promise((resolve, reject) => {
        this.http.get( `${environment.endpoint}${environment.VIDEOGAME}s`, {observe: "response"}).subscribe( (response: any) => {
            if(response.status === 200) {
                this.videogames = response.body;
                this.loaded$.next(true)
                resolve(true);
            } else {
                console.log(response);
                this.loaded$.next(false);
                reject(false);
            }
        });
      });
  }

  public createVideogame(data: Videogame) {
      return new Promise((resolve, reject) => {
        this.http.post(`${environment.endpoint}${environment.VIDEOGAME}`, data, {observe: "response"}).subscribe((response: any) => {
            if(response.status === 200) {
                this.reloaded$.next(true);
                resolve(response.body);
            } else {
                reject(undefined);
            }
        })
      })
  }
}

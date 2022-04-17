import { ChangeDetectorRef, Component,OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupJuegoComponent } from '../popup-juego/popup-juego.component';
import { VideogamesService } from '../../shared/service/videogames.service';
import { CompanyService } from '../../shared/service/company.service';
import { Videogame } from '../../shared/model/videogame';
import { PopupCompanyComponent } from '../popup-company/popup-company.component';
import { DetalleJuegoComponent } from '../detalle-juego/detalle-juego.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'stock', 'companyId', 'releaseDate', 'platform', 'price'];
  public dataSource: MatTableDataSource<Videogame>; 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public developerDialog: MatDialog,
              private videogameService: VideogamesService,
              private companyService: CompanyService,
              private cdRef: ChangeDetectorRef ) {

    this.videogameService.loaded$.subscribe((data) => {
      if(data) {
        this.dataSource = new MatTableDataSource<Videogame>(this.videogames);
        this.dataSource.paginator = this.paginator;
        this.cdRef.detectChanges();
      }
    })

  }

  ngOnInit(): void {
      
  }

  getFormatDate(fecha: string) {
    const spliDate = fecha.split('-');
    const date = new Date(parseInt(spliDate[0]) , parseInt(spliDate[1]), parseInt(spliDate[2]) );
    const formatDate = (date: any) => {
    let formatted_date = date.getDate() + "/" + (date.getMonth()) + "/" + date.getFullYear()
      return formatted_date;
    }
    return formatDate(date);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(PopupJuegoComponent, dialogConfig);

  }

  openDeveloperDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(PopupCompanyComponent, dialogConfig);
  }

  showVideogameDetail( row:any ) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    this.dialog.open(DetalleJuegoComponent, dialogConfig);
  }

  get videogames() {
    return this.videogameService.Videogames;
  }

  get companies() {
    return this.companyService.Companies;
  }

}

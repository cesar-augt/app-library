import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { WeatherService } from './weather.service';
import { AuthService } from './services/auth/auth.service';
import { BookAddEditComponent } from './book-add-edit/book-add-edit.component';
import { BookService } from './services/book/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'author',
    'count_pages',
    'created',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  weatherData: any;
  baseUrlImages = 'https://assets.hgbrasil.com/weather/icons/conditions/';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _bookService: BookService,
    private _coreService: CoreService,
    private weatherService: WeatherService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getBookList();
    this.getWeatherData();
  }

  getWeatherData(): void {
    this.weatherService.getWeather()
      .subscribe(data => {
        this.weatherData = data;
      });
  }


  openAddEditBookForm() {
    const dialogRef = this._dialog.open(BookAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBookList();
        }
      },
    });
  }

  getBookList() {
    this._bookService.getBookList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBook(id: number) {
    this._bookService.deleteBook(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Book deleted!', 'done');
        this.getBookList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(BookAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBookList();
        }
      },
    });
  }
}

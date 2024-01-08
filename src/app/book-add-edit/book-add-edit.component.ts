import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { BookService } from '../services/book/book.service';


@Component({
  selector: 'app-book-add-edit',
  templateUrl: 'book-add-edit.component.html',
  styleUrls: ['book-add-edit.component.scss'],
})
export class BookAddEditComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _bookService: BookService,
    private _dialogRef: MatDialogRef<BookAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      author: ['', [Validators.required]],
      created: ['', [Validators.required]],
      count_pages: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.bookForm.valid) {
      if (this.data) {
        this._bookService
          .updateBook(this.data.id, this.bookForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Book detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._bookService.addBook(this.bookForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Book added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

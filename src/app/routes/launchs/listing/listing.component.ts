import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../useful';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {ListingService} from './service';
import {AuthService} from '@core';
import {User} from '@core/authentication/interface';
import {MatTableDataSource} from '@angular/material/table';
import {LaunchModel} from '@shared/models/launch.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import * as moment from 'moment';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

export interface DialogData {
  idLaunch: string;
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    }
  ],
})
export class ListingComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  type = 'moment';
  user: User;
  formGroup: FormGroup;
  dataSource: MatTableDataSource<LaunchModel>;
  displayColumns: string[] = ['id', 'dateLaunch', 'tpLaunch', 'tpExpense', 'obs', 'value', 'actions'];

  private pag: number;
  private ord: string;
  private dir: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _adapter: DateAdapter<any>,
    private auth: AuthService,
    private service: ListingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router
  ) {
    let defaultDate = this.getDefaultDate();
    this.formGroup = this.fb.group({
      datePickerInit: [defaultDate.dtIni, [Validators.required]],
      datePickerFinal: [defaultDate.dtFin, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.pag = 0;
    this.ord = 'dtLancamento';
    this.dir = '';
    this.auth.user()
      .subscribe(user => {
        this.user = user;

        if (this.user && this.user.id) {
          this.listData();
        }

        let idLaunch = this.activatedRoute.snapshot.params.idLaunch;
        if (idLaunch) {
          this.handleMessageTranslate('launchs.msgSuccessData');
        }
      });
  }

  listAction(): void {
    if (!this.formGroup.invalid) {
      this.listData();
    } else {
      this.handleMessageTranslate('launchs.msgRequiredFields');
    }
  }

  cleanAction(): void {
    let defaultDate = this.getDefaultDate();
    this.formGroup.controls.datePickerInit.reset(defaultDate.dtIni);
    this.formGroup.controls.datePickerFinal.reset(defaultDate.dtFin);
    this.listData();
  }

  editAction(idLaunch): void {
    this.router.navigateByUrl(
      '/launchs/register/'
      .concat(idLaunch)
    ).then();
  }

  deleteAction(idLaunch): void {
    const userId = this.user.id.toString();
    this.service.deleteLaunch(idLaunch, userId)
      .subscribe(
        result => {
          this.handleMessageTranslate('launchs.msgDeleteLaunch');
          this.listData();
        },
        err => {
          console.error(err);
          this.handleMessageTranslate('launchs.msgErrorDeleteLaunch');
        }
      )
  }

  listData(): void {
    let dataForm = this.getDataForm();
    this.service.findLaunchsByUser(dataForm)
      .subscribe(
        result => {
          const listLaunchs = result.data.content as LaunchModel[];
          this.dataSource = new MatTableDataSource<LaunchModel>(listLaunchs);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.error(err);
          this.handleMessageTranslate('launchs.msgErrorListData');
        }
      );
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {idLaunch: id}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if ('submit' === result) {
          this.deleteAction(id);
        }
      });
  }

  getDefaultDate(): any {
    return {
      dtIni: moment().subtract(10, 'days'),
      dtFin: moment()
    }
  }

  getDataForm(): any {
    return {
      dtInit: this.getFomatDate(this.formGroup.controls.datePickerInit.value),
      dtFin: this.getFomatDate(this.formGroup.controls.datePickerFinal.value),
      userId: this.user.id.toString(),
      pag: this.pag,
      ord: this.ord,
      dir: this.dir
    }
  }

  getFomatDate(date): string {
    return date ? this._adapter.format(date, MY_FORMATS.display.dateInput) : '';
  }

  handleMessageTranslate(key): void {
    this.translate.get(key)
      .subscribe(msg => {
        this.showMessageSnack(msg);
      });
  }

  showMessageSnack(msg): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
    });
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html'
})
export class DialogDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
}


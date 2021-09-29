import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {RegisterService} from './service';
import {AuthService} from '@core';
import {User} from '@core/authentication/interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {MY_FORMATS} from '../useful';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {BalanceComponent} from '../balance';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {

  @ViewChild(BalanceComponent, { static: false }) balance: BalanceComponent;

  user: User;
  formGroup: FormGroup;
  expensesTypes: [];
  isSaveAction: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _adapter: DateAdapter<any>,
    private auth: AuthService,
    private service: RegisterService,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      tpLaunch: ['C', [Validators.required]],
      valueLaunch: ['', [Validators.required]],
      expenseType: [{value: '', disabled: true}],
      observation: [''],
      datePicker: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
    this.initFields();
  }

  initFields(): void {
    this.getExpensivesType()
      .subscribe(result => {
          this.expensesTypes = result.data ? result.data : [];
          this.isSaveAction = true;

          let idLaunch = this.activatedRoute.snapshot.params.idLaunch;
          if (idLaunch) {
            const userId = this.user.id.toString();
            this.service.getLaunchUser(idLaunch, userId)
              .subscribe(result => {
                  this.setEditData(result.data);
                }
              )
          }

          this.balance.getBalance();
        },
        err => {
          console.error(err);
          this.handleMessageTranslate(
            'launchs.msgErrorListData',
            'launchs.msgErrorExpenses'
          );
        }
      )
  }

  onEndFocus(args): void {
    args.currentTarget.selectionStart = args.currentTarget.selectionEnd = args.currentTarget.value.length;
    args.currentTarget.focus();
  }

  persistAction(): void {
    if (!this.formGroup.invalid) {
      this.persistData();
    } else {
      this.handleMessageTranslate(
        'launchs.msgRequiredFields',
        'launchs.msgError'
      );
    }
  }

  getExpensivesType(): Observable<any> {
    return this.service.getDespesasTypes();
  }

  persistData(): void {
    const data = this.getDataConvert();
    if (data.valor !== 0) {
      this.service.persit(data)
        .subscribe(
          result => {
            if (result && result.data.id) {
              this.resetFormGroup();
              let idLaunch = this.activatedRoute.snapshot.params.idLaunch;
              if (idLaunch) {
                this.router.navigateByUrl(
                  '/launchs/listing'
                ).then();
              }

              this.balance.getBalance();
              this.handleMessageTranslate(
                'launchs.msgSuccessData',
                'launchs.msgSuccess'
              );
            }
          },
          err => {
            console.error(err);
            this.handleMessageTranslate(
              'launchs.msgErrorData',
              'launchs.msgError'
              );
          }
        );
    } else {
      this.formGroup.controls.valueLaunch.setErrors({'incorrect': true});
      this.handleMessageTranslate(
        'launchs.msgRequiredFields',
        'launchs.msgError'
      );
    }
  }

  handleExpesnses(event): void {
    const typeLaunch = event.value;
    this.formGroup.controls.expenseType.reset({value:'', disabled: false});
    if ('C' === typeLaunch) {
      this.formGroup.controls.expenseType.reset({value:'', disabled: true});
    }
  }

  getDataConvert(): any {
    let idLaunch = this.activatedRoute.snapshot.params.idLaunch;

    return {
      id: idLaunch ?? '',
      usuarioId: this.user.id,
      dtLancamento: this._adapter.format(this.formGroup.controls.datePicker.value, MY_FORMATS.display.dateInput),
      valor: this.formGroup.controls.valueLaunch.value,
      tpLancamento: this.formGroup.controls.tpLaunch.value,
      tpDespesa: this.formGroup.controls.expenseType.value,
      observacao: this.formGroup.controls.observation.value
    }
  }

  resetFormGroup(): void {
    this.formGroup.controls.tpLaunch.reset('C');
    this.formGroup.controls.valueLaunch.reset('');
    this.formGroup.controls.expenseType.reset({value:'', disabled: true});
    this.formGroup.controls.observation.reset('');
    this.formGroup.controls.datePicker.reset('');
  }

  setEditData(data): void {
    this.isSaveAction = false;
    this.formGroup.controls.tpLaunch.reset(data.tpLancamento);
    this.formGroup.controls.valueLaunch.reset(data.valor);
    this.formGroup.controls.observation.reset(data.observacao);
    this.formGroup.controls.expenseType.reset({value:'', disabled: true});

    let dateEn = moment(data.dtLancamento, MY_FORMATS.display.dateInput);
    this.formGroup.controls.datePicker.setValue(dateEn);

    if ('D' === data.tpLancamento) {
      let despesa = this.expensesTypes.find(e => e['descricao'] === data.tpDespesa)
      this.formGroup.controls.expenseType.reset({value: despesa['chave'], disabled: false});
    }
  }

  handleMessageTranslate(keyMsg, actionMsg): void {
    this.translate.get(keyMsg)
      .subscribe(msg => {

        this.translate.get(actionMsg)
          .subscribe(action => {
            this.showMessageSnack(msg, action);
          });
      });
  }

  showMessageSnack(msg, action): void {
    this.snackBar.open(msg, action, {
      duration: 3000,
    });
  }

}

import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {RegisterService} from './service';
import {TokenService} from '@core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

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

  formGroup: FormGroup;
  expensesTypes: [];

  constructor(
    private fb: FormBuilder,
    private _adapter: DateAdapter<any>,
    private service: RegisterService,
    private tokenService: TokenService,
    public snackBar: MatSnackBar,
    private translate: TranslateService
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
    this.getExpensivesType();
  }

  onEndFocus(args): void {
    args.currentTarget.selectionStart = args.currentTarget.selectionEnd = args.currentTarget.value.length;
    args.currentTarget.focus();
  }

  persistAction(): void {
    if (!this.formGroup.invalid) {
      this.persistData();
    } else {
      this.handleMessageTranslate('launchs.msgRequiredFields');
    }
  }

  getExpensivesType() {
    this.service.getDespesasTypes()
      .subscribe(
        data => {
          this.expensesTypes = data.data ? data.data : [];
        },
        err => {
          const msg: string = 'Erro ao obter Tipos de Despesas!';
          this.showMessageSnack(msg);
        }
      );
  }

  persistData(): void {
    const data = this.getDataConvert();
    this.service.persit(data)
      .subscribe(
        result => {
          if (result && result.data.id) {
            this.handleMessageTranslate('launchs.msgSuccessData');
            this.resetFormGroup();
          };
        },
        err => {
          this.handleMessageTranslate('launchs.msgErrorData');
        }
      );
  }

  handleExpesnses(event): void {
    const typeLaunch = event.value;
    this.formGroup.controls.expenseType.reset({value:'', disabled: false});
    if ('C' === typeLaunch) {
      this.formGroup.controls.expenseType.reset({value:'', disabled: true});
    }
  }

  getDataConvert(): any {
    return {
      id: '',
      usuarioEmail: this.tokenService.get().email,
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

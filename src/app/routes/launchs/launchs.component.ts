import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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
  selector: 'app-launchs',
  templateUrl: './launchs.component.html',
  styleUrls: ['./launchs.component.scss'],
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
export class LaunchsComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _adapter: DateAdapter<any>
  ) {
    this.formGroup = this.fb.group({
      tpLaunch: ['C', [Validators.required]],
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      datePicker: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  persist(): void {
    if (!this.formGroup.invalid) {
      console.log(JSON.stringify(this.formGroup.value));
    } else {
      console.log('Campos obrigatórios não informados');
    }
  }
}

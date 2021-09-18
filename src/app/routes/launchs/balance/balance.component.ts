import {Component, OnInit} from '@angular/core';
import { BalanceService } from './service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  userBalance: number;

  constructor(
    private auth: AuthService,
    private service: BalanceService,
    private translate: TranslateService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  getBalance(): void {
    this.auth.getUser().subscribe(
      user => {
        const userId = user.data.id;
        this.service.getBalanceUser(userId.toString())
          .subscribe(
            result => {
              this.handleBalanceUser(result);
            },
            err => {
              console.error(err);
              this.handleMessageTranslate(
                'launchs.msgErrorBalance',
                'launchs.msgError'
              );
            }
          );
      }
    );
  }

  handleBalanceUser(result): void {
    if (result && result.data) {
      this.userBalance = result.data.saldo;
    } else {
      this.userBalance = 0;
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

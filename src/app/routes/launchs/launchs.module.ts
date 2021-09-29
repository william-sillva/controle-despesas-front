import { NgModule, LOCALE_ID } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RegisterComponent } from './register';
import { BalanceComponent } from './balance';
import { ListingComponent, DialogDeleteComponent } from './listing';
import { RegisterService } from './register/service';
import { LaunchsRoutingModule } from './launchs-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

const COMPONENTS = [
  RegisterComponent,
  ListingComponent,
  DialogDeleteComponent,
  BalanceComponent
];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, LaunchsRoutingModule, CurrencyMaskModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    RegisterService,
    BalanceComponent
  ]
})
export class LaunchsModule { }

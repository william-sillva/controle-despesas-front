import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RegisterComponent } from './register';
import { BalanceComponent } from './balance';
import { ListingComponent, DialogDeleteComponent } from './listing';
import { RegisterService } from './register/service';
import { LaunchsRoutingModule } from './launchs-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

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
    RegisterService,
    BalanceComponent
  ]
})
export class LaunchsModule { }

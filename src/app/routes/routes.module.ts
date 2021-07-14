import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { LaunchsComponent } from './launchs';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { LaunchsService } from './launchs/service';

const COMPONENTS = [DashboardComponent, LaunchsComponent, LoginComponent, RegisterComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    RoutesRoutingModule,
    CurrencyMaskModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    LaunchsService
  ]
})
export class RoutesModule {}

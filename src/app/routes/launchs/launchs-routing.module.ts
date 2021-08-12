import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register';
import { ListingComponent } from './listing';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'register/:idLaunch', component: RegisterComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'listing/:idLaunch', component: ListingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchsRoutingModule {}

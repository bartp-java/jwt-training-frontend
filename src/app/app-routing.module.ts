import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {ProcessListComponent} from "./process/process-list/process-list.component";
import {AuthGuard} from "./shared/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/processes', pathMatch: 'full' },
  {
    path: 'processes',
    component: ProcessListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

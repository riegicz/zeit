import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InputMonthComponent} from "./components/input-month/input-month.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {OverviewComponent} from "./components/overview/overview.component";

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'month',
    component: InputMonthComponent,
  },
  {
    path: '',
    redirectTo: '/month',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

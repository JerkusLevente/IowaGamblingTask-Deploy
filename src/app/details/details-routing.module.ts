import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPage } from './details.page';



const routes: Routes = [
  {
    path: ':testId', 
    component: DetailsPage
  },
  {
    path: 'details/:testId',
    component: DetailsPage
  },
  {
    path: '',
    component: DetailsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPageRoutingModule {}

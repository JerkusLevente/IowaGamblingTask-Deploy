import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskPage } from './task.page';

const routes: Routes = [
  {
    path: ':testId', // add testId parameter to the path
    component: TaskPage
  },
  {
    path: 'task/:testId',
    component: TaskPage
  },
  {
    path: '',
    component: TaskPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPageRoutingModule {}

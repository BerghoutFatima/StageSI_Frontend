import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsEtudiantPage } from './notifications-etudiant.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsEtudiantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsEtudiantPageRoutingModule {}

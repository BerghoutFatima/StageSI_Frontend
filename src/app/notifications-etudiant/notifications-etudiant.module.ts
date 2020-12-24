import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsEtudiantPageRoutingModule } from './notifications-etudiant-routing.module';

import { NotificationsEtudiantPage } from './notifications-etudiant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsEtudiantPageRoutingModule
  ],
  declarations: [NotificationsEtudiantPage]
})
export class NotificationsEtudiantPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsBaseComponent } from './settings-base/settings-base.component';

const routes: Routes = [
  { path: '', component: SettingsBaseComponent,
      children: [
          { path: 'base', component: SettingsBaseComponent}
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

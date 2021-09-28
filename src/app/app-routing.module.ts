import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionConfiguratorComponent } from './components/session-configurator/session-configurator.component';
import { SessionComponent } from './components/session/session.component';

const routes: Routes = [
  { path: '', component: SessionConfiguratorComponent },
  { path: 'session', component: SessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

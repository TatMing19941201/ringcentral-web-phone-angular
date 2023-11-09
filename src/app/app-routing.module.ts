import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RingCentralTestComponent } from './ring-central-test/ring-central-test.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'ring-central',
    component: RingCentralTestComponent,
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

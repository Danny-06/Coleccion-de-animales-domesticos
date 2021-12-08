import { UserComponent } from './components/user/user.component';
import { MainComponent } from './components/main/main.component';
import { AnimalComponent } from './components/animal/animal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'animal', component: AnimalComponent },
  {path: 'animal/:id', component: AnimalComponent },
  {path: 'user', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

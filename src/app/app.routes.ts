import { Routes } from '@angular/router';
import { TodooComponent } from './components/todoo/todoo.component';

export const routes: Routes = [
  { path: 'todoo' , component: TodooComponent },
  {path:'**', pathMatch: 'full' , redirectTo: 'todoo'}
]
  ;

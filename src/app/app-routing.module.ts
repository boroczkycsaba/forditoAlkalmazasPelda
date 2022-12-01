import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/translate', pathMatch: 'full'},
  {
    path: 'registration',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    pathMatch: 'full',
  },
  {
    path: 'translate',
    loadChildren: () => import('./translator/translator.module').then(m => m.TranslatorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

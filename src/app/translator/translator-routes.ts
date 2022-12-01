import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateComponent} from "./translate/translate.component";
import {TranslatorGuard} from "./translator.guard";

const routes: Routes = [
  {
    path: '',
    component: TranslateComponent,
    pathMatch: 'full',
    canActivate: [TranslatorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslatorRoutes {
}

import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";
import { IncomePage } from "../income/income.page";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'income', component: IncomePage}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
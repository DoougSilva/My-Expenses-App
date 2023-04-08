import { NgModule } from "@angular/core";
import { HomePage } from "./home.page";
import { IncomePage } from "../income/income.page";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    declarations: [
      HomePage,
      IncomePage
    ],
    imports: [
      HomeRoutingModule
    ]
  })
  export class HomeModule { }
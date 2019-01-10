import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { InterviewComponent } from "~/interview/interview.component";
// import { InterviewDeckComponent } from "~/interview/ondeck/ondeck.component";
// import { InterviewEndComponent } from "~/interview/finish/finish.component";
import { InterviewCallComponent } from "~/interview/oncall/oncall.component";
const routes: Routes = [
  { path: "", component: InterviewComponent },
  // { path: "deck", component: InterviewDeckComponent },
  { path: "deck", component: InterviewCallComponent },
  // { path: "end", component: InterviewEndComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class InterviewRoutingModule {}

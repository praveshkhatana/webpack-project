import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { InterviewRoutingModule } from "~/interview/interview-routing.module";
import { InterviewComponent } from "~/interview/interview.component";
// import { InterviewDeckComponent } from "~/interview/ondeck/ondeck.component";
// import { InterviewEndComponent } from "./finish/finish.component";
// import { NgaModule } from "~/theme/nga.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { registerElement } from "nativescript-angular/element-registry";
// import { LocalVideo, VideoActivity } from "nativescript-kurento";
import { LocalVideo, RemoteVideo } from "nativescript-twilio-video";
import { InterviewCallComponent } from "~/interview/oncall/oncall.component";
registerElement("LocalVideo", () => LocalVideo);
registerElement("RemoteVideo", () => RemoteVideo);

@NgModule({
  imports: [
    NativeScriptCommonModule,
    InterviewRoutingModule,
    TNSFontIconModule,
    // NgaModule
  ],
  declarations: [
    InterviewComponent,
    // InterviewDeckComponent,
    InterviewCallComponent,
    // InterviewEndComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InterviewModule {}

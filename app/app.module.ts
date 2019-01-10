import {
  NgModule,
  NgModuleFactoryLoader,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { AppRoutingModule } from "~/app-routing.module";
import { AppComponent } from "~/app.component";
// import { NgaModule } from "~/theme/nga.module";
// import { CoreModule } from "~/core";
// import { LoginComponent } from "~/login/login.component";
// import { HGPageComponent } from "~/splashpage/splash.component";
// import { CreateVideoModule } from "~/createvideo/createvideo.module";
// import { HomeModule } from "~/home/home.module";
import { registerElement } from "nativescript-angular/element-registry";
// import { AuthService, UserService, GlobalService } from "~/shared/services";
// import { QueryService, MutationService } from "~/shared/graphql/api";

registerElement("Gradient", () => require("nativescript-gradient").Gradient);

import { Video } from "nativescript-videoplayer";
// import { PlayerModalComponent } from "~/theme/directives";
// import { ForgetComponent } from "~/forget/forget.component";
// import { ForgetCodeComponent } from "~/forgetcode/code.component";
registerElement("VideoPlayer", () => Video);

//fresco plugin for android
import { TNSFrescoModule } from "nativescript-fresco/angular";
import * as frescoModule from "nativescript-fresco";
import * as applicationModule from "tns-core-modules/application";
// import { InterviewDoneComponent } from "~/pages/interview-done";
// import { NotAFitComponent } from "~/pages/notafit";

import "nativescript-scaledfonts";
import { fontScaling, setFontScalingFactor } from "nativescript-scaledfonts";

fontScaling(1);
setFontScalingFactor(360, 600);

if (applicationModule.android) {
  applicationModule.on("launch", () => {
    frescoModule.initialize();
  });
}
registerElement(
  "PreviousNextView",
  () => require("nativescript-iqkeyboardmanager").PreviousNextView
);
//
//
import { LottieView } from 'nativescript-lottie';
registerElement('LottieView', () => LottieView);

registerElement('ImageCacheIt',() => require('nativescript-image-cache-it').ImageCacheIt);

//
//setStatusBarColors();
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    TNSFontIconModule.forRoot({
      ion: "./fonts/ionicons.css",
      fa: "./fonts/font-awesome.css"
    }),
    TNSFrescoModule,
    // NgaModule.forRoot(),
    // CoreModule
    // FormSharedModule.forRoot()
    // CreateVideoModule,
    // HomeModule
  ],
  entryComponents: [],
  declarations: [
    AppComponent,

    // LoginComponent,
    // ForgetComponent,
    // ForgetCodeComponent,
    // HGPageComponent,
    // InterviewDoneComponent,
    // NotAFitComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

import { Component, OnInit } from "@angular/core";
import { Page, isAndroid, isIOS } from "tns-core-modules/ui/page/page";

// import { on, uncaughtErrorEvent, android, ios, UnhandledErrorEventData } from "application";

import * as firebase from "nativescript-plugin-firebase";
declare const Crashlytics: any;

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    //Working code
    firebase.init({
    }).then(
      instance => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );

  }


  onDimmerTap() { }
}

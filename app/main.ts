// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "~/app.module";
// import { ios } from "tns-core-modules/application";
import * as application from "tns-core-modules/application";
import * as traceModule from "tns-core-modules/trace"
require("nativescript-plugin-firebase");
import * as firebase from "nativescript-plugin-firebase";
import { on, uncaughtErrorEvent, android, ios, UnhandledErrorEventData } from "application";
// class MyDelegate extends UIResponder implements UIApplicationDelegate {
//     public static ObjCProtocols = [UIApplicationDelegate];

//     applicationDidFinishLaunchingWithOptions(application: UIApplication): boolean {
//         console.log("applicationWillFinishLaunchingWithOptions: ")

//         return true;
//     }

//     applicationDidBecomeActive(application: UIApplication): void {
//         console.log("applicationDidBecomeActive: " + application)
//     }
// }
if (ios) {
    const MyDelegate = (UIResponder as any).extend({
        applicationDidBecomeActive(application: UIApplication): void {
            let audioSession = AVAudioSession.sharedInstance();

            try {
                audioSession.setCategoryError(AVAudioSessionCategoryPlayback);

                audioSession.setActiveError(true);
                console.log("audioSession category set and active");

            } catch (err) {
                console.log("setting audioSession category failed");
            }
            console.log("applicationDidBecomeActive", application);
        }
    }, {
            protocols: [UIApplicationDelegate]
        });
    ios.delegate = MyDelegate;
}
const errorHandler: traceModule.ErrorHandler = {
    handlerError(err) {
        traceModule.write(err, "unhandlede-error");
        console.log("ERROR: ~~~~ ", err);
        firebase.crashlytics.sendCrashLog(err);
        throw err;
    }
}
on(uncaughtErrorEvent, (errData: UnhandledErrorEventData) => {
    console.log('caught error', errData);

    firebase.crashlytics.sendCrashLog(errData.ios);
});
traceModule.setErrorHandler(errorHandler)
platformNativeScriptDynamic().bootstrapModule(AppModule);

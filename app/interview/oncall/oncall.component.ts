import { AfterViewInit, Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Page, isIOS } from "tns-core-modules/ui/page/page";
import { View } from "tns-core-modules/ui/page/page";
const platformModule = require("tns-core-modules/platform");
import { LottieView } from 'nativescript-lottie';

import {LocalVideo, VideoActivity, RemoteVideo } from "nativescript-twilio-video";
import * as app from "tns-core-modules/application/application";
import * as dialogs from "tns-core-modules/ui/dialogs/dialogs";
const permissions = require("nativescript-permissions");
const timer = require("timer");

import { interval } from 'rxjs';
const insomnia = require("nativescript-insomnia");

import Amplify, { Auth, Storage } from "aws-amplify";
Amplify.configure({});

@Component({
  selector: "hg-oncall",
  moduleId: module.id,
  styleUrls: ["./oncall.css"],
  templateUrl: "./oncall.html"
})
export class InterviewCallComponent implements OnInit, AfterViewInit {
  @ViewChild("localV") localV: { nativeElement: View };
  @ViewChild("localVideo") localVideo: ElementRef;
  @ViewChild("remoteVideo") remoteVideo: ElementRef;

  private videoActivity: VideoActivity;
  public isDisconnect: boolean = true;
  connected: boolean = false;
  timeoutTimer;
  isPreviewReady: boolean = false;
  token: string;
  msg: string;
  roomId: string;
  roomToken: string;


  //
  public loop: boolean = false;
  public src: string;
  public autoPlay: boolean = false;
  private _lottieView: LottieView;
  //
  constructor(private _page: Page) {
  }
  get isUserOnline(): boolean {
    return true;
  }
  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this.signIn();
    this.initializeView();
  }

  ngOnDestroy(): void {
  }
  get message() {
    return this.msg ? this.msg : "Connecting...";
  }
  //
  initializeView() {
    let lv: LocalVideo = this.localVideo.nativeElement;
    let rv: RemoteVideo = this.remoteVideo.nativeElement;
    this.videoActivity = new VideoActivity();
    this.videoActivity.localVideoView = lv.localVideoView; //this.localVideo.localVideoView;
    this.videoActivity.remoteVideoView = rv.remoteVideoView; //this.remoteVideo.remoteVideoView;

    console.log("Working");
    //
    this.videoActivity.event.on("error", reason => {
      console.log("big error");
      console.log(reason.object["reason"]);

      console.log(JSON.stringify(reason.object["reason"]));
    });

    this.videoActivity.event.on("didConnectToRoom", r => {
      // if (r.object['count'] < 1) return;
      console.log("didConnectToRoom");
      //this.toggle_local_video_size();
      this.animateToSmall();
      this.msg = "Connected :)";
      //this.ref.detectChanges();
    });

    this.videoActivity.event.on("didFailToConnectWithError", r => {
      console.log("didFailToConnectWithError");
    });

    this.videoActivity.event.on("participantDidConnect", r => {
      if (r.object["count"] < 1) return;
      console.log("participantDidConnect");
      //this.toggle_local_video_size();
      this.animateToSmall();
      this.msg = "Interview started";
      //this.ref.detectChanges();
    });

    this.videoActivity.event.on("participantDidDisconnect", r => {
      console.log("participantDidDisconnect");
      //this.toggle_local_video_size();
      this.animateToBig();
      //this.endCall();
    });

    this.videoActivity.event.on("participantUnpublishedAudioTrack", r => {
      console.log("participantUnpublishedAudioTrack");
    });

    this.videoActivity.event.on("participantPublishedVideoTrack", r => {
      console.log("participantPublishedVideoTrack");
    });

    this.videoActivity.event.on("participantUnpublishedVideoTrack", r => {
      console.log("participantUnpublishedVideoTrack");
    });

    this.videoActivity.event.on("onAudioTrackSubscribed", r => {
      console.log("onAudioTrackSubscribed");
    });

    this.videoActivity.event.on("onAudioTrackUnsubscribed", r => {
      console.log("onAudioTrackUnsubscribed");
    });

    this.videoActivity.event.on("onVideoTrackSubscribed", r => {
      console.log("onVideoTrackSubscribed");
    });

    this.videoActivity.event.on("onVideoTrackUnsubscribed", r => {
      console.log("onVideoTrackUnsubscribed 00");
    });

    this.videoActivity.event.on("participantDisabledVideoTrack", r => {
      console.log("participantDisabledVideoTrack");
    });

    this.videoActivity.event.on("participantEnabledVideoTrack", r => {
      console.log("participantEnabledVideoTrack");
    });

    this.videoActivity.event.on("participantDisabledAudioTrack", r => {
      console.log("participantDisabledAudioTrack");
    });

    this.videoActivity.event.on("participantEnabledAudioTrack", r => {
      console.log("participantEnabledAudioTrack");
    });

    this.get_permissions().then(() => {
      // i find the settimeout allows for a smoother load if you're looking for the preview to begin immediately
      var t = timer.setTimeout(() => {
        this.videoActivity.startPreview();
        this.isPreviewReady = true;
        timer.clearTimeout(t);
      }, 1200);
    });
    //
  }
  startTimeoutTimer() {
    this.timeoutTimer = interval(500).subscribe(x => {
      this.updateTimeoutTimer();
    });
  }
  updateTimeoutTimer() {
    if (this.isPreviewReady) {
      this.timeoutTimer.unsubscribe();
      this.isPreviewReady = false; //just for safe side
      this.connect_to_room();
    }
  }

  async signIn(): Promise<any> {
    let email = "example@email.com";
    return Auth.signIn(email, "password")
      .then(data => {
        let payload = data.signInUserSession.getIdToken().payload;
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggle_local_video_size(): void {

  }
  calPositions() {

  }
  //Call
  onLayoutChanged(): void { }
  ngAfterViewInit(): void {
    this.calPositions();
    this.initializeView();
  }

  // Main Code
  switchCamera() {
    //this.videoActivity.flipCamera();
  }
  toggle_local_audio() {
    this.videoActivity.toggle_local_audio();
  }

  toggle_local_video() {
    this.videoActivity.toggle_local_video();
  }
  disconnect() {
    if (this.videoActivity.room) {
      this.videoActivity.disconnect();
    }
  }
  connect_to_room(): void {

    this.videoActivity.set_access_token(this.roomToken);
    this.videoActivity.connect_to_room(this.roomId, {
      video: true,
      audio: true
    });

  }
  //
  likeTap() {

  }
  endInterview() {

  }
  updateDB() {

  }
  endTap() {


  }

  //
  //Permission
  check_permissions(): boolean {
    var audio, camera;

    if (app.android) {
      audio = permissions.hasPermission("android.permission.RECORD_AUDIO");
      camera = permissions.hasPermission("android.permission.CAMERA");
    } else {
      camera = AVCaptureDevice.authorizationStatusForMediaType(
        AVMediaTypeVideo
      );
      audio = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeAudio);
      if (camera < 3) camera = false;
      if (audio < 3) audio = false;
    }

    if (!audio || !camera) return false;
    else return true;
  }
  get_permissions(): Promise<any> {
    return new Promise((resolve, reject) => {
      var has_permissions = this.check_permissions();

      if (has_permissions) {
        resolve();
        return;
      }

      if (app.android) {
        permissions
          .requestPermissions(
            ["android.permission.RECORD_AUDIO", "android.permission.CAMERA"],
            "We need these permissions to initiate video interview"
          )
          .then(response => {
            console.dir(response);
            resolve(response);
          })
          .catch(e => {
            console.dir(e);
            console.log("Uh oh, no permissions - plan B time!");
            var has_permissions = this.check_permissions();

            if (!has_permissions) {
              dialogs
                .alert(
                  "without mic and camera permissions \n you cannot connect. \n please allow permissions in settings and try again."
                )
                .then(() => { });
            }
          });
      } else {
        Promise.all([
          this.ios_mic_permission(),
          this.ios_camera_permission()
        ]).then(
          values => {
            console.log(JSON.stringify(values));
            resolve();
          },
          reason => {
            console.log(JSON.stringify(reason));
            //this.set('error', reason);
            //this.error = reason;

            dialogs
              .alert(
                "without mic and camera permissions \n you cannot connect. \n please allow permissions in settings and try again."
              )
              .then(() => {
                UIApplication.sharedApplication.openURL(
                  NSURL.URLWithString(UIApplicationOpenSettingsURLString)
                );
              });

            reject();
          }
        );
      }
    });
  }

  ios_mic_permission(): Promise<any> {
    return new Promise((resolve, reject) => {
      var has_asked = AVCaptureDevice.authorizationStatusForMediaType(
        AVMediaTypeAudio
      );

      if (has_asked === 2) {
        reject("mic permission denied");
        return;
      }

      AVAudioSession.sharedInstance().requestRecordPermission(bool => {
        if (bool === true) {
          resolve(bool);
          return;
        }
        reject("mic permission denied");
      });
    });
  }

  ios_camera_permission(): Promise<any> {
    return new Promise((resolve, reject) => {
      var has_asked = AVCaptureDevice.authorizationStatusForMediaType(
        AVMediaTypeVideo
      );

      if (has_asked === 2) {
        reject("camera permission denied");
        return;
      }

      AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(
        AVMediaTypeVideo,
        bool => {
          if (bool === true) {
            resolve(bool);
            return;
          }
          reject("camera permission denied");
        }
      );
    });
  }
  //Permision End

  animateToSmall() {

  }
  animateToBig() {

  }
  //
  lottieViewLoaded(event) {
    this._lottieView = <LottieView>event.object;
  }
  get isAnimating(): boolean {
    if (this._lottieView) {
      if (this._lottieView.progress == 1) {
        this.stopAnimation();
      }
    }
    return false;
  }
  stopAnimation() {
    this._lottieView.cancelAnimation();
    this._lottieView.progress = 0;
  }
  //
}

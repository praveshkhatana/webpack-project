import { Component, OnInit, OnDestroy } from "@angular/core";


@Component({
  selector: "hg-interview",
  templateUrl: "./interview.html",
  styleUrls: ["./interview.css"],
  moduleId: module.id
})
export class InterviewComponent implements OnInit, OnDestroy {

  constructor(
  ) {

  }

  get isUserOnline(): boolean {
    return true
  }
  ngOnInit() {

  }

  ngOnDestroy() {
  }



  startInterview() {

  }



 
  end(isPostpone) {

  }

  onLongPress(args) {
    console.log("Circle button long-presssed...");
  }

  onLeftIconZeroTap(args) {
    console.log("left Icon Zero tap");
  }

  onRightIconZeroTap(args) {
    console.log("right Icon Zero tap");
  }

  onLeftIconOneTap(args) {
    console.log("left Icon One tap");
  }

  onRightIconOneTap(args) {
    console.log("right Icon One tap");
  }
}

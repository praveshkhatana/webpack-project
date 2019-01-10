import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { HomeRoutingModule } from "~/home/home-routing.module";
import { HomeComponent } from "~/home/home.component";
// import { ProfileComponent } from "~/home/profile/profile.component";
// import { SettingsComponent, RowItemComponent } from "~/home/settings";
import { PagerModule } from "nativescript-pager/angular";
import {
  // DashboardCommonComponent,
  // MainActivityComponent,
  // LeadDetailComponent,
  // LeadVideoComponent,
  // NotificationCardComponent,
  // PasswordComponent,
  // NewPasswordComponent,
  // DetailPreviewComponent
} from "~/home";
// import { NgaModule } from "~/theme/nga.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
// import { MutationService, QueryService } from "~/shared/graphql/api";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    HomeRoutingModule,
    TNSFontIconModule,
    NativeScriptUIListViewModule,
    // NgaModule,
    PagerModule
  ],
  declarations: [
    HomeComponent,
    // ProfileComponent,
    // SettingsComponent,
    // RowItemComponent,
    // DashboardCommonComponent,
    // MainActivityComponent,
    // LeadDetailComponent,
    // LeadVideoComponent,
    // NotificationCardComponent,
    // PasswordComponent,
    // NewPasswordComponent,
    // DetailPreviewComponent
  ],

  providers: [ModalDialogService],
  schemas: [NO_ERRORS_SCHEMA],
  // entryComponents: [LeadVideoComponent, NotificationCardComponent]
})
export class HomeModule {}

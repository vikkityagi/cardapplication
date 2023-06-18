import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';

import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { HttpClientModule } from '@angular/common/http';



import { MatTableModule } from '@angular/material/table';

import {MatListModule} from '@angular/material/list';
import { Nodal2Component } from './components/nodal2/nodal2.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GetcardComponent } from './components/getcard/getcard.component';
import { TrackApplicationComponent } from './components/track-application/track-application.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BeneficaryCardComponent } from './components/beneficary-card/beneficary-card.component';
import { ApprovingOfficerComponent } from './components/approving-officer/approving-officer.component';
import { BeneficiaryFormComponent } from './components/beneficary-card/beneficiary-form/beneficiary-form.component';
import { FamilydetailFormComponent } from './components/beneficary-card/familydetail-form/familydetail-form.component';
import { TakeListComponent } from './components/take-list/take-list.component';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { BenDraftListComponent } from './components/ben-draft-list/ben-draft-list.component';
import { BeneficiaryEsignComponent } from './components/beneficary-card/beneficiary-esign/beneficiary-esign.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { OrganizationOfficeComponent } from './components/organization-office/organization-office.component';
import { CookieService } from 'ngx-cookie-service';
import { CghsUserComponent } from './components/cghs-user/cghs-user.component';
import { CghsUserViewComponent } from './components/cghs-user-view/cghs-user-view.component';
import { ApplicationViewComponent } from './components/application-view/application-view.component';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    Nodal2Component,
    GetcardComponent,
    TrackApplicationComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    BeneficaryCardComponent,
    ApprovingOfficerComponent,
    BeneficiaryFormComponent,
    FamilydetailFormComponent,
    TakeListComponent,
    ActiveListComponent,
    DraftListComponent,
    BenDraftListComponent,
    BeneficiaryEsignComponent,
    ProfileComponent,
    NavigationComponent,
    OrganizationOfficeComponent,
    CghsUserComponent,
    CghsUserViewComponent,
    ApplicationViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMomentDateModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    TextMaskModule,
    MatMenuModule
    
    // MatIconModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    CookieService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

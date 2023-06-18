import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Nodal2Component } from './components/nodal2/nodal2.component';
import { GetcardComponent } from './components/getcard/getcard.component';
import { TrackApplicationComponent } from './components/track-application/track-application.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import  { BeneficaryCardComponent } from './components/beneficary-card/beneficary-card.component';
import { ApprovingOfficerComponent } from './components/approving-officer/approving-officer.component';
import { FamilydetailFormComponent } from './components/beneficary-card/familydetail-form/familydetail-form.component';
import { TakeListComponent } from './components/take-list/take-list.component';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { BenDraftListComponent } from './components/ben-draft-list/ben-draft-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { OrganizationOfficeComponent } from './components/organization-office/organization-office.component';
import { CghsUserComponent } from './components/cghs-user/cghs-user.component';
import { CghsUserViewComponent } from './components/cghs-user-view/cghs-user-view.component';
import { ApplicationViewComponent } from './components/application-view/application-view.component';
import { AppComponent } from './app.component';
import { AuthguardGuard } from './authguard.guard';
// improt { ShowDetailComponent}
const routes: Routes = [
  // {path: 'nodalreg2',component: Nodal2Component,canActivate: [AuthguardGuard]},
  // {path: 'print/:id',component: GetcardComponent,canActivate: [AuthguardGuard]},
  // {path: 'track',component: TrackApplicationComponent,canActivate: [AuthguardGuard]},
  // {path: 'login',component: LoginComponent},
  // {path: 'logout',component: LogoutComponent,canActivate: [AuthguardGuard]},
  // {path: 'beneficiaryCard',component: BeneficaryCardComponent,canActivate: [AuthguardGuard]},
  // {path: 'beneficiaryCard/:applicationId',component: BeneficaryCardComponent,canActivate: [AuthguardGuard]},
  // {path: 'beneficiaryCard/:applicationId/:familyId',component: BeneficaryCardComponent,canActivate: [AuthguardGuard]},
  // {path: 'approvingofficer',component: ApprovingOfficerComponent,canActivate: [AuthguardGuard]},
  // {path: 'familydetail/:applicationId',component: FamilydetailFormComponent,canActivate: [AuthguardGuard]},
  // {path: 'familydetail',component: FamilydetailFormComponent,canActivate: [AuthguardGuard]},
  // {path: 'tasklist',component: TakeListComponent,canActivate: [AuthguardGuard]},
  // {path: 'activitylist',component: ActiveListComponent,canActivate: [AuthguardGuard]},
  // {path: 'draftlist', component: DraftListComponent,canActivate: [AuthguardGuard]},
  // {path: 'bendraftlist', component: BenDraftListComponent,canActivate: [AuthguardGuard]},
  // {path: 'profile', component: ProfileComponent,canActivate: [AuthguardGuard]},
  // {path: 'nav', component: NavigationComponent,canActivate: [AuthguardGuard]},
  // {path: 'orgOffice', component: OrganizationOfficeComponent,canActivate: [AuthguardGuard]},
  // {path: '',redirectTo: '/login',pathMatch: 'full'},
  // // {path: '',component: HomeComponent},
  // {path: 'cghs_user_registration',component: CghsUserComponent,canActivate: [AuthguardGuard]},
  // {path: 'cghs_user_view/:id',component: CghsUserViewComponent,canActivate: [AuthguardGuard]},
  // {path: 'applicationView/:id',component: ApplicationViewComponent,canActivate: [AuthguardGuard]},


  
  {path: 'nodalreg2',component: Nodal2Component},
  {path: 'print/:id',component: GetcardComponent},
  {path: 'track',component: TrackApplicationComponent},
  {path: 'login',component: LoginComponent},
  {path: 'logout',component: LogoutComponent},
  {path: 'beneficiaryCard',component: BeneficaryCardComponent},
  {path: 'beneficiaryCard/:applicationId',component: BeneficaryCardComponent},
  {path: 'beneficiaryCard/:applicationId/:familyId',component: BeneficaryCardComponent},
  {path: 'approvingofficer',component: ApprovingOfficerComponent},
  {path: 'familydetail/:applicationId',component: FamilydetailFormComponent},
  {path: 'familydetail',component: FamilydetailFormComponent},
  {path: 'tasklist',component: TakeListComponent},
  {path: 'activitylist',component: ActiveListComponent},
  {path: 'draftlist', component: DraftListComponent},
  {path: 'bendraftlist', component: BenDraftListComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'nav', component: NavigationComponent},
  {path: 'orgOffice', component: OrganizationOfficeComponent},
  // {path: '',redirectTo: '/login',pathMatch: 'full'},
  {path: '',component: HomeComponent},
  {path: 'cghs_user_registration',component: CghsUserComponent},
  {path: 'cghsUserView/:id',component: CghsUserViewComponent},
  {path: 'applicationView/:id',component: ApplicationViewComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

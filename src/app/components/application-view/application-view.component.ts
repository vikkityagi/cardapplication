import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth.service';
import { BenRegistrationApplication } from '../beneficary-card/BenRegistrationApplication';
import { PrimaryBeneficiary } from '../beneficary-card/PrimaryBeneficiary';
import { BenFormService } from "src/app/services/ben-form.service";

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  applicationType: any;
  applicationId: any;
  familyData: any;
  benRegistrationData: any;
  primaryBeneficiaryData: any;
  ministryNameResponse: any;
  departmentNameResponse: any;
  organizationNameResponse: any;
  WardEntitlement: any;
  nodalOfficerList: any;
  family_member: any;
  showData : boolean = false;
  

  constructor(private activateRoute: ActivatedRoute,
    private router: Router,private authservice: AuthserviceService,
    private benService: BenFormService){

    this.applicationType = this.activateRoute.snapshot.queryParams['applicationType'];
    this.applicationId = this.activateRoute.snapshot.paramMap.get('id');

    // console.log('this.applicationId'+this.applicationId);

    

  }

  ngOnInit(){

    if(this.applicationType == 10){
      this.router.navigate(['/print/'+this.applicationId])
    }else{
      this.showBenData();
    }
    

  }

  showBenData() {

      this.authservice.getFamilyMembersByPrimaryBeneficiaryId(this.applicationId).subscribe((familyMemberData: any) => {
      this.familyData = familyMemberData;
      });

    this.authservice.getBenRegistratinApplication(this.applicationId).subscribe((data) => {
      this.benRegistrationData = data as BenRegistrationApplication;
      // console.log("benRegistrationData"+JSON.stringify(this.benRegistrationData));

      this.authservice
        .getPrimaryBeneficiaryByBenRegistrationId(this.benRegistrationData.id)
        .subscribe((primaryBeneficiary:any) => {
         
          this.primaryBeneficiaryData =
              primaryBeneficiary[0];
            // console.log('(primaryBeneficiary as PrimaryBeneficiary).id'+JSON.stringify(this.primaryBeneficiaryData));
           
            this.benService.getMinitryName(this.primaryBeneficiaryData.ministry).subscribe(data=>{
              this.ministryNameResponse = data;
            });
            
            this.benService.getDepartmentName(this.primaryBeneficiaryData.department).subscribe(data=>{
              this.departmentNameResponse = data;
            });

            this.benService.getOrganizationName(this.primaryBeneficiaryData.organization).subscribe(data=>{
              this.organizationNameResponse = data;
            });

            this.benService.getNameofWardEntitlement(this.primaryBeneficiaryData.wardentitlement).subscribe(data=>{
              this.WardEntitlement = data;
              this.showData = true;
            })
            this.benService.getNodalOfficerList(this.primaryBeneficiaryData.organization).subscribe(data=>{
              this.nodalOfficerList = data;
            })
            

          this.authservice
            .getFamilyMembersByPrimaryBeneficiaryId(this.applicationId)
            .subscribe((familyMemberData: any) => {
              this.family_member = familyMemberData;
            }); 
        });
      });

}}

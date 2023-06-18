
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BenRegistrationApplication } from '../BenRegistrationApplication';
import { FamilyMember } from '../FamilyMember';
import { PrimaryBeneficiary } from '../PrimaryBeneficiary';
import { AuthserviceService } from 'src/app/services/auth.service';
import { ESignRequestObject } from '../ESignRequestObject';
import { BenFormService } from 'src/app/services/ben-form.service';

@Component({
  selector: 'app-beneficiary-esign',
  templateUrl: './beneficiary-esign.component.html',
  styleUrls: ['./beneficiary-esign.component.css']
})
export class BeneficiaryEsignComponent {

  esignForm: any = FormGroup;
  eSignRequestObject = <ESignRequestObject>{};
  responseXML!: string;
  eSign: boolean = false;
  @Input() familyData: FamilyMember[] = [];
  @Input() benRegistrationData!: BenRegistrationApplication;
  @Input() primaryBeneficiaryData!: PrimaryBeneficiary;
  @Input() ministryNameResponse: any;
  @Input() departmentNameResponse: any;
  @Input() organizationNameResponse: any;


  applicationId: any;
  family_member: any;
  WardEntitlement: any;

  // ministryNameResponse: any;
  // departmentNameResponse: any;
  // organizationNameResponse: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthserviceService,
    private benService: BenFormService
  ) {


  }

  ngOnInit(){
    // alert('ward entitlement>>'+this.primaryBeneficiaryData.wardentitlement.wardEntitlement)

    // this.benService.getNameofWardEntitlement((primaryBeneficiary as PrimaryBeneficiary).wardentitlement).subscribe(data=>{
    //   this.WardEntitlement = data;
    //   console.log('wardentitlement>>'+JSON.stringify(this.WardEntitlement))
    // })
  }

  ngOnChanges() {
  if(this.primaryBeneficiaryData.wardentitlement!=null){
    this.eSign = true;
    this.benService.getNameofWardEntitlement(this.primaryBeneficiaryData.wardentitlement).subscribe(data=>{
      this.WardEntitlement = data;
      // console.log('wardentitlement>>'+JSON.stringify(this.WardEntitlement))
    })
  }
    
    this.route.queryParams
      .subscribe(params => {
        // console.log("query params - " + params);
        this.applicationId = params['applicationId'];
        // console.log(this.applicationId);
      });

    // this.authservice.getBenRegistratinApplication(this.applicationId).subscribe((data: any) => {
    //   console.log("benRegistrationResponse - " + data);
    //   this.benRegistrationData = data as BenRegistrationApplication;
    //   console.log('this.benRegistrationData.id'+this.benRegistrationData.id)
    //   this.authservice
    //     .getPrimaryBeneficiary(this.benRegistrationData.id)
    //     .subscribe((primaryBeneficiary) => {
    //       this.primaryBeneficiaryData =
    //         primaryBeneficiary as PrimaryBeneficiary;
    //         console.log('(primaryBeneficiary as PrimaryBeneficiary).id'+(primaryBeneficiary as PrimaryBeneficiary).id);
    //       this.authservice
    //         .getFamilyMembersByPrimaryBeneficiaryId(this.applicationId)
    //         .subscribe((familyMemberData: any) => {
    //           this.family_member = familyMemberData;
    //         });
    //     });
    // });





    this.esignForm = this.fb.group({ xml: [], username: [], clientrequestURL: [] });
  }

  eSignApplication(applicationId: any, event: any): void {
    const headers = { 'aceept': 'application/json', 'content-type': 'application/json' };
    this.http
      .get(
        "http://localhost:3002/api/v1/ben_registration_applications/" + this.benRegistrationData.id + "/esign", { headers: headers })
      .subscribe((data) => {
        this.eSignRequestObject = data as ESignRequestObject;
        // console.log("this.eSignRequestObject=- ", this.eSignRequestObject);
        // console.log("eSignApplication called " + applicationId);
        let myheaders = new HttpHeaders();
        myheaders.append('Content-Type', 'application/json');
        myheaders.append('aceept', 'application/json');

        this.esignForm.get('xml')?.setValue(this.eSignRequestObject.xml);
        this.esignForm.get('username')?.setValue(this.eSignRequestObject.username);
        this.esignForm.get('clientrequestURL')?.setValue(this.eSignRequestObject.responseUrl);

        // console.log(this.esignForm.value);
        event.target.submit();


      });
    // console.log("selectionChange exited");
  }

  

}

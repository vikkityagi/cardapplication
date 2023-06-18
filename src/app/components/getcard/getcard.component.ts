import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OnboardingInfo } from "./OnboardingInfo";
import { FormBuilder, FormGroup } from "@angular/forms";

interface ESignRequestObject {
  username: string;
  xml: string;
  acceptClientAction: string;
  responseUrl: string;

}

@Component({
  selector: 'app-getcard',
  templateUrl: './getcard.component.html',
  styleUrls: ['./getcard.component.css'],
})
export class GetcardComponent implements OnInit {
  
  esignForm: any = FormGroup;
  id: any;
  routeState: any;
  data: any = {};
  ministryname: any;
  departmentname: any;
  organizationname: any;
  statename: any;
  approvingname: any;
  cityNames: Array<any> = [];
  isDisabled1 = false;
  isDisabled2 = false;
  isDisabled3 = false;
  isDisabled4 = false;
  isDisabled5 = false;
  isDisabled = false;
  onboardingInfo = <OnboardingInfo>{}
  eSignRequestObject = <ESignRequestObject>{};
  responseXML!: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    
     this.id = this.route.snapshot.paramMap.get('id')
     //console.log("applicationId>>"+this.id)

    // if (this.router.getCurrentNavigation()?.extras.state) {
    //   this.routeState = this.router.getCurrentNavigation()?.extras.state;
    //   //console.log("this.routeState--" + this.routeState);
      
    // }

    

    // if(this.routeState!=null){
    //   this.id = this.routeState;
    // }else{
    //   this.id = 1;
    // }
    // if(localStorage.getItem("parichayId")!=null){
    //   this.id = localStorage.getItem("parichayId");
    // }else{
    //   this.id = localStorage.getItem("parichayId");
    // }
  
  }


  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      //console.log(params); // { orderby: "price" }
      this.responseXML = params['respon'];
      //console.log("this.responseXML-" + this.responseXML); // price
    }
  );

    this.esignForm = this.fb.group({ xml: [], username: [], clientrequestURL: [] });
  
    //alert(this.id);
  
      if(this.id != undefined){

        this.http.get('http://localhost:3002/api/v1/onboarding/' + this.id, {
    
    })
      .subscribe((data) => {
        this.onboardingInfo = data as OnboardingInfo;
        //console.log("this.onboardingInfo ", this.onboardingInfo.firstname);

        this.http
          .get(
            "http://localhost:3002/api/v1/ministry/" +
            this.onboardingInfo.ministry
          ).subscribe(
            (data) => {
              this.ministryname = data;
              this.isDisabled1 = true;
              //console.log("ministryname- ", this.ministryname);
            },
            (error) => {
              //console.log('ministryApiError' + error);
            });

        this.http
          .get(
            "http://localhost:3002/api/v1/departments/" +
            this.onboardingInfo.department
          )
          .subscribe((data) => {
            this.departmentname = data;
            this.isDisabled2 = true;
            //console.log("departmentname- ", this.departmentname);
          });
        // get this.organizationname using id
        this.http
          .get(
            "http://localhost:3002/api/v1/organizations/" +
            this.onboardingInfo.organization
          )
          .subscribe((data) => {
            this.organizationname = data;
            this.isDisabled3 = true;
            //console.log("organizationname- ", this.organizationname);
          });

        // get state name using id
        this.http
          .get(
            "http://localhost:3002/api/v1/state/" +
            this.onboardingInfo.state
          )
          .subscribe((data) => {
            this.statename = data;
            this.isDisabled4 = true;
            //console.log("statename=- ", this.statename);
          });

        // get cghs city name using id 
        for (let city of this.onboardingInfo.cghsCities) {
          //console.log('cityid--', city)
          this.http
            .get(
              "http://localhost:3002/api/v1/CghsCity/" +
              city
            )
            .subscribe((data) => {
              this.cityNames.push(data);

            });


        }
        const headers = { 'aceept': 'application/json', 'content-type': 'application/json' };
        this.http
          .get(
            "http://localhost:3002/api/v1/onboarding/" + this.onboardingInfo.id + "/esign", { headers: headers })
          .subscribe((data) => {
            this.eSignRequestObject = data as ESignRequestObject;
            //console.log("this.eSignRequestObject=- ", this.eSignRequestObject);
          });

      });

      }

   
    
   



  }

  eSignApplication(applicationId: any,event:any ): void {
    //console.log("eSignApplication called "+applicationId);
    let myheaders = new HttpHeaders();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('aceept', 'application/json');

    this.esignForm.get('xml')?.setValue(this.eSignRequestObject.xml);
    this.esignForm.get('username')?.setValue(this.eSignRequestObject.username);
    this.esignForm.get('clientrequestURL')?.setValue(this.eSignRequestObject.responseUrl);

    //console.log(this.esignForm.value);
    event.target.submit();

  }

  //window.location.href = this.eSignRequestObject.acceptClientAction+"?xml="+encodeURIComponent(this.eSignRequestObject.xml)+"&";

  printThisPage() {
    window.print();
  }



}

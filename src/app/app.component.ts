import { Component, OnInit } from '@angular/core';
import { ParichayUser } from './models/ParichayUser';
import { HttpClient } from "@angular/common/http";
import { AuthserviceService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from './services/main.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cghs_page1_1';
  showFiller = false;
  userData: ParichayUser = <ParichayUser>{};
  appComponent = "false";
  roleList: any;
  navData: any;
  roleData: any;
  roleId: any;

  string1: string;
  parichayUserId: any;
  parichayId: any;
  roleName: any;
  role: any;
  selectedItem: any = '--select Role';
  Object: any = Object;

  constructor(private authservice: AuthserviceService, private http: HttpClient,
    private route: ActivatedRoute,
    private service: MainService,
    private router: Router) {

    this.string1 = "";

    // if(localStorage.getItem("appComponent")=='true'){
    if (localStorage.getItem("parichayUserId") != '') {
      //alert('role localStorage.getItem("parichayUserId")' + localStorage.getItem("parichayUserId"))
      this.authservice.assignRole(localStorage.getItem("parichayUserId")).subscribe(data => {
        //console.log("role name>>" + data);
        this.roleList = data;
        // for (let i = 0; i < Object.keys(this.roleList).length; i++) {
        //   //console.log(this.roleList[i])
        // }
      })

    }
  }

  ngOnInit() {
  //   //console.log("app compoentn ngoninit called");
  //   this.route.queryParams.subscribe((params) => {
  //     //console.log(params); // { orderby: "price" }
  //     this.string1 = params["string"];

  //     // call server /home url
  //     this.http
  //       .get("http://localhost:3002/api/v1/home", {
  //         params: { string: this.string1 },
  //       })
  //       .subscribe(
  //         (data) => {
  //           //alert("home call");
  //           this.userData = data as ParichayUser;

  //           localStorage.setItem("parichayData", JSON.stringify(this.userData));
  //           localStorage.setItem("parichayId", this.userData.parichayId)
  //           localStorage.setItem("sessionId", this.userData.sessionId)
  //           localStorage.setItem("localTokenId", this.userData.localTokenId)
  //           localStorage.setItem("browserId", this.userData.browserId)

  //           // this.cookie.set('browserId',this.userData.browserId)
  //           // this.cookie.set('localTokenId',this.userData.localTokenId)
  //           // this.cookie.set('sessionId',this.userData.sessionId)



  //           // get parichay Data here 
  //           this.authservice.getParichayData(this.userData.parichayId).subscribe((data: any) => {
  //             this.parichayId = data['id'];
  //             localStorage.setItem("parichayUserId", this.parichayId);
  //             localStorage.setItem("currentUserId", this.parichayId)
  //             this.getNavigationData();
  //             //console.log("app compoennt  this.parichayId-"+this.parichayId);
  //             //console.log("app compoennt this.getNavigationData() is called ");

  //             this.authservice
  //               .getRoleList(this.parichayId)
  //               .subscribe((data) => {
  //                 this.roleList = data;
  //                 this.appComponent = "true";
  //                 localStorage.setItem("appComponent", this.appComponent);
  //               });

  //             //console.log("this.userVerifiedEvent.emit() is executed");

  //           },
  //             (error) => {
  //               //alert("error");

  //               localStorage.setItem("home", "true");
  //             }
  //           );
  //         });

  //   });
  // }


 this.loadRole();
}


// getNavigationData2(){
//   this.service.getNavigationData2(localStorage.getItem("parichayUserId")).subscribe(data=>{
//     this.navData = data;
//   })
// }



loadRole(){
  this.service.getRole(localStorage.getItem("parichayUserId")).subscribe(data=>{
    this.roleData = data; 
    
    //console.log("role >>>LL"+JSON.stringify(this.roleData));
  })
}

getNav(val: any){
  //console.log("do some logic"+val)
  if(val==1){
    this.selectedItem = 'Beneficiary';
  }
  else if(val==2){
    this.selectedItem = 'Nodal';
  }
  else if(val==3){
    this.selectedItem = 'Approving Authority';
  }
  else if(val==4){
    this.selectedItem = 'Cghs User';
  }
  this.roleId = val;
  this.router.navigate([''])
  this.service.getNavigationData2(localStorage.getItem("parichayUserId"),this.roleId).subscribe(data=>{
    this.navData = data; 
    //console.log("nav Data>>"+JSON.stringify(this.navData));
  })
}

}


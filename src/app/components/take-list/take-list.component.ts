import { Component,OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { MovementService } from 'src/app/services/movement.service';

interface MovementResource{
  id:  number;
  roleId: number;
  application: number;
  fromOffice: number;
  toOffice: string;
  toUserId:string;
  actionName: string;
  fromUserRoles:number[];
  applicationNumber: string;
  applicationType: number;
  createdOn: string;
  actionType: number;
  levelNo: number;
  actionTypeName: string;
}
@Component({
  selector: 'app-take-list',
  templateUrl: './take-list.component.html',
  styleUrls: ['./take-list.component.css']
})
export class TakeListComponent implements OnInit {

  dataSource: MovementResource[] = <MovementResource[]>{};
  index = 9999999;
  roleid: any;
  id: any;
  isFormExpanded = false;
  toOfficeData: any;
  fromOfficeData: any;
  showTaskList: boolean = false;

  constructor(
    private authservice: AuthserviceService,
    private http: HttpClient,
    private router: ActivatedRoute,
    private route: Router,
    private movementService: MovementService
  ){
    // check the query param will change
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {


    
    
    
    this.roleid = this.router.snapshot.queryParams['roleId'];

    window.onpopstate = function(event) {
      //console.log("page Reloading..")
      // check if the query parameter 'example' has changed
      const queryParams = new URLSearchParams(window.location.search);
      const exampleParam = queryParams.get('roleId');
      if (exampleParam) {
        location.reload();
      }
    }

    // this.getTasklist(localStorage.getItem("currentUserId"));
    this.getTasklist(localStorage.getItem("currentUserId"),this.roleid);



  }

  displayedColumns: string[] = ['S No.', 'Application Type', 'Applicant Name', 'Application No', 'Date', 'Status', 'Actions'];

  getTasklist(parichayId: any,roleid: any){

    //console.log("call tasklist"+roleid);
    this.authservice.getTasklist(parichayId,roleid).subscribe(((data)=>{
        this.dataSource = data as MovementResource[];
        //console.log("movement call"+JSON.stringify(this.dataSource))
        for(var i=0;i<this.dataSource.length;i++){
          this.movementService.getToOffice(this.dataSource[i].toOffice).subscribe(data=>{
            this.toOfficeData = data;
            //console.log("to office"+JSON.stringify(this.toOfficeData))
          })
          this.movementService.getFromOffice(this.dataSource[i].fromOffice).subscribe(data=>{
            this.fromOfficeData = data;
            this.showTaskList = true;
          })
        }
        
        
      }));  
  }

  forward(val:any):void{
    this.authservice.forward(val,this.dataSource[0].roleId).subscribe((data)=>{
        //console.log("application is forwarded successfully");
    });
  }

  toggleForm1() {
    this.isFormExpanded = !this.isFormExpanded;
  }

  // toggleForm2() {
  //   this.isFormExpanded = !this.isFormExpanded;
  // }
}

import { Component,OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MovementService } from 'src/app/services/movement.service';

@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.css']
})
export class ActiveListComponent implements OnInit{

  dataSource: any;
  roleid: any;
  toOfficeData: any;
  fromOfficeData: any;
  showTaskList: boolean = false;

  constructor(
    private authservice: AuthserviceService,
    private router: ActivatedRoute,
    private movementService: MovementService
  ){}

  ngOnInit(): void {
    this.roleid = this.router.snapshot.queryParams['roleId'];
    this.getActivitylist(localStorage.getItem("currentUserId"),this.roleid);
  }

  getActivitylist(val1: any,val2: any){
    this.authservice.getActivitylist(val1,val2).subscribe((data=>{
        this.dataSource = data;
        for(var i=0;i<this.dataSource.length;i++){
          this.movementService.getToOffice(this.dataSource[i].toOffice).subscribe(data=>{
            this.toOfficeData = data;
            // console.log('toOfficeData'+JSON.stringify(this.toOfficeData));
          })
          this.movementService.getFromOffice(this.dataSource[i].fromOffice).subscribe(data=>{
            this.fromOfficeData = data;
            // console.log('FROMOfficeData'+JSON.stringify(this.fromOfficeData));
            this.showTaskList = true;
          })
        }
        // console.log("movement data>>"+JSON.stringify(this.dataSource))
        // console.log("id>>"+localStorage.getItem("id"))
      }));
  }

}

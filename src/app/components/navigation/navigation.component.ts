import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  userId: any;
  @Input() navData: any;
  Object = Object;
  ids: any = [];

  constructor(private http: HttpClient){
    

  }

  ngOnInit(){
    //console.log('navigation nginit called');
    this.userId = localStorage.getItem("parichayUserId");
    
  }

  ngOnChanges(){
    //console.log("NavigationComponent ngOnChanges is called "+this.navData);
  }


  // getData(val: any){
  //   //console.log('navigation   getdata called');
  //   return this.http.get('http://localhost:3002/api/v1/navigation/'+val).subscribe(data=>{
  //     this.navData = data;
  //     //this.passData.emit(this.navData);
  //     //console.log("navdata data--"+JSON.stringify(data))
  //   })
  // }

}

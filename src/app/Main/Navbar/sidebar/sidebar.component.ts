import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isReadMore: boolean = false;
  public isCollapsed: boolean = true;
  isExpanded = true;
  contentMargin = 240;
    constructor() { }

    ngOnInit(): void {
    }
    sideBarToogler(){
      this.isExpanded = !this.isExpanded;

      if(!this.isExpanded){
        this.contentMargin = 60;
      }else{
        this.contentMargin = 240;
      }
    }

}

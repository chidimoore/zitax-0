import { ControllerService } from 'src/app/services/controller.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


export interface ApplicationTypes {
    value: string;
    viewValue: string;
  }
//   private controllerService:ControllerService,

  export const APPLICATION_TYPES_DATA: ApplicationTypes[] = [

    { value: '0', viewValue: 'APPLICATION TYPE 1' },
    { value: '1', viewValue: 'APPLICATION TYPE 2' },
    { value: '2', viewValue: 'APPLICATION TYPE 3' },
  
  ];


  export interface AccountType {
    value: string;

  }
//   private controllerService:ControllerService,

  export const ACCOUNT_TYPES_DATA: AccountType[] = [

    { value: 'Local', },
    { value: 'Foreign'},
  
  ];

export interface Expemts {
  value: boolean;
  viewValue: string;
}
//   private controllerService:ControllerService,

//   private controllerService:ControllerService,

export const EXEMPTS_DATA :Expemts[] = [

  { value: false, viewValue: 'NO' },
  { value: true, viewValue: 'YES' },


];


// export interface Infrastructure{
//   value: boolean;
//   viewValue: string;
// }

// export const INFRASTRUCTURE_DATA:Infrastructure[] = [

//   { value: false, viewValue: 'YES' },
//   { value: true, viewValue: 'NO' },


// ];

export interface Currencies  {
  // value: boolean;
  viewValue: string;
}
//   private controllerService:ControllerService,

export const CURRENCY_DATA :Currencies[] = [

  {viewValue: 'TZS' },
  {viewValue: 'USD' },
  {viewValue: 'EURO' },

];
//   public controllerService:ControllerService,

@Injectable({
    providedIn: 'root'
  })
export class Params {

    listOfRegions:any=[];
    constructor( private controllerService:ControllerService,) { }
    listIdRegions():any{
        
        this.controllerService.listIdRegions().subscribe(data=>{


            console.log('asasasassas',data.regionList);
            
     
            this.listOfRegions=data.regionList
            // this.listOfIdTypes=data.get; 
      
            // console.log('listOfIdTypes=>',this.listOfIdTypes);
      
      
          })

          return this.listOfRegions
      }
    
    
    // language: string;
    // country: string;
    // variant: string;
    // dateFormat: string;
    // briefDateTimeFormat: string;
    // decimalFormat: string;

    // sayhellow:string();
    // constructor(obj: any) {
    //     this.language = obj && obj.language || null;
    //     this.country = obj && obj.country || null;
    //     this.variant = obj && obj.variant || null;
    //     this.dateFormat = obj && obj.dateFormat || null;
    //     this.briefDateTimeFormat = obj && obj.briefDateTimeFormat || null;
    //     this.decimalFormat = obj && obj.decimalFormat || null;
    // }

    sayHellow(){
        console.log('hi');
        
    }
//   export class sharedFunctions{

//      public myLittleBoy(){
//         console.log('Hello World')
    
//         // ControllerService.listIdRegions().subscribe(data=>{
    
    
//         //     regionList = data.regionList
      
      
//         //   })
//       }

    // static getRegions: any;
    // constructor(
    
    //     // private spinner: NgxSpinnerService,
    //     private controllerService:ControllerService,
      
    //     ) { }
    //     // listIdRegions():Observable<any>{
    //     //     return this.http.get(this.baseUrl+'uaa/region/?pageNo=0&pageSize=10&search=0')
    //     //   }
        
    //     getRegions():Observable<any>{

    //         let regionList:any=[]
    //         this.controllerService.listIdRegions().subscribe(data=>{


    //             regionList = data.regionList
          
          
    //           })
    //               return regionList
    //     }
  }

  export interface OfficeType {
    value: string;
    viewValue: string;
  }
  

  export const OFFICE_TYPES_DATA: OfficeType[] = [

    { value: 'HO', viewValue: 'Head Office' },
    { value: 'BR', viewValue: 'Branch' },
    // { value: '2', viewValue: 'APPLICATION TYPE 3' },
  
  ];
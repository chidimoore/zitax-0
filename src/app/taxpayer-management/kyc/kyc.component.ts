import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ControllerService } from 'src/app/services/controller.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from "rxjs/operators";
export interface DocumentType {
  value: string;
  viewValue: string;
}

export interface ReportTo {
  value: number;
  viewValue: string;
}


const REPORT_TO_DATA: ReportTo[] = [
  {value: 1, viewValue: 'Wizara ya Fedha'},
  {value: 2, viewValue: 'Wizara ya Afya'},
];


export interface Gender {
  value: string;
  // viewValue: string;
}


const GENDER_DATA: Gender[] = [
  {value:'Male'},
  {value:'Female'},
  {value:'Others'},
];


// export interface  IdTypes {
//   totalItems: number,
//   totalPage: number,
//   IdentityList: any,
//   currentPage: number
// }


// const REPORT_TO_DATA: ReportTo[] = [
//   {value: 1, viewValue: 'Wizara ya Fedha'},
//   {value: 2, viewValue: 'Wizara ya Afya'},
// ];


const DOCUMENT_TYPE_DATA: DocumentType[] = [
  {value: 'documentType-0', viewValue: 'NIDA'},
  {value: 'documentType-1', viewValue: 'Passport'},
];

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KYCComponent implements OnInit {
  
  documentType = new FormControl();

  listOfIdTypes:any=[];
  listOfRegions:any=[];
  listOfDistricts:any=[];
  listOfWards:any=[];
  listOfShehia:any=[];

  gender:Gender[]=GENDER_DATA;
  /** list of regions */
  // protected regions: Regions[] = REGIONS_DATA
  public documentTypes:DocumentType[]=DOCUMENT_TYPE_DATA;

  public reportTo:ReportTo[]=REPORT_TO_DATA;


  // public taxTypes: TaxTypes[] = TAX_TYPES_DATA
  /** control for the selected region */
  // public regionCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public regionFilterCtrl: FormControl = new FormControl();

  /** list of regions filtered by search keyword */
  // public filteredRegions: ReplaySubject<Regions[]> = new ReplaySubject<Regions[]>(1);
  
  isNIDA:Boolean=true;
  isPassport:Boolean=false
  isVerificationCodeSent:Boolean=false
  isCodeVerified:Boolean=false
  dataFetchedFromTRA:Boolean=false;
  submittingRegistrationData:Boolean=false;
  verifying:Boolean=true;
  isZNumberVefied: Boolean = false;

  iseVerifiucationOneSent: Boolean = false;

  showKYCForm: Boolean = true;

  addUserForm: FormGroup  = new FormGroup({});

  applyForZNumberForm: FormGroup  = new FormGroup({});
  addressForm: FormGroup  = new FormGroup({});
  personForm: FormGroup  = new FormGroup({});  
  institutionForm: FormGroup  = new FormGroup({});
  verifyZNumberForm: FormGroup = new FormGroup({});
  verificationNumberForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder:FormBuilder,
    private spinner: NgxSpinnerService,
    private controllerService:ControllerService,
    // private userService:UserService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.controllerService.listIdTypes().subscribe(data=>{

     
      this.listOfIdTypes=data.IdentityList
      // this.listOfIdTypes=data.get; 

      console.log('listOfIdTypes=>',this.listOfIdTypes);


    })

    this.controllerService.listIdRegions().subscribe(data=>{

     
      this.listOfRegions=data.regionList
      // this.listOfIdTypes=data.get; 

      console.log('listOfRegions=>',this.listOfRegions);


    })


    this.addressForm=this.formBuilder.group({

        "address": "string",
        "buildingNumber": "string",
        "effectiveDate": "2021-11-21T11:58:53.852Z",
        "email": "string",
        "fax": "string",
        "mobile": "string",
        "person_id": 0,
        "phone": "string",
        "region": '1',
        "district": '1',
        "ward": '1',
        "shehia": '1'

    })

    this.personForm=this.formBuilder.group({

        // "dateBirth": new FormControl('',Validators.required),
        // "email":new FormControl('',Validators.required),
        // "fullName": new FormControl('',Validators.required),
        // "gender":new FormControl('',Validators.required),
        // "idNumber":new FormControl('',Validators.required),
        // "idType":new FormControl('',Validators.required),
        // "mobile": new FormControl('',Validators.required)

        "dateBirth": "2021-11-21T11:58:53.852Z",
    "email": "string",
    "fullName": "string",
    "gender": "Male",
    "idNumber": "string",
    "idType": 0,
    "mobile": "string"
  })
  
  this.institutionForm=this.formBuilder.group({

    "commencementDate": new FormControl('',Validators.required),
    "fullName":new FormControl('',Validators.required),
    "reportTo": new FormControl('',Validators.required),
    "shortName":new FormControl('',Validators.required),
    "tinNumber":new FormControl('',Validators.required),
  
})
    this.applyForZNumberForm=this.formBuilder.group({
 
      'MobileNumber':  new FormControl('',Validators.required),
      'currentAddress': new FormControl('',Validators.required),
   
    })

    this.verifyZNumberForm = this.formBuilder.group({

 

      'documentType':  new FormControl(),
      'passportNumber':  new FormControl('',Validators.required),
      'NIDA':  new FormControl('',Validators.required),
      
    })

    this.verificationNumberForm = this.formBuilder.group({
      'verificationNumber':  new FormControl(),
      // 'passportNumber':  new FormControl('',Validators.required),
      // 'NIDA':  new FormControl('',Validators.required),
      
    })




  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.dataFetchedFromTRA=true;
      this.verifying=false;
      this.submittingRegistrationData=false;
    }, 3000);
  }


  applyForZNumberButtonPress(){
  
  this.spinner.show();

  console.log(this.applyForZNumberForm.value);

  if (this.applyForZNumberForm.contains('passportNumber')){

   
    console.log("YOU RIGHT");
  }
  else{
    console.log("NO IT DOES NOT");
    
  }

  this.controllerService.addUser(this.applyForZNumberForm.value).pipe(
    finalize(() => {
      this.spinner.hide();
      this.dataFetchedFromTRA=true;
      this.verifying=false;
      this.submittingRegistrationData=false;
      // this.applyForZNumberForm.controls.res
      this.applyForZNumberForm.reset();
    })).subscribe(data=>{
    console.log("user created",data);
    // this._snackBar.open("Z Number requested successfully",{
    //   duration: 2000,
    //   panelClass: [className]
    // });

    this._snackBar.open('Z Number requested successfully', 'Close',{
      panelClass: ['red-snackbar']
    });
    
    },err=>{  

    this._snackBar.open(err.message)
    
    }

    )
  

  this.verifying=true;
  this.dataFetchedFromTRA=false;
  this.showSpinner();

  }


  selectedDocumentType: string='';
  selectedRegion: string='';
  selectedDistrict: string='';

  onDocumentTypeSelection() {
    console.log('nida this.selectedDocumentType=>',this.selectedDocumentType);
        
    switch (this.selectedDocumentType) {

      case 'documentType-0':
          console.log('nida this.selectedDocumentType=>',this.selectedDocumentType);
        
          this.isNIDA=true
          this.isPassport=false
          this.verifyZNumberForm.controls['passportNumber'].disable();
          this.verifyZNumberForm.controls['NIDA'].enable();
          // this.applyForZNumberForm.get("NIDA").disable()
          // this.applyForZNumberForm.value['documentType']=this.selectedDocumentType;
          break;
      case 'documentType-1':
          // console.log('pass this.selectedDocumentType=>',this.selectedDocumentType);
          this.isPassport=true
          this.isNIDA=false
          this.verifyZNumberForm.controls['NIDA'].disable();
          this.verifyZNumberForm.controls['passportNumber'].enable();
          break;
     default:
          this.isNIDA=true
          this.isPassport=false
          this.verifyZNumberForm.controls['passportNumber'].disable();
          this.verifyZNumberForm.controls['NIDA'].enable();
          break;
  }
}


onRegionSection() {
  console.log('this.selectedRegion=>',this.selectedRegion);


  this.controllerService.getDistrictByRegionId(this.selectedRegion).subscribe(data=>{

     
    this.listOfDistricts=data
    // this.listOfIdTypes=data.get; 

    console.log('listOfDistricts=>',this.listOfDistricts);


  })
      
}

onDistrictSection() {

  console.log('this.selectedDistrict>',this.selectedDistrict);


  this.controllerService.getWardByDistrictId(this.selectedDistrict).subscribe(data=>{

     
    this.listOfWards=data
    // this.listOfIdTypes=data.get; 

    console.log('listOfDistricts=>',this.listOfWards);


  })
      
}




verifyZNumberButtonPress() {

  console.log('nida number=>',this.verifyZNumberForm.value['NIDA']);
  
  this.spinner.show();

  console.log(this.verifyZNumberForm.value);

  if (this.verifyZNumberForm.contains('passportNumber')){

   
    this.controllerService.getPassportInformation(this.verifyZNumberForm.value['Passport']).pipe(
      finalize(() => {
        this.spinner.hide();
        this.dataFetchedFromTRA=true;
        this.verifying=false;
        this.submittingRegistrationData=false;
        // this.verifyZNumberForm.controls.res
        // this.verifyZNumberForm.reset();
      })).subscribe(data=>{
      console.log("user created",data);
      // this._snackBar.open("Z Number requested successfully",{
      //   duration: 2000,
      //   panelClass: [className]
      // });
      console.log('I am here!');
      
      // this.iseVerifiucationOneSent=true


      
      this._snackBar.open('Z Number requested successfully', 'Close',{
        panelClass: ['red-snackbar']
      });
      
      },err=>{  
  
      this._snackBar.open(err.message)
      
      }
  
      )
    
  
  }
  else{
    this.controllerService.getNidaInformation(this.verifyZNumberForm.value['NIDA']).pipe(
      finalize(() => {
        this.spinner.hide();
       
        this.verifying=false;
        this.submittingRegistrationData=false;
        // this.verifyZNumberForm.controls.res
        // this.verifyZNumberForm.reset();
      })).subscribe(data=>{
    
      // this._snackBar.open("Z Number requested successfully",{
      //   duration: 2000,
      //   panelClass: [className]

      // this.personForm.value['fullName']="Rashid"

      const myObj: {[index: string]:any}= data;

      console.log("datar=> ",myObj);

      this.personForm.patchValue(data);

      this.personForm.controls['fullName'].setValue(myObj['firstName']);
      this.personForm.controls['idType'].setValue(myObj['id']);
      // this.personForm.controls['id'].setValue(1);
      // });
  if(data==null){
    this._snackBar.open('Sorry! NIDA data does not exist', 'Close',{
      panelClass: ['red-snackbar']

    });
  }
  else{

    this.isZNumberVefied=true;
    this._snackBar.open('NIDA Data fetched successfully', 'Close',{
      panelClass: ['red-snackbar']

    });
  }
     
      
      },err=>{  
  
      this._snackBar.open(err.message)
      
      }
  
      )
    
  
      this.verifying=true;
      this.dataFetchedFromTRA=false;
      this.showSpinner();
    
  }

  // if()
 
 
}


applyForZNumber() {

  // console.log('personForm=>',this.personForm.value);
  // console.log('addressForm=>',this.addressForm.value);
  // console.log('addressForm=>',this.addressForm.value);
  // // this.spinner.show();
  const person= this.personForm.value;
  const address = this.addressForm.value;
  const obj3 = {address ,person}

 console.log('obj3=>',obj3);

  // console.log('obj3333=>',obj3);

  // console.log(this.verifyZNumberForm.value);

    this.controllerService.applyForZNumber(obj3).pipe(
      finalize(() => {
        this.spinner.hide();
       
        this.verifying=false;
        this.submittingRegistrationData=false;
        // this.verifyZNumberForm.controls.res
        // this.verifyZNumberForm.reset();
      })).subscribe(data=>{
      console.log("Application for Z number successfull=> ",data);

      this.iseVerifiucationOneSent=true
      this.showKYCForm=false
      
      this._snackBar.open('Z Number requested successfully', 'Close',{
        panelClass: ['red-snackbar']

      
        // this.
  
      });

      // this._snackBar.open("Z Number requested successfully",{
      //   duration: 2000,
      //   panelClass: [className]
      // });
      if(data==null){
        this._snackBar.open('Sorry! NIDA data does not exist', 'Close',{
          panelClass: ['red-snackbar']
    
        });
      }
      else{
    
        this.isZNumberVefied=true;
        this._snackBar.open('NIDA Data fetched successfully', 'Close',{
          panelClass: ['red-snackbar']
    
        });
      }
         
      
      },err=>{  
  
      this._snackBar.open(err.message)
      
      }
  
      )
    
  
      this.verifying=true;
      this.dataFetchedFromTRA=false;
      this.showSpinner();
    
  // }

  // if()
 

}



institutionApplyForZNumber() {

 console.log('this.institutionForm.value=>',this.institutionForm.value);
 
    this.controllerService.institutionApplyForZNumber(this.institutionForm.value).pipe(
      finalize(() => {
        this.spinner.hide();
       
        this.verifying=false;
        this.submittingRegistrationData=false;
        // this.verifyZNumberForm.controls.res
        // this.verifyZNumberForm.reset();
      })).subscribe(data=>{
      console.log("Z Number Application Successfull=> ",data);
      // this._snackBar.open("Z Number requested successfully",{
      //   duration: 2000,
      //   panelClass: [className]
      // });
  if(data==null){
    this._snackBar.open('Sorry! NIDA data does not exist', 'Close',{
      panelClass: ['red-snackbar']

    });
  }
  else{


    this.iseVerifiucationOneSent=true
    this.showKYCForm=false

    this.isZNumberVefied=true;
    this._snackBar.open('Institution Z Number Application Successfull', 'Close',{
      panelClass: ['red-snackbar']

    });
  }
     
      
      },err=>{  
  
      this._snackBar.open(err.message)
      
      }
  
      )
    
  
      this.verifying=true;
      this.dataFetchedFromTRA=false;
      this.showSpinner();
    
  // }

  // if()
 

}

resendVerificationCode(){


  this.spinner.show();
  setTimeout(() => {

    console.log("resend code");

  this.isVerificationCodeSent=true

    this.spinner.hide();
  }, 2000);


  
}

verifyCodeButtonPress(){

  this.spinner.show();
  setTimeout(() => {

    this.isCodeVerified=true
  this.iseVerifiucationOneSent=false
  this.isVerificationCodeSent=false

    this.spinner.hide();
  }, 2000);


}


}

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

  /** list of regions */
  // protected regions: Regions[] = REGIONS_DATA
  public documentTypes:DocumentType[]=DOCUMENT_TYPE_DATA;
  // public taxTypes: TaxTypes[] = TAX_TYPES_DATA
  /** control for the selected region */
  // public regionCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public regionFilterCtrl: FormControl = new FormControl();

  /** list of regions filtered by search keyword */
  // public filteredRegions: ReplaySubject<Regions[]> = new ReplaySubject<Regions[]>(1);
  
  isNIDA:Boolean=true;
  isPassport:Boolean=false
  dataFetchedFromTRA:Boolean=false;
  submittingRegistrationData:Boolean=false;
  verifying:Boolean=true;
  isZNumberVefied: Boolean = false;

  addUserForm: FormGroup  = new FormGroup({});
  applyForZNumberForm: FormGroup  = new FormGroup({});
  addressForm: FormGroup  = new FormGroup({});
  personForm: FormGroup  = new FormGroup({});  
  institutionForm: FormGroup  = new FormGroup({});
  verifyZNumberForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder:FormBuilder,
    private spinner: NgxSpinnerService,
    private controllerService:ControllerService,
    // private userService:UserService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.addressForm=this.formBuilder.group({

        "address":  new FormControl('',Validators.required),
        "buildingNumber":  new FormControl('',Validators.required),
        "effectiveDate": new FormControl('',Validators.required),
        "email": new FormControl('',Validators.required),
        "fax": new FormControl('',Validators.required),
        "mobile": new FormControl('',Validators.required),
        "person_id": new FormControl('',Validators.required),
        "phone": new FormControl('',Validators.required),
        "shehia": new FormControl('',Validators.required),

    })

    this.personForm=this.formBuilder.group({

        "dateBirth": new FormControl('',Validators.required),
        "email":new FormControl('',Validators.required),
        "fullName": new FormControl('',Validators.required),
        "gender":new FormControl('',Validators.required),
        "idNumber":new FormControl('',Validators.required),
        "idType":new FormControl('',Validators.required),
        "mobile": new FormControl('',Validators.required)

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


}

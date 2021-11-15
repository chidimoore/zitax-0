import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';

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
  

  addUserForm: FormGroup  = new FormGroup({});
  applyForZNumberForm: FormGroup  = new FormGroup({});
  constructor(
    private formBuilder:FormBuilder,
    private spinner: NgxSpinnerService
    // private userService:UserService,
    // private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    


    this.applyForZNumberForm=this.formBuilder.group({
      'documentType':  new FormControl(),
      'passportNumber':  new FormControl('',Validators.required),
      'NIDA':  new FormControl('',Validators.required),
      'MobileNumber':  new FormControl('',Validators.required),
      'currentAddress': new FormControl('',Validators.required),
    })

    this.addUserForm=this.formBuilder.group({
      'username': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'phone': new FormControl('',[Validators.required]),

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

  createUser(){
  //   // console.log(this.addUserForm.value);
  //   this.userService.addUser(this.addUserForm.value).subscribe(data=>{
  //     // console.log("user created");
  //     this._snackBar.open("user crated successfully")
      
  //   },err=>{  
  //     this._snackBar.open("Un able to create user")
      
  //   }
  //  )
  }


  applyForZNumberButtonPress(){
  
 
  console.log(this.applyForZNumberForm.value);


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
          // this.applyForZNumberForm.value['documentType']=this.selectedDocumentType;
          break;
      case 'documentType-1':
          // console.log('pass this.selectedDocumentType=>',this.selectedDocumentType);
          this.isPassport=true
          this.isNIDA=false
          break;
     default:
          this.isNIDA=true
          this.isPassport=false
          break;
  }
}


}

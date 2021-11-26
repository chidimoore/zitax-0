import { object } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators , FormArray, AbstractControl } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ControllerService } from 'src/app/services/controller.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from "rxjs/operators";
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { VERSION } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { BANKS } from 'src/app/material/shared-functions';


import {AccountType,ACCOUNT_TYPES_DATA,Currencies, CURRENCY_DATA,EXEMPTS_DATA,Expemts, Params, ApplicationTypes,APPLICATION_TYPES_DATA,OfficeType,OFFICE_TYPES_DATA } from 'src/app/Main/shared';



export interface Regions {
  value: string;
  viewValue: string;
}



// export interface obj3 {
//   [
//     {
//     address: 
//         {  
//           ddress: "",
       
//         }, 
//      taxType: 
//         {
//           calculationMethod: 4,
       
//         } 
//     }
//     ]
// }

const REGIONS_DATA: Regions[] = [
  { value: 'region-0', viewValue: 'Kaskazini Unguja' },
  { value: 'region-1', viewValue: 'Kusini Pemba' },
  { value: 'region-2', viewValue: 'Kaskazini Pemba' },

];



export interface TaxTypes {
  value: string;
  viewValue: string;
}


export interface Districts {
  value: string;
  viewValue: string;
}


const DISTRICTS_DATA_ONE: Districts[] = [
  { value: 'district-0', viewValue: 'District 0' },
  { value: 'district-1', viewValue: 'District 1' },
  { value: 'district-2', viewValue: 'District 2' },
];

const DISTRICTS_DATA_TWO: Districts[] = [
  { value: 'district-3', viewValue: 'District 3' },
  { value: 'district-4', viewValue: 'District 4' },
  { value: 'district-5', viewValue: 'District 5' },
];

const DISTRICTS_DATA_THREE: Districts[] = [
  { value: 'district-6', viewValue: 'District 6' },
  { value: 'district-7', viewValue: 'District 7' },
  { value: 'district-8', viewValue: 'District 8' },

];

export interface Wards {
  value: string;
  viewValue: string;
}


const WARDS_DATA_ONE: Wards[] = [
  { value: 'ward-0', viewValue: 'Ward 0' },
  { value: 'ward-1', viewValue: 'Ward  1' },
  { value: 'ward-2', viewValue: 'Ward  2' },


];

const WARDS_DATA_TWO: Wards[] = [
  { value: 'ward-3', viewValue: 'Ward  3' },
  { value: 'ward-4', viewValue: 'Ward  4' },
  { value: 'ward-5', viewValue: 'Ward  5' },
];


const WARDS_DATA_THREE: Wards[] = [
  { value: 'ward-6', viewValue: 'Ward  6' },
  { value: 'ward-7', viewValue: 'Ward  7' },
  { value: 'ward-8', viewValue: 'Ward  8' },

];


@Component({
  selector: 'app-withholding-registration',
  templateUrl: './withholding-registration.component.html',
  styleUrls: ['./withholding-registration.component.css']
})
export class WithholdingRegistrationComponent implements OnInit {

  // selectedRegion: string='';

  arrayItems: {
    id: number;
    title: string;
  }[] = [];
  
  firstFormGroup2: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  verifyApplicationNumberForm: FormGroup = new FormGroup({});
  verifyBPRANumberForm: FormGroup = new FormGroup({});
  isEditable = false;

  region = new FormControl();
  district = new FormControl();
  ward = new FormControl();
  typeofBusinessActivities = new FormControl();
  taxType = new FormControl();

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      // const reader = new FileReader();

      console.log('File Selected');

      // reader.onload = (e: any) => {
      //   this.srcResult = e.target.result;
      // };

      // reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  /** list of regions */
  protected regions: Regions[] = REGIONS_DATA

  // public taxTypes: TaxTypes[] =[]

  public officeTypes: OfficeType[] = OFFICE_TYPES_DATA

  public exempts: Expemts[] = EXEMPTS_DATA

  public currencies: Currencies[] = CURRENCY_DATA

  public accountTypes: AccountType[] = ACCOUNT_TYPES_DATA

  public applicationTypes: ApplicationTypes[] = APPLICATION_TYPES_DATA

  /** control for the selected region */
  // public regionCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public regionFilterCtrl: FormControl = new FormControl();

  /** list of regions filtered by search keyword */
  public filteredRegions: ReplaySubject<Regions[]> = new ReplaySubject<Regions[]>(1);


  selectedDay: string = '';
  isNGO: Boolean = false;
  isConsultant: Boolean = true;

  showConsultantForm :Boolean = false;
  isZNumberVefied: Boolean = false;
  isApplicationNumberVefied: Boolean = false;
  isBusinessDataFetched: Boolean = false;

  isNotConsultant: Boolean = false;


  isOther: Boolean = true
  dataFetchedFromTRA: Boolean = false;
  submittingRegistrationData: Boolean = false;
  verifying: Boolean = true;

  applicationNumberVerified: Boolean = true;
  BPRANumberVerified: Boolean = false;
  showRegistrationForm: Boolean = false;
  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;

    console.log(this.selectedDay);

  }

  addUserForm: FormGroup = new FormGroup({});


  taxPayerRegistrationForm: FormGroup = new FormGroup({});
  verifyZNumberForm: FormGroup = new FormGroup({});
  fetchBusinessInfoForm: FormGroup = new FormGroup({});

  name = 'Angular 6';

  userForm: FormGroup = new FormGroup({});
  demoForm : FormGroup = new FormGroup({});

  productForm: FormGroup= new FormGroup({});

  addressForm: FormGroup= new FormGroup({});

  bankForm: FormGroup= new FormGroup({});

  actitiesForm: FormGroup= new FormGroup({});

  attachmentForm :FormGroup= new FormGroup({});

  businessForm: FormGroup = new FormGroup({});

  consultantForm: FormGroup = new FormGroup({});
  // sharedFunction = new Params()
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private controllerService:ControllerService,
    public shared:Params,
    private _snackBar: MatSnackBar
    // private fb: FormBuilder
    // private fb: FormBuilder
    
    // private userService:UserService,
    // private _snackBar: MatSnackBar
  ) {

    // this.userForm = this.fb.group({
    //   name: [],
    //   phones: this.fb.array([
    //     this.fb.control(null)
    //   ])
    // })

    this.demoForm = this._formBuilder.group({
      demoArray: this._formBuilder.array([])
   });

   }

  ngOnInit(): void {
   
      /* Initiate the form structure */
  
    // this.listOfRegions=this.shared.listIdRegions()

    // console.log('this.listOfRegions All=>',this.listOfRegions);


    this.controllerService.listIdRegions().subscribe(data=>{

      this.listOfRegions=data.regionList
      // console.log('this.listOfRegions from this =>',data);


    })
    

    this.controllerService.listCalculationMethods().subscribe(data=>{

      this.calculationMethods=data.MethodList
      console.log('data.reMethodList =>',data.MethodList);


    })

    this.controllerService.listConsultants().subscribe(data=>{

      this.consultants=data.consultant
      console.log('data.reMethodList =>',data.consultant);


    })


    this.controllerService.listFilingPeriods().subscribe(data=>{

      this.filingPeriods=data.fillingPeriod
      console.log('data.reMethodList =>',data.fillingPeriod);


    })



    this.controllerService.listBankIds().subscribe(data=>{

      this.bankIds=data.bankList
      console.log('data.reMethodList =>',data.bankList);


    })

    this.controllerService.listActivities().subscribe(data=>{

      this.activities=data.Activities
      console.log('this.activities =>',data.Activities);


    })

    this.controllerService.listTaxTypes().subscribe(data=>{

      this.taxTypes=data.taxtypeList
      // console.log('data.reMethodList =>',data.MethodList);


    })
    
    

         /* Initiate the form structure */
    this.productForm = this.formBuilder.group({
      title: [],
      selling_points: this.formBuilder.array([this.formBuilder.group({point:''})])
    })

      this.addressForm = this.formBuilder.group({
    
        address:  this.formBuilder.array([
          this.formBuilder.group({ 
                "address": "string",
                "buildingNumber": "string",
                "effectiveDate": "2021-11-21T06:10:52.130Z",
                "email": "string",
                "fax": "string",
                "mobile": "string",
                "officeType": "HO",
                "phone": "string",
                "poBox": "string",
                "region": '1',
                "district": '1',
                "ward": '',
                "shehia": 1,
                // "shehia": 3,
                "calculationMethod": 4,
                "exempt": true,
                "filingCurrency": "TZS",
                "filingPeriod": 0,
                "filingType": "string",
                "infrastructure": true,
                "localRate": "string",
                "taxId": 0
                
        
        
          })
        ]
          
          )
      })

       
      this.bankForm = this.formBuilder.group({
    
        bInfo:  this.formBuilder.array([
          this.formBuilder.group({ 
            "accountName": "string",
            "accountNumber": "string",
            "accountType": "Local",
            "bankId": 0,
            "currency": "TZS",
            "swiftCode": "string"
        
          })
        ]
          
          )
      })

      this.actitiesForm= this.formBuilder.group({
    
        aInfo:  this.formBuilder.array([
          this.formBuilder.group({ 
            activity:1 ,
        
          })
        ]
          
          )
      })

      this.attachmentForm= this.formBuilder.group({
    
        attachment:  this.formBuilder.array([
          this.formBuilder.group({ 
            "file": "string"
          })
        ]
          )
      })

    //   this.addressForm = this.formBuilder.group({
    //     address:  this.formBuilder.array([
    //       this.formBuilder.group({
 
    //         address: {
    //         address: '',
    //         buildingNumber: '',
    //         effectiveDate: '',
    //         email: '',
    //         fax: '',
    //         mobile: '',
    //         officeType: '',
    //         phone: '',
    //         poBox: '',
    //         shehia: '',
    //       //  })}
    //       },
      
    //     taxType:{
    //       calculationMethod: '',
    //       exempt: '',
    //       filingCurrency: '',
    //       filingPeriod: '',
    //       filingType: '',
    //       infrastructure: '',
    //       localRate: '',
    //       taxId: ''
    //       // })
    //       }
    //     //  })
    //     })
         
         
    //    ])
        
    // })
      //     address: this.formBuilder.group({
      //     address: '',
      //     buildingNumber: '',
      //     effectiveDate: '',
      //     email: '',
      //     fax: '',
      //     mobile: '',
      //     officeType: '',
      //     phone: '',
      //     poBox: '',
      //     shehia: '',
      //    }),

      // taxType: this.formBuilder.group({
      //   calculationMethod: '',
      //   exempt: '',
      //   filingCurrency: '',
      //   filingPeriod: '',
      //   filingType: '',
      //   infrastructure: true,
      //   localRate: '',
      //   taxId: ''
      // })

      
      // })
      

    this.arrayItems = [];

    this.taxPayerRegistrationForm = this.formBuilder.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'TIN': new FormControl('', Validators.required),
      'NIDAZan ID': new FormControl('', Validators.required),
      'businessName': new FormControl('', Validators.required),
      'companyName': new FormControl('', Validators.required),
      'businessCategoryType': new FormControl('', Validators.required),
      'registeredDate': new FormControl('', Validators.required),

      'businessRegNo': new FormControl('', Validators.required),
      'NIDAZanID': new FormControl('', Validators.required),
      'typeOfApplication': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),

      'placeOfBusiness': new FormControl('', Validators.required),
      'fullName': new FormControl('', Validators.required),
      'latitude': new FormControl('', Validators.required),
      'longitude': new FormControl('', Validators.required),

      'zNumber': new FormControl('', Validators.required),
      'estimatedTurnAnnualOver': new FormControl('', Validators.required),
      'contactNumber': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),

      'regionInformation': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'district': new FormControl('', Validators.required),
      'ward': new FormControl('', Validators.required),

      'typeofBusinessActivities': new FormControl('', Validators.required),
      'dateOfCommencingBusiness': new FormControl('', Validators.required),
      'taxType': new FormControl('', Validators.required),
      'fingerPrint': new FormControl('',[Validators.required,Validators.minLength(10)]),

      'taxConsultant': new FormControl('', Validators.required),
      'responsiblePerson': new FormControl('', Validators.required),
      'designation': new FormControl('', Validators.required),
      'dateOfVerification': new FormControl('', Validators.required),

      'approvedOfficerName': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'declaration': new FormControl('', Validators.required),
      'selectedTaxpayer': new FormControl('', Validators.required),

    })


    
    // "annualTurnover": 0,
    // "applicationType": 0,
    // "businessCategory": "Soleproprietor",
    // "businessName": '',
    // "businessRegNumber": '',
    // "businessType": 0,
    // "commencementDate": "2021-11-19T21:11:34.235Z",
    // "location": '',
    // "taxpayerType": "Consultant",
    // "tinNumber": '',
    // "znumber": ''

   

    this.verifyZNumberForm = this.formBuilder.group({
      'ZNumber': new FormControl('', Validators.required),
    })

    this.fetchBusinessInfoForm = this.formBuilder.group({
      'BPRANumber': new FormControl('', Validators.required),
    })

    // set initial selection
    // this.regionCtrl.setValue(this.regions[10]);

    // load the initial region list
    this.filteredRegions.next(this.regions.slice());

    // listen for search field value changes
    this.regionFilterCtrl.valueChanges
      // .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRegions();
      });


    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 2000);
    // this.businessForm = this._formBuilder.group({
 
    // })

    this.businessForm  = this.formBuilder.group({
      "institutionZNumber": "string",
      "responsibleFingerprint": 0,
      "responsiblePersonZNumber": "string",
      "responsiblePosition": "string",  
    });


    this.consultantForm  = this.formBuilder.group({

 
      'consultantAttachment': this.formBuilder.array([this.formBuilder.group({"file": "string"})]),
      "consultantZNumber": "string",
      "description": "string"

    });

    this.secondFormGroup = this.formBuilder.group({
      // secondCtrl: [''],
      'secondCtrl': new FormControl('', Validators.required),
    });

    this.verifyApplicationNumberForm= this.formBuilder.group({
      // secondCtrl: [''],
      'applicationNumber': new FormControl('', Validators.required),
    });


    this.verifyBPRANumberForm= this.formBuilder.group({
      // secondCtrl: [''],
      'BPRANumber': new FormControl('', Validators.required),
    });


  }



  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      // this.dataFetchedFromTRA=true;
      this.verifying = false;
      this.submittingRegistrationData = false;
    }, 500);
  }

  registerTaxPayer(){
    console.log(this.taxPayerRegistrationForm.value);
  }

  
  createUser() {
    // console.log(this.addUserForm.value);
    // this.userService.addUser(this.addUserForm.value).subscribe(data=>{
    //   // console.log("user created");
    //   this._snackBar.open("user crated successfully")

    // },err=>{  
    //   this._snackBar.open("Un able to create user")

    // }
    //  )
    this.submittingRegistrationData = true
    this.showSpinner();
    console.log("TIN fetched from TRA");

  }

  verifyZNumber() {
    // console.log(this.addUserForm.value);
    // this.userService.addUser(this.addUserForm.value).subscribe(data=>{
    //   // console.log("user created");
    //   this._snackBar.open("user crated successfully")

    // },err=>{  
    //   this._snackBar.open("Un able to create user")

    // }
    //  )

    console.log("TIN fetched from TRA");

    this.verifying = true;
    this.dataFetchedFromTRA = false;
    this.showSpinner();

  }


  selectedFood1: string = '';
  selectedTaxpayer: string = '';
  selectedBusinessCategory: string = '';
  selectedTaxType: string = '';
  selectedRegion: string = '';
  selectedDistrict: string = '';
  selectedWard: string = '';
  selectedShehia:string = '';

  listOfIdTypes:any=[];
  listOfRegions:any=[];
  calculationMethods:any=[];
  consultants:any=[];
  bankIds:any=[];
  activities:any=[];
  taxTypes:any=[];
  filingPeriods:any=[];
  // taxTypes:any=[];
  listOfDistricts:any=[];
  listOfWards:any=[];
  listOfShehia:any=[];
  
  foods = [
    { value: 'Soleproprietor', viewValue: 'Soleproprietor' },
    { value: 'Partenership', viewValue: 'Partenership' },
    { value: 'Company', viewValue: 'Company' },
    { value: 'Consultant', viewValue: 'Consultant' },
    { value: 'Ngos', viewValue: 'Ngos' }
  ];

  taxpayerTypes = [
    { value: 'Consultant', viewValue: 'Consultant' },
    { value: 'Preparer', viewValue: 'Preparer' },
    { value: 'Taxpayer', viewValue: 'Taxpayer' },
  ];

  // public regions: Regions[] = REGIONS_DATA;


  // districts=[]
  districts: Districts[] = [];
  wards: Wards[] = []

  onBusinessCategorySelection() {

    console.log(this. selectedBusinessCategory);

    if (this.selectedTaxpayer == 'NGOs-2') {
      this.isNGO = true
      this.isOther = false
    }
    else {
      this.isNGO = false
      this.isOther = true
    }

  }


  onTaxPayerTypeSelection() {

    console.log("Taxpayer=>",this.selectedTaxpayer);
    console.log("isConsultant=>",this.isConsultant);

    // { value: 'Preparer', viewValue: 'Preparer' },
    // { value: 'Taxpayer', viewValue: 'Taxpayer' },

    if (this.selectedTaxpayer == 'Taxpayer') {

    //   this.isNotConsultant=false
    //   this.isNGO = true
    //   this.isOther = true
      this.isConsultant=true
      this.showConsultantForm=true

    console.log("now isConsultant=>",true);
    }
   
    else {
    //   this.isNGO = false
    //   this.isOther = true
    //   this.isConsultant=true
    this.showConsultantForm=false
    this.isConsultant=false
    console.log("now isConsultant=>",false);


  }
}


  onTaxType() {


  }

  onRegionSelection() {

    switch (this.selectedRegion) {
      case 'region-0':
        this.districts = DISTRICTS_DATA_ONE;
        break;
      case 'region-1':
        this.districts = DISTRICTS_DATA_TWO;
        break;
      case 'region-2':
        this.districts = DISTRICTS_DATA_THREE;
        break;
      default:
        this.districts = [];
        break;
    }

  }

  onDistrictSelection() {

    switch (this.selectedDistrict) {
      case 'district-0':
        this.wards = WARDS_DATA_ONE;
        break;
      case 'district-1':
        this.wards = WARDS_DATA_TWO;
        break;
      case 'district-2':
        this.wards = WARDS_DATA_THREE;
        break;
      default:
        this.wards = [];
        break;
    }

  }


  protected filterRegions() {
    if (!this.regions) {
      return;
    }
    // get the search keyword
    let search = this.regionFilterCtrl.value;
    if (!search) {
      this.filteredRegions.next(this.regions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the regions
    this.filteredRegions.next(
      this.regions.filter((region) => region.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }

  verifyZNumberButtonPress() {


    console.log(this.verifyZNumberForm.value);
    this.isZNumberVefied = true;
    this.verifying = true;
    this.dataFetchedFromTRA = false;
    this.showSpinner();

  }

  fetchBusinessInfoButtonPress() {

    console.log(this.fetchBusinessInfoForm.value);
    this.verifying = true;
    // this.dataFetchedFromTRA=false;

    this.showSpinner();

    this.isBusinessDataFetched = true;

  }


  // addPhone(): void {
  //   (this.userForm.get('phones') as FormArray).push(
  //     this.fb.control(null)
  //   );
  // }

  // removePhone(index:any) {
  //   (this.userForm.get('phones') as FormArray).removeAt(index);
  // }

  // getPhonesFormControls(): AbstractControl[] {
  //   return (<FormArray> this.userForm.get('phones')  as FormArray).controls 
  // }

  // send(values:any) {
  //   console.log(values);
  // }

  //another

//   get demoArray() {
//     return this.demoForm.get('demoArray') as FormArray;
//  }
//  addItem(item:any) {
//     this.arrayItems.push(item);
//     this.demoArray.push(this._formBuilder.control(false));
//  }
//  removeItem() {
//     this.arrayItems.pop();
//     this.demoArray.removeAt(this.demoArray.length - 1);
//  }


get sellingPointsS() {
  return this.productForm.get('selling_points') as FormArray;
}

/////// This is new /////////////////

addSellingPointS() {
  this.sellingPointsS.push(this.formBuilder.group({point:''}));
}

deleteSellingPointS(index:any) {
  this.sellingPointsS.removeAt(index);
}


get sellingPoints() {
  return this.addressForm.get('address') as FormArray;
}

/////// This is new /////////////////

addSellingPoint() {
  this.sellingPoints.push(
    this.formBuilder.group({ 
      "address": "string",
      "buildingNumber": "string",
      "effectiveDate": "2021-11-21T06:10:52.130Z",
      "email": "string",
      "fax": "string",
      "mobile": "string",
      "officeType": "HO",
      "phone": "string",
      "poBox": "string",
      "region": '1',
      "district": '1',
      "ward": '',
      "shehia": 1,
      "calculationMethod": 4,
      "exempt": true,
      "filingCurrency": "TZS",
      "filingPeriod": 0,
      "filingType": "string",
      "infrastructure": true,
      "localRate": "string",
      "taxId": 0
    })

  );

}

deleteSellingPoint(index:any) {
  this.sellingPoints.removeAt(index);
}

get bankInfo() {
  return this.bankForm.get('bInfo') as FormArray;
}

/////// This is new /////////////////

addBankInfo() {
  this.bankInfo.push(
    this.formBuilder.group({ 
      "accountName": "string",
      "accountNumber": "string",
      "accountType": "Local",
      "bankId": 0,
      "currency": "TZS",
      "swiftCode": "string"
  
    })

  );

}

deleteBankInfo(index:any) {
  this.bankInfo.removeAt(index);
}



get activityInfo() {
  return this.actitiesForm.get('aInfo') as FormArray;
}

/////// This is new /////////////////

addActivityInfo() {
  this.activityInfo.push(
    this.formBuilder.group({ 
   
      activity: '1',
   
  
    })

  );

}

deleteActivityInfo(index:any) {
  this.activityInfo.removeAt(index);
}



get attachmentInfo() {
  return this.attachmentForm.get('attachment') as FormArray;
}

/////// This is new /////////////////

addAttachmentInfo() {
  this.attachmentInfo.push(
    this.formBuilder.group({ 
   
      file: '',
   
  
    })

  );

}

deleteAttachmentInfo(index:any) {
  this.attachmentInfo.removeAt(index);
}

// submitProductionForm(){


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
  
  onWardSelection() {
  
    console.log('this.selectedWard',this.selectedWard);
  
  
    this.controllerService.getShehiaByWardId(this.selectedWard).subscribe(data=>{
  
       
      this.listOfShehia=data
      // this.listOfIdTypes=data.get; 
  
      console.log('this.listOfShehia',this.listOfShehia);
  
  
    })
        
  }


  onShehiaSelection() {
  
    console.log('this.selectedWard',this.selectedShehia);
  
    console.log('this.addressForm',this.addressForm.value['shehia']);
    // this.controllerService.getShehiaByWardId(this.selectedWard).subscribe(data=>{
        
  }


submitProductionForm(){

 
let obj3 =[]

for (let x = 0; x < this.addressForm.value['address'].length; x++) { 

  var d  = {
    "address" : {
        "address": this.addressForm.value['address'][x]['address'],
        "buildingNumber": this.addressForm.value['address'][x]['buildingNumber'],
        "effectiveDate": this.addressForm.value['address'][x]['effectiveDate'],
        "email": this.addressForm.value['address'][x]['email'],
        "fax": this.addressForm.value['address'][x]['fax'],
        "mobile": this.addressForm.value['address'][x]['mobile'],
        "officeType":this.addressForm.value['address'][x]['officeType'],
        "phone": this.addressForm.value['address'][x]['phone'],
        "poBox": this.addressForm.value['address'][x]['poBox'],
        "shehia": this.addressForm.value['address'][x]['shehia'],
    },
    "taxType" : {
        "calculationMethod":this.addressForm.value['address'][x]['calculationMethod'],
        "exempt":this.addressForm.value['address'][x]['exempt'],
        "filingCurrency": this.addressForm.value['address'][x]['filingCurrency'],
        "filingPeriod": this.addressForm.value['address'][x]['filingPeriod'],
        "filingType": this.addressForm.value['address'][x]['filingType'],
        "infrastructure": this.addressForm.value['address'][x]['infrastructure'],
        "localRate":this.addressForm.value['address'][x]['localRate'],
        "taxId":this.addressForm.value['address'][x]['taxId'],
    }

    }

    obj3.push(d);


}

// console.log('this.businessForm.value =>',this.businessForm.value);

const registrationData ={
  "activity": this.actitiesForm.value['aInfo'],
  "address":obj3,
  "attachment":this.attachmentForm.value['attachment'],
  "bankAccount": this.bankForm.value['bInfo'],
  "business":this.businessForm.value,
  "consultant": this.consultantForm.value
}


  // const registrationData ={
  //   "activity": this.actitiesForm.value,
  //   "address": obj3,
  //   "attachment": this.attachmentForm.value,
  //   "bankAccount": this.bankForm.value,
  //   "business": this.businessForm.value,
  //   "consultant": this.consultantForm.value
  // }

  console.log('registrationData  =>',registrationData);


  this.controllerService.submitRegistration(registrationData).pipe(
    finalize(() => {
      this.spinner.hide();
     
      this.verifying=false;
      this.submittingRegistrationData=false;
      // this.verifyZNumberForm.controls.res
      // this.verifyZNumberForm.reset();
    })).subscribe(data=>{
    console.log("Taxpayer Registration Successfully Sumitted=> ",data);
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

verifyApplicationNumber(){

  this.spinner.show();
  setTimeout(() => {

    this.applicationNumberVerified=false

    // this.BPRANumberVerified=true
    this.showRegistrationForm=true
    
    this.spinner.hide();
  }, 2000);
  


}

verifyBPRANumber(){

      this.spinner.show();
    setTimeout(() => {

      this.BPRANumberVerified=false
      this.showRegistrationForm=true

      this.spinner.hide();
    }, 2000);
}

}

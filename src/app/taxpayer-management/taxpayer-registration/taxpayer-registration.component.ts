import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators , FormArray, AbstractControl } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';

// import { MatSnackBar } from '@angular/material/snack-bar';
// import { VERSION } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { BANKS } from 'src/app/material/shared-functions';

export interface Regions {
  value: string;
  viewValue: string;
}

const REGIONS_DATA: Regions[] = [
  { value: 'region-0', viewValue: 'Kaskazini Unguja' },
  { value: 'region-1', viewValue: 'Kusini Pemba' },
  { value: 'region-2', viewValue: 'Kaskazini Pemba' },

];



export interface TaxTypes {
  value: string;
  viewValue: string;
}

const TAX_TYPES_DATA: TaxTypes[] = [
  { value: 'taxType-0', viewValue: 'VAT' },
  { value: 'taxType-1', viewValue: 'Hotel levy' },
  { value: 'taxType-2', viewValue: 'Restaurant levy' },
  { value: 'taxType-0', viewValue: 'Tour Operation levy' },
  { value: 'taxType-1', viewValue: 'Land Lease' },
  { value: 'taxType-2', viewValue: 'Public Services' },
  { value: 'taxType-0', viewValue: 'Excercise Duty' },
  { value: 'taxType-1', viewValue: 'Petroleum levy' },
  { value: 'taxType-2', viewValue: 'Airport Service Charge' },
  { value: 'taxType-0', viewValue: 'Airport Safety fee' },
  { value: 'taxType-1', viewValue: 'Seaport Service Charge' },
  { value: 'taxType-2', viewValue: 'Airport Transport Charge' },
  { value: 'taxType-2', viewValue: 'Tax consultant licences' },
];

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
  selector: 'app-taxpayer-registration',
  templateUrl: './taxpayer-registration.component.html',
  styleUrls: ['./taxpayer-registration.component.css']
})

export class TaxpayerRegistrationComponent implements OnInit {

  
  arrayItems: {
    id: number;
    title: string;
  }[] = [];
  
  firstFormGroup2: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
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

  public taxTypes: TaxTypes[] = TAX_TYPES_DATA
  /** control for the selected region */
  // public regionCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public regionFilterCtrl: FormControl = new FormControl();

  /** list of regions filtered by search keyword */
  public filteredRegions: ReplaySubject<Regions[]> = new ReplaySubject<Regions[]>(1);


  selectedDay: string = '';
  isNGO: Boolean = false;
  isZNumberVefied: Boolean = false;
  isBusinessDataFetched: Boolean = false;
  isOther: Boolean = true
  dataFetchedFromTRA: Boolean = false;
  submittingRegistrationData: Boolean = false;
  verifying: Boolean = true;
  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;

    console.log(this.selectedDay);

  }

  addUserForm: FormGroup = new FormGroup({});

  businessForm: FormGroup = new FormGroup({});

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

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
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
  
      this.addressForm = this.formBuilder.group({
    
        address:  this.formBuilder.array([
          this.formBuilder.group({ 
            address: '',
            buildingNumber: '',
            effectiveDate: '',
            email: '',
            fax: '',
            mobile: '',
            officeType: '',
            phone: '',
            poBox: '',
            shehia: '',
            calculationMethod: '',
            exempt: '',
            filingCurrency: '',
            filingPeriod: '',
            filingType: '',
            infrastructure: '',
            localRate: '',
            taxId: ''
        
          })
        ]
          
          )
      })

       
      this.bankForm = this.formBuilder.group({
    
        bInfo:  this.formBuilder.array([
          this.formBuilder.group({ 
            accountName:'' ,
            accountNumber:'',
            accountType: '',
            bankId: '',
            currency:'',
            swiftCode: ''
        
          })
        ]
          
          )
      })

      this.actitiesForm= this.formBuilder.group({
    
        aInfo:  this.formBuilder.array([
          this.formBuilder.group({ 
            activity:'' ,
        
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
      // firstCtrl: [''],
      // 'firstCtrl': new FormControl('', Validators.required),


      'annualTurnover': new FormControl(''),
      'applicationType': new FormControl(''),
      'businessCategory': new FormControl(''),
      'businessName': new FormControl(''),
      'businessRegNumber': new FormControl(''),
      'businessType': new FormControl(''),
      'commencementDate': new FormControl(''),
      'location': new FormControl(''),
      'taxpayerType': new FormControl(''),
      'tinNumber': new FormControl(''),
      'znumber': new FormControl(''),
 

    });
    this.secondFormGroup = this.formBuilder.group({
      // secondCtrl: [''],
      'secondCtrl': new FormControl('', Validators.required),
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

    console.log(this.selectedTaxpayer);

    if (this.selectedTaxpayer == 'NGOs-2') {
      this.isNGO = true
      this.isOther = false
    }
    else {
      this.isNGO = false
      this.isOther = true
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



get sellingPoints() {
  return this.addressForm.get('address') as FormArray;
}

/////// This is new /////////////////

addSellingPoint() {
  this.sellingPoints.push(
    this.formBuilder.group({
      
      address: '',
      buildingNumber: '',
      effectiveDate: '',
      email: '',
      fax: '',
      mobile: '',
      officeType: '',
      phone: '',
      poBox: '',
      shehia: '',
      calculationMethod: '',
       exempt: '',
    filingCurrency: '',
    filingPeriod: '',
    filingType: '',
    infrastructure: '',
    localRate: '',
    taxId: ''
    
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
      accountName:'' ,
      accountNumber:'',
      accountType: '',
      bankId: '',
      currency:'',
      swiftCode: ''
  
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
   
      activity: '',
   
  
    })

  );

}

deleteActivityInfo(index:any) {
  this.activityInfo.removeAt(index);
}


submitProductionForm(){

  console.log('businessForm.=>',this.businessForm.value);
  console.log('addressForm=>',this.addressForm.value);
  console.log('bankForm=>',this.bankForm.value);
  console.log('actitiesForm=>',this.actitiesForm.value);
  // const person= this.personForm.value;
  // const address = this.addressForm.value;
  // const obj3 = {address ,person}

  // addressForm: FormGroup= new FormGroup({});

  // bankForm: FormGroup= new FormGroup({});

  // actitiesForm: FormGroup= new FormGroup({});
const obj3 =[{"address": {}, "taxType": {} }]
for (let x = 0; x < this.addressForm.value['address'].length; x++) { obj3[x]['address']=this.addressForm.value['address']; obj3[x]['taxType']=this.addressForm.value['address']}

  console.log('obj3=>', obj3);
}



}

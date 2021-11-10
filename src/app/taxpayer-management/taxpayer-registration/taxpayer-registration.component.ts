import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

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
  {value: 'region-0', viewValue: 'Kaskazini Unguja'},
  {value: 'region-1', viewValue: 'Kusini Pemba'},
  {value: 'region-2', viewValue: 'Kaskazini Pemba'},

];

export interface Districts {
  value: string;
  viewValue: string;
}


const DISTRICTS_DATA_ONE: Districts[] = [
  {value: 'district-0', viewValue: 'District 0'},
  {value: 'district-1', viewValue: 'District 1'},
  {value: 'district-2', viewValue: 'District 2'},
];

const DISTRICTS_DATA_TWO: Districts[] = [
  {value: 'district-3', viewValue: 'District 3'},
  {value: 'district-4', viewValue: 'District 4'},
  {value: 'district-5', viewValue: 'District 5'},
];

const DISTRICTS_DATA_THREE: Districts[] = [
  {value: 'district-6', viewValue: 'District 6'},
  {value: 'district-7', viewValue: 'District 7'},
  {value: 'district-8', viewValue: 'District 8'},

];

export interface Wards {
  value: string;
  viewValue: string;
}


const WARDS_DATA_ONE: Wards[] = [
  {value: 'ward-0', viewValue: 'Ward 0'},
  {value: 'ward-1', viewValue: 'Ward  1'},
  {value: 'ward-2', viewValue: 'Ward  2'},


];

const WARDS_DATA_TWO: Wards[] = [
  {value: 'ward-3', viewValue: 'Ward  3'},
  {value: 'ward-4', viewValue: 'Ward  4'},
  {value: 'ward-5', viewValue: 'Ward  5'},
];


const WARDS_DATA_THREE: Wards[] = [
  {value: 'ward-6', viewValue: 'Ward  6'},
  {value: 'ward-7', viewValue: 'Ward  7'},
  {value: 'ward-8', viewValue: 'Ward  8'},

];

@Component({
  selector: 'app-taxpayer-registration',
  templateUrl: './taxpayer-registration.component.html',
  styleUrls: ['./taxpayer-registration.component.css']
})

export class TaxpayerRegistrationComponent implements OnInit {

  selectedCar: number=0;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  /** list of regions */
  protected regions: Regions[] = REGIONS_DATA

  /** control for the selected region */
  // public regionCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public regionFilterCtrl: FormControl = new FormControl();

  /** list of regions filtered by search keyword */
  public filteredRegions: ReplaySubject<Regions[]> = new ReplaySubject<Regions[]>(1);


  selectedDay: string = '';
  showNida:Boolean=false;
  dataFetchedFromTRA:Boolean=false;
  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;

    console.log(this.selectedDay);
    
  }

  addUserForm: FormGroup  = new FormGroup({});
  verifyTINForm: FormGroup  = new FormGroup({});
  constructor(
    private formBuilder:FormBuilder,
    // private userService:UserService,
    // private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.addUserForm=this.formBuilder.group({
      'firstName': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'lastName': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'TIN': new FormControl('',[Validators.required,Validators.email]),
      'NIDAZan ID': new FormControl('',[Validators.required,Validators.minLength(10)]),

    })


    this.verifyTINForm=this.formBuilder.group({
      'TIN': new FormControl('',[Validators.required]),

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
   
  }

  createUser(){
    // console.log(this.addUserForm.value);
    // this.userService.addUser(this.addUserForm.value).subscribe(data=>{
    //   // console.log("user created");
    //   this._snackBar.open("user crated successfully")
      
    // },err=>{  
    //   this._snackBar.open("Un able to create user")
      
    // }
  //  )

  // console.log("TIN fetched from TRA");

  }

  verifyTIN(){
    // console.log(this.addUserForm.value);
    // this.userService.addUser(this.addUserForm.value).subscribe(data=>{
    //   // console.log("user created");
    //   this._snackBar.open("user crated successfully")
      
    // },err=>{  
    //   this._snackBar.open("Un able to create user")
      
    // }
  //  )

  console.log("TIN fetched from TRA");

  this.dataFetchedFromTRA=true

  }


  selectedFood1: string='';
  selectedTaxpayer: string='';
  selectedRegion: string='';
  selectedDistrict: string='';
  selectedWard: string='';


  foods = [
    {value: 'soleapropriate-0', viewValue: 'Soleapropriate'},
    {value: 'partner-1', viewValue: 'Partner'},
    {value: 'company-2', viewValue: 'Company'},
    {value: 'consultant-2', viewValue: 'Consultant'},
    {value: 'NGOs-2', viewValue: 'NGOs'}
  ];

  // public regions: Regions[] = REGIONS_DATA;


  // districts=[]
  districts: Districts[] = [];
  wards:Wards[]=[]
 
  onFoodSelection2() {
    console.log(this.selectedTaxpayer);

    if(this.selectedTaxpayer=='partner-0'){
          this.showNida=true
    }
    else {
      this.showNida=false
    }

  }

  onRegionSelection() {

    switch (this.selectedRegion) {
      case 'region-0':
          this.districts=DISTRICTS_DATA_ONE;
          break;
      case 'region-1':
          this.districts=DISTRICTS_DATA_TWO;
          break;
      case 'region-2':
          this.districts=DISTRICTS_DATA_THREE;
          break;
      default:
          this.districts=[];
          break;
  }

  }

  onDistrictSelection() {

    switch (this.selectedDistrict) {
        case 'district-0':
            this.wards=WARDS_DATA_ONE;
            break;
        case 'district-1':
            this.wards=WARDS_DATA_TWO;
            break;
        case 'district-2':
            this.wards=WARDS_DATA_THREE;
            break;
        default:
            this.wards=[];
            break;
    }

  }



 
  onKey(value:any) { 
    // this.selectedStates = this.search(value);
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

}

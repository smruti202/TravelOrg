import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { map, Observable, startWith } from 'rxjs';
import {SearchService} from '../../service/search.service'
import {MessageService} from '../../service/message.service';
interface Adult {
  value: string;
  viewValue: string;
}
interface Children {
  value: string;
  viewValue: string;
}
interface TravelClass {
  value: string;
  viewValue: string;
}

interface SearchInputParam{
  source: string;
  destnation: string;
  departDate: string;
  returningDate: string;
  adult: string;
  child: string;
  tripType: string;
}

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  
  sourcePointControler = new FormControl('');
  destnationPointControler = new FormControl('');
  options: string[] =[] ;
  adults: Adult[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
  ];

  childrens: Children[] = [
    {value: '0', viewValue: '0'},
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
  ];
  
  adultSelected = '1';
  childrenSelected = '0';

  sourceOptions: Observable<string[]>;
  destinationOptions : Observable<string[]>;
  tripSelection!: string; 
  departureDate!: string; 
  returnDate!: string;
  ishidden : boolean =true;
  inputParams : SearchInputParam = {  source : '',
                                      destnation:'',
                                      departDate: '',
                                      returningDate: '',
                                      adult: '',
                                      child: '',
                                      tripType: ''
                                    } ;
  constructor(
    private readonly searchService: SearchService,
    private readonly messageService : MessageService,
    private router : Router
  ){

    this.sourceOptions = this.sourcePointControler.valueChanges.pipe(     
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.destinationOptions = this.destnationPointControler.valueChanges.pipe(     
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngOnInit() {
   this.loadLoacation();
  }

  selectSourceOption(e: MatAutocompleteSelectedEvent) {
    this.inputParams.source = e.option.value;    
 }

 selectDestnationOption(e: MatAutocompleteSelectedEvent) {
  this.inputParams.destnation = e.option.value;    
}



radioButtonChanged(){
  
   if(this.tripSelection == 'one-way' && this.tripSelection!= undefined){
     this.ishidden = false;
     this.returnDate = '';
   }else{
     this.ishidden = true;
   }
}

clickEvent(){
 this.inputParams.adult= this.adultSelected;
 this.inputParams.child = this.childrenSelected;
 this.inputParams.tripType = this.tripSelection;
 this.inputParams.departDate = this.departureDate;
 this.inputParams.returningDate = this.returnDate;
 this.messageService.setScope(this.inputParams);
 if(this.inputParams.tripType == undefined && this.inputParams.departDate == undefined && this.inputParams.source =='' && this.inputParams.destnation == ''){
  alert("Please select necessary Field");
  return;
 }
 this.router.navigateByUrl('show-flight');
}


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private loadLoacation(){
    this.searchService.getOriginConnectionList().subscribe(result =>{
      if(result){
        this.options = result.airports.map(function(airport: {
          code: any; name: any; }){
          return '('+airport.code+ ') : ' +airport.name;
        })
      }
    });
  }

}

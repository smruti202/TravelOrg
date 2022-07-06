export class Search {
}

export interface Adult {
    value: string;
    viewValue: string;
  }
  export interface Children {
    value: string;
    viewValue: string;
  }
  export interface TravelClass {
    value: string;
    viewValue: string;
  }
  
  export interface SearchInputParam{
    source: string;
    destnation: string;
    departDate: string;
    returningDate: string;
    adult: string;
    child: string;
    tripType: string;
  }
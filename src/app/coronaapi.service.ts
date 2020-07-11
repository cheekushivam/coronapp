import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaapiService {

private country = "";
private _urlCases = "https://covid19.mathdro.id/api";
private _urlCasesDaily = "https://covid19.mathdro.id/api/daily";
private _urlCountries = "https://covid19.mathdro.id/api/countries";

passCountryToCard = new EventEmitter();
subsVar : Subscription;
subsVarChart : Subscription;

  constructor(private http: HttpClient) { }

  getCoronaCases(): Observable<any>
  {
   return this.country === "" || this.country == "Global" ? this.http.get(this._urlCases) : this.http.get(`${this._urlCases}/countries/${this.country}`)
  }

  getCoronaCasesDaily():Observable<any>
  {
    return this.http.get(this._urlCasesDaily);
  }

  getCountries(): Observable<any>
  {
    return this.http.get(this._urlCountries);
  }

  onSelectionOfCountry(countryInput)
  {
    //console.log("onSelectionOfCountry() called");
    this.country = countryInput === "Global" ? "" : countryInput; 
    this.passCountryToCard.emit(countryInput);
  }
}

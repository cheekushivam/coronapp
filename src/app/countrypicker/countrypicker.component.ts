import { Component, OnInit, Output } from '@angular/core';
import { CoronaapiService } from '../coronaapi.service';
import { EventEmitter} from '@angular/core';

@Component({
  selector: 'app-countrypicker',
  templateUrl: './countrypicker.component.html',
  styleUrls: ['./countrypicker.component.css']
})

export class CountrypickerComponent implements OnInit {

  public countries = [];
  public selectedValue ="";

  constructor(private coronaapi:CoronaapiService) { }

  sendCountry()
  {
    //console.log(`Value in sendCountry : ${this.selectedValue}`);
    this.coronaapi.onSelectionOfCountry(this.selectedValue);
  }

  ngOnInit(): void {

    this.coronaapi.getCountries().subscribe(data => {
      const { countries } = data;
      this.countries = countries.map(country => {
        return country['name'];
      });
    });
  }



}

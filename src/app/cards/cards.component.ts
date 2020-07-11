import { Component, OnInit } from '@angular/core';
import { CoronaapiService } from '../coronaapi.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {

  public coronaIndiaData = {};

  constructor(private coronaapi:CoronaapiService) { }


  getDataOnCountrySelection()
  {
    //console.log("Cards Country Selection Method Called");
    this.coronaapi.getCoronaCases().subscribe(data => {
      const {confirmed,recovered,deaths,lastUpdate} = data;

      this.coronaIndiaData = {
        confirmed : confirmed['value'],
        recovered: recovered['value'],
        deaths: deaths['value'],
        lastUpdate
      }

    });
  }

  ngOnInit(): void 
  {

        if(this.coronaapi.subsVar === undefined)
        {
          this.coronaapi.subsVar = this.coronaapi.passCountryToCard.subscribe(name => {
           // console.log("Value in Cards Comp : "+name);

            this.getDataOnCountrySelection();
          })
        }

        this.coronaapi.getCoronaCases().subscribe(data => {
          const {confirmed,recovered,deaths,lastUpdate} = data;

          this.coronaIndiaData = {
            confirmed : confirmed['value'],
            recovered: recovered['value'],
            deaths: deaths['value'],
            lastUpdate
          }

        });


  }

}

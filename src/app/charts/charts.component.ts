import { Component, OnInit } from '@angular/core';
import { CoronaapiService } from '../coronaapi.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private coronaapi: CoronaapiService) { }

  public dailyData = [];
  public lineChartLabels=[];
  public lineChartsDeaths=[];
  public lineChartsConfirmed=[];
  public visibilityBar = false;
  public visibilityLine = true;

  getDataOnCountrySelection(name) {
    
    console.log(` Charts getDataOnCountrySelection() Called with ${name} `);

    this.visibilityBar = true;
    this.visibilityLine = false;

    this.coronaapi.getCoronaCases().subscribe(data => {

      const {confirmed,recovered,deaths,lastUpdate} = data;

      var barChart = this.dailyData.length ==0 ? null : new Chart("barChart", {
        type: 'bar',
        data: {
          labels: ['Infected','Recovered','Deaths'],
          datasets: [{
            label:['People'],
            data: [confirmed['value'],recovered['value'],deaths['value']],
            backgroundColor:['red','green','blue'],
            borderWidth: 1
          }
        ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          title: {
            display: true,
            text: `Current state in ${name}`,
            fontSize:14
        }
        }
      });

    });
  }


  ngOnInit(): void {

    if(this.coronaapi.subsVarChart === undefined)
    {
      this.coronaapi.subsVarChart = this.coronaapi.passCountryToCard.subscribe(name => {
        console.log("Value in Charts Comp : "+name);
        console.log(" Method Called ");
        this.getDataOnCountrySelection(name);
      })
    }

    this.coronaapi.getCoronaCasesDaily().subscribe(data => {
      this.dailyData = data;

      this.lineChartLabels = this.dailyData.map(data => {
        return data['reportDate'];
      });

      this.lineChartsConfirmed = this.dailyData.map(data => {
        return data['confirmed']['total'];
      });

      this.lineChartsDeaths = this.dailyData.map(data => {
        return data['deaths']['total'];
      });

      
      var lineChart = this.dailyData.length ==0 ? null : new Chart("lineChart", {
        type: 'line',
        data: {
          labels: this.lineChartLabels,
          datasets: [{
            label: 'Infected',
            data: this.lineChartsConfirmed,
            borderColor:['#3333ff'],
            borderWidth: 2
          },
          {
            label: 'Deaths',
            data: this.lineChartsDeaths,
            borderColor:['#8B0000'],
            backgroundColor:'rgba(255,0,0,0.5)',
            borderWidth: 2
          }
        ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          title: {
            display: true,
            text: `Daily Data For Corona`,
            fontSize:14
        }
        }
      });
    });

  }

}

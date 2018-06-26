import { Component, OnInit } from '@angular/core';
import { TextAnalyticsService } from './text-analytics-service/text-analytics.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  sentiments : any;
  keyPhrases: any[] = [];

  type = 'bar';
  data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {     
        label: "My First dataset",       
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(160, 42, 192, 0.2)',
          'rgba(47, 42, 192, 0.2);'
      ],
      borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 2
      }
    ]
  };
  
  options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white",
        fontSize: 18
      }
    }
  };

  constructor(private textAnalyticsService: TextAnalyticsService) {
      
  }

  phrases:string[] = [];

  private extractSentimentValues(sentiments : any) {
    let data:any[] = [0, 0, 0, 0, 0, 0] ;
    
    for(var i = 1; i <= sentiments.length; i++) {
      for(var j = 0; j < sentiments.length; j++) {
        if(sentiments[j].id == i) {
          data[i-1] = sentiments[j].score;
          console.log("i is: ", i, " j is: ", j, " sentiments at j is ", sentiments[j].score);
        }
      }
      // console.log("score: ", sentiments[i].score);
      // data.push(sentiments[i].score);
    }

    return data;
  }

  ngOnInit() {
    let self = this;
    this.textAnalyticsService.returnSentiments()
      .then((data) => {
        this.sentiments = data;
        console.log("Sentiments: ", this.sentiments);
        this.data.datasets[0].data = this.extractSentimentValues(this.sentiments);

      });

    this.textAnalyticsService.returnKeyPhrases()
      .then((data) => {
        data.forEach(function(element) {
          self.keyPhrases.push(element);
        });
      });
      console.log("key Phrases", this.keyPhrases);
  }
  

  title = 'app';
}

import { Component, OnInit } from '@angular/core';
import { TextAnalyticsService } from './text-analytics-service/text-analytics.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  sentiments : any;
  keyPhrases: any;

  type = 'line';
  data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: [
      {     
        label: "My First dataset",       
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
      },
      {
        label: "My second dataset",
        data: [0.65, 0.59, 0.80, 0.81, 0.56, 0.55, 0.40, 0.50]
      }
    ]
  };
  
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private textAnalyticsService: TextAnalyticsService) {
      
  }

  private extractSentimentValues(sentiments : any) {
    var data:number[] = [] ;
    
    for(var i = 0; i < sentiments.length; i++) {
      console.log("score: ", sentiments[i].score);
      data.push(sentiments[i].score);
    }

    return data;
  }

  ngOnInit() {
    this.textAnalyticsService.returnSentiments()
      .then((data) => {
        this.sentiments = data;
        console.log("Sentiments: ", this.sentiments);
        this.data.datasets[0].data = this.extractSentimentValues(this.sentiments);

      });

    this.textAnalyticsService.returnKeyPhrases()
      .then((data) => {
        this.keyPhrases = data;
        console.log("phrases : ", this.keyPhrases);
      });
  }
  

  title = 'app';
}

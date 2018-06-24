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

  type = 'bar';
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
      borderWidth: 2
      }
    ]
  };
  
  options = {
    responsive: true,
    maintainAspectRatio: true,
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
    var data:any[] = [] ;
    
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
        for(var i = 0; i < data.length; i++) {
          this.phrases.push(data[i].keyPhrases[0])
          console.log("my array: ", this.phrases[i]);
        }
      });
  }
  

  title = 'app';
}

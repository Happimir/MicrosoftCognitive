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

  constructor(private textAnalyticsService: TextAnalyticsService) {
      
  }

  ngOnInit() {
    this.textAnalyticsService.returnSentiments()
      .then((data) => {
        this.sentiments = data;
        console.log("Sentiments: ", this.sentiments);
      });

    this.textAnalyticsService.returnKeyPhrases()
      .then((data) => {
        this.keyPhrases = data;
        console.log("phrases : ", this.keyPhrases);
      });
  }
  

  title = 'app';
}

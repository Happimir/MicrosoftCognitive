let fetch = require('node-fetch');

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class TextAnalyticsService {

  public keyPhrasesDocuments;

  private documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
    ]};

  returnSentiments() : Promise<any>{   
    var self = this;
    return new Promise(function(resolve, reject) {
        resolve(self.getSentiments());
    });
  }

  returnKeyPhrases() : Promise<any>{   
    var self = this;
    return new Promise(function(resolve, reject) {
        resolve(self.getKeyPhrases());
    });
  }

  getSentiments() {
    return fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', {
        method: 'POST',
        body: JSON.stringify(this.documents),
            headers: {
                'Content-Type' : 'application/json',
                'Ocp-Apim-Subscription-Key' : environment.azureKeyOne
            },
        })
    .then(res => res.json())
    .then(json => json.documents);
  }

  getKeyPhrases() {       
    return fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', {
          method: 'POST',
          body: JSON.stringify(this.documents),
              headers: {
                  'Content-Type' : 'application/json',
                  'Ocp-Apim-Subscription-Key' : environment.azureKeyOne
              },
          })
      .then(res => res.json())
      .then(json => json.documents);
  }
}

let fetch = require('node-fetch');

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class TextAnalyticsService {

  public keyPhrasesDocuments;

  public documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
    { 'id': '3', 'language': 'ru', 'text': 'Мне нравится сыр.' },
    { 'id': '4', 'language': 'en', 'text': 'Today I decided to rent an apartement with my friend, I think it will be an interesting experience.' },
    { 'id': '5', 'language': 'en', 'text': 'Recent events over at team Catalyst  seem to imply that we need to improve our process. A lot of issues can be solved if we had a firmer grasp of our code base.' },
    { 'id': '6', 'language': 'en', 'text': 'Today it is book club' }
]};

   public keyPhraseDocuments = {
       'documents': [
           {'id': '1', 'language': 'en', 'text': 'The stock market was down a further 300 points today due to the policies of our president, Donald J. Trump. Undoubtedly his tariff idea is a poor one, and will certainly hurt his voters far more than it might help them. However, there is large support for his policies amongst steel workers as it does enhance their position. We will have to wait and see what will appear. Some say it will be good, others say it will be bad. Nevertheless, it will be monumental for the future of America'},
           {'id': '2', 'language': 'en', 'text': 'The stock market was down a further 300 points today due to the policies of our president, Donald J. Trump. Undoubtedly his tariff idea is a poor one, and will certainly hurt his voters far more than it might help them. However, there is large support for his policies amongst steel workers as it does enhance their position. We will have to wait and see what will appear. Some say it will be good, others say it will be bad. Nevertheless, it will be monumental for the future of America'}
           
       ]
   };

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
          body: JSON.stringify(this.keyPhraseDocuments),
            headers: {
                'Content-Type' : 'application/json',
                'Ocp-Apim-Subscription-Key' : environment.azureKeyOne
            },
          })
      .then(res => res.json())
      .then(json => json.documents);
  }
}

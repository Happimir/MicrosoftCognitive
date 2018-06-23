const azureKeyOne = process.env.Azure_Text_Key1;
const azureKeyTwo = process.env.Azure_Text_Key2;

let fetch = require('node-fetch');

let documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
]};

fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', {
    method: 'POST',
    body: JSON.stringify(documents),
        headers: {
            'Content-Type' : 'application/json',
            'Ocp-Apim-Subscription-Key' : azureKeyOne
        },
    })
.then(res => res.json())
.then(json => console.log("sentiments: ", json.documents));

fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', {
    method: 'POST',
    body: JSON.stringify(documents),
        headers: {
            'Content-Type' : 'application/json',
            'Ocp-Apim-Subscription-Key' : azureKeyOne
        },
    })
.then(res => res.json())
.then(json => json.documents)
.then(documents => {
    for(var i = 0; i < documents.length; i++) {
        console.log(documents[i]);
    }
});
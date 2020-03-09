import { Corpus } from "tiny-tfidf-node";
const fs = require('fs');
const pdf = require('pdf-parse');

// documentation for this module can be found on https://www.npmjs.com/package/tiny-tfidf-node


export const getKeyWords = async (documents) => {
    var docTitles = []
    for(let doc of documents) {
        docTitles.push(doc)
    }
    const corpus = new Corpus(
      docTitles,
      [
        "This is test document number 1. It is quite a short document.",
        "This is test document 2. It is also quite short, and is a test.",
        "Test document number three is a bit different and is also a tiny bit longer."
      ]
    );
     
    // print top terms for document 3
    //console.log(corpus.getTopTermsForDocument("document1"));

    let dataBuffer = fs.readFileSync('/Users/colintam/Documents/Bits of Good/Nursing Home Regulations (State).pdf');
 
    pdf(dataBuffer).then(function(data) {
        // PDF text
        //console.log([data.text])
        const corpus2 = new Corpus(
          ['Nursing Home Regulations (State).pdf'],
          [data.text,]
        );
        console.log(corpus2.getTopTermsForDocument('Nursing Home Regulations (State).pdf'));
        
    });
    
  };
var documents = ["document1", "document2", "document3"];
getKeyWords(documents);
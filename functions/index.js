const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
const pdf = require('pdf-parse');
const { Corpus } = require('tiny-tfidf-node');

admin.initializeApp();

exports.generateMetadata = functions.storage.object().onFinalize(async (object) => {
    if (object.contentType === 'application/pdf') {
        let corpusName = 'corpus';
        let stoplistPath = 'stoplist.txt';

        let fileBucket = object.bucket;
        let filePath = object.name;
        let tempFilePath = path.join(os.tmpdir(), filePath);
        let tempStoplistPath = path.join(os.tmpdir(), stoplistPath);

        await admin.storage().bucket(fileBucket).file(filePath).download({ destination: tempFilePath });
        await admin.storage().bucket(fileBucket).file(stoplistPath).download({ destination: tempStoplistPath });

        let dataBuffer = fs.readFileSync(tempFilePath);
        let stopList = fs.readFileSync(tempStoplistPath).toString('utf-8');
        let stopArray = stopList.split('\n\n');
        
        console.log('stop', stopArray);

        pdf(dataBuffer).then(async (data) => {
            const corpus = new Corpus(
            [corpusName],
            [data.text,], false, stopArray,
            );
            let topTerms = corpus.getTopTermsForDocument(corpusName);
            await admin.database().ref('/testing').push({ 'filePath': topTerms[0][0] });
        });

        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(tempStoplistPath);
    }
});
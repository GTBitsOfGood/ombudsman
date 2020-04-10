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
        const corpusName = 'corpus';
        const stoplistPath = 'stoplist.txt';

        const fileBucket = object.bucket;
        const filePath = object.name;
        const splitArr = filePath.split('/');
        const folder = splitArr[0];
        const file = splitArr[1];

        const tempFilePath = path.join(os.tmpdir(), file);
        const tempStoplistPath = path.join(os.tmpdir(), stoplistPath);

        await admin.storage().bucket(fileBucket).file(filePath).download({ destination: tempFilePath });
        await admin.storage().bucket(fileBucket).file(stoplistPath).download({ destination: tempStoplistPath });

        const dataBuffer = fs.readFileSync(tempFilePath);
        const stopList = fs.readFileSync(tempStoplistPath).toString('utf-8');
        const stopArray = stopList.split('\n\n');
        
        await pdf(dataBuffer).then(async (data) => {
            const corpus = new Corpus([corpusName], [data.text,], false, stopArray);

            const topTerms = corpus.getTopTermsForDocument(corpusName);
            let topKeywords = [];
            for (let i = 0; i < 20; i++) {
                topKeywords.push(topTerms[i][0]);
            }

            const splitFile = file.slice(0, -4);
            const updateKey = `catArray.${folder}.${splitFile}.metadata`;
            await admin.firestore().collection('categories').doc('categories').update(updateKey, admin.firestore.FieldValue.arrayUnion(...topKeywords));
        });

        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(tempStoplistPath);
    }
});
const express = require('express');
const Clarifai = require('clarifai');
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route('/')
    .get(function (req, res) {
        const url = "https://samples.clarifai.com/puppy.jpeg";
        ClarifaiApp.models.predict(Clarifai.GENERAL_MODEL,url).then(
            function(response) {
                let message = "It's not a dog";
                console.log(response);
                let concepts = response.outputs[0].data.concepts;
                for(let i = 0; i < concepts.length; i++){
                    if(concepts[i].name === "dog"){
                        message = " Its a dog!";
                    }
                }
                res.render('index',{message: message, url: url});
            },
            function(err) {
                res.render('index',{message: 'Error!' });
            }
        );
    })
    .post(function (req,res) {
        console.log("here");
        let url = req.body.url;
        console.log(url);
        ClarifaiApp.models.predict(Clarifai.GENERAL_MODEL, url).then(
            function (response) {
                let message = "It's not a dog";
                console.log(response);
                let concepts = response.outputs[0].data.concepts;
                for (let i = 0; i < concepts.length; i++) {
                    if (concepts[i].name === "dog") {
                        message = " Its a dog!";
                    }
                    console.log("it worked");
                }
                res.render('index', {message: message, url: url});
            },
            function (err) {
                console.log(err);
                res.render('index', {message: 'Error!', url: url});
            });
    });





var port = process.env.PORT;
app.listen(port || 8000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
const ClarifaiApp = new Clarifai.App({
    apiKey: 'bee8fc08b703468793eaad8f09193b4f'
});

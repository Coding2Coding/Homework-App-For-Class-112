var emojiprediction1 = "";
var emojiprediction2 = "";

Webcam.set({
    width: 350, 
    height: 350, 
    image_format: 'png', 
    png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach(camera);

function takePicture() {
    Webcam.snap(function (image) {
        document.getElementById("picture").innerHTML = "<img src='"+image+"' id='clickedPicture'>";
    });
}

console.log("ml5 version: ", ml5.version);
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-T60qOtVM/model.json", modelLoaded);

function modelLoaded() {
    console.log("inside the modelLoaded function");
}

function speak() {
    var synthesis = window.speechSynthesis;
    var data1 = "The first emoji prediction is: "+emojiprediction1;
    var data2 = "The second emoji prediction is: "+emojiprediction2;
    var textToSpeech = new SpeechSynthesisUtterance(data1 + data2);
    synthesis.speak(textToSpeech);
}

function identifyEmoji() {
    var clickedPicture = document.getElementById("clickedPicture");
    classifier.classify(clickedPicture, results);
}

function results(error, result) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        emojiprediction1 = result[0].label;
        emojiprediction2 = result[1].label;
        document.getElementById("prediction1").innerHTML = emojiprediction1;
        document.getElementById("prediction2").innerHTML = emojiprediction2;
        speak();
        if(emojiprediction1 == "Peace") {
            document.getElementById("emoji1").innerHTML = "&#9996";
        }
        else if(emojiprediction1 == "Thumbs Up") {
            document.getElementById("emoji1").innerHTML = "&#128077";
        }
        else if(emojiprediction1 == "Good") {
            document.getElementById("emoji1").innerHTML = "&#128076";
        }
        else {
            document.getElementById("emoji1").innerHTML = "&#128400";
        }
        if(emojiprediction2 == "Peace") {
            document.getElementById("emoji2").innerHTML = "&#9996";
        }
        else if(emojiprediction2 == "Thumbs Up") {
            document.getElementById("emoji2").innerHTML = "&#128077";
        }
        else if(emojiprediction2 == "Good") {
            document.getElementById("emoji2").innerHTML = "&#128076";
        }
        else {
            document.getElementById("emoji2").innerHTML = "&#128400";
        }
    }
}
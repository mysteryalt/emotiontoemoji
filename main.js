//https://teachablemachine.withgoogle.com/models/uHKc4DAY3/

prediction_1 = ""
prediction_2 = ""
Webcam.set(
    {
        width: 340,
        height:290,
        image_format: 'png',
        png_quality: 90
    }
);

camera = document.getElementById("camera")
Webcam.attach('#camera');

function click_picture() {
Webcam.snap(function(data_uri)
{
 document.getElementById("result").innerHTML = '<img id="picture" src="'+ data_uri +'">';
}
);
}

console.log("ml5version: " , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uHKc4DAY3/model.json' , modelLoaded );

function modelLoaded() {
console.log("Model loaded.")
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('picture');
    classifier.classify(img, gotResult);
}

function gotResult(error , results) {
if(error) {
console.error(error);
}
else {
console.log(results);
document.getElementById("result_emotion_name1").innerHTML = results[0].label;
document.getElementById("result_emotion_name2").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;

if(results[0].label == "Happy") {
    document.getElementById("emoji1").innerHTML = "&#128512";
    }
    if(results[0].label == "Angry") {
        document.getElementById("emoji1").innerHTML = "&#128545"
    
    }
    if(results[0].label == "Surprised") {
        document.getElementById("emoji1").innerHTML = "&#128562"
    }
    if(results[0].label == "Sad") {
        document.getElementById("emoji1").innerHTML = "&#128553"
    }
    
    
    if(results[1].label == "Happy") {
        document.getElementById("emoji2").innerHTML = "&#128512";
        }
        if(results[1].label == "Angry") {
            document.getElementById("emoji2").innerHTML = "&#128545"
        
        }
        if(results[1].label == "Surprised") {
            document.getElementById("emoji2").innerHTML = "&#128562"
        }
        if(results[1].label == "Sad") {
            document.getElementById("emoji2").innerHTML = "&#128553"
        }

speak()
}

}
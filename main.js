var status = "";
var object = [];


function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = objectDetector("cocossd");
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    getValue = document.getElementById("object_name").value();
}

function modelLoaded(){
    console.log("modelLoaded");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(var i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == getValue){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status: Object Mentioned Found";

                var synth = window.speechSynthesis;
                speak_data = 'Object Mentioned Found';
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);

            }

            else{
                document.getElementById("status").innerHTML = "Object Mentioned Not Found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        object = results;
    }
}
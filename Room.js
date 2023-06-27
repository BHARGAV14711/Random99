img = "";
Status = "";
objects = [];

function preload() {
    img = loadImage("Room.jpeg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (Status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status : Object Detected";

            fill('red');
            percent = floor(objects[i].confidence * 100);
            X_position = floor(objects[i].x );
            Y_position = floor(objects[i].y );

            text(objects[i].label + " " + percent + "%  X= " + X_position+ " Y= " + Y_position+ 15,objects[i].x +15,objects[i].y+15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    Status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
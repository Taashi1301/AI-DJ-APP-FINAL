song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore=0;
rightWristScore=0;
function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}

function draw(){
image(video, 0, 0, 600, 500);
posenet=ml5.poseNet(video, modelLoaded);
posenet.on("pose", getPoses);
fill("#ff0000");
stroke("#ff0000");
if (leftWristScore>0.2){
    circle(leftWristX,leftWristY,20);
    numberedleftwristY=Number(leftWristY);
    decimalsremovedleftwristY=floor(numberedleftwristY);
    volume=decimalsremovedleftwristY/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    console.log(volume);
    song.setVolume(volume);
}
if (rightWristScore>0.2){
    fill(255,0,0);
    stroke(0,255,0);
    circle(rightWristX, rightWristY, 20);
    if (rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="speed = 0.5X";
        song.rate(0.5);
    }
    if (rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="speed = 1X";
        song.rate(1);
    }
    if (rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="speed = 1.5X";
        song.rate(1.5);
    }
    if (rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="speed = 2X";
        song.rate(2);
    }
    if (rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="speed = 2.5X";
        song.rate(2.5);
    }
}
}

function getPoses(results){
    if (results.length>0){
        console.log(results);
        leftWristScore=results[0].pose.keypoints[9].score;
        rightWristScore=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Left wrist X = "+leftWristX);
        console.log("Left wrist Y = "+leftWristY);
        console.log("Right wrist X = "+rightWristX);
        console.log("Right wrist Y = "+rightWristY);
    }
}

function modelLoaded(){
    console.log("Working");
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
function stop(){
    song.stop();
}
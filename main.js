song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1_status="";
song2_status="";
score_rightWrist=0;
score_leftWrist=0;

function play(){
 song.play();
 song.setVolume(1);
 song.rate(1);   
}
function preload(){
    song1= loadSound('music.mp3');
    song2= loadSound('music2.mp3');

}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(300,200);

    video=createCapture(VIDEO);
   video.hide();

   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
     console.log(results);
     score_rightWrist=results[0].pose.keypoints[10].score;
     score_leftWrist=results[0].pose.keypoints[10].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y; 
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}

function modelLoaded(){
    console.log('poseNet is initialized.') 
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    fill("darkcyan");
    stroke("darkcyan");
      if(score_rightWrist>0.02){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("Song").innerHTML="playing harry potter theme song";
        }
      }

      if(score_leftWrist>0.02){
        console.log("leftWristX="+leftWristX+" leftWristY="+leftWristY);
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("Song").innerHTML="playing  peter pan theme song";
        }
      }

}

var pdx = 0;
var pdy = 0;
var pey = 0;
var pex = 0;
var som = "";
var ve = 0;
var vd = 0;
function preload() {
    som = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, carregado);
    posenet.on("pose", resultados);
}
function carregado() {
    console.log("posenet carregado");
}
function resultados(results) {
    if (results.length > 0) {
        console.log(results);
        pex = results[0].pose.leftWrist.x;
        pey = results[0].pose.leftWrist.y;
        pdx = results[0].pose.rightWrist.x;
        pdy = results[0].pose.rightWrist.y;
        console.log("pulso esquerdo em x: " + pex + " e y: " + pey + " pulso direito em x: " + pdx + " e y: " + pdy)
        ve = results[0].pose.keypoints[9].score;
        vd = results[0].pose.keypoints[10].score;


    }
}
function draw() {
    image(video, 0, 0, 500, 400);
    fill("#FF1493");
    stroke("#F0F8FF");
    if (ve > 0.2) {
        circle(pex, pey, 20);
        npey = floor(Number(pey));
        volume = npey / 400;
        document.getElementById("volume").innerHTML = "Volume= " + volume;
        som.setVolume(volume);
    }
    if (vd > 0.2) {
        circle(pdx, pdy, 20);
        if(pdy>0 && pdy<=100){
            document.getElementById("speed").innerHTML="velocidade= 0.75";
            som.rate(0.75);
        }
       else if (pdy>100 && pdy<=200){
            document.getElementById("speed").innerHTML="velocidade= 1.50";
            som.rate(1.50);
        }
        else if (pdy>200 && pdy<=300){
            document.getElementById("speed").innerHTML="velocidade= 2.00";
            som.rate(2.00);
        }
        else if (pdy>300 && pdy<=400){
            document.getElementById("speed").innerHTML="velocidade= 2.50";
            som.rate(2.50);
        }  
    }
}
function play() {
    som.play();
    som.setVolume(0.5);
    som.rate(2.5);
}
function pausar() {
    som.pause();
}

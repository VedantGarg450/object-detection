var objects= []
var status= ""
var img= ""
function preload(){
    img= loadImage("img 2.jpeg")
}
function setup(){
    canvas= createCanvas(700, 700)
    canvas.center()
    objectdetector= ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML= "Status: Detecting Objects"
}
function modelLoaded(){
    console.log("Model Loaded Successfully")
    status= true
    objectdetector.detect(img, gotResult)
}
function gotResult(error, result){
    if (error) {
        console.log(error)
    }
    else{
        console.log(result)
        objects= result
    }
}
function draw(){
    image(img, 0, 0, 700, 700)
    if (status!="") {
         for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML= "Status: Detected Objects"
            fill("orange")    
            textSize(50)
            percentage= Math.floor(objects[i].confidence*100)   
            text(objects[i].label+" "+percentage+"%", objects[i].x, objects[i].y);
            noFill()
            stroke("orange")
            strokeWeight(2)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         }

    }
}
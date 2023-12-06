


function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
}

function clearCanvas(){

    background("white")
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {

    // Establece el grosor del stroke (trazo) a 13
    strokeWeight(13);
    // establece el color del stroke (trazo) a negro
    stroke(0);
    // si el mouse esta presionado, dibuja una linea entre la posicion previa y la actual del mouse
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);


}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label;

    document.getElementById('confidence').innerHTML = 'confianza: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
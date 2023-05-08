function setup() {
  fileInput = createFileInput(handleToPaste).hide().elt
  
  createCanvas(400, 400);
  frameRate(60);
  noSmooth();
  colorMode(RGB, 1);
  
  buffersInit(Vec.fromList([5, 5]));
}

let camPos = Vec.fromList([0, 0]);
let camFOV = 1;

function draw() {
  translate(width / 2, height / 2); 
  
  translate(camPos.ind(0), camPos.ind(1));
  scale(camFOV, camFOV);
  strokeWeight(1/camFOV);
  
  place();
  render();
  if (running)
    steps();
}

function mouseWheel(event) {
  const newFOV = camFOV - event.delta / 1000;
  
  if (newFOV < 0)
    return;
    
  camFOV = newFOV;
  camPos.addVec(MousePos()
                .mulNum(event.delta / 1000));
}
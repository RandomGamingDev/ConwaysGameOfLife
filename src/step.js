function step() {
  const ncurBuf = Number(curBuf);
  const oNcurBuf = Number(!curBuf);
  
  const buffer = buffers[ncurBuf];
  const oBuffer = buffers[oNcurBuf];
  
  const stepShader = stepShaders[ncurBuf];
  
  buffer.shader(stepShader);
  stepShader.setUniform("tex0", oBuffer);
  stepShader.setUniform("aliveCellColor", aliveCellColor);
  stepShader.setUniform("deadCellColor", deadCellColor);
  stepShader.setUniform("screenSize", BufferDim().list);
  push();
  {
    buffer.noStroke();
    buffer.rect(0, 0, buffer.width, buffer.height); 
  }
  pop();
  buffer.resetShader();
  
  curBuf = !curBuf;
}

function steps() {
  nextRunTimer += runSpeed;
  if (nextRunTimer < 1)
      return;
      
  for (let i = 0; i < Math.floor(nextRunTimer); i++)
    step();
  
  nextRunTimer %= 1;
}

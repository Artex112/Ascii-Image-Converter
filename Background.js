const s2 = ( pp1 ) => {
  // Ñ@#W$9876543210?!abc;:+=-,._
  const density = "Ñ@#W$9876543210?!abc:+=-";
  const cummy = "cum"; // i love cum!

  const updateSub = 5; // because im a bottom submissive pussy. i made a literal workaround uwu
  const updateScale = 2; // scales the update frequency
  let fadeOutSpeed = 15; // the higher the number the faster fade out happens but also is less smooth
  let cum = []; // the world is composed of cum
  let w; // width of the grid
  let h; // height of the grid
  let x; // x var
  let y; // y var
  const wScale = 0.5; // scales the width, used for fine tuning
  let letters = []; // letter grid array
  let randcord = []; // random offset array
  let timeout = []; // random timeout
  let char = []; // current random character array
  let updateFreq = []; // array holding update values
  let timer = []; // just a timer array, pls dont touch
  let step = []; // current amount of steps array

  pp1.setup = function() {
    canv = pp1.createCanvas(pp1.windowWidth,pp1.windowHeight - 8)
    canv.style("z-index", "-2");
    pp1.background(0);
    gridSetup()
    pp1.frameRate(60);
  }
  function gridSetup(){ // Setup the grid and define needed arrays
    w = pp1.width / 32;
    h = pp1.height / 32;
    for (let x = 0; x < w / wScale; x++ ) {
      cum[x] = []
      char[x] = []
      timer[x] = []
      updateFreq[x] = [];
      timeout[x] = [];
      step[x] = [];
      randcord[x] = [];
      letters[x] = [];
      for (let y = 0; y < h / wScale; y++ ) {
        cum[x][y] = 0; // cum!
        char[x][y] = pp1.random(1,density.length);
        timer[x][y] = 0
        updateFreq[x][y] = pp1.floor(pp1.random(1, 5));
        timeout[x][y] = pp1.floor(pp1.random(w + 3,w + 15)); // the timeout, makes row wait few updates before reapperaing
        step[x][y] = 0;
        randcord[x][y] = pp1.floor(pp1.random(0,w)); // choose random number for offset
        letters[x][y] = 0;
        if (x >= 0) {
          updateFreq[x][y] = updateFreq[0][y];
          randcord[x][y] = randcord[0][y];
          timeout[x][y] = timeout[0][y]; // make the row have same offset amount
        }
        step[x][y] = randcord[x][y] + step[x][y] //make the step equal to the offset
      }
    }
  }

  function gridUpdate() {
    w = pp1.width / 32;
    h = pp1.height / 32;
    for(let x = 0; x < w / wScale; x++){
      for (let y = 0; y < h / wScale; y++ ) {
        if (timer[x][y] == (updateFreq[x][y] * updateScale) - updateSub) { //timer, this makes everything update, the clock of existence
          timer[x][y] = 0;
        }
        timer[x][y] += 1;

        letters[x][y] -= fadeOutSpeed; // make letters fade out
        letters[x][y] = pp1.constrain(letters[x][y], 0, 255); // limit the array to max color values 0-255
        pp1.fill(letters[x][y]);

        if (timer[x][y] == (updateFreq[x][y] * updateScale) - updateSub) { // This piece of code makes the letters go! i forgot why its -1 bruh
            step[x][y] += 1;
            cum[x][y] += 1;
            if (cum[x][y] >= 3) {
              cum[x][y] = 0;
            }
          if (step[x][y] > w + 2) { // this makes the rows go back to start when offscreen
            if (step[x][y] == timeout[x][y]) {
              step[x][y] = 0;
            }
          }
          if (x == step[x][y] && y == y) { // this is the visual part of making the letters go!
            letters[x][y] = 255;
            pp1.fill(letters[x][y]);
            if (nfile == "cum.jpg" ) {
                char[x][y] = cum[x][y]; // if you randomly reaarenged all particles in your body
                // there is a small chance you will turn into cum
            }
            else {
              char[x][y] = pp1.random(1,density.length) // randomising characters each update
            }
          }

        else if (y != y) { //making all characters that are not selected or during fade out black
          pp1.fill(0);
        }

      }
        pp1.textSize(w * 0.45);
        if (nfile == "cum.jpg" ) {
          pp1.text(cummy.charAt(char[x][y]), x * w * wScale + w * 0, y * h + h * 0); //this makes cum
        }
        else {
          pp1.text(density.charAt(char[x][y]), x * w * wScale + w * 0, y * h + h * 0); //this makes text
        }
      }
    }
  }

  pp1.draw = function() { // this is being updated each frame (60 fps unless you change it with frameRate())
    pp1.background(0);
    gridUpdate()
  }
}
new p5(s2,"background")

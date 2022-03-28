// Ñ@#W$9876543210?!abc;:+=-,._
const density = "Ñ@#W$9876543210?!abc:+=-._ ";

let swatch = true;
let pickle;
let button;
let ifile;
let res;
let dit;
let p;
let p1;

function setup() {
  createCanvas(600,600);
  background(0);
  makeButton("Switch Modes", 10, 620, 1.5, toggle);
  makeButton("Update", 170, 620, 1.5, lulu);
  makeInputFile();
  makeSlider();
  makeSlider1();
  pickle = loadImage("img/artex2.png");
  // image(pickle, 0, 0, width, height);
}
function makeButton(n, x, y, s, f) { //name , x cord, y cord, size, function
  button = createButton(n);
  button.position(x, y);
  button.size(100 * s,20 * s);
  button.style("font-size", "20px");
  button.mousePressed(f);
}
function makeInputFile() {
  input = createFileInput(handleFile);
  input.position(10, 660);
}
function handleFile(file) {
  if (file.type === "image") {
    img = createImg(file.data, "");
    ifile = file.data;
    img.hide();
  }
}
function makeSlider() {
  slider = createSlider(8,256,res,8)
  slider.position(10,690)
  slider.value(64)
  p = createP(res);
  p.position(145,677);
  p.style("font-size", "16px")
}
function makeSlider1() {
  slider1 = createSlider(8,128,dit,8)
  slider1.position(10,720)
  slider1.value(64)
  p1 = createP(dit);
  p1.position(145,705);
  p1.style("font-size", "16px")
}
function pixelIndex(i, j) {
  return (i + j * pickle.width) * 4;
}
function asciiText() {
  pickle.resize(res,0);
  let w = width / pickle.width;
  let h = width / pickle.height;
  pickle.loadPixels();
  for (let j = 0; j < pickle.height; j++) {
    let row = "";
    for (let i = 0; i < pickle.width; i++) {
      // const pixelIndex = (i + j * pickle.width) * 4;
      var pix = pickle.pixels[pixelIndex(i,j)];
      var r = red(pix)
      var g = green(pix)
      var b = blue(pix)
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));

      const c = density.charAt(charIndex);
      if (c == '') row += '&nbsp;'
      else row += c;
    }
    vid = createDiv(row);
    vid.position(30,(j * h * 0.9))
    // console.log(row)
  }
}
function asciiImage() {
  pickle.resize(res,0);
  let w = width / pickle.width;
  let h = width / pickle.height;
  pickle.loadPixels();
  for (let j = 0; j < pickle.height - 1; j++) {
    for (let i = 1; i < pickle.width - 1; i++) {
      const len = density.length;
      var r = pickle.pixels[pixelIndex(i,j) + 0];
      var g = pickle.pixels[pixelIndex(i,j) + 1];
      var b = pickle.pixels[pixelIndex(i,j) + 2];
      nR = round(len * r )
      nG = round(len * g )
      nB = round(len * b ) //* (255 / len);
      erR = r - nR;
      erG = g - nG;
      erB = b - nB;
      //quant
      fact = dit
        index = pixelIndex(i+1, j)
        rr = pickle.pixels[index + 0];
        gg = pickle.pixels[index + 1];
        bb = pickle.pixels[index + 2];
        rr = rr + erR * 7/fact;
        gg = gg + erG * 7/fact;
        bb = bb + erB * 7/fact;
        pickle.pixels[index + 0] = rr;
        pickle.pixels[index + 1] = gg;
        pickle.pixels[index + 2] = bb;

        index = pixelIndex(i-1, j+1)
        rr = pickle.pixels[index + 0];
        gg = pickle.pixels[index + 1];
        bb = pickle.pixels[index + 2];
        rr = rr + erR * 3/fact;
        gg = gg + erG * 3/fact;
        bb = bb + erB * 3/fact;
        pickle.pixels[index + 0] = rr;
        pickle.pixels[index + 1] = gg;
        pickle.pixels[index + 2] = bb;

        index = pixelIndex(i, j+1)
        rr = pickle.pixels[index + 0];
        gg = pickle.pixels[index + 1];
        bb = pickle.pixels[index + 2];
        rr = rr + erR * 5/fact;
        gg = gg + erG * 5/fact;
        bb = bb + erB * 5/fact;
        pickle.pixels[index + 0] = rr;
        pickle.pixels[index + 1] = gg;
        pickle.pixels[index + 2] = bb;

        index = pixelIndex(i+1, j+1)
        rr = pickle.pixels[index + 0];
        gg = pickle.pixels[index + 1];
        bb = pickle.pixels[index + 2];
        rr = rr + erR * 1/fact;
        gg = gg + erG * 1/fact;
        bb = bb + erB * 1/fact;
        pickle.pixels[index + 0] = rr;
        pickle.pixels[index + 1] = gg;
        pickle.pixels[index + 2] = bb;

        avg = (pickle.pixels[index + 0] + pickle.pixels[index + 1] + pickle.pixels[index + 2]) / 3;
      const charIndex =  map(avg,0,255,len,0)

      noStroke();
      fill(255);
      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 1);
    }
  }
  pickle.updatePixels();
}
function toggle() {
  if (swatch == true) {
    removeElements();
    makeButton("Switch Modes", 10, 620, 1.5, toggle);
    makeButton("Update", 170, 620, 1.5, lulu);
    makeInputFile();
    makeSlider();
    makeSlider1();
    asciiImage();
    pickle = loadImage(ifile);
    swatch = false;
    // console.log(swatch);
  }
  else if(swatch == false) {
    background(0)
    asciiText();
    swatch = true;
    // console.log(swatch);
  }
}
function lulu() {
  if (swatch == true) {
    removeElements();
    makeButton("Switch Modes", 10, 620, 1.5, toggle);
    makeButton("Update", 170, 620, 1.5, lulu);
    makeInputFile();
    makeSlider();
    makeSlider1();
    asciiText();
    pickle = loadImage(ifile); //i file? more like pedophile hahaha.. ha.
    pickle.updatePixels();
    // console.log("help my life has lost all meaning i want to kill myself my sanity is no more.")
  }
  else if(swatch == false) {
    background(0)
    asciiImage();
    pickle = loadImage(ifile);
  }
}
function draw() {
  res = slider.value()
  dit = slider1.value()
  p.html(res)
  p1.html(dit)
}

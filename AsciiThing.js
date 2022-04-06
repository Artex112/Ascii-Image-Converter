// Ñ@#W$9876543210?!abc;:+=-,._
const density = "Ñ@#W$9876543210?!abc:+=-._ ";

let swatch = true;
let pickle;
let button;
let ifile;
let nfile;
let divholder;
let row;
let res;
let dit;
let p;
let p1;
let de;
let de1;
let sv;
let pg;
let copyText = "";
let copy = true;
let ps;
const textPaste = () => copy;

const s1 = ( pp ) => {

pp.setup = function() {
  can = pp.createCanvas(600,600);
  can.parent("content");
  pg = pp.createGraphics(2048,2048);
  sv = "Copy to Clipboard";
  pp.background(0);
  makeButton("Switch Modes", 165, 620, "absolute", 1.5, "20", 100, toggle, "content");
  makeButton("Update", 335, 620, "absolute", 1.5, "20", 100, lulu, "content");
  makeButton(sv, 385, 660, "absolute", 1, "12", 115, saveButton, "content");
  makeInputFile();
  makeSlider();
  makeSlider1();
  pickle = pp.loadImage("img/illegal.png");
  //background setup
  pp.frameRate(60);
  // image(pickle, 0, 0, width, height);
}
function makeButton(n, x, y, t, s, fs, wi, f, p) { //name , x cord, y cord, pos type,
  // size, font size, function, parent
  button = pp.createButton(n);
  button.position(x, y, t);
  button.size(wi * s,20 * s);
  button.style("font-size", fs);;
  button.mousePressed(f);
  button.parent(p);
}
function makeInputFile() {
  input = pp.createFileInput(handleFile);
  input.position(165, 660);
  input.parent("content");
}
 function handleFile(file) {
  if (file.type === "image") {
    img = pp.createImg(file.data, "");
    ifile = file.data;
    nfile = file.name;
    img.hide();
  }
}
function loadImg(){
  if (ifile == null) {
    pickle = pp.loadImage("img/illegal.png")
  }
  else {
  pickle = pp.loadImage(ifile);
  }
}
function makeSlider() {
  slider = pp.createSlider(8,256,res,8)
  slider.position(165,705)
  slider.value(64)
  slider.style("width","200px")
  slider.parent("content");
  p = pp.createP(res);
  p.position(208 + 165,691);
  p.style("font-size", "16px")
  p.parent("content");
  de = pp.createP("Resolution");
  de.position(170,675);
  de.style("font-size", "16px")
  de.parent("content");
}
function makeSlider1() {
  slider1 = pp.createSlider(8,128,dit,8)
  slider1.position(165,750)
  slider1.value(64)
  slider1.style("width","200px")
  slider1.parent("content");
  p1 = pp.createP(dit);
  p1.position(208 + 165,736);
  p1.style("font-size", "16px")
  p1.parent("content");
  de1 = pp.createP("Dithering");
  de1.position(170,720);
  de1.style("font-size", "16px")
  de1.parent("content");
}
function saveButton(){
  if (swatch == false) {
    saveImage()
    sv = "Save image as"

  }
  else if (swatch == true) {
    copyClipboard()
    sv = "Copy to Clipboard"
  }
}
function copyClipboard() {
  navigator.clipboard.writeText(copyText);
}
function saveImage() {
  if (pg != undefined) {
  pg.save("AsciiConverted.jpg")
  }
}
function pixelIndex(i, j) {
  return (i + j * pickle.width) * 4;
}
function asciiText() {
  pickle.resize(res,0);
  let w = pp.width / pickle.width;
  let h = pp.width / pickle.height;
  pickle.loadPixels();
  for (let j = 0; j < pickle.height - 1; j++) {
    row = "";
    for (let i = 1; i < pickle.width - 1; i++) {
      const len = density.length;
      var r = pickle.pixels[pixelIndex(i,j) + 0];
      var g = pickle.pixels[pixelIndex(i,j) + 1];
      var b = pickle.pixels[pixelIndex(i,j) + 2];
      nR = pp.round(len * r )
      nG = pp.round(len * g )
      nB = pp.round(len * b ) //* (255 / len);
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
    const charIndex =  pp.map(avg,0,255,len,0)

      const c = density.charAt(charIndex);
      if (c == '') {
        row += '&nbsp;'
      }
      else row += c;
      if (c == '') {
        copyText += " "
        copyText += c
      }
      else copyText += c;
    }
    copyText += "\n"
    div = pp.createDiv(row);
    div.parent("divholder");
    div.position(715,(j * h * 0.95))
    div.style("font-size", w)
    // console.log(row)
  }
  pickle.updatePixels();
}
function asciiImage() {
  pickle.resize(res,0);
  let w = pp.width / pickle.width;
  let h = pp.width / pickle.height;
  pickle.loadPixels();
  for (let j = 0; j < pickle.height - 1; j++) {
    for (let i = 1; i < pickle.width - 1; i++) {
      const len = density.length;
      var r = pickle.pixels[pixelIndex(i,j) + 0];
      var g = pickle.pixels[pixelIndex(i,j) + 1];
      var b = pickle.pixels[pixelIndex(i,j) + 2];
      nR = pp.round(len * r )
      nG = pp.round(len * g )
      nB = pp.round(len * b ) //* (255 / len);
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
      const charIndex =  pp.map(avg,0,255,len,0)

      pg.noStroke();
      pg.fill(255);
      pg.textSize(pg.width/pickle.width);
      pg.textAlign(pp.CENTER, pp.CENTER);
      pg.text(density.charAt(charIndex), i * (pg.width/pickle.width) + (pg.width/pickle.width) * 0.5, j * (pg.height/pickle.height) + (pg.height/pickle.height) * 1);

      pp.noStroke();
      pp.fill(255);
      pp.textSize(w);
      pp.textAlign(pp.CENTER, pp.CENTER);
      pp.text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 1);
    }
  }
  pickle.updatePixels();
}
function toggle() {
  if (swatch == true) {
    if (divholder != undefined) {
      divholder.remove();
    }

    divholder = pp.createDiv("");
    divholder.id("divholder")
    sv = "Save image as"
    copyText = ""
    asciiImage();
    loadImg();
    swatch = false;
    // console.log(swatch);
  }
  else if(swatch == false) {
    pp.background(0)
    sv = "Copy to Clipboard"
    asciiText();
    swatch = true;
    // console.log(swatch);
  }
}
function lulu() {
  if (swatch == true) {
    if (divholder != undefined) {
      divholder.remove()
    }
    divholder = pp.createDiv("");
    divholder.id("divholder")
    pg.clear()
    sv = "Copy to Clipboard"
    copyText = ""
    asciiText();
    loadImg();
    // console.log("help my life has lost all meaning i want to kill myself my sanity is no more.")
  }
  else if(swatch == false) {
    pp.background(0)
    pg.clear()
    sv = "Save image as"
    asciiImage();
    loadImg();
  }
}
pp.draw = function () {
  res = slider.value()
  dit = slider1.value()
  p.html(res)
  p1.html(dit)
  button.html(sv)
  //background draw

}
}
new p5(s1, "content")

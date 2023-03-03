x = 0;
y = 0;

screenWidth = 0;
screenHeight = 0;

speakData = "";

apple = "";

toNumber = "";

drawApple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload()
{
  apple = loadImage("https://images.vexels.com/media/users/3/131878/isolated/preview/384b201e3c4076950837a47f417fcddf-icone-de-maca-vermelha.png");
}

function start()
{
  document.getElementById("status").innerHTML = "O sistema está ouvindo. Por favor, fale.";  
  recognition.start();
} 
 
recognition.onresult = function(event) 
{

  console.log(event); 

  content = event.results[0][0].transcript;

  toNumber = Number(content);

  if (Number.isInteger(toNumber))
  {
    document.getElementById("status").innerHTML = "A Maçã Começou a ser Desenhada";
    
    drawApple = "set";
  }
  else
  {
    document.getElementById("status").innerHTML = "A Número não foi Reconhecido";
  }

  document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content; 

}

function setup() 
{
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  
  canvas = createCanvas(screenWidth, screenHeight - 150);
}

function draw() {
  if(drawApple == "set")
  {
    for (var i = 1; i <= toNumber; i++)
    {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = toNumber + " maçãs desenhadas";
    drawApple = "";

    speakData = toNumber;

    speak();
  }
}

function speak()
{
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speakData);

    synth.speak(utterThis);

    speakData = "";
}

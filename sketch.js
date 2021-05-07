var dog,sadDog,happyDog;
var feedButton,addButton;
var foodObj;
var fedTime,lastFed;
var database;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj=new Food();

  feedButton=createButton("feed");
  feedButton.position(100,70);
  feedButton.mousePressed(feedDog);

  addButton=createButton("add");
  addButton.position(100,90);
  addButton.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Fed :"+lastFed%12 +"PM",350,30);
  }
  else if(lastFed==0){
    
  
    text("last Fed ;12 AM",350,30);

  }
  else{
    text("last Fed :"+lastFed + "AM",350,30);
  }


  foodObj.display();
  drawSprites();
}


//function to read food Stock



//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);

  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
//Create variables here
var dog,happydog,database,foodS,foodStoke;
var dogimg, happydog;
var feed, addFood;
var fedTime, lastFed,foodObj ;
function preload()
{
  
  dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(500, 500);
  foodObj = new Food();
  dog = createSprite(250,250);
  dog.addImage(dogimg);
  dog.scale = 0.2

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
  feed = createButton("feed the dog");
  feed.position(500, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(700, 95);
  addFood.mousePressed(addFoods);
  
  
}


function draw() {  
  background("blue");

  foodObj.display();
    
  fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  drawSprites();
  //add styles here

}
 
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happydog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}




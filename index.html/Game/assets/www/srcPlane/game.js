
//   important stuff

		    var canvasBg = document.getElementById('canvasBg');			//make background canvas
			var ctxBg = canvasBg.getContext('2d');
			var canvasJet = document.getElementById('canvasJet');				//make jet canvas
			var ctxJet = canvasJet.getContext('2d');
			var canvasEnemy = document.getElementById('canvasEnemy'); // make eneme
			var ctxEnemy = canvasEnemy.getContext('2d');
			var canvasHUD = document.getElementById('canvasHUD');		//canvas for hight score
			var ctxHUD = canvasHUD.getContext('2d');
			
			
			ctxHUD.fillStyle = "hsla(0, 0%, 0%, 0.5)"; 		//some color
			ctxHUD.font = "bold 20px Arial";  // font style
			
			
			var requestAnimFrame =  window.requestAnimationFrame ||    //tells the browser that you wish to perform an animation and requests
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame;
						
			jet1 = new Jet();																			// create variable to object for jet
			var btnPlay = new Button(265, 535, 220, 335);							//button  that allow to click only the grew button  /canvas button/
			var gameWidth = canvasBg.width;											//get the backgroun canvas windth into "gameWidth"
			var gameHeight = canvasBg.height;											//get the backgroun canvas height into "gameHeight"
			var mouseX = 0;
			var mouseY = 0;
			var isPlaying = false;						   											//boolean that check if the game is playing
			var isStop = true;																		//boolean that check if the game is finished
			var jetsPassed = 0;																	//count how many jets go out of the canvas
	
			var enemies = [];																			//list of enemies		
			var imgSprite = new Image();														//make new img
			imgSprite.src = 'sprite.png';														// get the image from folder
			imgSprite.addEventListener('load',init,false);								//load the image

// end of important stuff

		
//------------------------------------------------------------------------------------------------------------------		
//------------------------------------------------------------------------------------------------------------------

// music		
		function playMP3(){
			document.getElementById("mp3").play();
		}

//end of music

//------------------------------------------------------------------------------------------------------------------		
//------------------------------------------------------------------------------------------------------------------

//draw Background
		var bgDrawX1 = 0;									//firt BG  and where it`s going to start
		var bgDrawX2 = 1600;							// secondBG  and it`s starting after the first0
		
		function moveBg(){
			bgDrawX1 -= 5;									// FisrtBG pic ...every move of screen it will also move 5px back 
			bgDrawX2 -=5;									//SecondBG ... it will also move 5 px back after the firt
				if(bgDrawX1 <= -1600){
					bgDrawX1 = 1600;						// return the first background in the begining
				}else if (bgDrawX2 <= -1600){
					bgDrawX2 = 1600;						// return thesecond background in the begining
				}
				
			drawBg();
		}
		
//draw Background	
			
//------------------------------------------------------------------------------------------------------------------		
//------------------------------------------------------------------------------------------------------------------
					
//main functions
		
		function init(){															// drawBG and menu and spawn 5 enemies	
		
			drawBg();					//draw background
			spawnEnemy(5);		//make 5 enemy
			drawMenu();
			document.addEventListener('click',mouseClicked,false);		//wait until ou press the button canvas
			
		}
		
		function playGame() {												//start the game 	
				startLoop();				//start loop
				updateHUD();			//update hightscore
				document.addEventListener('keydown',checkKeyDown,false);
				document.addEventListener('keyup',checkKeyUp,false);
		}
		
		function spawnEnemy(number){   							// function gets "n" when we call it and type "spawnEnemy(5) " so "n" = 5
				for (var i = 0; i < number ; i++) { 			//cikal koito pravi novi enemy dokato ne stigne izbranoto cislo v sly4eq "5"
						enemies[enemies.length] = new Enemy();		//make new enemy in list  
						
				}
		}
		
		function drawAllEnemies(){									//put all enemies in enemies list
			clearCtxEnemy();	//if we move enemy forward this will remove the shadow after every move ... clear the canvas before every function
			for (var i = 0; i < enemies.length; i++) {
					 enemies[i].draw();			
			}
		
		}
			
		function loop() {														//start the game , drawing jet ,enemies and start mooving the background
			if (isPlaying) {										//chack if "isPlaying " is true
						moveBg();								//move background
						jet1.draw();								//draw jet
						drawAllEnemies();					//draw all enemies that are in "enemies" list
						requestAnimFrame(loop);		//call loop again	until the game is end
				}
		}
		
		function startLoop(){												// start the loop
				isPlaying = true;			
				loop();					// call loop
		}

		function stopLoop(){												//stop the loop after cheking the boolean
				isPlaying = false ; 
				isStop = false;		
				ctxHUD.fillStyle = "hsla(80, 0%, 0%, 10.5)"; 
				ctxHUD.font = "italic 100px Arial";
				ctxHUD.fillText("Total score: " + jet1.score,50,250);	//print the Total score
		}
				
		function drawMenu() {												//draw the start button
			var srcX = 0;						
			var srcY = 580;
			var drawX = 0 ;
			var drawY= 0 ;
			ctxBg.drawImage(imgSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);			//draw the image
		}
		
		function drawBg(){													// draww background
			ctxBg.clearRect(0,0,gameWidth,gameHeight);
			//var srcX = 0;						
			//var srcY = 0;
			ctxBg.drawImage(imgSprite, 0, 0, 1600, gameHeight, bgDrawX1, 0, 1600, gameHeight);			//draw the image
			ctxBg.drawImage(imgSprite, 0, 0, 1600, gameHeight, bgDrawX2, 0, 1600, gameHeight);			//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		}
		
		function updateHUD(){											//updating the high score
			
			ctxHUD.clearRect(0,0,gameWidth,gameHeight);				//claer before write
			ctxHUD.fillText("Score: " + jet1.score,650,30);					// the actual text ...  actualText and  where to write it ("text", drawX , drawY)
				
			}
			
		
//end of main functions
		
//------------------------------------------------------------------------------------------------------------------		
//------------------------------------------------------------------------------------------------------------------
		
		
//Jet functions
		
		function Jet(){                											//object  for Jet
				this.srcX = 0;						// from where to start cuting in sprite a.k.a vertikal line
				this.srcY = 500; 					// from where to start cuting in sprite a.k.a horizontal line
				this.width = 100; 				//the width of the enemy pic a.k.a how long to  cut
				this.height = 40; 					//the height of the enemy pic a.k.a how hight to  cut
				this.drawX = 200;				//where to draw it in the canvas 
				this.drawY  = 200;  				//where to draw it in the canvas
				
				this.noseX = this.drawX + 100;			// the front part of the plane "nose" 	=(starting point of drawing jet + width of jet)     from where the bullet is comming	
				this.noseY= this.drawY + 30;				// the front  part of the plane "nose"    =(starting point of drawing jet + height of jet)    from where the bullet is comming	
				
				this.leftX = this.drawX;							//back part of the jet
				this.rightX = this.drawX + this.width;		// fron part of th jet	this.noseX
				this.topY = this.drawY;							// top of the jet				
				this.bottomY = this.drawY + this.height;		//botton of the jet		this.noseY
				
				this.speed = 2;					// how many px to move  every second or draw funct is call
				this.score = 0;						//starting score
				
				this.isUpKey = false;			
				this.isRightKey = false;
				this.isDownKey = false;
				this.isLeftKey = false;
				this.isSpacebar = false;
				
				this.isShooting = false;
				
				this.bullets = [];  								//define empty list for bullets
				this.currentBullet = 0; 					//counter for bullets
				for (var i = 0; i < 50 ; i++) { 				//when we make jet it make also 50 bullets , you have 50 bullets before the start to recucle .
						this.bullets[this.bullets.length] = new Bullet(this);			//make new bullet in lthe list , and also tell the bullet to wich jet his belong to 
				}
										
			}
		
		Jet.prototype.draw = function() {							//it`s normal function but shared betwen all jets
				clearCtxJet(); 											// if we move jet forward this will remove the shadow after every move ... cleat the canvas before every function
				this.updateCoors();									//check which of the bottons is pressed and chached the coordinated of the jet
				this.checkDirection();								//see which button is down before draw the jet
				this.checkShooting();								//check if the space button is down
				this.drawAllBullets();								
				ctxJet.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);	 //from where to get the img , from where to where to cut , from where to where to paste and size
				};
		
		Jet.prototype.checkDirection = function() {			//check and change jet direction acording to which button is pressed
						if(this.isUpKey && this.topY > 0){					//if the upKey is true and the top part of jet isn`t out of  the canvas 
							this.drawY -= this.speed;					// move the jet up
						}
						if(this.isRightKey && this.rightX < gameWidth){   //if the rightKey is true and the top part of jet isn`t out of  the canvas 
							this.drawX += this.speed;					// move the jet streight
						}
						if(this.isDownKey && this.bottomY < gameHeight){    //if the downKey is true and the down part of jet isn`t out of  the canvas 
							this.drawY += this.speed;					// move the jet down
						}
						if(this.isLeftKey && this.leftX > 0){         //if the leftKey is true and the back part of jet isn`t out of  the canvas 
							this.drawX -= this.speed;				// move the jet back
						}
				};
		
		Jet.prototype.updateCoors = function(){				//after changing the jet direction update with the new coordinats - move jet
		
				this.noseX = this.drawX + 100;						//from where the bullet is comming	
				this.noseY= this.drawY + 30;							//from where the bullet is comming	
				this.leftX = this.drawX;
				this.rightX = this.drawX + this.width;
				this.topY = this.drawY;
				this.bottomY = this.drawY + this.height;
				};
								
		Jet.prototype.drawAllBullets = function(){				// drawing all bullets
			for (var i = 0; i < this.bullets.length; i++) {			// until  50 , becouse we have 50 bullets in bullet list
					if (this.bullets[i].drawX >= 0) {						//draw all bullets that have  "drawX" value over a "0"
							this.bullets[i].draw();							// draw the bullet
					}	
			}
		};
		
		Jet.prototype.checkShooting = function(){				//check if we are shooting 
				if(this.isSpacebar  && !this.isShooting) {										//check if spacebar is true and isShooting is false
						playMP3();																					//shoot music
						this.isShooting = true;
						this.bullets[this.currentBullet].fire(this.noseX, this.noseY)		//fire the curent bullet that is in the list from the nose of the plane
						this.currentBullet++;																
						if (this.currentBullet >= this.bullets.length) {							//if current bullet is over the size of bullets packet it`s reloading
								this.currentBullet = 0;														//reload when the bullets are over 50 (bulets list)
						}
					}else if (!this.isSpacebar) {  														//if we are not pressing spacebar , make is.Shooting is false
								this.isShooting = false;													// the jet can fire only one bullet on once pressing the space
				}
		};
		
		Jet.prototype.updateScore = function(points){		//update scote on every hit
				this.score += points;			//sum the score with the point you get for hitting enemie
				updateHUD();						// call updateHud for writing it on the screen
		};
				
		function clearCtxJet() {											// clear Jet canvas when it`s need
				ctxJet.clearRect(0,0,gameWidth,gameHeight);
		}
			
			
//end of Jet functions
			
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------	

//Bullet function

		function Bullet(j) {													//object for Bullet
				this.jet = j;		//tell the bullet to which jet his is belong to 
				this.srcX = 100;			// from where to start cuting in sprite a.k.a vertikal line
				this.srcY = 500;			// from where to start cuting in sprite a.k.a horizontal line
				this.drawX =  -20; 		//where to draw it in the canvas 
				this.drawY = 0;			//where to draw it in the canvas
				this.width = 5;				//size of the bullet
				this.height = 5;			//size of the bullet
		}

		Bullet.prototype.draw = function() {						//drawing bullets
				this.drawX = this.drawX + 3 ;		//every time when the canvas is drawing the bullet i s mooving 3 'smth pixels foward
				ctxJet.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);	 //from where to get the img , from where to where to cut , from where to where to paste and size
				this.checkHitEnemy();						//call checkHitEnemy  to see if we hit enemy jet
				if 	(this.drawX > gameWidth){			//check if the bullet go out of the canvas
						this.recycle();								//when the bullet go out of the canvas it reset from the begining
				}			
		};
	
		Bullet.prototype.fire = function(startX, startY) {		//put the bullet in front of the jet
				this.drawX = startX;		//change the bullet coordinates - from out of the canvas to infron of the jet and continue drawing it
				this.drawY =  startY;		//change the bullet coordinates - from out of the canvas to infron of the jet
		};

		Bullet.prototype.checkHitEnemy = function() {		//check if the bullet hit the enemie
			for (var i = 0; i < enemies.length; i++) {
					if(this.drawX >= enemies[i].drawX &&												//this hole "IF" check if the bullet is betwen front part , back part , top and button of the enemy ... 
						this.drawX <= enemies[i].drawX + enemies[i].width &&			//a.k.a. if the bullet is under the enemies
						this.drawY >= enemies[i].drawY &&
						this.drawY <=enemies[i].drawY + enemies[i].height) {
							this.recycle();				//recucle the bullet (send it at the start, out of the canvas)
							enemies[i].recycleEnemy();			// recycle the  hit enemie (returned it out of the canvas )
							this.jet.updateScore(enemies[i].rewardPoints);			//pass the number of points you get for the hit to the score in jet1
					}		
			}
		};

		Bullet.prototype.recycle = function() {					//return bullet out of the canvas
					this.drawX = -20;				//get the bullet out of the screen canvas
		};

//end of Bullet function

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

// Enemy function			
		function Enemy(){                									//object	for Enemy
				this.srcX = 0;							// from where to start cuting in sprite a.k.a vertikal line
				this.srcY = 540; 						// from where to start cuting in sprite a.k.a horizontal line
				this.width = 100; 					//the width of the enemy pic a.k.a how long to  cut
				this.height = 40; 						//the height of the enemy pic a.k.a how hight to  cut
				this.speed = 2;						//2px every second or draw funct is call
				this.drawX = Math.floor(Math.random() * 1000) + gameWidth;			//where to draw it in the canvas , random start position *ranodom number betwen 0-1000 + game screen*
				this.drawY  = Math.floor(Math.random() * 270);								//where to draw it in the canvas,  random start position , with some limit where not to go  *prevent going on gren*
				this.rewardPoints = 5;			//that`s how many points you get when you hit enemie
		}
					
		Enemy.prototype.draw = function() {						//it`s normal function but shared betwen all enemies
				
				this.drawX -=this.speed; 								// auto moving foward ... *if it`s += going back* 
				ctxEnemy.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);	 //from where to get the img , from where to where to cut , from where to where to paste and size
				this.checkEscaped();			//call "checkEscaped"
		};
		
		Enemy.prototype.checkEscaped = function() {  	//check if the enemy pass out of the canvas
				
				if(this.drawX + this.width <= 0) {		//check if the enemy pass the end of the screen ... 
					this.recycleEnemy();					//call recycleEnemy
					jetsPassed +=  1;
						if(jetsPassed > 0) {		// call stopLoop after some part of emenies pass the screen Canvas *at the moment 1 enemy*
								stopLoop();
						}
				}
		};
			
		Enemy.prototype.recycleEnemy = function() {		//return enemy back out of the canvas
					this.drawX = Math.floor(Math.random() * 1000) + gameWidth;						//redraw the enemy in the begining
				this.drawY  = Math.floor(Math.random() * 350);														//redraw the enemy in the begining
					
		};
			
		function clearCtxEnemy() {									// clear Enemy canvas
				ctxEnemy.clearRect(0,0,gameWidth,gameHeight);
			}
			
//end of Enemy function
	
//------------------------------------------------------------------------------------------------------------------	
//------------------------------------------------------------------------------------------------------------------	

// button object
		function Button(xL, xR, yT, yB) {							//draw the menu button
			this.xLeft = xL;				//coordinates of the botton
			this.xRight = xR;			//coordinates of the botton
			this.yTop = yT;				//coordinates of the botton
			this.yBottom = yB; 	//coordinates of the botton
		}
		
		Button.prototype.checkClicked = function() {			//check if the menu button is clicked
			if(isStop){		//check if the game is stoped
					if(this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) {		 //check if the mouse is over the button
						return true; 
					}
				}
		};
	
//end of button object
	
//------------------------------------------------------------------------------------------------------------------	
//------------------------------------------------------------------------------------------------------------------
			
//event functions
			
			function mouseClicked(e){									//mouse listener
				  mouseX = e.pageX - canvasBg.offsetLeft;			//coordinate of the mouse
				  mouseY = e.pageY - canvasBg.offsetTop;			//coordinate of the mouse
				  if (isPlaying === false) {
							if (btnPlay.checkClicked()) {		// if everithing is ok (is pressed at the correct plase) start game  
									playGame();
							}
				  }
			}
			
			function checkKeyDown(e){								//keyboard listener		listner for down button				
					var keyID = e.keyCode || e.which;                   // if keyID can`t open e."keyCode" it will use "e.which"
					if (keyID === 38  || keyID === 87){					//check for up arrow and "W" key 
							jet1.isUpKey = true;
							e.preventDefault();
					}
					if (keyID === 39  || keyID === 68){					//check for right arrow and "D" key 
							jet1.isRightKey = true;
							e.preventDefault();
					}
					if (keyID === 40  || keyID === 83){					//check for down arrow and "S" key 
							jet1.isDownKey = true;
							e.preventDefault();
					}
					if (keyID === 37 || keyID === 65){					//check for left arrow and "A" key 
							jet1.isLeftKey  = true;
							e.preventDefault();
					}
					if (keyID === 32 ){											//check spacebar
							jet1.isSpacebar  = true;
							e.preventDefault();
					}
			}
			
			function checkKeyUp(e){									//keyboard listener	  return button up
					var keyID = e.keyCode || e.which;
					if (keyID === 38  || keyID === 87){					//check for up arrow and "W" key 
							jet1.isUpKey = false;
							e.preventDefault();
					}
					if (keyID === 39  || keyID === 68){					//check for right arrow and "D" key 
						jet1.isRightKey = false;
							e.preventDefault();
					}
					if (keyID === 40  || keyID === 83){					//check for down arrow and "S" key 
							jet1.isDownKey = false;
							e.preventDefault();
					}
					if (keyID === 37 || keyID === 65){					//check for left arrow and "A" key 
						jet1.isLeftKey  = false;	
						e.preventDefault();
					}
					if (keyID === 32 ){											//check spacebar
							jet1.isSpacebar  = false;
							e.preventDefault();
					}
		}
			
//end of event functions
		
//   important stuff

		    var canvasBg = document.getElementById('canvasBg');			//make background canvas
			var ctxBg = canvasBg.getContext('2d');
			var canvasJet = document.getElementById('canvasJet');				//make jet canvas
			var ctxJet = canvasJet.getContext('2d');
			var canvasEnemy = document.getElementById('canvasEnemy');
			var ctxEnemy = canvasEnemy.getContext('2d');
			var clearCanvasBtn = document.getElementById('clearCanvasBtn');        //make clear button
			clearCanvasBtn.addEventListener('click', clearCtxsBg,false);					//on click clear canvas
			
			
			jet1 = new Jet();		// create variable to object for jet
			var gameWidth = canvasBg.width;											//save the backgroun canvas windth into "gameWidth"
			var gameHeight = canvasBg.height;											//save the backgroun canvas height into "gameHeight"
			var isPlaying = false;						   							//boolean that chek if the game is playing
			var requestAnimFrame =  window.requestAnimationFrame ||    //chek the brouser
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame;
			
			var spawnInterval;
			var totalEnemies = 0;
			var enemies = [];
			var spawnRate = 2000; // every 2 sec begome new enemy
			var spawnAmount = 1; // evary 2 sec make 2 new enemies


			
			var imgSprite = new Image();															//make new img
			imgSprite.src = 'sprite.png';															// get the image from folder
			imgSprite.addEventListener('load',init,false);							//load the image
		
// end of important stuff


		
		
		
		
//main functions
		
		function init(){
			
			drawBg();
			startLoop();
			
			document.addEventListener('keydown',checkKeyDown,false);
			document.addEventListener('keyup',checkKeyUp,false);
		}
		
		function spawnEnemy(n){   // function gets "n" when we call it and type "spawnEnemy(5) " so "n" = 5
				for (var i = 0; i < n ; i++) { 
						enemies[totalEnemies] = new Enemy();		//make new enemy in list  and also save new totalEnemy int this list like "5.4.9.sdf.dsf" and add it in the edn
						totalEnemies++;				 // to increase the enemy list 
				}
		}
		
		function drawAllEnemies(){
			clearCtxEnemy();	//tutorial 10  .. if we move enemy forward this will remove the shadow after every move ... clear the canvas before every function
			for (var i = 0; i < enemies.length; i++) {
					 enemies[i].draw();
			}
		
		}
		
		function startSpawningEnemies() {
				stopSpawningEnemies();
				spawnInterval = setInterval(function() {spawnEnemy(spawnAmount);}, spawnRate);	//call spawnEnemy every sec "spawnRate"
		}
		
		function stopSpawningEnemies() {
				clearInterval(spawnInterval);
		}
		
		function loop() {
			if (isPlaying) {
						jet1.draw();
						drawAllEnemies();
						requestAnimFrame(loop);
				}
		}
		
	
		function startLoop(){
				isPlaying = true;
				loop();		
				startSpawningEnemies();
		}

		function stopLoop(){	
				isPlaying = false ; 
				stopSpawningEnemies();
		}
		
		function drawBg(){
			var srcX = 0;						
			var srcY = 0;
			var drawX = 0 ;
			var drawY= 0 ;
			ctxBg.drawImage(imgSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);			//draw the image
		}
			
			function clearCtxsBg() {				//clear background canvas
				ctxBg.clearRect(0,0,gameWidth,gameHeight);
			}
		
//end of main functions
		
//------------------------------------------------------------------------------------------------------------------		
//------------------------------------------------------------------------------------------------------------------
		
		
//Jet functions
		
		function Jet(){                				//object	for Jet
				this.srcX = 0;						// from where to start cuting in sprite a.k.a vertikal line
				this.srcY = 500; 					// from where to start cuting in sprite a.k.a horizontal line
				this.width = 100; 				//the width of the enemy pic a.k.a how long to  cut
				this.height = 40; 					//the height of the enemy pic a.k.a how hight to  cut
				this.speed = 2;					//2px every second or draw funct is call
				this.drawX = 200;				//where to draw it in the canvas 
				this.drawY  = 200;  				//where to draw it in the canvas
				this.isUpKey = false;
				this.isRightKey = false;
				this.isDownKey = false;
				this.isLeftKey = false;
			}
		
		Jet.prototype.draw = function() {						//it`s normal function but shared betwen all jets
				clearCtxJet(); 												//tutorial 10  .. if we move jet forward this will remove the shadow after every move ... cleat the canvas before every function
				this.checkDirection();										//see which button is down before draw the jet
				ctxJet.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);	 //from where to get the img , from where to where to cut , from where to where to paste and size
				};
				
		Jet.prototype.checkDirection = function() {	
						if(this.isUpKey){
							this.drawY -= this.speed;
						}
						if(this.isRightKey){
							this.drawX += this.speed;
						}
						if(this.isDownKey){
							this.drawY += this.speed;
						}
						if(this.isLeftKey){
							this.drawX -= this.speed;
						}
				};
				
		
			function clearCtxJet() {				// clear Jet canvas
				ctxJet.clearRect(0,0,gameWidth,gameHeight);
			}
			
//end of Jet functions
			
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------	

// Enemy function			
		function Enemy(){                		//object	for Enemy
				this.srcX = 0;						// from where to start cuting in sprite a.k.a vertikal line
				this.srcY = 530; 					// from where to start cuting in sprite a.k.a horizontal line
				this.width = 100; 				//the width of the enemy pic a.k.a how long to  cut
				this.height = 40; 					//the height of the enemy pic a.k.a how hight to  cut
				this.speed = 2;					//2px every second or draw funct is call
				this.drawX = Math.floor(Math.random() * 1000) + gameWidth;						//where to draw it in the canvas , random start position *ranodom number betwen 0-1000 + game screen*
				this.drawY  = Math.floor(Math.random() * 350);									//where to draw it in the canvas,  random start position , with some limit where not to go 
		}
			
			
		Enemy.prototype.draw = function() {						//it`s normal function but shared betwen all enemies
				
				this.drawX -=this.speed; 								// auto moving foward ... *if it`s += going back* *if it`s Y goinf up*
				ctxEnemy.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);	 //from where to get the img , from where to where to cut , from where to where to paste and size
				this.checkEscaped();
		};
		
		Enemy.prototype.checkEscaped = function() {
				if(this.drawX <= -2000) {		//check if the enemy pass the end of the screen ... 
						this.destroyEnemy();
				}
		};
		
		Enemy.prototype.destroyEnemy = function() {
					enemies.splice(enemies.indexOf(this), 1);  //delete from *enemy* list ..  start deleting from the enemy that *this* we are talking about and delete 1 
					totalEnemies--;
		};
		
		
		function clearCtxEnemy() {				// clear Enemy canvas
				ctxEnemy.clearRect(0,0,gameWidth,gameHeight);
			}
			
//end of Enemy function
	
//------------------------------------------------------------------------------------------------------------------	
//------------------------------------------------------------------------------------------------------------------
			
//event functions
			
			function checkKeyDown(e){
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
			}
			
			function checkKeyUp(e){
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
			}
			
//end of event functions
			
			
			
			
			
			
			
			
			
			
			
			
			
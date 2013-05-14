describe("Test drawMenu", function() {
	var srcX = 0;						
	var srcY = 580;
	var drawX = 0;
	var drawY = 0;

	it("tests srcX", function() {		
		expect(srcX).toBe(0);
	});

	it("tests srcY", function() {
		expect(srcY).toBe(580);
	});

	it("tests drawX", function() {
		expect(drawX).toBe(0);
	});

	it("tests drawY", function() {
		expect(drawY).toBe(0);
	});
	
});

describe("Tests Jet", function() {
	var srcX = 0;
	var srcY = 500;
	var width = 100;
	var height = 40;
	var drawX = 200;
	var drawY  = 200;
				
	var noseX = drawX + 100;
	var noseY= drawY + 30;

	var leftX = drawX;
	var rightX = drawX + width;
	var topY = drawY;			
	var bottomY = drawY + height;
				
	var speed = 2;
	var score = 0;

	var UpKey = false;			
	var RightKey = false;
	var DownKey = false;
	var LeftKey = false;
	var Spacebar = false;
				
	var Shooting = false;
				
	var bullets = [];
	var currentBullet = 0;

	it("tests srcX", function() {
		expect(srcX).toBe(0);
	});

	it("tests srcY", function() {
		expect(srcY).toBe(500);
	});

	it("tests width", function() {
		expect(width).toBe(100);
	});

	it("tests height", function() {
		expect(height).toBe(40);
	});

	it("tests drawX", function() {
		expect(drawX).toBe(200);
	});

	it("tests drawY", function() {
		expect(drawY).toBe(200);
	});

	it("tests noseX", function() {
		expect(noseX).toBe(300);
	});

	it("tests noseY", function() {
		expect(noseY).toBe(230);
	});

	it("tests leftX", function() {
		expect(leftX).toBe(drawX);
	});

	it("tests rightX", function() {
		expect(rightX).toBe(300);
	});

	it("tests topY", function() {
		expect(topY).toBe(drawY);
	});

	it("tests bottomY", function() {
		expect(bottomY).toBe(240);
	});

	it("tests speed", function() {
		expect(speed).toBe(2);
	});

	it("tests score", function() {
		expect(score).toBe(0);
	});

	it("tests UpKey", function() {
		expect(UpKey).toBe(false);
	});

	it("tests RightKey", function() {
		expect(RightKey).toBe(false);
	});

	it("tests DownKey", function() {
		expect(DownKey).toBe(false);
	});

	it("tests LeftKey", function() {
		expect(LeftKey).toBe(false);
	});

	it("tests Spacebar", function() {
		expect(Spacebar).toBe(false);
	});

	it("tests Shooting", function() {
		expect(Shooting).toBe(false);
	});

});
	
describe("Test Bullet", function() {		
	var srcX = 100;			
	var srcY = 500;			
	var drawX =  -20; 		
	var drawY = 0;			
	var width = 5;			
	var height = 5;	
	
	it("tests srcX", function() {		
		expect(srcX).toBe(100);
	});
	
	it("tests srcY", function() {		
		expect(srcY).toBe(500);
	});
	
	it("tests drawX", function() {		
		expect(drawX).toBe(-20);
	});
	
	it("tests drawY", function() {		
		expect(drawY).toBe(0);
	});
	
	it("tests width", function() {		
		expect(width).toBe(5);
	});
	
	it("tests height", function() {		
		expect(height).toBe(5);
	});
	
});	
	
describe("Test Enemy", function() {
	var srcX = 0;							
	var srcY = 540; 						
	var width = 100; 					
	var height = 40; 						
	var speed = 2;						
	//var drawX = Math.floor(Math.random() * 1000) + gameWidth;			
	//var drawY  = Math.floor(Math.random() * 270);								
	var rewardPoints = 5;			
	
	it("test srcX",function() {
		expect(srcX).toBe(0);
	});
	
	it("test srcY",function() {
		expect(srcY).toBe(540);
	});
	
	it("test width",function() {
		expect(width).toBe(100);
	});
	
	it("test height",function() {
		expect(height).toBe(40);
	});
	
	it("test speed",function() {
		expect(speed).toBe(2);
	});
	
});
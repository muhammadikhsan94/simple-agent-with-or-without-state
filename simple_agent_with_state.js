var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d');
var w = 1350;
var h = 600;
var e = 0;
var q = 0;
var z = -450;
var index = 0;
var vel = 8;
var atas = 160;
var tengah = 280;
var bawah = 400;
var mySound = new Audio("sound/teet.mp3");

/* RUMPUT */
function Rumput(y){
	this.x = 0;
	this.y = y;
	this.wid = 2 * w;
	this.leng = 120;

	this.show = function(){
		c.beginPath();
		c.rect(this.x,this.y,this.wid,this.leng);
		c.fillStyle = "#87a96b";
		c.fill();
		c.font = "30px Comic Sans MS";
		c.fillStyle = "WHITE";
		c.textAlign = "center";
		c.fillText("Implementation AI Simple Agent With State - School Car", w/2, 50); 
		c.closePath();
	}
}

/* MARKA JALAN */
function Jalan(x,y){
	this.x = x;
	this.y = y;
	this.wid = 75;
	this.leng = 10;
	this.vel = vel;

	this.show = function(){
		c.beginPath();
		c.rect(this.x,this.y,this.wid,this.leng);
		c.fillStyle = "white";
		c.fill();
		c.closePath();
	}

	this.update = function() {
		this.x -= this.vel;
		if(this.x <= -100) {
			this.x = 1500;
		}
	}
}

/* GAMBAR MOBIL */
var gambar = new Image();
gambar.src="images/bus.png";
var nextpos;

function Mobil(){
	this.y = tengah;
	this.x = 10;
	this.wid = 120;
	this.leng = 50;

	this.show = function(){
		c.beginPath();
		c.rect(this.x,this.y,this.wid,this.leng);
		c.drawImage(gambar,this.x,this.y,this.wid,this.leng);
	}

	this.update = function(){

		/* SIMPLE REFLEX AGENT WITH STATE */
		/* MENENTUKAN POSISI MOBIL SELANJUTNYA */
		if(car1[0].x < 1200 && car1[1].x > 100 && car1[1].x < 1200) {
			if(this.y == atas){
				if(car1[0].y == this.y && car1[1].y == this.y) {	
					nextpos = tengah;
				} else if(car1[0].y == this.y && car1[1].y > this.y || car1[0].y > this.y && car1[1].y == this.y) {
					nextpos = tengah;
				} else if(car1[0].y == this.y && car1[1].y > this.y  || car1[0].y > this.y && car1[1].y == this.y) {
					nextpos = tengah;
				} else if(car1[0].y > this.y && car1[1].y > this.y) {
					this.y = this.y;
				}
			} else if(this.y == tengah){
				if(car1[0].y == this.y && car1[1].y == this.y) {
					nextpos = bawah;
				} else if(car1[0].y == this.y && car1[1].y < this.y || car1[0].y < this.y && car1[1].y == this.y) {
					nextpos = bawah;
				} else if(car1[0].y == this.y && car1[1].y > this.y || car1[0].y > this.y && car1[1].y == this.y) {
					nextpos = atas;
				} else if(car1[0].y > this.y && car1[1].y < this.y || car1[0].y < this.y && car1[1].y > this.y
				  || car1[0].y < this.y && car1[1].y < this.y || car1[0].y > this.y && car1[1].y > this.y) {
					this.y = this.y;
				}
			} else if(this.y == bawah){
				if(car1[0].y == this.y && car1[1].y == this.y) {
					nextpos = tengah;
				} else if(car1[0].y == this.y && car1[1].y == tengah || car1[0].y == tengah && car1[1].y == this.y) {
					nextpos = tengah;
				} else if(car1[0].y == this.y && car1[1].y == atas || car1[0].y == atas && car1[1].y == this.y) {
					nextpos = tengah;
				} else if(car1[0].y < this.y && car1[1].y < this.y) {
					this.y = this.y;
				}
			}
		}

		/* MENENTUKAN KECEPATAN PERPINDAHAN MOBIL */
		if(this.y < nextpos){
			mySound.play();
			this.y += 2.5;
		} else if(this.y > nextpos){
			mySound.play();
			this.y -= 2.5;
		}
	}
}

/* MOBIL LAIN */
var gambarlain = new Image();
gambarlain.src="images/car1.png";

function MobilLain(y){
	this.y = 160 + y;
	this.x = 1900 + (Math.random()*1000) + 100;
	this.rad = 0;
	this.vel = vel;

	this.show = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.rad,0,Math.PI*2);
		c.drawImage(gambarlain,this.x,this.y,100,50);
	}

	this.update = function() {
		this.x -=this.vel;
		if(this.x <= 0) {
			this.x = 2300;
			this.y = atas + (Math.floor(Math.random()*3)*120);
		}
	}
}

var rumput1 = new Rumput(0);
var rumput2 = new Rumput(500);
var Jalans = [];
e = -100;
q = 240;
for (var i = 0; i <= 1; i++) {
	for (var j = 0; j <= 20; j++) {
		e += 100;
		Jalans.push(new Jalan(e,q));
	}
	q += 120;
	e = -100;
}	

var cars = new Mobil();

var car1 = [];
for(var x=0;x<=1;x++) {
	car1.push(new MobilLain(Math.floor(Math.random()*3)*120));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,1350,600);
	rumput1.show();
	rumput2.show();
	for (var i = 0; i <= Jalans.length -1; i++) {
		Jalans[i].show();	}
	for (var i = 0; i <= Jalans.length -1; i++) {
		Jalans[i].update();	}
	cars.show();
	for (var i = 0;i <= car1.length - 1; i++) {
		car1[i].show();
		car1[i].update();
	}
	cars.update();
}
animate();
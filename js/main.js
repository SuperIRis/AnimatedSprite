var animatedLoaderLoop = new AnimatedSprite("images/animation.png", document.getElementById("main-animation"), "vertical", 27, {loop:true, loopStartStep:5, loopEndStep:23});
var animatedLoaderHover = new AnimatedSprite("images/animation.png", document.getElementById("main-animation2"), "vertical", 27, {stepToStopForward:10});
var animatedLoaderHover3 = new AnimatedSprite("images/animation.png", document.getElementById("main-animation4"), "vertical", 27, {loop:true, loopStartStep:5, loopEndStep:23});
var animatedLoaderHover2 = new AnimatedSprite("images/animation.png", document.getElementById("main-animation3"), "vertical", 27, {stepToStopForward:10});



document.getElementById("loop-btn").onclick = function(){
	animatedLoaderLoop.start();
	document.getElementById("loop-btn").setAttribute("disabled", "disabled");
	document.getElementById("unloop-btn").removeAttribute("disabled");
};
document.getElementById("unloop-btn").onclick = function(){
	animatedLoaderLoop.stop();
	document.getElementById("loop-btn").removeAttribute("disabled");
	document.getElementById("unloop-btn").setAttribute("disabled", "disabled");
};

document.getElementById("main-animation2").onmouseover = function(){
	animatedLoaderHover.hoverIn(10);
};
document.getElementById("main-animation2").onmouseout = function(){
	animatedLoaderHover.hoverOut(10,27);
};

document.getElementById("main-animation3").onmouseover = function(){
	animatedLoaderHover2.hoverIn(23);
};
document.getElementById("main-animation3").onmouseout = function(){
	animatedLoaderHover2.hoverOut();
};

document.getElementById("main-animation4").onmouseover = function(){
	animatedLoaderHover3.start();
};
document.getElementById("main-animation4").onmouseout = function(){
	animatedLoaderHover3.stop();
};
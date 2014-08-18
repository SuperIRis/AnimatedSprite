# Animated Sprite

Create an animation with a Sprite sheet. You can set parameters to do complex animations for hovers, loops, etc. My goal is to make a definitive resource for all my sprite sheet animation needs, so I will add use cases (and probably new properties and methods) with time :)

I use my own animation for the examples, it's a simple walking sequence of my avatar. The file that includes all examples is index.html


## Setup

1. Create your sprite sheet (for this I recommend http://draeton.github.io/stitches/ although it has to be configured, you can get the right assets afterwards).
2. Create the DOM element that will hold the animation. You have to set this container width and height manually via CSS for the animation to be visible. 
3. Create a new AnimatedSprite instance


## Parameters of constructor

* spriteURL: URL of the sprite sheet
* div: container of the animation
* orientation: the way your sprites are ordered in the sheet, can be "horizontal" or "vertical" (defaults to "vertical").
* steps: the number of sprites contained on your spritesheet
* settings: an object that contains specific parameters to generate more complex animations:
    * loop: the animation must loop? defaults to false
    * loopStartStep: does the animation should return to the start for the loop? if not, you may specify the step number in which the animation should begin after loop.
    * loopEndStep: does the animation should end to loop? if not, you may specify the step number in which the animation should return to start.


## Methods

* start: starts the animation (no params)
* stop: stops the animation. It accepts one boolean parameter, that indicates if the animation should reset itself to the beginning after stopping.
* hoverIn: can be used to start an animation in mouseover(or another event), accepting a number parameter that indicates where the animation should stop.
* hoverOut: can be used to change an animation in mouseout (or another event), accepting two parameters (from and until) that indicate where the hoverOut should start and where it should stop.


## Example use cases


This example starts in sprite 1 but it loops only from sprite 5 to 23. When the animation stops, it goes until the last sprite before reseting itself and stopping.
```javascript
	var animatedLoaderLoop = new AnimatedSprite("images/animation.png", document.getElementById("main-animation"), "vertical", 27, {loop:true, loopStartStep:5, loopEndStep:23});
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
```

This example starts at mouseover and ends at mouseout. If the mouse leaves early, the animation completes anyway.
```javascript
	var animatedLoaderHover = new AnimatedSprite("images/animation.png", document.getElementById("main-animation2"), "vertical", 27, {stepToStopForward:10});
	document.getElementById("main-animation2").onmouseover = function(){
		animatedLoaderHover.hoverIn(10);
	};
	document.getElementById("main-animation2").onmouseout = function(){
		animatedLoaderHover.hoverOut(10,27);
	};
```

This example starts at mouseover, loops, and ends at mouseout.
```javascript
	var animatedLoaderHover3 = new AnimatedSprite("images/animation.png", document.getElementById("main-animation4"), "vertical", 27, {loop:true, loopStartStep:5, loopEndStep:23});
	document.getElementById("main-animation4").onmouseover = function(){
		animatedLoaderHover3.start();
	};
	document.getElementById("main-animation4").onmouseout = function(){
		animatedLoaderHover3.stop();
	};
```

This example starts at mouseover, stops in certain sprite, and animates backwards at mouseout.
```javascript
	var animatedLoaderHover2 = new AnimatedSprite("images/animation.png", document.getElementById("main-animation3"), "vertical", 27, {stepToStopForward:10});
	document.getElementById("main-animation3").onmouseover = function(){
		animatedLoaderHover2.hoverIn(23);
	};
	document.getElementById("main-animation3").onmouseout = function(){
		animatedLoaderHover2.hoverOut();
	};
```

## To do's:
* Fix bug that when you mix certain parameters, animation can go crazy
* Convert this to a jQuery plugin
* Include size from JS, to be CSS free (for the animation, anyways)
* Clean the code (sorry, this has been done in a few hours and I didn't test it correctly)


## License

GPL
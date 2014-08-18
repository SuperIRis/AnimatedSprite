; var AnimatedSprite = function(spriteURL, div, orientation, steps, settings){
	this.spriteURL = spriteURL;
	this.div = div;
	this.orientation = orientation == "horizontal" ? orientation : "vertical";
	this.steps = steps;
	
	this.currentStep = 0;
	div.style.backgroundImage = "url("+spriteURL+")";
	this.image = new Image();
	this.image.onLoad = this._onLoad;
	this.image.src = spriteURL;
	this.containerHeight = this.div.offsetHeight;
	this.containerWidth = this.div.offsetWidth;
	this.animationStarted = false;
	this.settings = {
		loop:false,
		loopStartStep:0,
		loopEndStep:0,
		frameRate:40
	};
	for(var a in settings){
		if(this.settings.hasOwnProperty(a)){
			this.settings[a] = settings[a];
		}
	}

}

AnimatedSprite.prototype.start = function(){
	if(!this.image.complete){
		this._onLoad = this.start;
		return;
	}
	if(this.animationStarted){
		return
	}
	this.animationStarted = true;
	if(this.currentStep<this.steps || this.settings.loop){
		this._animateToEnd();
	}
}
AnimatedSprite.prototype.stop = function(restart){
	this.meantToStop = true;
	this.animationStarted = false;
	this.restart = restart ? restart : false;
}

AnimatedSprite.prototype.hoverIn = function(until){
	if(!this.image.complete){
		this._onLoad = this.hoverIn;
		return;
	}
	if(this.animationStarted){
		return
	}
	this.animationStarted = true;
	clearInterval(this.mainInterval);
	this.stepToStopForward = !isNaN(until) && until < this.steps ? until : this.steps;
	this._animateToEnd();
}
AnimatedSprite.prototype.hoverOut = function(from, until){
	if(!this.image.complete){
		this._onLoad = this.hoverOut;
		return;
	}
	if(this.endAnimationStarted){
		return
	}
	this.endAnimationStarted = true;
	clearInterval(this.mainInterval);
	until = !isNaN(until) && until > 0 && until <= this.steps ? until : 0;
	this.stepToStopForward = this.steps;
	this.currentStep = !isNaN(from) && from > 0 && from <= this.steps ? from : this.currentStep;

	if(this.currentStep < until){
		console.log("current step < until")
		this.forceReset = true;
		this._animateToEnd();
	}
	else{
		this._animateToStart();
	}

	
};

AnimatedSprite.prototype._onLoad = function(){};

AnimatedSprite.prototype._animateToEnd = function(){

	var moveForwardBinded = this._moveForward.bind(this);
	this.mainInterval = setInterval(moveForwardBinded, this.settings.frameRate);
}
AnimatedSprite.prototype._animateToStart = function(){
	var moveBackwardsBinded = this._moveBackwards.bind(this);
	this.mainInterval = setInterval(moveBackwardsBinded, this.settings.frameRate);
};
AnimatedSprite.prototype.reset = function(to){
	to = to ? to : 0;
	this.currentStep = to;
	this.animationStarted = false;
	this.endAnimationStarted = false;
	this.div.style.backgroundPosition="0 -"+((this.containerHeight*this.currentStep))+"px";
}

AnimatedSprite.prototype._moveBackwards = function(){
	if(this.orientation=="vertical"){
		this.div.style.backgroundPosition="0 -"+((this.containerHeight*this.currentStep)-this.containerHeight)+"px";
	}
	else{
		this.div.style.backgroundPosition="-"+((this.containerWidth*this.currentStep)-this.containerWidth)+"px"+" 0";
	}
	if(this.currentStep<=0 || this.currentStep>=this.stepToStopBackwards){
		clearInterval(this.mainInterval);
		this.reset(0);
	}
	this.currentStep--;
};

AnimatedSprite.prototype._moveForward = function(){
	if(this.orientation=="vertical"){
		this.div.style.backgroundPosition="0 -"+((this.containerHeight*this.currentStep))+"px";
	}
	else{
		this.div.style.backgroundPosition="-"+((this.containerWidth*this.currentStep))+"px"+" 0";
	}
	console.log("step to stop forward",this.currentStep, ">=", this.stepToStopForward)
	if(this.meantToStop && this.currentStep>=this.steps){
		clearInterval(this.mainInterval);
		this.meantToStop=false;
		if(this.restart){
			this.restart = false;
			this.reset(0);
		}
	}
	else if(this.currentStep>=this.stepToStopForward || (this.settings.loop && this.currentStep>=this.settings.loopEndStep) && !this.meantToStop){
		clearInterval(this.mainInterval);		
		if(this.settings.loop){
			this.reset(this.settings.loopStartStep);
			this.start();
		}
		else if(this.forceReset){
			this.forceReset = false;
			this.reset();
		}
	}
	this.currentStep++;
	
};



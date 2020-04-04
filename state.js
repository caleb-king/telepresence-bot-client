let controlMode = 'pan-tilt';
let arrowPressed = null;  
let robotCommand = null;


const setControlMode = function(mode) {
  this.controlMode = mode;
};

const setArrowPressed = function(direction) {
  this.arrowPressed = direction;
  $('#' + direction).addClass('active-key');
};

const clearArrowPressed = function() {
  this.arrowPressed = null;
  $('button').removeClass('active-key');
};

const setRobotCommand = function() {
  if(this.controlMode === 'pan-tilt') {
    this.robotCommand = this.arrowPressed;
  } else {
    switch(this.arrowPressed) {
      
    case 'left': // left
      this.robotCommand = 'spin left';
      break;

    case 'up': // up
      this.robotCommand = 'move forward';
      break;

    case 'right': // right
      this.robotCommand = 'spin right';
      break;

    case 'down': // down
      this.robotCommand = 'move backward';
      break;
    }
  }
  console.log('ROBOT COMMAND:',this.robotCommand);
};

const clearRobotCommand = function() {
  this.robotCommand = null;
  console.log('ROBOT COMMAND:','none at this time');
};

export default {
  robotCommand,
  controlMode,
  arrowPressed,
  setControlMode,
  setArrowPressed,
  clearArrowPressed,
  setRobotCommand,
  clearRobotCommand
};
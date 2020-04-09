const api = require('./api');

let controlMode = 'pan-tilt';
let arrowPressed = null;  
let robotCommand = 'none';


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
  api.sendCommandToRobot(this.robotCommand);
  $('#current-command-value').text(this.robotCommand);
};

const clearRobotCommand = function() {
  this.robotCommand = 'none';
  api.sendCommandToRobot(this.robotCommand);
  $('#current-command-value').text(this.robotCommand);
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
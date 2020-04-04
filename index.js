import state from './state.js';

const endCurrentOperation = function() {
  if(state.arrowPressed) {
    state.clearArrowPressed();
    state.clearRobotCommand();
  }
};

const handlePanTiltModeChecked = function() {
  $('#pan-tilt-mode').change(() => {
    if (state.controlMode === 'pan-tilt') return;
    state.setControlMode('pan-tilt');
  });
};

const handleManeuverModeChecked = function() {
  $('#maneuver-mode').change(() => {
    if (state.controlMode === 'maneuver') return;
    state.setControlMode('maneuver');
  });
};

const handleArrowButtonMouseDown = function() {
  $('button').mousedown((e) => {
    if(state.arrowPressed) return;
    let direction = $(e.target).closest('button').attr('id');
    state.setArrowPressed(direction);
    state.setRobotCommand();
  });
};

const handleArrowButtonMouseUp = function() {
  $('button').mouseup(endCurrentOperation);
};

const handleArrowButtonMouseLeave = function() {
  $('button').mouseleave(endCurrentOperation);
};

const handleArrowKeyDown = function() {
  $(document).keydown((e) => {
    if(state.arrowPressed) return;
    switch(e.which) {
      
    case 37: // left
      state.setArrowPressed('left');
      break;

    case 38: // up
      state.setArrowPressed('up');
      break;

    case 39: // right
      state.setArrowPressed('right');
      break;

    case 40: // down
      state.setArrowPressed('down');
      break;

    default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    state.setRobotCommand();
  });
};

const handleArrowKeyUp = function() {
  $(document).keyup((e) => {
    if (e.which >= 37 || e.which <= 40) {
      endCurrentOperation();
    }
  });
};


const bindEventHandlers = function() {
  handlePanTiltModeChecked();
  handleManeuverModeChecked();
  handleArrowButtonMouseDown();
  handleArrowButtonMouseUp();
  handleArrowButtonMouseLeave();
  handleArrowKeyDown();
  handleArrowKeyUp();
};

const main = function() {
  bindEventHandlers();
};

$(main);
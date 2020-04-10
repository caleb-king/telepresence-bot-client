import state from './state.js';

const endCurrentOperation = function() {
  if(state.arrowPressed) {
    state.clearArrowPressed();
    state.clearRobotCommand();
  }
};

const hidePanControls = function() {
  $('#left').addClass('hide');
  $('#right').addClass('hide');
};

const showPanControls = function() {
  $('#left').removeClass('hide');
  $('#right').removeClass('hide');
};

const handlePanTiltModeChecked = function() {
  $('#pan-tilt-mode').change(() => {
    if (state.controlMode === 'pan-tilt') return;
    state.setControlMode('pan-tilt');
    hidePanControls();
  });
};

const handleManeuverModeChecked = function() {
  $('#maneuver-mode').change(() => {
    if (state.controlMode === 'maneuver') return;
    state.setControlMode('maneuver');
    showPanControls();
  });
};

const handleSpacebarUp = function() {
  $(document).keyup((e) => {
    if (e.which === 32) {
      e.preventDefault();
      if (state.controlMode === 'maneuver') {
        state.setControlMode('pan-tilt');
        $('#pan-tilt-mode').prop('checked', true);
        $('#maneuver-mode').prop('checked', false);
        hidePanControls();
      } else {
        state.setControlMode('maneuver');
        $('#pan-tilt-mode').prop('checked', false);
        $('#maneuver-mode').prop('checked', true);
        showPanControls();
      }
    }
  });
};

const handleArrowButtonMouseDown = function() {
  $('button').on('mousedown touchstart', (e) => {
    e.preventDefault();
    if(state.arrowPressed) return;
    let direction = $(e.target).closest('button').attr('id');
    state.setArrowPressed(direction);
    state.setRobotCommand();
  });
};

const handleArrowButtonMouseUp = function() {
  $('button').on('mouseup mouseleave touchend', endCurrentOperation);
};

// const handleArrowButtonMouseLeave = function() {
//   $('button').mouseleave(endCurrentOperation);
// };

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
    if (e.which === 37 && state.arrowPressed !== 'left') return;
    if (e.which === 38 && state.arrowPressed !== 'up') return;
    if (e.which === 39 && state.arrowPressed !== 'right') return;
    if (e.which === 40 && state.arrowPressed !== 'down') return;  
    endCurrentOperation();
  });
};


const bindEventHandlers = function() {
  handlePanTiltModeChecked();
  handleManeuverModeChecked();
  handleSpacebarUp();
  handleArrowButtonMouseDown();
  handleArrowButtonMouseUp();
  // handleArrowButtonMouseLeave();
  handleArrowKeyDown();
  handleArrowKeyUp();
};

const main = function() {
  bindEventHandlers();
};

$(main);
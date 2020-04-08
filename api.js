const BASE_URL = 'http://localhost:8000/';

const sendCommandToRobot = function(command) {
  console.log('sent command "'+command+'" to bot');
  
  let error;
  
  return fetch(BASE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ command }),
  })
    .then((response) => {
      if (!response.ok) {
        // if response is not 2xx, start building error object
        error = { code: response.status };
      }
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default {
  sendCommandToRobot,
};
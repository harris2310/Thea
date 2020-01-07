const API_URL =  'http://localhost:5000/api/v1/messages' 

export function getMarkers() {
  return fetch(API_URL)
    .then(res => res.json())
    .then(messages => {
      const haveSeenLocation = {};
      return messages.reduce((all, message) => {
        const key = `${message.latitude}${message.longitude}`;
        if (haveSeenLocation[key]) {
          haveSeenLocation[key].otherMessages = haveSeenLocation[key].otherMessages || [];
          haveSeenLocation[key].otherMessages.push(message);
        } else {
          haveSeenLocation[key] = message;
          all.push(message);
        }
        return all;
      }, []);
    });
}

export function getImages() {
  return fetch(API_URL + '/uploads')
}

export function sendMarker(fd) {
  return fetch(API_URL, {
    method: 'POST',
    body: fd,
  }).then(res => res.json());
}


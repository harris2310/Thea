const dataURL = 'http://localhost:5000/messages';
//const imageURL = 'http://localhost:5000/messages/files/';



const apiGetCall = async (dataURL) => {
  const response = await fetch(dataURL, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json();
}

/*
const apiGetImagesCall = async (imageURL) => {
  const response = await fetch(imageURL, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json();
}
*/

const dataCall = async () => {
  const messages = await apiGetCall(dataURL);
  //const images = await apiGetImagesCall(imageURL);
  return messages;
  }

const apiPostCall = async (e, dataURL, formData) => {
  e.preventDefault();
  console.log(formData.message);
  const response = await fetch(dataURL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: formData,
  });
  return response;
}

const imageCall = async (e) => {
  const res = await(fetch(dataURL + '/images/' + e.target.options.imageName), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    body: e.target.options.imageName,
  });
  return res;
}


export {dataCall, apiPostCall, imageCall};
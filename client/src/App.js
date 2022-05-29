import React, {useState, useEffect} from 'react';
import './App.css';
import MapComp from './components/MapComp.js';
import LandingPage from './components/LandingPage.js';
import uuid from 'react-uuid'
import {apiPostCall, imageCall} from './Api';
//COMMENT FOR CLIENT ONLY
import {dataCall} from './Api';

const URL = 'http://localhost:5000/messages';


const App = () => {
  const [clicked, setClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [imageFetched, setImageFetched] = useState(false);
  const [stored, setStored] = useState([]);
  const [inputImageName, setInputImageName] = useState('');
  const [messages, setMessages] = useState(null);
  const [pos, setPos] = useState(null);

//COMMENT FOR CLIENT ONLY
   useEffect(() => {
    async function fetchToApi() {
      const messagesToState = await dataCall();
      setMessages(messagesToState);
    }
    fetchToApi();
  }, []);  



  
  const handleImageFetch = (e) => {
    console.log(e)
    async function fetchToApiImage(e) {
      const imageToState = await imageCall(e);
      setInputImage(imageToState);
      setImageFetched(true);
    }
    fetchToApiImage(e);
  }
  

  const handleClicked = () => {
    setClicked(true);
  }

  const handlePos = e => {
    let value = e.latlng;
    setPos(value);
    console.log(pos);
  }

  const handleInputChange = (e) => {
    e.persist();
    setInputValue(e.target.value);
  }

  const  handleFileSelected = (e) => {
    setInputImageName(e.target.files[0].name);
    setInputImage(e.target.files[0]);
  }


  const handleFormSubmit = (e) => {
    const latlngBef = [pos];
    const latlng = JSON.stringify(latlngBef);
    const formData = new FormData();
    formData.append('latlng', latlng);
    formData.append('message', inputValue);
    formData.append('uniqueId', uuid());
    formData.append('image', inputImage);
    apiPostCall(e, URL, formData).then((res) => {
      if(res.status=='200') {
        console.log('success');
      } else {
        console.log('failed');
      }});
  }


  return (
    <div>
      {clicked ? <MapComp 
                  stored={stored}
                  messages={messages}
                  inputValue={inputValue}
                  imageFetched={imageFetched}
                  setStored={setStored}
                  setImageFetched={setImageFetched}
                  handleFormSubmit={handleFormSubmit}
                  handleInputChange={handleInputChange}
                  handleFileSelected={handleFileSelected}
                  handleImageFetch={handleImageFetch}
                  handlePos={handlePos}
                  pos={pos}
                  />
               : <LandingPage handleClicked={handleClicked} />} 
    </div>
  )
}


export default App;

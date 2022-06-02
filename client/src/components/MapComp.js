import React, {useRef} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import SideBar from './SideBar';
import '../App.css';
import { RotatingSquare  } from  'react-loader-spinner'
import { iconPerson, iconNew} from '../popupStyle';
import { Checkmark } from "react-checkmark";



const MapComp = (props) => {

  const fileInputRef=useRef();
  

  return (
    <div>
      <Map center={[0,0]} zoom={3} minZoom={3} maxBounds={[[-115, -195], [130, 225]]} onClick={props.handlePos}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.messages.map((i) => (
            <Marker 
                  key={i.uniqueId} 
                  position={[i.latlng[0].lat, i.latlng[0].lng]} 
                  icon={iconPerson} 
                  >
              <Popup>
                <div>
                    <div style={{display: props.stored.includes(i.uniqueId) ? 'block' : 'none'}}>
                      <p className='message'>
                        {i.message}
                      </p>
                      <div className='images'>
                        <img 
                          onLoad={() => {
                            props.setStored([...props.stored, i.uniqueId])
                          }} 
                          className='images' 
                          src={i.url}
                        />
                      </div>
                    </div>
                    {!props.stored.includes(i.uniqueId) && <div className='loader'>
                                                             <RotatingSquare color="#EE6C4D"  height={80} width={80} />
                                                           </div>
                    }
                </div>
              </Popup>
            </Marker>
        ))}
        {props.pos != null ? 
          <Marker key={props._id} position={props.pos} icon={iconNew}>
            <Popup className='popup'>
              <form onSubmit={props.formValidation}>
                <h3>Your message:</h3>
                <textarea  
                          value={props.inputValue} 
                          onChange={props.handleInputChange}
                          rows='5'
                          cols='10'
                          required={true}
                          />
                  <div className='file-button' type='button'  onClick={()=>fileInputRef.current.click()}>
                  {props.imageLoaded == false && 'Choose your photo'}
                  {props.imageLoaded == true && <div className='file-name'>{props.inputImageName}</div>}
                  </div>
                  {(props.imageLoaded == false && props.imageSubmitted == false) 
                                  ? <p className='error-message'>Please choose a photo</p>
                                  : ''
                                   }
                  {props.imageSubmitted == true && <Checkmark className='checkmark' size={'40'} />}
                  <input 
                         type='file'
                         accept='image/*' 
                         ref={fileInputRef}
                         onChange={props.handleFileSelected} 
                         hidden
                         />
                <div className='button-container'>
                  <button  className='spacing-button' type="submit">Upload</button>
                </div>
              </form>
            </Popup>
          </Marker> : ''}
      </Map>
      <SideBar />
    </div>
  )
}

export default MapComp;
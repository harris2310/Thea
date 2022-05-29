import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import SideBar from './SideBar';
import '../App.css';
import { RotatingSquare  } from  'react-loader-spinner'
import { iconPerson, iconNew} from '../popupStyle';
import Basic from './chooseFile';



const MapComp = (props) => {
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
            <Popup>
              <form onSubmit={props.handleFormSubmit}>
                <h3>Your message:</h3>
                <textarea maxLength='60'  
                          required={true} 
                          value={props.inputValue} 
                          onChange={props.handleInputChange}
                          rows='5'
                          cols='10'
                          />
                <label className="button-upload">
                    Browse <input type="file" style={{display: 'none'}} onClick={props.handlefileSelected} required />
                </label>
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
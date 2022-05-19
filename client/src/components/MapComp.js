import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../App.css';



const iconPerson = new L.Icon({
    iconUrl: require('../images/marker.png'),
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-7, -40] // point from which the popup should open relative to the iconAnchor
});




const MapComp = (props) => {
  return (
    <div>
      <Map center={[0,0]} zoom={3} onClick={props.handlePos}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.messages.map((i) => (
            <Marker imageName={i.url} key={i.uniqueId} position={[i.latlng[0].lat, i.latlng[0].lng]} icon={iconPerson} onClick={props.handleImageFetch}>
              <Popup>
                <div className='popup'>
                  {i.message}
                  <div className='images'>
                    <img className='images' src={i.url}/>
                  </div>
                </div>
              </Popup>
            </Marker>
        ))}
        {props.pos != null ? 
          <Marker key={props._id} position={props.pos} icon={iconPerson}>
            <Popup>
              <form onSubmit={props.handleFormSubmit}>
                <textarea value={props.inputValue} onChange={props.handleInputChange}/>
                <input type="file" className='text-spacing' onChange={props.handleFileSelected}/>
                <button type="submit">Upload</button>
              </form>
            </Popup>
          </Marker> : ''}
      </Map>
    </div>
  )
}

export default MapComp;
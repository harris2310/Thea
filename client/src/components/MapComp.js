import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import SideBar from './SideBar';
import '../App.css';



const iconPerson = new L.Icon({
    iconUrl: require('../images/marker.png'),
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-7, -40] // point from which the popup should open relative to the iconAnchor
});

const iconNew = new L.Icon({
  iconUrl: require('../images/markerNew.png'),
  iconSize:     [23.5, 35], // size of the icon
  iconAnchor:   [15, 43], // point of the icon which will correspond to marker's location
  popupAnchor:  [-5, -45] // point from which the popup should open relative to the iconAnchor
});



const MapComp = (props) => {
  return (
    <div>
      <Map center={[0,0]} zoom={3} minZoom={3} maxBounds={[[-115, -195], [130, 225]]} onClick={props.handlePos}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.messages.map((i) => (
            <Marker imageName={i.url} key={i.uniqueId} position={[i.latlng[0].lat, i.latlng[0].lng]} icon={iconPerson} onClick={props.handleImageFetch}>
              <Popup closeButton={false} className='popup'>
                <div>
                  <h2>
                    Name's Message:
                  </h2>
                  <p className='message'>
                    {i.message}
                  </p>
                  <div className='images'>
                    <img className='images' src={i.url}/>
                  </div>
                </div>
              </Popup>
            </Marker>
        ))}
        {props.pos != null ? 
          <Marker key={props._id} position={props.pos} icon={iconNew}>
            <Popup closeButton={false}>
              <form onSubmit={props.handleFormSubmit}>
                <textarea value={props.inputValue} onChange={props.handleInputChange}/>
                <input type="file" className='text-spacing' onChange={props.handleFileSelected}/>
                <button type="submit">Upload</button>
              </form>
            </Popup>
          </Marker> : ''}
      </Map>
      <SideBar />
    </div>
  )
}

export default MapComp;
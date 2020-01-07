/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Map,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import L from 'leaflet'
import { Form, Input , Label, CustomInput} from 'reactstrap';

import MarkerURL from '../icons/marker.svg'
import PopupForm from './PopupForm'
import '../App.css';
import { FormGroup, Button } from 'react-bootstrap';
import { getMarkers } from '../Api';

const myMarker = L.icon({
  iconUrl: MarkerURL,
  iconSize:     [38, 95], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-4, -69] // point from which the popup should open relative to the iconAnchor
});


class TileMap extends Component {
  render() {
    return (
      <div>
        <Map
          className="Map"
          zoom={2}
          center={[0, 25]}
          onClick={this.props.addMarker}
          minZoom={2}
          maxZoom={18}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.props.messages.map(message =>
            <Marker key={message._id} position={[message.latitude, message.longitude]} icon={myMarker}>
              <Popup>
                {message['message']}
              </Popup>
            </Marker>
          )} 
          {
            this.props.addedMarkerBool ?
            this.props.addedMarker.map((position, idx) =>
              <Marker key={`marker-${idx}`} position={position} icon={myMarker}>
                <Popup>
                  <PopupForm handleChange={this.props.handleChange}
                            imageSubmitted={this.props.imageSubmitted}
                            formSubmitted={this.props.formSubmitted} />
                </Popup>
              </Marker>
            )
          : null }
        </Map>
      </div>
    );
  }
}

export default TileMap;

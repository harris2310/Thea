/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';
import TileMap from './components/Map';
import LandingPage from './components/LandingPage';
import { getMarkers, sendMarker, getImages } from './Api';


class App extends Component {
  state = {
    userIn: false,
    addedMarker: [],
    addedMarkerBool: false,
    allMarkers: [],
    message: '',
    imageFile: null,
    sendingMarker: false,
    sentMarker: false,
    images: []
  }

  componentDidMount() {
    getMarkers()
      .then(messages => {
        this.setState({
          messages
        });
      });
  }

  addMarker = (e) => {
    let marker = [e.latlng];
    this.setState((state) => ({
      addedMarker: marker,
      addedMarkerBool: true,
    }))
  }

  handleChange = (e) => {
    const val = e.target.value
    this.setState((state) => ({
      message: val
    }))
  }

  imageSubmitted = (e) => {
    const val = e.target.files[0]
    this.setState((state) => ({
      imageFile: val
    }))
  }

  handleClick = () => {
    this.setState((state) => ({
      userIn: true
    }))
  }

  formSubmitted = (event) => {
    event.preventDefault()
    this.setState({
      sendingMarker: true
    });

    const messages = {
      message: this.state.message,
      latitude: this.state.addedMarker[0]['lat'],
      longitude: this.state.addedMarker[0]['lng'],
      imageFile: this.state.imageFile
    };

    const fd = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    fd.append('message', this.state.message);
    fd.append('latitude', this.state.addedMarker[0]['lat']);
    fd.append('longitude', this.state.addedMarker[0]['lng']);
    fd.append('imageFile', this.state.imageFile);

    sendMarker(fd) 
      .then((result) => {
        setTimeout(() => {
          this.setState({
            sendingMarker: false,
            sentMarker: true
          });
        }, 4000);
      });
  }

  formIsValid = () => {
    let { message, imageFile } = this.state;
    const validForm = message.length > 0 && message.length <= 100 && imageFile != null;
    return validForm ? true : false;
  }

  render() {
    let { userIn } = this.state;
    return (
      <div className="App">
        {userIn ? <TileMap addMarker={this.addMarker}
                           handleChange={this.handleChange}
                           imageSubmitted={this.imageSubmitted}
                           formSubmitted={this.formSubmitted}
                           addedMarker = {this.state.addedMarker}
                           addedMarkerBool = {this.state.addedMarkerBool}
                           allMarkers = {this.state.allMarkers}
                           messages = {this.state.messages} />
                           : <LandingPage handleClick={this.handleClick} />}
      </div>
    );
  }
}

export default App;

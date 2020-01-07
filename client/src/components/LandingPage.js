import React, { Component } from 'react';
import '../LandingPage.css';
import GlobeURL from '../icons/globe.png';
import { Container, Row, Col } from 'reactstrap';
import { Button, Card, Image } from 'react-bootstrap';
import MapURL from '../icons/map.jpg';
import HarrisURL from '../icons/harris.jpg'
import WoodURL from '../icons/wood.jpg'



class LandingPage extends Component {
  componentDidMount() {
    
  }

  render() {
    const woodstyle = {
      backgroundImage: `url(${WoodURL})`,
      height: "535px",
    }
    return(
      <div className="bb">
        <Container>
          <div className="Bc">
            <div style={woodstyle}>
              <h1>THEA</h1>
              <div>
                <img src={GlobeURL} className="Space"/>
              </div>
              <div className="boxp">
                <p>Thea is a web app made for people to post beautiful views and pin their location on the world map! </p>
              <div className="Space">
                <Button onClick={this.props.handleClick} variant="dark">Get Started</Button>
              </div>
              </div>
            </div>
            <div id="Harris">
              <h2>The developer:</h2>
              <Image src={HarrisURL} className="Imagemarg" height="300" roundedCircle />
              <p>Harris is a software developer for 2 days. Mainly coding in react!</p>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}


export default LandingPage;
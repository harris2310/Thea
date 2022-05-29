
import L from 'leaflet';

const popupContent = {
  textAlign: "center",
  height: "600px",
  marginTop: "30px",
  backgroundColor: "#293241",
};
const popupHead = {
  fontWeight: "bold",
  fontSize: "22px"
};

const popupText = {
  fontSize: "15px",
  marginBottom: "20px"
};

const okText = {
  fontSize: "15px"
};



const iconPerson = new L.Icon({
    iconUrl: require('./images/orange-marker.png'),
    iconSize:     [23.5, 35], // size of the icon
    iconAnchor:   [15, 43], // point of the icon which will correspond to marker's location
    popupAnchor:  [-5, -45] // point from which the popup should open relative to the iconAnchor
});

const iconNew = new L.Icon({
  iconUrl: require('./images/blue-marker.png'),
  iconSize:     [23.5, 35], // size of the icon
  iconAnchor:   [15, 43], // point of the icon which will correspond to marker's location
  popupAnchor:  [-5, -45] // point from which the popup should open relative to the iconAnchor
});

export { popupContent, popupHead, popupText, okText, iconPerson, iconNew }
import { geolocated } from 'react-geolocated'
import { Component } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { FaCircle } from 'react-icons/lib/fa'
const token = 'pk.eyJ1IjoibWFjY3liZXIiLCJhIjoiY2ppMGR4MGszMDA4ZzNwczdlbDRocmwyMSJ9.ey1URzpaVGR2MkBfhLoSrQ'

class Map extends Component {
  constructor (props) {
    super(props)
    const latitude = props.coords && props.coords.latitude ? props.coords.latitude : 63.4973838
    const longitude = props.coords && props.cords.longitude ? props.cords.longitude : 0.1140052
    this.state = {
      viewport: {
        width: 800,
        height: 400,
        latitude,
        longitude,
        zoom: 3
      }
    }
  }

  renderPopup() {
    const { popupInfo } = this.state
    return popupInfo && (
      <Popup tipSize={5}
        anchor='top'
        latitude={59.2663054}
        longitude={9.2235048}
        offsetLeft={-12}
        onClose={() => this.setState({popupInfo: false})}
      >
        <div width='240px'>HELLO</div>
      </Popup>
    )
  }

  render () {
    const { latitude, longitude, viewport, show } = this.state
    const lat = parseFloat(latitude) || 59.2663054
    const long = parseFloat(longitude) || 9.2235048
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={token}
          onViewportChange={(viewport) => this.setState({viewport})}
          mapStyle='mapbox://styles/mapbox/dark-v9'
        >
          <Marker latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10} captureClick={false}>
            <span onClick={() => this.setState({popupInfo: true})}>
              <FaCircle style={{ color: '#6ee86e' }} />
            </span>
          </Marker>
          {this.renderPopup()}
        </ReactMapGL>
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Map)

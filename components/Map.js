import { geolocated } from 'react-geolocated'
import {Component} from 'react'
import ReactMapGL from 'react-map-gl'
const token = 'pk.eyJ1IjoibWFjY3liZXIiLCJhIjoiY2ppMGR4MGszMDA4ZzNwczdlbDRocmwyMSJ9.ey1URzpaVGR2MkBfhLoSrQ'

class Map extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      viewport: {
        width: 800,
        height: 400,
        latitude: 63.4973838,
        longitude: 0.1140052,
        zoom: 3
      }
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={token}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
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


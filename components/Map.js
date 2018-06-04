import { geolocated } from 'react-geolocated'
import { Component, Fragment } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { FaCircle } from 'react-icons/lib/fa'
const token = 'pk.eyJ1IjoibWFjY3liZXIiLCJhIjoiY2ppMGR4MGszMDA4ZzNwczdlbDRocmwyMSJ9.ey1URzpaVGR2MkBfhLoSrQ'

const InfoBox = () => (
  <div className='info-box'>
    <div style={{ textAlign: 'left' }}>
      <FaCircle style={{ color: '#990099', border: '1px #dddddd solid', borderRadius: '10px' }} /> Svært høy<br />
      <FaCircle style={{ color: '#ff0000', border: '1px #dddddd solid', borderRadius: '10px' }} /> Høy<br />
      <FaCircle style={{ color: '#ff9900', border: '1px #dddddd solid', borderRadius: '10px' }} /> Moderat<br />
      <FaCircle style={{ color: '#6ee86e', border: '1px #dddddd solid', borderRadius: '10px' }} /> Lite<br />
      <FaCircle style={{ color: '#FFFFFF', border: '1px #dddddd solid', borderRadius: '10px' }} /> Ingen data<br />
    </div>
    <style jsx>
      {`
        .info-box {
          position: absolute;
          top: 0;
          right: 0;
          max-width: 320px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          padding: 12px 24px;
          margin: 20px;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          text-transform: uppercase;
          outline: none;
        }
      `}
    </style>
  </div>
)

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
    this.resize = this.resize.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize () {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth - 10,
        height: this.props.height || window.innerHeight - 200
      }
    })
  }

  renderPopup () {
    const { popupInfo } = this.state
    return popupInfo && (
      <Popup tipSize={5}
        anchor='top'
        latitude={59.2663054}
        longitude={9.2235048}
        offsetLeft={-12}
        onClose={() => this.setState({popupInfo: false})}
      >
        <div width='240px'>
          <b style={{ fontSize: '14px' }}>FURULUND</b><br /><br />
          <div style={{ color: '#333333', fontSize: '12px', textAlign: 'left' }}>
            <FaCircle style={{ color: '#6ee86e' }} /> PM10: 23.0 µg/m³<br />
            <FaCircle style={{ color: '#6ee86e' }} /> PM2.5: 4.9 µg/m³<br />
            <FaCircle style={{ color: '#6ee86e' }} /> NO2: 5.1 µg/m³
          </div>
        </div>
      </Popup>
    )
  }

  render () {
    const { latitude, longitude, viewport } = this.state
    const lat = parseFloat(latitude) || 59.2663054
    const long = parseFloat(longitude) || 9.2235048
    return (
      <Fragment>
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
          <InfoBox />
        </ReactMapGL>
      </Fragment>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Map)

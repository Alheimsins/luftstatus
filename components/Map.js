import { geolocated } from 'react-geolocated'
import { Component, Fragment } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { FaCircle } from 'react-icons/lib/fa'
import axios from 'axios'
const URL = 'https://api.nilu.no/aq/utd.json'
const token = 'pk.eyJ1IjoibWFjY3liZXIiLCJhIjoiY2ppMGR4MGszMDA4ZzNwczdlbDRocmwyMSJ9.ey1URzpaVGR2MkBfhLoSrQ'

const InfoBox = () => (
  <div className='info-box'>
    <div style={{ textAlign: 'left' }}>
      <FaCircle className='faa-pulse animated-hover' style={{ color: '#990099', border: '1px #dddddd solid', borderRadius: '10px' }} /> Svært høy<br />
      <FaCircle className='faa-pulse animated-hover' style={{ color: '#ff0000', border: '1px #dddddd solid', borderRadius: '10px' }} /> Høy<br />
      <FaCircle className='faa-pulse animated-hover' style={{ color: '#ff9900', border: '1px #dddddd solid', borderRadius: '10px' }} /> Moderat<br />
      <FaCircle className='faa-pulse animated-hover' style={{ color: '#6ee86e', border: '1px #dddddd solid', borderRadius: '10px' }} /> Lite<br />
      <FaCircle className='faa-pulse animated-hover' style={{ color: '#FFFFFF', border: '1px #dddddd solid', borderRadius: '10px' }} /> Ingen data<br />
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

const Markers = ({ popupInfo, data }) => {
  const lat = 59.2663054
  const long = 9.2235048
  return (
    data.filter(item => item.component === 'PM2.5').map((item, i) => (
      <Marker key={i} latitude={item.latitude} longitude={item.longitude} offsetLeft={-20} offsetTop={-10} captureClick={false}>
        <span onClick={() => popupInfo({ lat: item.latitude, long: item.longitude, title: item.station })}>
          <FaCircle className={ item.color === '990099' || item.color === 'ff0000' ? 'faa-flash animated' : 'faa-pulse animated-hover'} style={{ color: item.color }} />
        </span>
      </Marker>
    ))
  )
}

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
    this.popupInfo = this.popupInfo.bind(this)
  }

  async componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
    try {
      const {data} = await axios.get(URL)
      this.setState({ data, error: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  popupInfo({ lat, long, title }) {
    this.setState({popupInfo: true, lat, long, title })
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
    const { popupInfo, lat, long, title } = this.state
    return popupInfo && (
      <Popup tipSize={5}
        anchor='top'
        latitude={lat}
        longitude={long}
        offsetLeft={-12}
        onClose={() => this.setState({popupInfo: false})}
      >
        <div width='240px'>
          <div style={{ fontSize: '14px', marginBottom: '3px' }}>{title.toUpperCase()}</div>
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
    const { latitude, longitude, viewport, data } = this.state
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
          { data && <Markers popupInfo={this.popupInfo} data={data}/> }
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

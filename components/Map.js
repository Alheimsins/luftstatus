import { Component, Fragment } from 'react'
import getConfig from 'next/config'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { FaCircle } from 'react-icons/lib/fa'
import stylesheet from 'mapbox-gl/dist/mapbox-gl.css'
import getData from '../lib/get-data'

const { publicRuntimeConfig: { TOKEN, URL_STATIONS } } = getConfig()

const GlobalStyle = () => (
  <Fragment>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style jsx global>
      {`
        .mapboxgl-ctrl-logo {
          display: none !important;
        }
        {
        .mapboxgl-canvas {
          position: unset !important;
        }
        .overlays {
          cursor: grab !important;
        }
        .mapboxgl-marker:hover {
          cursor: pointer;
        }
        .mapboxgl-ctrl-bottom-right {
          display: none;
        }
        .toTop {
          z-index: 1000;
        }
        .mapboxgl-popup {
          z-index: 2000;
        }
      `}
    </style>
  </Fragment>
)

const InfoBox = () => (
  <div className='info-box' style={{ zIndex: 2000 }} >
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
  return (
    data.map((item, i) => (
      <Marker key={i} latitude={item.latitude} longitude={item.longitude} offsetLeft={-20} offsetTop={-10} captureClick={false} className={item.color !== 'FFFFFF' && item.color !== '6ee86e' ? 'toTop' : ''}>
        <span onClick={() => popupInfo({ lat: item.latitude, long: item.longitude, title: item.station, components: item.data })}>
          <FaCircle className={item.color === '990099' || item.color === 'ff0000' ? 'faa-flash animated' : 'faa-pulse animated-hover'} style={{ color: item.color }} />
        </span>
      </Marker>
    ))
  )
}

export default class Map extends Component {
  constructor (props) {
    super(props)
    const latitude = props.coords && props.coords.latitude ? props.coords.latitude : 62.6321649
    const longitude = props.coords && props.cords.longitude ? props.cords.longitude : 6.4374272
    this.state = {
      viewport: {
        width: 800,
        height: 400,
        latitude,
        longitude,
        zoom: 3,
        minZoom: 3
      }
    }
    this.resize = this.resize.bind(this)
    this.popupInfo = this.popupInfo.bind(this)
  }

  async componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
    this.interval = setInterval(() => this.tick(), 30000)
    try {
      const { stations: data } = await getData(URL_STATIONS)
      this.setState({ data, error: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  async tick () {
    try {
      const { stations: data } = await getData(URL_STATIONS)
      this.setState({ data, error: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
    clearInterval(this.interval)
  }

  popupInfo ({ lat, long, title, components }) {
    this.setState({ popupInfo: true, lat, long, title, components })
  }

  resize () {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth - 30,
        height: this.props.height || window.innerHeight - 200
      }
    })
  }

  renderPopup () {
    const { popupInfo, lat, long, title, components } = this.state
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
            {
              components && components.map(item =>
                <Fragment key={item.station + item.component}><FaCircle style={{ color: item.color }} /> {item.component}: {item.value.toFixed(2)} {item.unit}<br /></Fragment>
              )
            }
          </div>
        </div>
      </Popup>
    )
  }

  render () {
    const { viewport, data } = this.state
    return (
      <Fragment>
        <link rel='stylesheet' href='/static/font-awesome-animation.min.css' media='none' />
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={TOKEN}
          onViewportChange={(viewport) => this.setState({viewport})}
          mapStyle='mapbox://styles/mapbox/dark-v9'
        >
          { data && <Markers popupInfo={this.popupInfo} data={data} /> }
          {this.renderPopup()}
          <InfoBox />
        </ReactMapGL>
        <GlobalStyle />
      </Fragment>
    )
  }
}

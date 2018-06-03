import { Fragment, Component } from 'react'
import { geolocated } from 'react-geolocated'
import { FaCircle } from 'react-icons/lib/fa'
import { Loading, Layout } from '../components/alheimsins'
import axios from 'axios'
const URL = 'https://api.nilu.no/aq/utd.json'

const ColorDescription = () => (
  <span style={{ textAlign: 'left' }}>
    <FaCircle style={{ color: '#990099', border: '1px #dddddd solid', borderRadius: '10px' }} /> Svært høy<br />
    <FaCircle style={{ color: '#ff0000', border: '1px #dddddd solid', borderRadius: '10px' }} /> Høy<br />
    <FaCircle style={{ color: '#ff9900', border: '1px #dddddd solid', borderRadius: '10px' }} /> Moderat<br />
    <FaCircle style={{ color: '#6ee86e', border: '1px #dddddd solid', borderRadius: '10px' }} /> Lite<br />
    <FaCircle style={{ color: '#FFFFFF', border: '1px #dddddd solid', borderRadius: '10px' }} /> Ingen data<br />
  </span>
)

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    try {
      const {data} = await axios.get(URL)
      this.setState({ data, error: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  render () {
    const {data, error} = this.state
    const {coords} = this.props
    return (
      <Layout>
        <div className='grid-container'>
          <div className='grid-item'>
            <ColorDescription />
          </div>
          { coords && !coords.latitude && <p>Your position: {coords.latitude} - {coords.longitude}</p> }
          <div className='grid-container-status'>
            {
              data
                ? data.map((item, i) =>
                  <Fragment key={i}>
                    <div>
                      {item.area} {item.station} {item.component} {' '}
                    </div>
                    <div>
                      <FaCircle style={{ color: `${item.color}`, border: '1px #dddddd solid', borderRadius: '10px' }} />
                    </div>
                  </Fragment>)
                : <Loading />
            }
            {
              error && <div>{error}</div>
            }
          </div>
        </div>
        <style jsx>
          {`
            .grid-container {
              display: grid;
              text-align: left;
              grid-template-columns: auto auto;
              grid-gap: 10%;
            }
            .grid-container-status {
              display: grid;
              text-align: left;
              grid-template-columns: auto auto;
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Index)

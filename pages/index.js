import { Component } from 'react'
import { geolocated } from 'react-geolocated'
import { FaCircle } from 'react-icons/lib/fa'
import { Loading, Layout } from '../components/alheimsins'
import axios from 'axios'
const URL = 'https://api.nilu.no/aq/utd.json'

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
        { coords && coords.latitude && <p>Your position: {coords.latitude} - {coords.longitude}</p> }
        {
          data
            ? data.map((item, i) =>
              <div key={i}>
                {item.area} {item.station} {item.component} {' '}
                <FaCircle style={{ color: `${item.color}` }} />
              </div>)
            : <Loading />
        }
        {
          error && <div>{error}</div>
        }
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

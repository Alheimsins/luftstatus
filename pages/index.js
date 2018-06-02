import { Component, Fragment } from 'react'
import { FaCircle } from 'react-icons/lib/fa'
import { Loading } from '../components/alheimsins'
import axios from 'axios'
const URL = 'https://api.nilu.no/aq/utd.json'

export default class extends Component {
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
    return (
      <Fragment>
        {
          data
            ? data.map(item =>
              <div>
                {item.station}
                <FaCircle style={{ color: `${item.color}` }} />
              </div>)
            : <Loading />
        }
        {
          error && <div>{error}</div>
        }
      </Fragment>
    )
  }
}

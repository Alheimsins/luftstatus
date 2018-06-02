import { Component, Fragment } from 'react'
import { FaCircle } from 'react-icons/lib/fa'
import axios from 'axios'
const URL = 'https://api.nilu.no/aq/utd.json'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const {data} = await axios.get(URL)
    this.setState({ data })
  }

  render () {
    const {data} = this.state
    return (
      <Fragment>
        {
          data
            ? data.map(item =>
              <div>
                {item.station}
                <FaCircle style={{ color: `${item.color}` }} />
              </div>)
            : 'loading'
        }
      </Fragment>
    )
  }
}

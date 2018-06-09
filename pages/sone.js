import { Component, Fragment } from 'react'
import getData from '../lib/get-data'
import { Layout, Loading } from '../components/alheimsins'
import { FaCircle } from 'react-icons/lib/fa'

export default class Sone extends Component {
  constructor (props) {
    super(props)
    const id = props.query && props.query.id ? props.query.id : false
    this.state = {
      id
    }
  }

  async componentDidMount () {
    try {
      const { id } = this.state
      const { areas: data } = await getData()
      const { stations: filterStations } = data.find(item => item.municipality === id)
      this.setState({ data: filterStations, error: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  render () {
    const { id, data, error } = this.state
    return (
      <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.'>
        <h1>{ id }</h1>
        {
          data
            ? data.map((item, i) =>
              <Fragment key={i}>
                <div style={{ textAlign: 'left' }}>
                  <FaCircle style={{ color: `${item.color}`, border: '1px #dddddd solid', borderRadius: '10px', marginRight: '10px' }} />
                  {item.station}
                </div>
              </Fragment>)
            : error
              ? <div>{error}</div>
              : <Loading />
        }
      </Layout>
    )
  }
}

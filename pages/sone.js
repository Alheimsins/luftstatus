import { Component, Fragment } from 'react'
import getData from '../lib/get-data'
import getConfig from 'next/config'
import { Layout, Loading } from '../components/alheimsins'
import { FaCircle } from 'react-icons/lib/fa'
const { publicRuntimeConfig: { URL } } = getConfig()
const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1)

const Stations = ({ data }) => (
  <div className='grid-container'>
    {
      data.map((item, i) =>
        <div key={i} style={{ textAlign: 'left' }}>
          <h2>{item.station}</h2>
          {
            item.data.map((component, i) => (
              <Fragment key={i + component.component}>
                <FaCircle className='circle' style={{ color: `${component.color}`, border: '1px #dddddd solid', borderRadius: '10px', marginRight: '10px' }} />{component.component}
              </Fragment>
            ))
          }
        </div>
      )
    }
    <style jsx>
      {`
        .grid-container {
          display: grid;
          text-align: left;
          grid-template-columns: auto auto auto;
          grid-gap: 10px;
        }
      `}
    </style>
  </div>
)

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
      const { areas: data } = await getData(URL)
      const { stations: filterStations } = data.find(item => item.municipality.toLowerCase() === id)
      console.log(filterStations)
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
        <h1>{ capitalize(id) }</h1>
        {
          data
            ? <Stations data={data} />
            : error
              ? <div>{error}</div>
              : <Loading />
        }
      </Layout>
    )
  }
}

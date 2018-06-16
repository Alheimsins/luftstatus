import { Fragment, Component } from 'react'
import { geolocated } from 'react-geolocated'
import { FaCircle } from 'react-icons/lib/fa'
import { Layout, Loading, Link } from '../components/alheimsins'
import getConfig from 'next/config'
import getData from '../lib/get-data'
const { publicRuntimeConfig: { URL_AREAS } } = getConfig()

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
      const { areas: data } = await getData(URL_AREAS)
      this.setState({ data, error: false })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  render () {
    const { data, error } = this.state
    // const { coords } = this.props
    return (
      <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.'>
        <h1>Luftforurensning nå</h1>
        <div className='grid-container'>
          <div className='grid-item'>
            <ColorDescription />
          </div>
          <div className='grid-container-status'>
            {
              data
                ? data.map((item, i) =>
                  <Fragment key={i}>
                    <div>
                      <FaCircle style={{ color: `${item.color}`, border: '1px #dddddd solid', borderRadius: '10px', marginRight: '10px' }} />
                      <Link route='sone' params={{id: item.municipality.toLowerCase()}}><a>{item.municipality}</a></Link>
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
              grid-template-columns: 120px auto;
              grid-gap: 10px;
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

import { Fragment } from 'react'
import getData from '../lib/get-data'
import getConfig from 'next/config'
import { Layout, Link } from '../components/alheimsins'
import { FaCircle } from 'react-icons/fa'
const { publicRuntimeConfig: { URL } } = getConfig()
const capitalize = text => text ? text.charAt(0).toUpperCase() + text.slice(1) : false

const Stations = ({ data }) => (
  <div className='grid-container'>
    {
      data.map((item, i) =>
        <div key={i} style={{ textAlign: 'left' }}>
          <h2>
            {
              item.eoi
                ? <Link route='stasjon' params={{ id: item.eoi }}><a>{item.station}</a></Link>
                : item.station
            }
          </h2>
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

const Sone = ({ id, data, error }) => (
  <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.'>
    <h1>{ capitalize(id) }</h1>
    {
      data
        ? <Stations data={data} />
        : <div>{error}</div>
    }
  </Layout>
)

Sone.getInitialProps = async ({ query }) => {
  const id = query && query.id ? query.id : false
  let data, error
  try {
    const { areas } = await getData(URL)
    const { stations } = areas.find(item => item.municipality.toLowerCase() === id)
    data = stations
  } catch (err) {
    error = error.message
  }
  return { data, error }
}

export default Sone

import { Fragment } from 'react'
import getData from '../lib/get-data'
import getConfig from 'next/config'
import { Layout } from '../components/alheimsins'
import { FaCircle } from 'react-icons/fa'
const { publicRuntimeConfig: { URL_STATIONS } } = getConfig()

const Station = ({ data }) => (
  <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.'>
    <div>
      <h2>{data.station}</h2>
      {
        data.data.map((component, i) => (
          <Fragment key={i + component.component}>
            <FaCircle className='circle' style={{ color: `${component.color}`, border: '1px #dddddd solid', borderRadius: '10px', marginRight: '10px' }} />{component.component}: {component.value.toFixed(2)} {component.unit}
          </Fragment>
        ))
      }
      <div>time: {data.fromTime}</div>
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
  </Layout>
)

Station.getInitialProps = async ({ query }) => {
  const id = query && query.id ? query.id : false
  let data, error
  try {
    const { stations } = await getData(URL_STATIONS)
    data = stations.find(item => item.eoi === id)
    console.log(data)
  } catch (err) {
    error = error.message
  }
  return { data, error }
}

export default Station

import dynamic from 'next/dynamic'
import { Layout } from '../components/alheimsins'
import getData from '../lib/get-data'
import getConfig from 'next/config'

const { publicRuntimeConfig: { URL_STATIONS } } = getConfig()

const Map = dynamic(import('../components/Map'), { ssr: false })

const Kart = (props) => (
  <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.' theme='black'>
    <Map {...props} />
  </Layout>
)

Kart.getInitialProps = async () => {
  let data, err
  try {
    const { stations } = await getData(URL_STATIONS)
    data = stations
  } catch (error) {
    console.log(error)
    err = error.message
  }
  return { data, err }
}

export default Kart

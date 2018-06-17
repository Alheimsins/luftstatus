import dynamic from 'next/dynamic'
import { Layout } from '../components/alheimsins'
import getData from '../lib/get-data'
import getConfig from 'next/config'

const { publicRuntimeConfig: { TOKEN, URL_STATIONS } } = getConfig()

const Map = dynamic(import('../components/Map'), { ssr: false })

const Kart = (props) => (
  <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.' theme='black'>
    <Map {...props} />
  </Layout>
)

Kart.getInitialProps = async () => {
  let data, error
  try {
    const { stations } = await getData(URL_STATIONS)
    data = stations
  } catch (error) {
    console.log(error)
    error = error.message
  }
  return { data, error }
}

export default Kart

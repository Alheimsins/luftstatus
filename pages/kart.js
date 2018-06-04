import { Layout } from '../components/alheimsins'
import dynamic from 'next/dynamic'
const Map = dynamic(import('../components/Map'), { ssr: false })

export default () => (
  <Layout title='Luftstatus'>
    <Map />
  </Layout>
)

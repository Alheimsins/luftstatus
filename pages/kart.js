import dynamic from 'next/dynamic'
import { Layout } from '../components/alheimsins'

const Map = dynamic(import('../components/Map'), { ssr: false })

export default () => (
  <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.' theme='black'>
    <Map />
  </Layout>
)

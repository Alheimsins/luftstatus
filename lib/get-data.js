import getConfig from 'next/config'
import axios from 'axios'
import { byMunicipalities, byStations } from '../lib/repack-air-quality-data'

const { publicRuntimeConfig: { URL } } = getConfig()

const getData = async repackBy => {
  try {
    const { data } = await axios.get(URL)
    if (repackBy === 'byMunicipalities') return byMunicipalities(data)
    if (repackBy === 'byStations') return byStations(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default getData

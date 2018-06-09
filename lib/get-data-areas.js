import getConfig from 'next/config'
import axios from 'axios'

const { publicRuntimeConfig: { URL } } = getConfig()

export default async () => {
  try {
    const { data } = await axios.get(URL)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

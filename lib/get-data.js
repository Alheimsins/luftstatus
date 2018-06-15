import axios from 'axios'

export default async url => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

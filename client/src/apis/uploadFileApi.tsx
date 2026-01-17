import axios from 'axios'

export async function sendFileUploadReq(url: string, formData: FormData) {
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  console.log(response.data)
}

import { type ChangeEvent } from 'react'
import { sendFileUploadReq } from '../apis/uploadFileApi'

function VideoUploadForm() {
  const url: string = import.meta.env.VITE_BACKEND_URL

  async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      console.error('No file selected')
      return
    }

    console.log(file)
    try {
      // If you are not using form tag to send data then you can manually set the data to form-type and send it to the api
      const formData = new FormData()
      formData.append('video', file)

      await sendFileUploadReq(`${url}/upload`, formData)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1>Upload your video here</h1>

        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-700 rounded-lg border border-gray-300 p-2 mt-2 cursor-pointer bg-gray-500 mb-4"
        />
      </div>
    </div>
  )
}
export default VideoUploadForm

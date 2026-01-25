import { useEffect, useRef } from 'react'
import HLS from 'hls.js'

type VideoPlayProps = {
  videoId: string
}

function VideoPlay({ videoId }: VideoPlayProps) {
  const videoSrc = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoId&& HLS.isSupported()) {
      const hls = new HLS()
      hls.loadSource(`http://localhost:3002/output/${videoId}/master.m3u8`)
      hls.attachMedia(videoSrc.current!)
    }
  }, [videoId])

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center py-8 px-4 w-[50%]">
      <div className=" w-full bg-white shadow-md rounded-lg p-6">
        <div className="">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Video preview {videoId}
          </h2>

          <video
            controls
            className="rounded-lg border border-gray-300 h-75"
            width={'100%'}
            ref={videoSrc}
          />
        </div>
      </div>
    </div>
  )
}
export default VideoPlay

import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import {
  createMovie,
  updateMovieStatus,
} from '../repositories/movie.repository'

interface Resolution {
  width: number
  height: number
  bitRate: number
}

const resolutions: Resolution[] = [
  { width: 1920, height: 1080, bitRate: 2000 },
  { width: 1280, height: 720, bitRate: 1000 },
  { width: 854, height: 480, bitRate: 500 },
  { width: 640, height: 360, bitRate: 400 },
]

export function processVideo(
  inputPath: string,
  outputPath: string,
  callbackFn: (error: Error | null, masterPlayList?: string) => void,
): void {
  createMovie(outputPath)

  fs.mkdirSync(outputPath, { recursive: true })
  const masterPlayList = `${outputPath}/master.m3u8`
  const masterContent: string[] = []
  let countProcessing = 0

  resolutions.forEach((resolution) => {
    const variantOutput = `${outputPath}/${resolution.height}p`
    const variantPlaylist = `${variantOutput}/playlist.m3u8`

    fs.mkdirSync(variantOutput, { recursive: true })

    ffmpeg(inputPath)
      .outputOptions([
        `-vf scale=w=${resolution.width}:h=${resolution.height}`,
        `-b:v ${resolution.bitRate}k`,
        '-codec:v libx264',
        '-codec:a aac',
        '-hls_time 10',
        '-hls_playlist_type vod',
        `-hls_segment_filename ${variantOutput}/segment%03d.ts`,
      ])
      .output(variantPlaylist)
      .on('end', () => {
        masterContent.push(
          `#EXT-X-STREAM-INF:BANDWIDTH=${(resolution.bitRate + 128) * 1.25 * 1000},RESOLUTION=${resolution.width}x${resolution.height}\n${resolution.height}p/playlist.m3u8`,
        )

        countProcessing += 1
        if (countProcessing === resolutions.length) {
          console.log('Video has been processed')
          fs.writeFileSync(
            masterPlayList,
            `#EXTM3U\n${masterContent.join('\n')}`,
          )
          updateMovieStatus(outputPath, 'COMPLETED')
          callbackFn(null, masterPlayList)
        }
      })
      .on('error', (error) => {
        console.log('An error occured while processing the video: ', error)
        callbackFn(error)
      })
      .run()
  })
}

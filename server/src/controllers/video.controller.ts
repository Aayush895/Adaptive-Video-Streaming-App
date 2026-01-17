import fs from 'fs'
import { type Request, type Response } from 'express'
import { processVideo } from '../services/video.service'

export async function uploadVideoController(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: 'No file was uploaded!',
    })

    return
  }

  const videoPath = req.file.path
  const outputPath = `output/${Date.now()}`
  
  processVideo(videoPath, outputPath, (err, _) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'An error occured while processing the video',
      })

      return
    }

    fs.unlink(videoPath, (err) => {
      if (err) {
        console.log('An error occured while deleting the video file: ', err)
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Video is uploaded successfully',
    })
  })
}

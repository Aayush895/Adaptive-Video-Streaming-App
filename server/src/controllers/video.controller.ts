import { Request, Response } from 'express'

export async function uploadVideoController(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file was uploaded!',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Video is uploaded successfully',
  })
}

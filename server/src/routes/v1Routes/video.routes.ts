import express from 'express'
import upload from '../../middlewares/fileUpload.middleware'
import {
  uploadVideoController,
  fetchUploadStatus,
} from '../../controllers/video.controller'

const videoRouter = express.Router()

videoRouter.post('/upload', upload.single('video'), uploadVideoController)

//TODO: Implement an API where it fetches the upload status for a particular video through id and if the status is 'COMPLETED', then show the video on the UI. (API is implemented but not tested and it is not implemented on the UI end yet)
videoRouter.get('/status/:id', fetchUploadStatus)

export default videoRouter

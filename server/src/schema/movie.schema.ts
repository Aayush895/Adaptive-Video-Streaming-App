import { Schema, model } from 'mongoose'

const movieSchema = new Schema(
  {
    movieId: {
      type: String,
      unique: true,
    },
    processingStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const Movie = model('Movie', movieSchema)

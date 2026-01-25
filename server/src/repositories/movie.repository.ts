import { Movie } from '../schema/movie.schema'

export async function createMovie(movieId: string) {
  const response = await Movie.create({
    movieId,
    processingStatus: 'PENDING',
  })

  return response
}

export async function updateMovieStatus(movieId: string, status: string) {
  const response = await Movie.findOneAndUpdate(
    { movieId },
    { processingStatus: status },
  )

  return response
}

export async function fetchMovieStatus(movieId: string) {
  const response = await Movie.findById({ movieId: `output/${movieId}` })

  return response
}

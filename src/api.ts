import { TMDB_API_KEY } from './config'
const BASE_PATH = "https://api.themoviedb.org/3"

export interface IMovie {
    id: number
    backdrop_path: string
    poster_path: string
    title?: string
    name?: string
    overview: string
    release_date?: string
    first_air_date?: string
    vote_average: number
}
export interface IGetMovieResult {
    dates: {
        maximum: string
        minimum: string
    }
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
}
export function getNowMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}
export function getTopMovies() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}
export function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}
export function getPopularMovies() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}
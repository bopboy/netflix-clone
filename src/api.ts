// import { TMDB_API_KEY } from './config'
const BASE_PATH = "https://api.themoviedb.org/3"
const TMDB_API_KEY="358644293c1868b2e91b4bd5903d35ae"
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
export function getSearchVideo(format: string, id: string) {
    return fetch(`${BASE_PATH}/search/${format}?api_key=${TMDB_API_KEY}&query=${id}`)
        .then(res => res.json())
}

export function getAiringTv() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}
export function getTopTv() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}
export function getOnTheAirTv() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}
export function getPopularTv() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
}

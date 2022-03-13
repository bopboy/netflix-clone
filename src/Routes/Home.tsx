import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import { getNowMovies, IGetMovieResult, IMovie } from '../api'
import { makeImagePath } from '../utils'
import SliderContainer from '../Components/SliderContainer';
import Loader from '../Components/Loader';

const Wrapper = styled.div`
    background: black;
`
const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${props => props.bgPhoto});
    background-size: cover;
`
const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`
const Overview = styled.p`
    font-size: 30px;
    width:50%;
`
function Home() {
    const nowPlaying: IMovie[] = []
    const { data: nowPlayingMovies, isLoading } = useQuery<IGetMovieResult>(["movies", "nowPlaying"], getNowMovies)
    nowPlayingMovies?.results.map(item => nowPlaying.push(item))
    return (
        <Wrapper>
            <Helmet>
                <title>Netflix-Clone | Movie</title>
            </Helmet>
            {
                isLoading ?
                    <Loader /> :
                    <>
                        <Banner bgPhoto={makeImagePath(nowPlayingMovies?.results[0].backdrop_path || "")}>
                            <Title>{nowPlayingMovies?.results[0].title}</Title>
                            <Overview>{nowPlayingMovies?.results[0].overview}</Overview>
                        </Banner>
                        {nowPlaying &&
                            <SliderContainer
                                videoData={nowPlaying}
                                sliderTitle="Now Playing"
                            />}
                    </>
            }
        </Wrapper >
    )
}

export default Home
import React from 'react'
import { useQuery } from 'react-query'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import { getNowMovies, getTopMovies, getUpcomingMovies, getPopularMovies, IGetMovieResult, IMovie } from '../api'
import { makeImagePath } from '../utils'
import SliderContainer from '../Components/SliderContainer';
import Loader from '../Components/Loader';

const Wrapper = styled.div`
    background: black;
    height: auto;
    min-height: 100%;
    padding-bottom: 150px;
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
const BannerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    z-index: 0;
`
const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`
const Overview = styled.p`
    font-size: 30px;
    width:50%;
`
const UserBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 60px;
    margin-top: 25px;
`
const PlayBox = styled.div`
    cursor: pointer;
    width: 150px;
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white.lighter};
    transition: all 0.3s ease;
    &:hover {
        background-color: #ff9f43;
    }
    i {
        margin-right: 10px;
    }
`
const MoreBox = styled.div`
    cursor: pointer;
    width: 150px;
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white.darker};
    transition: all 0.3s ease;
    &:hover {
        i {
        color: #ff9f43;
        }
    }
    i {
        margin-right: 10px;
    }
`
function Home() {
    const history = useHistory()
    const nowPlaying: IMovie[] = []
    const topRated: IMovie[] = []
    const upcoming: IMovie[] = []
    const popular: IMovie[] = []
    const { data: nowPlayingMovies, isLoading: nowPlayLoading } = useQuery<IGetMovieResult>(["movies", "nowPlaying"], getNowMovies)
    const { data: topRatedMovies, isLoading: topRatedLoading } = useQuery<IGetMovieResult>(["movies", "topRated"], getTopMovies)
    const { data: upcomingMovies, isLoading: upcomingLoading } = useQuery<IGetMovieResult>(["movies", "upcoming"], getUpcomingMovies)
    const { data: popularMovies, isLoading: popularLoading } = useQuery<IGetMovieResult>(["movies", "popular"], getPopularMovies)
    nowPlayingMovies?.results.map(item => nowPlaying.push(item))
    topRatedMovies?.results.map(item => topRated.push(item))
    upcomingMovies?.results.map(item => upcoming.push(item))
    popularMovies?.results.map(item => popular.push(item))
    const onBoxClicked = (id: number) => {
        history.push(`/movies/${id}`);
    };
    return (
        <Wrapper>
            <Helmet>
                <title>Netflix-Clone | Movie</title>
            </Helmet>
            {
                nowPlayLoading ?
                    <Loader /> :
                    <>
                        <Banner bgPhoto={makeImagePath(nowPlayingMovies?.results[0].backdrop_path || "")}>
                            <BannerContainer>
                                <Title>{nowPlayingMovies?.results[0].title}</Title>
                                <Overview>{nowPlayingMovies?.results[0].overview}</Overview>
                                <UserBox>
                                    <a
                                        href={`https://www.youtube.com/results?search_query=${nowPlayingMovies?.results[0].title}`}
                                        target="_blank"
                                    >
                                        <PlayBox>
                                            <i className="fas fa-play"></i>
                                            <span> Play</span>
                                        </PlayBox>
                                    </a>
                                    <MoreBox
                                        onClick={() =>
                                            onBoxClicked(nowPlayingMovies?.results[0].id as number)
                                        }
                                        style={{
                                            backgroundColor: "rgba(85, 86, 86, 0.3)",
                                            color: "white",
                                            marginLeft: 10,
                                        }}
                                    >
                                        <i className="fas fa-info-circle"></i>
                                        <span> More Info</span>
                                    </MoreBox>
                                </UserBox>
                            </BannerContainer>
                        </Banner>

                        {nowPlaying &&
                            <SliderContainer
                                videoData={nowPlaying}
                                sliderTitle="Now Playing"
                            />
                        }
                        {popular &&
                            <SliderContainer
                                videoData={popular}
                                sliderTitle="Popluar"
                            />
                        }
                        {upcoming &&
                            <SliderContainer
                                videoData={upcoming}
                                sliderTitle="Upcoming"
                            />
                        }
                        {topRated &&
                            <SliderContainer
                                videoData={topRated}
                                sliderTitle="Top Rated"
                            />
                        }
                    </>
            }
        </Wrapper >
    )
}

export default Home
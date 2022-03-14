import React from 'react'
import { useQuery } from 'react-query'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
    getNowMovies, getTopMovies, getUpcomingMovies, getPopularMovies,
    getAiringTv, getOnTheAirTv, getPopularTv, getTopTv,
    IGetMovieResult, IMovie
} from '../api'
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
function Tv() {
    const history = useHistory()
    const location = useLocation()
    const airingToday: IMovie[] = []
    const onTheAir: IMovie[] = []
    const topRated: IMovie[] = []
    const popular: IMovie[] = []
    const { data: airingTodayTv, isLoading: airingLoading } = useQuery<IGetMovieResult>(["tv", "airingToday"], getAiringTv)
    const { data: topRatedTv, isLoading: topRatedLoading } = useQuery<IGetMovieResult>(["tv", "topRated"], getTopTv)
    const { data: onTheAirTv, isLoading: onTheAirLoading } = useQuery<IGetMovieResult>(["tv", "onTheAir"], getOnTheAirTv)
    const { data: popularTv, isLoading: popularLoading } = useQuery<IGetMovieResult>(["tv", "popular"], getPopularTv)
    airingTodayTv?.results.map(item => airingToday.push(item))
    topRatedTv?.results.map(item => topRated.push(item))
    onTheAirTv?.results.map(item => onTheAir.push(item))
    popularTv?.results.map(item => popular.push(item))
    const onBoxClicked = (id: number) => {
        history.push(`/tv/${id}`);
    };
    return (
        <Wrapper>
            <HelmetProvider>
                <Helmet>
                    <title>Netflix-Clone | Movie</title>
                </Helmet>
            </HelmetProvider>
            {
                airingLoading ?
                    <Loader /> :
                    <>
                        <Banner bgPhoto={makeImagePath(airingTodayTv?.results[0].backdrop_path || "")}>
                            <BannerContainer>
                                <Title>{airingTodayTv?.results[0].title}</Title>
                                <Overview>{airingTodayTv?.results[0].overview}</Overview>
                                <UserBox>
                                    <a
                                        href={`https://www.youtube.com/results?search_query=${airingTodayTv?.results[0].title}`}
                                        target="_blank"
                                    >
                                        <PlayBox>
                                            <i className="fas fa-play"></i>
                                            <span> Play</span>
                                        </PlayBox>
                                    </a>
                                    <MoreBox
                                        onClick={() =>
                                            onBoxClicked(airingTodayTv?.results[0].id as number)
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

                        {airingToday &&
                            <SliderContainer
                                type="tv"
                                videoData={airingToday}
                                sliderTitle="Airing Today"
                                search={location.search ? location.search : ""}
                            />
                        }
                        {popular &&
                            <SliderContainer
                                type="tv"
                                videoData={popular}
                                sliderTitle="Popluar"
                                search={location.search ? location.search : ""}
                            />
                        }
                        {onTheAir &&
                            <SliderContainer
                                type="tv"
                                videoData={onTheAir}
                                sliderTitle="On The Air"
                                search={location.search ? location.search : ""}
                            />
                        }
                        {topRated &&
                            <SliderContainer
                                type="tv"
                                videoData={topRated}
                                sliderTitle="Top Rated"
                                search={location.search ? location.search : ""}
                            />
                        }
                    </>
            }
        </Wrapper >
    )
}

export default Tv
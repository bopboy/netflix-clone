import React from 'react'
import { useQuery } from 'react-query'
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'
import { getSearchVideo, IGetMovieResult } from '../api'
import SliderContainer from '../Components/SliderContainer';

const Wrapper = styled.div`
  padding-top: 300px;
  height: auto;
  min-height: 100%;
  padding-bottom: 150px;
`;
const Loader = styled.div`
  font-size: 48px;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 400px;
`;
function Search() {
    const location = useLocation()
    const keyword = new URLSearchParams(location.search).get("keyword")
    const word = keyword?.trim()?.replace(/ /g, "%20") + ""
    const searchMovieData = useQuery<IGetMovieResult>(["movies", "search"], () => getSearchVideo("movie", word), { refetchInterval: 200 })
    const searchTvData = useQuery<IGetMovieResult>(["tv", "search"], () => getSearchVideo("tv", word), { refetchInterval: 100 })
    return (
        <>
            <Wrapper>
                <HelmetProvider>
                    <Helmet><title>Netflix-Clone | Search</title></Helmet>
                </HelmetProvider>
                {
                    !searchMovieData.data?.results[0] && !searchTvData.data?.results[0] ?
                        (<Loader>Couldn't find anything...</Loader>) :
                        (<>
                            {searchMovieData.data?.results[0] && (
                                <SliderContainer
                                    type="movies"
                                    sliderTitle={`Search Movies by ${keyword}`}
                                    videoData={searchMovieData.data?.results}
                                    search={location.search ? location.search : ""}
                                />
                            )}
                            {searchTvData.data?.results[0] && (
                                <SliderContainer
                                    type="tv"
                                    sliderTitle={`Search TV Shows by ${keyword}`}
                                    videoData={searchTvData.data?.results}
                                    search={location.search ? location.search : ""}
                                />
                            )}
                        </>)
                }
            </Wrapper>
        </>
    )
}

export default Search
import { useState } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion'
import { IMovie } from '../api'
import { makeImagePath } from '../utils';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 80;
`;
const BigMovie = styled(motion.div)`
    position: absolute;
    width: 60vw;
    height: 80vh;
    background-color: ${(props) => props.theme.black.lighter};
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    z-index: 90;
    overflow: auto;
`
const BicCover = styled.div`
    background-size: cover;
    background-position: center center;
    width:100%;
    height: 400px;
`
const BigTitle = styled.h2`
    color: ${props => props.theme.white.lighter};
    padding:20px;
    font-size: 46px;
    position:relative;
    top:260px;
`
const UserBox = styled.div`
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 60px;
    position: absolute;
    top: 345px;
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
    background-color: ${props => props.theme.white.lighter};
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #ff9f43;
    }
    i {
        margin-right: 10px;
    }
`
const IconBox = styled.div`
    cursor: pointer;
    width: 40px;
    margin-left: 10px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid ${props => props.theme.white.darker};
    display: flex;
    justify-content: center;
    color: ${props => props.theme.white.lighter};
    font-size: 18px;
    font-weight: 100;
    transition: all 0.3s ease;
    &:hover {
        transform: rotate(-360deg) scale(1.1);
        color: #ff9f43;
        border-color: #ff9f43;
    }
    i {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const BigOverview = styled.p`
    width:100%;
    padding:20px;
    color:${props => props.theme.white.lighter};
    position:relative;
    font-size: 18px;
    h1 {
        margin-top: 20px;
    }
`
const BigBody = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: repeat(2, 1fr);
`
const BigPoster = styled.div`
    object-fit: contain;
    border-radius: 0.2rem;
    height: 30rem;
    background-position: center;
    background-size: cover;
`
const BigSection = styled.div`
    padding-left: 1.5rem;
`

const modalVariants = {
    entry: { opacity: 0, y: -50 },
    normal: { opacity: 1, y: 0 },
    exit: {
        opacity: 0,
        y: -50,
    },
};
interface IMovieModal {
    videoData: IMovie[];
    bigVideoMatch: { params?: { movieId: string } }
}

function MovieModal({ videoData, bigVideoMatch }: IMovieModal) {
    const { scrollY } = useViewportScroll()
    const history = useHistory()
    const location = useLocation()
    const [overlay, setOverlay] = useState(false)
    const onOverlayClicked = () => {
        setOverlay(false)
        history.push(`/movies`)
    }
    const clickedMovie =
        bigVideoMatch?.params?.movieId &&
        videoData.find(movie => String(movie.id) === bigVideoMatch?.params?.movieId)
    const starSelector = (score: number) => {
        if (score >= 8.5) return "fas fa-star"
        else if (score > 7) return "fas fa-star-half-alt"
        else return "far fa-star"
    }
    return (
        <AnimatePresence>
            {clickedMovie ?
                (<>
                    <Overlay
                        key="overlay"
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onOverlayClicked}
                    />
                    <BigMovie
                        key="bigMovie"
                        variants={modalVariants}
                        initial="entry"
                        animate="normal"
                        exit="exit"
                        style={{ top: scrollY.get() + 100 }}
                    >
                        <BicCover
                            key="bigMovie"
                            style={{
                                backgroundImage: `linear-gradient(to top, black, transparent), 
                                url(${makeImagePath(clickedMovie.backdrop_path, 'original')})`
                            }}
                        >
                            <BigTitle key="bigTitle">
                                {clickedMovie.title ? clickedMovie.title : clickedMovie.name}
                            </BigTitle>
                            <UserBox key="userBox">
                                <a href={`https://www.youtube.com/results?search_query=${clickedMovie.title ? clickedMovie.title : clickedMovie.name}`} target="_blank">
                                    <PlayBox key="playBox">
                                        <i className="fas fa-play"></i>
                                        <span> Play</span>
                                    </PlayBox>
                                </a>
                                <IconBox key="iconBox1">
                                    <i className="far fa-thumbs-up"></i>
                                </IconBox>
                                <IconBox key="iconBox2">
                                    <i className="fas fa-plus"></i>
                                </IconBox>
                            </UserBox>
                        </BicCover>
                        <BigOverview>
                            <BigBody>
                                <BigPoster
                                    style={{ backgroundImage: `url(${makeImagePath(clickedMovie.poster_path, "w500")})` }}
                                />
                                <BigSection>
                                    {clickedMovie.overview}
                                    <br />
                                    <h1>
                                        {clickedMovie.release_date ? "Release Date" : "First Air Date"}
                                    </h1>
                                    <p>
                                        {clickedMovie.release_date ? clickedMovie.release_date : clickedMovie.first_air_date}
                                    </p>
                                    <h1>User Score</h1>
                                    <p>
                                        <i className={starSelector(clickedMovie.vote_average)} style={{ color: "#ff9f43" }} />
                                        &nbsp;&nbsp;{clickedMovie.vote_average}
                                    </p>
                                </BigSection>
                            </BigBody>
                        </BigOverview>
                    </BigMovie>
                </>) : null
            }
        </AnimatePresence>
    )
}

export default MovieModal
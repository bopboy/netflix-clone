import { useState } from 'react'
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { IMovie } from '../api'
import { makeImagePath } from '../utils'
import MovieModal from './MovieModal';

const OFFSET = 6
const NEXFLIX_LOGO_URL = "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4";

const Slider = styled.div`
    position: relative;
    top: -120px;
    margin-bottom: 70px;
    height: 250px;
`
const Row = styled(motion.div)`
    display: grid;
    gap:5px;
    grid-template-columns: repeat(6,1fr);
    position: absolute;
    width:100%;
    padding:0px 65px 0px 65px;
`
const Box = styled(motion.div) <{ bgphoto: string }>`
    border-radius: 8px;
    background-color: white;
    background-image: url(${props => props.bgphoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    overflow: hidden; // Info 를 Box 아래로 숨기기 위해 필요
    font-size: 16px;
    cursor: pointer;
    &:first-child {transform-origin: center left}
    &:last-child {transform-origin: center right}
`
const ArrowBtn = styled(motion.div)`
    z-index:10;  // 이걸 안하면 왼쪽 버튼이 아래 깔려서 클릭이 안됨
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    width: 65px;
    height: 185px;
    color:white;
    i {
        position: relative;
        text-align: center;
        transition: all 0.2s ease;
        cursor: pointer;
    }
    i:hover {
        transform: scale(1.8);
    }
    &:first-child { left: 0; }
    &:last-child { right: 0; }
`
const SliderTitle = styled.div`
    font-size: 25px;
    font-weight: 600;
    padding-left:65px;
    margin-bottom: 15px;
`
const Info = styled(motion.div)`
    padding: 10px;
    /* background-color: ${props => props.theme.black.lighter}; */
    background: linear-gradient(
        to top,
        ${props => props.theme.black.lighter},
        70%,
        transparent
    );
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
        font-weight: 800;
    }
`
const rowVariants = {
    hidden: (back: boolean) => ({ x: back ? -window.outerWidth + 6 : window.outerWidth - 6 }),
    visible: { x: 0 },
    exit: (back: boolean) => ({ x: back ? window.outerWidth - 6 : -window.outerWidth + 6 }),
}
const boxVariants = {
    normal: { scale: 1 },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.3,
            duration: 0.3,
            type: "tween"
        }
    }
}
const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.3,
            type: "tween"
        }
    }
}
interface ISliderConProps {
    videoData: IMovie[]
    sliderTitle: string
}

function SliderContainer({ videoData, sliderTitle }: ISliderConProps) {
    const history = useHistory()
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId")
    const [index, setIndex] = useState(0)
    const [back, setBack] = useState(false)
    const [leaving, setLeaving] = useState(false)
    const onBoxClicked = (id: number) => { history.push(`/movies/${id}`); };
    const incIndex = () => {
        if (videoData) {
            if (leaving) return
            toggleLeaving()
            setBack(false)
            const totalMovies = videoData.length - 1
            const maxIndex = Math.floor(totalMovies / OFFSET) - 1
            setIndex(prev => prev === maxIndex ? 0 : prev + 1)
        }
    }
    const decIndex = () => {
        if (videoData) {
            if (leaving) return
            toggleLeaving()
            setBack(true)
            const totalMovies = videoData.length - 1
            const maxIndex = Math.floor(totalMovies / OFFSET) - 1
            setIndex(prev => prev === 0 ? maxIndex : prev - 1)
        }
    }
    const toggleLeaving = () => setLeaving(prev => !prev)
    return (
        <>
            <Slider>
                <AnimatePresence
                    initial={false}
                    custom={back}
                    onExitComplete={toggleLeaving}
                >
                    <SliderTitle>{sliderTitle}</SliderTitle>
                    <ArrowBtn key="leftBtn" onClick={decIndex}>
                        <motion.i key="leftI" className="fas fa-chevron-left"></motion.i>
                    </ArrowBtn>
                    <Row
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "tween", duration: 1 }}
                        key={index}
                        custom={back}
                    >
                        {videoData
                            .slice(1)
                            .slice(OFFSET * index, OFFSET * index + OFFSET)
                            .map(movie => (
                                <Box
                                    key={movie.id}
                                    variants={boxVariants}
                                    whileHover="hover"
                                    initial="normal"
                                    transition={{ type: "tween" }}
                                    bgphoto={
                                        movie.backdrop_path
                                            ? makeImagePath(movie.backdrop_path, "w500")
                                            : makeImagePath(movie.poster_path, "w500")
                                                ? makeImagePath(movie.poster_path, "w500")
                                                : NEXFLIX_LOGO_URL
                                    }
                                    onClick={() => onBoxClicked(movie.id)}
                                >
                                    <Info key="boxInfo" variants={infoVariants}><h4>{movie.title || movie.name}</h4></Info>
                                </Box>
                            ))}
                    </Row>
                    <ArrowBtn key="rightBtn" onClick={incIndex}>
                        <motion.i key="rightI" className="fas fa-chevron-right"></motion.i>
                    </ArrowBtn>
                </AnimatePresence>
            </Slider >
            {bigMovieMatch ? (
                <MovieModal
                    bigVideoMatch={bigMovieMatch}
                    videoData={videoData}
                />
            ) : null}
        </>
    )
}

export default SliderContainer
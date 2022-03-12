import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const Slider = styled.div`
    position: relative;
    top: -180px;
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
const Box = styled(motion.div)`
    background-color: white;
    height: 200px;
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

function SliderContainer() {
    return (
        <Slider>
            <AnimatePresence>
                <ArrowBtn key="leftBtn">
                    <motion.i key="leftI" className="fas fa-chevron-left"></motion.i>
                </ArrowBtn>
                <Row>
                    <Box />
                    <Box />
                    <Box />
                    <Box />
                    <Box />
                    <Box />
                </Row>
                <ArrowBtn key="rightBtn">
                    <motion.i key="rightI" className="fas fa-chevron-right"></motion.i>
                </ArrowBtn>
            </AnimatePresence>
        </Slider>
    )
}

export default SliderContainer
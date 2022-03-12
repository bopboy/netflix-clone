import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

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
const Box = styled(motion.div)`
    background-color: white;
    height: 200px;
    color: red;
    font-size: 66px;
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

const rowVariants = {
    hidden: (back: boolean) => ({ x: back ? -window.outerWidth + 6 : window.outerWidth - 6 }),
    visible: { x: 0 },
    exit: (back: boolean) => ({ x: back ? window.outerWidth - 6 : -window.outerWidth + 6 }),
}

function SliderContainer() {
    const [index, setIndex] = useState(0)
    const [back, setBack] = useState(false)
    const incIndex = () => {
        setBack(false)
        setIndex(prev => prev + 1)
    }
    const decIndex = () => {
        setBack(true)
        setIndex(prev => prev - 1)
    }
    return (
        <Slider>
            <AnimatePresence
                initial={false}
                custom={back}
            >
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
                    {[1, 2, 3, 4, 5, 6].map(i => (<Box key={i}>{i}</Box>))}
                </Row>
                <ArrowBtn key="rightBtn" onClick={incIndex}>
                    <motion.i key="rightI" className="fas fa-chevron-right"></motion.i>
                </ArrowBtn>
            </AnimatePresence>
        </Slider>
    )
}

export default SliderContainer
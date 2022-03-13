import { useState } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from "react-router-dom";
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion'

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
    width: 40vw;
    height: 80vh;
    background-color: ${(props) => props.theme.black.lighter};
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    z-index: 90;
    overflow: auto;
`
const modalVariants = {
    entry: { opacity: 0, y: -50 },
    normal: { opacity: 1, y: 0 },
    exit: {
        opacity: 0,
        y: -50,
    },
};
function MovieModal() {
    const { scrollY } = useViewportScroll()
    const history = useHistory()
    const location = useLocation()
    const [overlay, setOverlay] = useState(false)
    const onOverlayClicked = () => {
        setOverlay(false)
        history.push(`/movie`)

    }
    return (
        <AnimatePresence>
            <Overlay
                animate={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    transition: {
                        delay: 0.3,
                        duration: 0.3,
                        type: "tween"
                    }
                }}
                onClick={onOverlayClicked}
            />
            <BigMovie
                variants={modalVariants}
                initial="entry"
                animate="normal"
                exit="exit"
                style={{ top: scrollY.get() + 100 }}
            />
        </AnimatePresence>
    )
}

export default MovieModal
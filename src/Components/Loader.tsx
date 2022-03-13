import { motion } from "framer-motion";
import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Loading = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid rgba(255, 255, 255, 1);
  border-top: 10px solid #fc0202;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Loader() {
    return (
        <Container><Loading /></Container>
    )
}

export default Loader
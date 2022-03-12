import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
    background-color: #8080801c;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 22px;
    position:absolute;
    transform: translateY(-100%);
`
const IconBox = styled.div`
    display: flex;
    flex-direction: row;
    float: left;
    i {
        font-size:40px;
    }

`
const Img = styled.img`
    height: 40px;
    margin-right: 10px;
    border-radius: 20px;
`
function Footer() {
    return (
        <Container>
            <IconBox>
                <a href="https://bopboy.github.io/netflix-clone" target="_blank">
                    <Img
                        src="https://bopboy.github.io/assets/img/me.png"
                    />
                </a>
                <a href="https://bopboy.github.io/netflix-clone" target="_blank">
                    <i className="fab fa-github" style={{ margin: "0px 10px 10px 0px" }}></i>
                </a>
            </IconBox>
            @ 2022 bopboy.com - all right reserved
        </Container >
    )
}

export default Footer
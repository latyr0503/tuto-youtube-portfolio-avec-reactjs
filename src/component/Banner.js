/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsArrowRightCircleFill } from 'react-icons/bs'
import headerImg from "../assets/img/header-img.svg"
import 'animate.css';
import TrackVisibility from 'react-on-screen';


export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Web Developer", "Design graphique", "bricoleur"];
    const [text, setText] = useState('');
    const [delta, setDelta ] = useState(300 - Math.random() * 100);
    const period = 2000;

    useEffect( () => {
        let ticker = setInterval( () => {
            tick();
        }, delta)

        return () => { clearInterval(ticker)}
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if(isDeleting) {
            setDelta(prevDelta => prevDelta /2)
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if(isDeleting && updatedText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }
    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-item-center">
                    <Col xs={12} md={6} xl={7}>
                        
                        <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__bounceIn" : ""}>
                                <span className="tagline"> Bienvenue dans Mon Porfolio </span>
                                <h1>
                                    {`Hello je m'appelle Abdoulaye Latyr SENE `}
                                    <br/><span className="wrap">{text}</span>
                                </h1>
                                <p>
                                    Je suis un développeur web enthousiaste basé à Dakar toujour en
                                    formation avec une année d'expérience dans la conception de sites
                                    web et d'application web.
                                </p>
                                <button onClick={() => console.log("connect")} > Let's connect < BsArrowRightCircleFill size={25} /></button>
                            </div>}
                        </TrackVisibility>
                    </Col>

                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                <img src={ headerImg } alt='Header img'/>
                            </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

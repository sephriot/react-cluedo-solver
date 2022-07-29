import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Button, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerRow from "./PlayerRow";
import GameSection from "./GameSection";
import solver from "./solver";

function App() {

    const gameSections = [
        {
            title: "PODEJRZANI",
            items: ["Pułkownik Fritz von Gelbsenf", "Kapitan Hans Pflaume", "Sierżant Zdenek Zelenka", "Madame Nicole Rouge",
                "Major Eva Weiss", "Sanitariuszka Anna Chaber ps.\"Pawie Oczko\""]
        },
        {
            title: "NARZĘDZIA ZBRODNI",
            items: ["Sztylet", "Świecznik", "Rewolwer", "Lina", "Gazrurka", "Klucz francuski"]
        },
        {
            title: "MIEJSCA",
            items: ["Komnata książęca", "Sala balowa", "Tajemna komnata", "Piwnica z winami", "Lochy zamkowe", "Tajna siedziba ruchu oporu", "Bocznica kolejowa", "Opuszczona kopalnia", "Las"]
        }
    ];

    // Function component
    const [playerAmount, setPlayerAmount] = useState<number>(2)
    const [questions, setQuestions] = useState<string[][]>([])
    const [currentQuestion, setCurrentQuestion] = useState<string[]>(new Array<string>(5).fill('', 0, 5))
    const formRef = useRef<HTMLFormElement>(null)
    const [solved, setSolved] = useState<Map<string, string[]>>(new Map<string, string[]>())

    useEffect(() => {
        setSolved(solver(questions))
    }, [questions])

    return (
        <div className="App mb-5">
            <header className="page-header">
                CLUEDO
            </header>
            <Row>
                <Col>
                    Ilość graczy
                </Col>
                <Col>
                    <input type="number" min={2} max={6}
                           onChange={value => setPlayerAmount(value.target.valueAsNumber)}/>
                </Col>
            </Row>
            <form ref={formRef}>
                <div className="mt-3">
                    <Row>
                        <Col className="title">
                            Pyta
                        </Col>
                    </Row>
                    <hr/>
                    <PlayerRow name="question" playerAmount={playerAmount}
                               onChange={(value)  => setCurrentQuestion([...currentQuestion.slice(0,3), value, ...currentQuestion.slice(4)])}
                               selectedValue={currentQuestion[3]}
                    />
                </div>
                <div>
                    {
                        // 1, 2, 3
                        gameSections.map((section, index) => (
                            <GameSection title={section.title} items={section.items} knownItems={solved}
                                         onChange={(value)  => setCurrentQuestion([...currentQuestion.slice(0, index), value, ...currentQuestion.slice(index + 1)])}
                                         selectedValue={currentQuestion[index]}
                            />
                        ))
                    }
                </div>
                <div className="mt-3">
                    <Row>
                        <Col className="title">
                            Odpowiada
                        </Col>
                    </Row>
                    <hr/>
                    <PlayerRow name="answer" playerAmount={playerAmount}
                               onChange={(value)  => setCurrentQuestion([...currentQuestion.slice(0,4), value])}
                               selectedValue={currentQuestion[4]}
                    />
                </div>
            </form>
            <div className="mt-3">
                <Button variant="primary"
                    onClick={() => {
                        formRef.current?.reset()
                        setQuestions([currentQuestion, ...questions])
                        setCurrentQuestion(new Array<string>(5).fill('', 0, 5))
                    }}
                >
                    Zapisz
                </Button>
            </div>
            <div>
                {
                    questions.map(question => (
                        <Row className="mt-2 border-1 border-bottom">
                            <Col xs={2}>
                                {question[3]}
                            </Col>
                            <Col>
                                <Row className="justify-content-around">{question[0]}</Row>
                                <Row className="justify-content-around">{question[1]}</Row>
                                <Row className="justify-content-around">{question[2]}</Row>
                            </Col>
                            <Col xs={2}>
                                {question[4]}
                            </Col>
                        </Row>
                    ))
                }
            </div>
        </div>
    );
}

export default App;

import React from 'react'
import {Col, Row} from "react-bootstrap";

interface IProps {
    title: string
    items: Array<string>
    knownItems: Map<string, string[]>
    onChange: (v: string) => void
    selectedValue: string
}

const GameSection: React.FC<IProps> = ({ title, items, knownItems, onChange, selectedValue }) => {
    return (<div className="mt-3">
        <Row>
            <Col className="title">
                {title}
            </Col>
        </Row>
        <Row>
            <Col>
                {
                    items.map(item => {
                        const playerIndex = knownItems.get(item)?.at(-1)?.at(-1)
                        return (
                            <Row className={"game-item-row " + (playerIndex ? `playerBgColor${playerIndex}` : "") }>
                                <Col className="game-item-col">
                                    {item}
                                </Col>
                                <Col xs={1} className="game-item-col">
                                    <input type="radio"
                                           checked={selectedValue === item}
                                           onChange={(e) => onChange(e.target.value)}
                                           name={title}
                                           value={item}/>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Col>
        </Row>
    </div>)
}

export default GameSection

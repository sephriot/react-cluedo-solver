import React from "react";
import {Col, Row} from "react-bootstrap";

interface IProps {
    playerAmount: number
    name: string
    onChange: (v: string) => void
    selectedValue: string
}

export default class PlayerRow extends React.Component<IProps> {

    render() {
        return (
            <Row>
                {
                    Array(this.props.playerAmount).fill(0).map((_, index) => <Col>
                            <input className="me-1" type="radio" name={this.props.name} id={`${this.props.name}${index}`}
                                   value={index}
                                   checked={this.props.selectedValue === `Gracz ${index}`}
                                   onChange={(e) => this.props.onChange(`Gracz ${e.target.value}`)}
                            />
                            <label className={`playerTextColor${index}`} htmlFor={`${this.props.name}${index}`}>Gracz {index}</label>
                        </Col>
                    )
                }
            </Row>
        )

    }
}

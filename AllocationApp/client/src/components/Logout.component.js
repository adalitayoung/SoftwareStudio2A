import React, { Component } from "react";
import Row from 'react-bootstrap/Row'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Col from 'react-bootstrap/Col'
export default class Login extends Component {
    render() {
        return (
          <div>
          <h7>GRADONLINE</h7>
          <h6>Automatic Student Group Allocation</h6>
            <form>
            <Row>
            <Col>
                <Link className="btn btn-primary btn-block" to={"/Home"}>Sign out</Link>
</Col>
</Row>
                </form>
                </div>
        );
    }
}

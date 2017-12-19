import React, { Component } from 'react';
import { Container, Header, Content, Spinner } from 'native-base';
export class SpinnerComponent extends Component {
    render() {
        return (
                <Content>
                    <Spinner color='blue' />
                </Content>
        );
    }
}

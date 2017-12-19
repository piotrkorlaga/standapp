import React, {Component} from 'react';
import { Body, Button, Title, Subtitle, Right, Left, Icon, Container, Header, Content, List, ListItem, Text, Separator, Card, CardItem} from 'native-base';

export default class History extends Component {
    render() {
        return (
            <Container>

                <Content>
                    <Card>


                        <List>
                            <Header>

                                <Body>
                                <Title>Daily stand up</Title>
                                <Subtitle>Date</Subtitle>
                                </Body>

                            </Header>

                            <ListItem itemDivider>
                                <Text>Done today:</Text>
                            </ListItem>
                            <ListItem first>
                                <Text></Text>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Will be done tomorrow:</Text>
                            </ListItem>
                            <ListItem first>
                                <Text></Text>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Problems met today:</Text>
                            </ListItem>
                            <ListItem first>
                                <Text></Text>
                            </ListItem>
                        </List>


                    </Card>
                </Content>

            </Container>
        );
    }
}

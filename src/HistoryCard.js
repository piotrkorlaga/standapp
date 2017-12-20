import React, {Component} from 'react';
import _ from 'lodash';
import {
    Body, Title, Subtitle, Container, Header,
    Content, List, ListItem, Text, Card,
} from 'native-base';

export default class HistoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyEntry: {},
            todays: [],
            tomorrows: [],
            problems: []
        };
    }

    componentWillMount() {
        // wyjściowy obiekt ze spłaszczoną strukturą. date jest dopisane do val
        console.log(this.props.dailyentry);
        const dailyEntry = _.map(this.props.dailyentry, (val, date) => ({ ...val, date }));
        this.setState({ dailyEntry });
        console.log(this.state.dailyEntry);
        const todays = _.flatMap(this.state.dailyEntry, item => {
            return _.map(item.today, (val, uid) => ({ ...val, uid }));
        });
        this.setState({todays});
        console.log(this.state.todays);

        const tomorrows = _.flatMap(this.state.dailyEntry, item => {
            return _.map(item.tomorrow, (val, uid) => ({...val, uid}));
        });
        this.setState({tomorrows});

        const problems = _.flatMap(this.state.dailyEntry, item => {
            return _.map(item.problems, (val, uid) => ({...val, uid}));
        });
        this.setState({problems});

    }

    renderSection(listName) {
        // uważać na metodę dostępu do tablicy przez [`${}`]. Przy pisaniu apki webowej
        // nazwy zmiennych są często skracane, więc lepiej je hardcodować.
        return this.state[`${listName}`].map(data => (
            <ListItem key={data.uid}>
                <Text>
                    {data.input}
                </Text>
            </ListItem>
        ));
    }

    render() {
        return (
            <Container>

                <Content>
                    <Card>

                        <List>
                            <Header>

                                <Body>
                                <Title>Daily stand up</Title>
                                <Subtitle>{`DATE: ${this.state.dailyEntry.date}`}</Subtitle>
                                </Body>

                            </Header>

                            <ListItem itemDivider>
                                <Text>Done today:</Text>
                            </ListItem>

                            <List>
                                {this.renderSection('todays')}
                            </List>

                            <ListItem itemDivider>
                                <Text>Will be done tomorrow:</Text>
                            </ListItem>
                            <List>
                                {this.renderSection('tomorrows')}
                            </List>

                            <ListItem itemDivider>
                                <Text>Problems met today:</Text>
                            </ListItem>
                            <List>
                                {this.renderSection('problems')}
                            </List>
                        </List>


                    </Card>
                </Content>

            </Container>
        );
    }
}

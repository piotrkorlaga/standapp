import React, { Component } from 'react';
import firebase from 'firebase';
import { format } from 'date-fns';
import { AddInputButton } from './AddInputButton';
import { DailyEntryList } from './DailyEntryList';
import { Container, Content, Input, Form, Item } from 'native-base';


export class DailyEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.state.inputs = [];
    this.state.currentDate = {};
    this.saveData = this.saveData.bind(this);
  }

  saveData() {
    if (this.state.input) {
      const { inputType } = this.props;
      const { input } = this.state;
      const currentDate = format(new Date(), 'DD-MM-YYYY');
      this.setState({ currentDate });

      const { currentUser } = firebase.auth(); // getting access to current user in our FBDB -> firebase.auth().currentUset
      const key = firebase.database().ref(`v3/teams/nomadit/users/${currentUser.uid}/dailyentry/${currentDate}/${inputType}`) // get access to our FBDB and make a reference to pointed location (it's path to a JSON data store). Then we made string interpolation.
        // there we have a TOP collection of users, then a uid, and then a collection of inputs (it's our DB and JSON schema we created)
        .push({ input }).key; // After making a ref we want to do specific operation in this location. Push made data be saved in DB.

      this.setState({
        inputs: [...this.state.inputs, {
          input: this.state.input,
          key,
        }],
      });
      this.inputToClear._root.clear();
      this.setState({ input: '' });
    } else {
      alert('Pass some data.');
    }
  }

  deleteData(inputType, id) {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`v3/teams/nomadit/users/${currentUser.uid}/dailyentry/${this.state.currentDate}/${inputType}/${id}`)
      .remove();

    const result = this.state.inputs.filter(el => el.key !== id);
    this.setState({ inputs: result });
  }

  render() {
    return (
      <Container>
        <Item regular>
          <Input
            ref={(component) => { this.inputToClear = component; }}
            onChangeText={text => this.setState({ input: text })}
            placeholder={this.props.placeholder}
            multiline
          />
        </Item>
        <Content>
          {this.state.inputs.map((element, index) =>
          (<DailyEntryList
            key={index}
            prop={element.input}
            pressDelete={() => this.deleteData(this.props.inputType, element.key)}
          />))}
        </Content>

        <AddInputButton
          onPress={this.saveData}
        />
      </Container>
    );
  }
}
// element i el to obiekty, które wykorzystujemy w funkcjach.
// index odpowiada za prop KEY, a element prop za prop, który przechowuje wartości dla key.


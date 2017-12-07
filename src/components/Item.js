import React, {Component,} from 'react';
import { ListView, View, TextInput } from 'react-native';
import {Button} from './Button';
import {ItemList} from './ItemList';
import firebase from 'firebase';

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ''};
        this.state.inputs = [];
        this.state.key = {key: ''};
        this.state.keys = [];
    }

    // componentWillMount() {
    //     this.fetchData();
    //     this.createDataSource(this.props);
    // }
    //
    // componentWillReceiveProps(nextProps) {
    //     this.createDataSource(nextProps);
    // }
    //
    // createDataSource({input}) {
    //     const ds = new ListView.DataSource({
    //         rowHasChanged: (r1, r2) => r1 != r2
    //     });
    //
    //     this.dataSource = ds.cloneWithRows(input);
    // }

    saveData(inputType) {
        const { input } = this.state;
        const { currentUser } = firebase.auth();                    // getting access to current user in our FBDB -> firebase.auth().currentUset
        const inputId = firebase.database().ref(`users/${currentUser.uid}/inputs/${inputType}`)  // get access to our FBDB and make a reference to pointed location (it's path to a JSON data store). Then we made string interpolation.
                                                                    // there we have a TOP collection of users, then a uid, and then a collection of inputs (it's our DB and JSON schema we created)
            .push({ input }).key;    // After making a ref we want to do specific operation in this location. Push made data be saved in DB.
        this.setState({keys: [...this.state.keys, inputId]});
    }

    // fetchData(){
    //     const { currentUser } = firebase.auth();
    //     firebase.database().ref(`users/${currentUser.uid}/inputs/`) // again, we need the access to DB location
    //         .on('value', snapshot => { // anytime we get any value/data comes across ref above, call function snapshot with an object (snapshot) to describe the data that's sitting in ther
    //             snapshot.val() // this is how we actually get access to the data in our ref
    //              // return val?
    //         });
    // }

    deleteData(inputType, id) {
        const { currentUser } = firebase.auth();

        firebase.database().ref(`users/${currentUser.uid}/inputs/${inputType}/${id}`)
            .remove();

        const newInputId = this.state.keys.filter(idVal => idVal !== id);
        this.setState({keys: newInputId});
    }


    render() {
        return (
            <View style={styles.containerStyle}>

                <TextInput
                            ref={component => { this.inputToClear = component }}
                            style={styles.textInputStyle}
                            onChangeText={text => {
                                    this.setState({input: text})}
                            }
                            multiline={true}
                            placeholder={this.props.placeholder}
                />

                {this.state.inputs.map((element,index) =>
                    <ItemList key={index}
                              prop={element}
                              pressDelete={() => {
                                    const result = this.state.inputs.filter((el) => el !== element);
                                    this.setState({inputs: result});
                                    this.deleteData(this.props.inputType, this.state.keys[0]);
                    }}/>)
                }

                <Button
                    style={styles.buttonSectionStyle}
                    whenPressed={() => {
                        if (this.state.input) {
                            this.setState({inputs: [...this.state.inputs,this.state.input]});
                            this.inputToClear.clear();
                            this.saveData(this.props.inputType);
                            this.setState({input: ''});

                        } else {
                            alert('Pass some data.');
                        }
                    }
                    }
                >
                    +
                </Button>

            </View>
        );
    }
}

// element i el to obiekty, które wykorzystujemy w funkcjach.
// index odpowiada prop KEY, a element prop prop, który przechowuje wartości dla key.

const styles = {
    containerStyle: {
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'stretch',
    },

    textInputStyle: {
        fontSize: 16,
        alignSelf: 'stretch',
        flexGrow: 30,
    },

    buttonSectionStyle: {
        position: 'relative',
        alignItems: 'flex-end',
        alignContent: 'flex-end',

    }
};
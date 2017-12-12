import React, {Component,} from 'react';
import { View, TextInput } from 'react-native';
import {Button} from './Button';
import {ItemList} from './ItemList';
import firebase from 'firebase';

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ''};
        this.state.inputs = [];
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
        const { input, inputs } = this.state;

        const { currentUser } = firebase.auth();                    // getting access to current user in our FBDB -> firebase.auth().currentUset
        const inpId = firebase.database().ref(`users/${currentUser.uid}/inputs/${inputType}`)  // get access to our FBDB and make a reference to pointed location (it's path to a JSON data store). Then we made string interpolation.
                                                                    // there we have a TOP collection of users, then a uid, and then a collection of inputs (it's our DB and JSON schema we created)
            .push({ input }).key;                                   // After making a ref we want to do specific operation in this location. Push made data be saved in DB.

        this.setState({inputs: [...this.state.inputs, {input: this.state.input, inpId: inpId}]});
        this.inputToClear.clear();
        this.setState({input: ''});
        console.log(inputs);


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
        const { inputs } = this.state;
        firebase.database().ref(`users/${currentUser.uid}/inputs/${inputType}/${id}`)
            .remove();

        const result = this.state.inputs.filter((el) => el.inpId !== id);
        this.setState({inputs: result});
        console.log(inputs);
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

                {this.state.inputs.map( (element, index) =>
                    <ItemList key={index}
                              prop={element.input}
                              pressDelete={() => this.deleteData(this.props.inputType, element.inpId)}
                    />
                    )
                }


                <Button
                    style={styles.buttonSectionStyle}
                    whenPressed={() => {
                        if (this.state.input) {
                            this.saveData(this.props.inputType);
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
// index odpowiada za prop KEY, a element prop za prop, który przechowuje wartości dla key.

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
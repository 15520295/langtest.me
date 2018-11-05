import { Component } from 'react';
import { Provider, Subscribe } from 'unstated';
import React from 'react';
import {Text} from 'native-base';
import { SQLite, FileSystem as FS, Asset } from 'expo';


export default class DatabaseScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            items: 'Simple this'
        };
    }

    makeSQLiteDirAsync() {
        const dbTest = SQLite.openDatabase('dummy.db');
       
        try {
            dbTest.transaction(tx => tx.executeSql(''));
        } catch(e) {
            if (this.state.debugEnabled) console.log('error while executing SQL in dummy DB');
        }
    }

    componentDidMount = () => {
        var that = this;
        this.makeSQLiteDirAsync();
        FS.downloadAsync(
            Asset.fromModule(require('./../../assets/db/toiec.db')).uri,
            `${FS.documentDirectory}SQLite/toiec.db`
        ).then(function(){
            let db = SQLite.openDatabase('toiec.db');
            db.transaction(tx => {
                tx.executeSql('select * from QuestionPart5;', null, (_, resultSet) => {console.log(resultSet.rows._array); that.setState({items :resultSet.rows._array}); });
            });
        });
    }

    render(){
        return(<Text>{JSON.stringify(this.state.items)}</Text>);
    }
}
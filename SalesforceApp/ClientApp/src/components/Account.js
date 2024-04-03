import React, { Component } from 'react';
import './PageStyles.css';

export class Account extends Component {
    static displayName = Account.name;

    constructor(props) {
        super(props);
        this.state = { account: {}, loading: true, id: window.location.href.split('/')[4] };
    }


    render() {

        return (
            <div className='component-background'>
                <h1 id="tabelLabel" >Account</h1>
                <p>Account {this.state.id}</p>
                {/*contents*/}
            </div>
        );
    }


}


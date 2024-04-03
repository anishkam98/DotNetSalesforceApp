import React, { Component } from 'react';
import { Navigate, Route, Location } from 'react-router-dom';
import './PageStyles.css';

export class Accounts extends Component {
    static displayName = Accounts.name;

    constructor(props) {
        super(props);
        this.state = { accounts: [], loading: true, redirect: false, id: null };

        Accounts.redirect = Accounts.redirect.bind(this);
    }

    componentDidMount() {
        this.populateAccountsData();
    }

    static renderAccountsTable(accounts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account =>
                        <tr key={account.Id} onClick={() => { this.redirect(account.Id) }}>
                            <td>{account.AccountNumber}</td>
                            <td>{account.Name}</td>
                            <td>{account.Active__c}</td>
                            <td>{account.CreatedDate}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Accounts.renderAccountsTable(this.state.accounts);

        if (this.state.redirect) {
            return <Navigate to={`/account/${this.state.id}`} replace={true} state={{ id: this.state.id }} /> 
        }

        return (
            <div className='component-background'>
                <h1 id="tabelLabel" >Accounts</h1>
                <p>All Accounts</p>
                {contents}
            </div>
        );
    }

    async populateAccountsData() {
        const response = await fetch('account');
        const data = await response.json();
        this.setState({ accounts: data, loading: false });
    }

    static redirect(key) {
        this.setState({
            accounts: this.state.accounts,
            loading: this.state.loading,
            redirect: true,
            id: key
        });
    }
}

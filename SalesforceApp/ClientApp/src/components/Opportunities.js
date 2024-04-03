import React, { Component } from 'react';
import './PageStyles.css';

export class Opportunities extends Component {
    static displayName = Opportunities.name;

  constructor(props) {
      super(props);
      this.state = { opportunities: [], loading: true };
    }

    componentDidMount() {
        this.populateOpportunitiesData();
    }

    static renderOpportunitiesTable(opportunities) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Id</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map(opportunity =>
                        <tr key={opportunity.Id}>
                            <td>{opportunity.Name}</td>
                            <td>{opportunity.AccountId}</td>
                            <td>{opportunity.CreatedDate}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Opportunities.renderOpportunitiesTable(this.state.opportunities);

        return (
            <div className='component-background'>
                <h1 id="tabelLabel" >Opportunities</h1>
                <p>All Opportunities</p>
                {contents}
            </div>
        );
    }

    async populateOpportunitiesData() {
        const response = await fetch('opportunity');
        const data = await response.json();
        this.setState({ opportunities: data, loading: false });
    }
}

import React, {Component} from 'react';

class CollapsibleRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this)
    }

    toggleCollapse() {
        this.setState({isCollapsed: !this.state.isCollapsed})
    }

    render() {
        return (
            <React.Fragment>
                <button
                    onClick={this.toggleCollapse}
                    style={{float: 'left', marginLeft: '1rem', border: 'none', marginTop:'-0.5rem', background:'none'}}
                >
                    {this.state.isCollapsed
                        ? <i className="fa fa-caret-right" aria-hidden="true" style={{fontSize: '1rem'}}/>
                        : <i className="fa fa-caret-down" aria-hidden="true" style={{fontSize: '1rem'}}/>
                    }
                </button>
                <ul style={{listStyleType: 'none', marginTop: '0rem',}}>
                    {
                        this.state.isCollapsed
                            ? this.props.val[0]
                            : this.props.val.map((ele, ind) => <li key={ind}>{ele}</li>)
                    }
                </ul>
            </React.Fragment>
        );
    }
}

class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.rowData['Gene']}</td>
                <td>
                    <CollapsibleRow val={this.props.rowData['Nucleotide Change']}/>
                </td>
                <td>{this.props.rowData['Protein Change']}</td>
                <td>{this.props.rowData['Alias']}</td>
                <td>{this.props.rowData['Region']}</td>
                <td>{this.props.rowData['Reported Classification']}</td>
                <td>{this.props.rowData['Last Evaluated']}</td>
                <td>{this.props.rowData['Last Updated']}</td>
                <td><a href={this.props.rowData['URL']}>{this.props.rowData['Source']}</a></td>
            </tr>
        );
    }
}

class DataTable extends Component {
    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Gene</th>
                        <th>Nucleotide Change</th>
                        <th>Protein Change</th>
                        <th>Alias</th>
                        <th>Region</th>
                        <th>Reported Classification</th>
                        <th>Last Evaluated</th>
                        <th>Last Updated</th>
                        <th>More Info</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.tableData.map((ele, ind) => <TableRow key={ind} rowData={ele}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DataTable;


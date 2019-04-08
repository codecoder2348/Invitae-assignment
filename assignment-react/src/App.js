import React, {Component} from 'react';
import './App.css';
import DataTable from './DataTable';
import SearchBox from "./SearchBox";
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            userInput: "",
            data: []
        };
        this.onSelectGene = this.onSelectGene.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    onSelectGene(val) {
        this.setState({
            userInput: val
        }, () => {
            this.getTableData()
        })
    }

    clearInput(val) {
        this.setState({
            userInput: ""
        })
    }

    handleChange(val) {
        this.setState({
            userInput: val,
        }, () => {
            this.getSuggestions()
        })
    }

    getSuggestions() {
        axios.get("http://localhost:8000/api/suggest/?search_text=" + this.state.userInput)
            .then(({data}) => {
                this.setState({
                    suggestions: data.result
                })
            })
    };

    getTableData() {
        axios.get("http://127.0.0.1:8000/api/search/?search_text=" + this.state.userInput)
            .then(({data}) => {
                this.setState({
                    data: data.result
                })
            })
    };

    render() {
        return (
            <div className="App">

                <SearchBox
                    suggestions={this.state.suggestions}
                    userInput={this.state.userInput}
                    onInputChange={this.handleChange}
                    onSelectGene={this.onSelectGene}
                    clearInput={this.clearInput}
                />

                <DataTable tableData={this.state.data}/>
            </div>
        );
    }
}

export default App;

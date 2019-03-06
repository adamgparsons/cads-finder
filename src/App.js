import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import '@citizensadvice/cads/build/cads.css';

// Header
const TopBar = () => <div className="w-100 bg-heritage-blue h-12" />;

const Title = () => (
  <h1 className="mt-6 heritage-blue open-sans font-size-5 extra-bold">CADS finder</h1>
);

// // Table Data
class TableData extends Component {
  render() {
    return <p> {this.props.data} </p>;
  }
}

// Table Element
class TableTitle extends Component {
  render() {
    return (
      <div>
        <h2> {this.props.title}</h2>
      </div>
    );
  }
}

class SearchMatch extends Component {
  render() {
    return <div />;
  }
}

// Table
class Table extends Component {
  render() {
    // We need to get each row and store it in an array
    var rowsTitle = [];
    var search = [];
    var searchterm = this.props.searchTerm; // need this or it doesnt work
    var key = '';
    this.props.data.forEach(function(row) {
      if (
        row.title.toLowerCase().indexOf(searchterm.toLowerCase()) === -1 &&
        row.tags.toLowerCase().indexOf(searchterm.toLowerCase()) === -1
      )
        return;

      // need to grab the correct match
      if (row.title.toLowerCase().indexOf(searchterm.toLowerCase()) === -1) {
        var m = row.tags.toLowerCase().split(' ');
        for (var i in m) if (m[i].indexOf(searchterm.toLowerCase()) !== -1) key = m[i];
      } else {
        key = row.title.toLowerCase();
      }

      rowsTitle.push(<TableTitle title={row.title} />);
      if (searchterm != '') rowsTitle.push(<SearchMatch match={key} />);
      rowsTitle.push(<TableData data={row.content} />);
    });

    // Then render all. Render using childs. Send them prop.title and prop.data
    return <div>{rowsTitle}</div>;
  }
}

// Search
class Search extends Component {
  filterList = event => {
    this.props.userInput(event.target.value);
  };

  render() {
    return (
      <div className="mb-6">
        <label className="bold lh-2 block mb-2">Search for a class name or property</label>
        <input
          type="text"
          className="w-full semi-bold lh-2 inline-block input-reset ba b-width-2 b-radius-2 b-light-grey ph-4 pv-3 focus-b-heritage-yellow outline-none"
          placeholder="Start typing"
          value={this.props.searchTerm}
          onChange={this.filterList}
          autoFocus
        />
      </div>
    );
  }
}

// App
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      filterText2: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filter) {
    this.setState({
      filterText: filter
    });
  }

  render() {
    return (
      <div>
        <TopBar />
        <div className="mh-auto w-600">
          <Title />
          <Search searchTerm={this.state.filterText} userInput={this.handleUserInput} />
          <Table searchTerm={this.state.filterText} data={this.props.data} />
        </div>
      </div>
    );
  }
}
export default App;

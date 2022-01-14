import React, { Component } from 'react';

class DogsRow extends Component {
  render() {
    const dog = this.props.dog;
    return (
      <tr>
        <td>{dog.name}</td>
        <td>{dog.breed}</td>
        <td>{dog.gender}</td>
        <td>{dog.birth_date}</td>
        <td>{dog.type}</td>
        <td>{dog.date}</td>
        <td>{dog.time}</td>
        <td>{dog.est_duration}</td>
        <td>{dog.facility_name}</td>
        <td>{dog.address}</td>
        <td>{dog.city}</td>
        <td>{dog.state}</td>
        <td>{dog.zip}</td>
        <td>{dog.phone}</td>
        <td>{dog.email}</td>
      </tr>
    );
  }
}

class DogsTable extends Component {

  render() {
    const filterText = this.props.filterText;
    const currentEventOnly = this.props.currentEventOnly;

    const rows = [];


    this.props.dogs.forEach((dog, index) => {
      if (dog.breed.indexOf(filterText) === -1) {
        return;
      }
      if (currentEventOnly && (Date.parse(dog.date) - Date.parse(new Date()) < 0)) { 
        return;
      }
      rows.push(
        <DogsRow
          dog={dog}
          key={`${dog.name}${dog.breed}${index}`}
        />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th colSpan="4">PET</th>
            <th colSpan="4">ACTIVITY</th>
            <th colSpan="5">FACILITY</th>
            <th colSpan="2">OWNER'S CONTACT</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Birth Date</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration (mins)</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCurrentEventChange = this.handleCurrentEventChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleCurrentEventChange(e) {
    this.props.onCurrentEventChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          className="search"
          type="text"
          placeholder="Search your desired breed to match..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.currentEventOnly}
            onChange={this.handleCurrentEventChange}
          />
          {' '}
          Only show future events
        </p>
      </form>
    );
  }
}

class CanineWalkTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs:[],
      filterText: '',
      currentEventOnly: false
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCurrentEventChange = this.handleCurrentEventChange.bind(this);
  }

  componentDidMount() {
    fetch('/dogs/')
      .then(dogs => dogs.json())
      .then((dogs) => {
        if (!Array.isArray(dogs)) dogs = [];
        return this.setState({
          dogs
        });
      })
      .catch(err => console.log('Dogs.componentDidMount: get dogs: ERROR: ', err));
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleCurrentEventChange(currentEventOnly) {
    this.setState({
      currentEventOnly: currentEventOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          currentEventOnly={this.state.currentEventOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onCurrentEventChange={this.handleCurrentEventChange}
        />
        <DogsTable
          dogs={this.state.dogs}
          filterText={this.state.filterText}
          currentEventOnly={this.state.currentEventOnly}
        />
      </div>
    );
  }
}


// ReactDOM.render(
//   <CanineWalkTable />,
//   document.getElementById('container')
// );

export default CanineWalkTable;

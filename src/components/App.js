import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

fetchPets = () => {
    let base = '/api/pets';

    if (this.state.filters.type !== 'all') {
      base += `?type=${this.state.filters.type}`;
    }

    fetch(base)
      .then(res => res.json())
      .then(info => this.setState({ pets: info }));
  };
  
  onAdoptPet = (petId) =>{
    for(i=0, i<this.state.pets.length, i++)
    {
      if(this.state.pets[i].id===petId)
      this.state.pets[i] = {...this.state.pets[i], isAdopted: true};
    }
  }
  
  onChangeType = ()=>{
    onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };
    
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType}
                onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
<PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

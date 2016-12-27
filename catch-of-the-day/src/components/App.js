import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes.js';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);

    //get initial state
    this.state = {
      fishes: {},
      order: {},
    };
  }


  addFish(fish) { // fish is the fish object from AddFishForm
    //update our state
    // 1. make a copy of state
    const fishes = {...this.state.fishes};
    // add in new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish; // timestamp is a key for the new fish
    // set state
    this.setState({fishes}); // tell React which exact state to update
  }

  loadSamples() {
    this.setState({
    fishes: sampleFishes
   });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          </div>
          <Order />
          <Inventory addfish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;

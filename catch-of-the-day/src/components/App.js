import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    //this.addFish = this.addFish.bind(this);
    //this.updateFish = this.updateFish.bind(this);
    //this.loadSamples = this.loadSamples.bind(this);
    //this.addToOrder = this.addToOrder.bind(this);
    //this.removeFromOrder = this.removeFromOrder.bind(this);
    //this.removeFish = this.removeFish.bind(this);

}
    //get initial state outside of constructor
  state = {
      fishes: {},
      order: {}
    };

componentWillMount() {
  // this runs right before App is rendered
  this.ref =  base.syncState(`${this.props.params.storeId}/fishes`,
  {
    context: this,
    state: 'fishes'
  });
  // check if there is any order in localStorage
  const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

  if(localStorageRef) {
    // update our app components order state
    this.setState({
      order: JSON.parse(localStorageRef)
    });
  }
}

componentWillUnmount() {
  base.removeBinding(this.ref);
}

//runs whenever props or state updates
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(`order-${this.props.params.storeId}`,
    JSON.stringify(nextState.order))
}
  addFish = (fish) => { // fish is the fish object from AddFishForm
    //update our state
    // 1. make a copy of state
    const fishes = {...this.state.fishes};
    // add in new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish; // timestamp is a key for the new fish
    // set state
    this.setState({fishes}); // tell React which exact state to update
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes })
  };

  removeFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes })
  };


  loadSamples = () => {
    this.setState({
    fishes: sampleFishes
   });
  };

  addToOrder = (key) =>  {
    // copy of state
    const order =  { ...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    this.setState({order});

  };

  removeFromOrder = (key) => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
            <ul className="list-of-fishes">
              {
                Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
              }
            </ul>
          </div>
          <Order fishes={this.state.fishes}
                order={this.state.order}
                params={this.props.params}
                removeFromOrder={this.removeFromOrder}
           />
          <Inventory
          addfish={this.addFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          storeId={this.props.params.storeId}/>
      </div>
    )
  }
}

App.PropTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;

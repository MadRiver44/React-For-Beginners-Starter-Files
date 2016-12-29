import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
      /*onSubmit={ this.goToStore.bind(this) } } or....*/
    /*have to know your using context, */
  /*
  one way....
  One way to get this.storeInput to reference StorePicker class is to bind the goToStore function
  ehen the constructor is called. Since we are extending a class via React, we use super,


  constructor(){  // code that runs when that component is created
    super(); // allows us t sprinkle the extra stuff onto the Component
      this.gotToStore =  this.goToStore.bind(this);
  }

  */

  goToStore(event) {
    event.preventDefault(); // stops default from happening
    console.log('you changed url');
    // first, grab text from box
     // const value = $('input').val();
    const storeId = this.storeInput.value; // this is null, this is not pointing to StorePicker!!, how to get the right this?
                                  // we must have a reference in the constructor of StorePicker, an es6 thing
                                  // in this scope, before we get to render
    // second, we transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)


  }

  render() {

    return (
      <form className="store-selector"  onSubmit={(e) => this.goToStore(e) }>
        <h2>Please Enter a Store Name</h2>
        <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={ (input) => {this.storeInput = input }} />
        <button type="Submit">Visit Store </button>
      </form>

      )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;

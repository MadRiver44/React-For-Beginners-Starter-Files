import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter a Store Name</h2>
        <input type="text" required placeholder="Sore Name"/>
        <button type="Submit">Visit Store </button>
      </form>

      )
  }
}

export default StorePicker;

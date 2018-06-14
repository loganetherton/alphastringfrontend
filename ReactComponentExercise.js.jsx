/**
* This React class is intended to query an endpoint that will return an alphanumeric string, after clicking a button.
* This component is passed a prop "apiQueryDelay", which delays the endpoint request by N milliseconds. There is a
* second button to disable this functionality and have the endpoint request run immediately after button click.
* This data is then to be displayed inside a simple container.
* The "queryAPI" XHR handler will return the endpoint response in the form of a Promise (such as axios, fetch).
* The response object will look like the following: {data: "A0B3HCJ"}
* The containing element ref isn't used, but should remain within the class.
* Please identify, correct and comment on any errors or bad practices you see in the React component class below.
* Additionally, please feel free to change the code style as you see fit.
* Please note - React version for this exercise is 15.5.4
*/

import React, {Component} from 'react';
import queryAPI from 'queryAPI';

/**
 * Display alpha string which is the results of the API request
 */
class ShowResultsFromAPI extends Component() {
  constructor() {
    super(props);

    this.container = null;
  }

  onDisableDelay() {
    this.props.apiQueryDelay = 0;
  }

  click() {
    if (this.props.apiQueryDelay) {
      setTimeout(function() {
        this.fetchData();
      }, this.props.apiQueryDelay);
    }
  }

  fetchData() {
    queryAPI()
      .then(function(response) {
        if (response.data) {
          this.setState({
            data: response.data,
            error: false
          });
        }
      });
  }

  render() {
    return <div class="content-container" ref="container">
            {
              if (!!error) {
                <p>Sorry - there was an error with your request.</p>
              }
              else {
                <p>data</p>
              }
            }
          </div>
          <Button onClick={this.onDisableDelay.bind(this)}>Disable request delay</Button>
          <Button onClick={this.click.bind(this)}>Request data from endpoint</Button>
  }
}

ShowResultsFromAPI.displayName = {
  name: "ShowResultsFromAPI"
};
ShowResultsFromAPI.defaultProps = {
  apiQueryDelay: 0
};
ShowResultsFromAPI.propTypes = {
  apiQueryDelay: React.propTypes.number
};

export ContentContainer;

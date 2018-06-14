import React from 'react';

export default class Root extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return <div>{React.Children.toArray(this.props.children)}</div>;
  }
}

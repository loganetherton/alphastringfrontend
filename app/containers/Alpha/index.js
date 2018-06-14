/**
 * Alpha container
 */
import React, { PropTypes } from 'react';
import { Row, Col, Panel, Button, FormControl, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import {makeSelectAlphaInfo} from './selectors';
import {getAlpha, setProp} from './actions';

import CenterHorizontal from 'components/CenterHorizontal';
import ContentWrapper from 'components/ContentWrapper';

/**
 * @todo Change all components to React.PureComponent (or even better, stateless functions) before deployment
 */
export class Alpha extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.toggleStringDelay = this.toggleStringDelay.bind(this, 'delay');
    this.fetchData = ::this.fetchData;

    this.state = {
      initialStringDelay: 1000,
      currentStringDelay: 1000
    };
  }

  /**
   * Toggle the delay from retrieval from the API
   * @param prop
   */
  toggleStringDelay(prop) {
    const {onSetProp} = this.props;
    let {initialStringDelay, currentStringDelay} = this.state;

    let finalStringDelay;
    finalStringDelay = currentStringDelay === initialStringDelay ? 0 : initialStringDelay
    this.setState({
      currentStringDelay: finalStringDelay
    });
    onSetProp(prop, finalStringDelay);
  }

  /**
   * Retrieve alpha string from the backend
   */
  fetchData() {
    const {currentStringDelay} = this.state;
    const {onGetAlpha} = this.props;
    setTimeout(() => {
      onGetAlpha();
    }, currentStringDelay);
  }

  render() {
    const {alpha} = this.props;
    return (
      <ContentWrapper className="content-wrapper">
        <Helmet
          title="Alpha"
          meta={[
            { name: 'description', content: 'Description of Alpha' },
          ]}
        />
        <Row>
          <Col sm={ 6 } smOffset={3}>
            <CenterHorizontal>
              <Panel header={alpha.alphaString}/>
            </CenterHorizontal>
          </Col>
        </Row>
        <Row>
          <Col sm={ 6 } smOffset={3}>
            <CenterHorizontal>
              <Panel header="Get Alpha String">
                <form role="form">
                  <Button bsStyle="default" bsSize="small" onClick={this.fetchData}>Get Alpha String</Button>
                  <Button bsStyle="default" bsSize="small" name="delay" onClick={this.toggleStringDelay}>Remove Delay</Button>
                </form>
              </Panel>
            </CenterHorizontal>
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

Alpha.propTypes = {
  onGetAlpha: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  alpha: makeSelectAlphaInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAlpha: () => dispatch(getAlpha()),
    onSetProp: (...vals) => dispatch(setProp(...vals)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alpha);

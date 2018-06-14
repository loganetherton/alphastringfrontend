import React from 'react';
import { shallow } from 'enzyme';

import Root from '../index';

describe('<Root />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Root>
        {children}
      </Root>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

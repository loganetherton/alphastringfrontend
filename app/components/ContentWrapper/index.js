import React from 'react';
import styled from 'styled-components';

import {media} from '../Media';

const ContentWrapperInside = styled.div`
  ${media.sm`
     padding: 20px;
  `}
  padding: 15px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  margin-top: -1px;
`;

// export default ContentWrapper;

export default class ContentWrapper extends React.PureComponent {
  render() {
    return (
      <section>
        <ContentWrapperInside className="content-wrapper">
          {this.props.children}
        </ContentWrapperInside>
      </section>
    );
  }
}

import React from 'react';
import styled from 'styled-components';

const PageHeaderTop = styled.div``;

const PageHeaderSmall = styled.small`
  display: block;
  font-size: 12px;
  color: #909FA7;
`;

function PageHeader(header, subTitle) {
  return (
    <div className="content-heading">
      <PageHeaderTop>{header} {subTitle && <PageHeaderSmall>{subTitle}</PageHeaderSmall>}</PageHeaderTop>
    </div>
  );
}

PageHeader.propTypes = {
  header: React.PropTypes.string.isRequired,
  subTitle: React.PropTypes.string
};

export default PageHeader;

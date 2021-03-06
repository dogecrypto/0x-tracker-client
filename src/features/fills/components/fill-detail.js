import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';

const Title = styled.dt`
  ${media.md`
    width: 20%;
  `};
`;

const Value = styled.dd`
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.md`
    width: 80%;
  `};
`;

const FillDetail = ({ children, title }) => (
  <React.Fragment>
    <Title>{title}</Title>
    <Value>{children}</Value>
  </React.Fragment>
);

FillDetail.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FillDetail;

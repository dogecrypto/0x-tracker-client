import _ from 'lodash';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';

import { URL } from '../../../constants';
import PageLayout from '../../../components/page-layout';
import TokenList from './token-list';

const PAGE_SIZE = 50;

const TokensPage = ({ history, page }) => (
  <PageLayout
    breadcrumbItems={[{ title: 'Tokens', url: URL.TOKENS }]}
    title="Traded Tokens"
  >
    <TokenList history={history} limit={PAGE_SIZE} page={page} />
  </PageLayout>
);

TokensPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
};

const enhance = compose(
  withProps(({ location }) => ({
    querystring: qs.parse(location.search.substring(1)),
  })),
  withProps(({ querystring }) => ({
    page: _.toNumber(querystring.page) || 1,
  })),
);

export default enhance(TokensPage);

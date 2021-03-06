import { Card, CardBody, CardHeader, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const StyledChartsContainer = styled(Card)`
  border-radius: none;
`;

const ChartsContainerHeader = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
`;

const ChartsContainerBody = styled(CardBody)`
  align-items: center;
  display: flex;
  height: ${({ chartsHeight }) => chartsHeight}px;
  justify-content: center;
`;

const ChartLink = styled(NavLink)`
  cursor: pointer;
`;

const PeriodLink = styled(NavLink)`
  cursor: pointer;
  padding: 0.2rem 0.7rem;

  &&.active {
    background-color: ${colors.gallery};
    color: inherit;
  }
`;

const Periods = styled(Nav).attrs({ pills: true })`
  align-self: flex-end;
  font-size: 12px;
  margin-bottom: -0.2rem;
`;

class ChartsContainer extends PureComponent {
  constructor(props) {
    super(props);

    const { charts, defaultPeriod } = props;

    this.state = {
      selectedChart: charts[0].title,
      selectedPeriod: defaultPeriod,
    };
  }

  render() {
    const { charts, chartsHeight, periods } = this.props;
    const { selectedPeriod, selectedChart } = this.state;

    const Chart = charts.find(chart => chart.title === selectedChart).component;
    const chartProps = { period: selectedPeriod };

    return (
      <StyledChartsContainer>
        <ChartsContainerHeader>
          {charts.length === 1 ? (
            charts[0].title
          ) : (
            <Nav card tabs>
              {charts.map(chart => (
                <NavItem key={chart.title}>
                  <ChartLink
                    active={selectedChart === chart.title}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() =>
                      this.setState({ selectedChart: chart.title })
                    }
                  >
                    {chart.title}
                  </ChartLink>
                </NavItem>
              ))}
            </Nav>
          )}
          {periods && (
            <Periods>
              {periods.map(period => (
                <NavItem key={period.value}>
                  <PeriodLink
                    active={selectedPeriod === period.value}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() =>
                      this.setState({ selectedPeriod: period.value })
                    }
                  >
                    {period.label}
                  </PeriodLink>
                </NavItem>
              ))}
            </Periods>
          )}
        </ChartsContainerHeader>
        <ChartsContainerBody chartsHeight={chartsHeight}>
          {React.isValidElement(Chart) ? (
            React.cloneElement(Chart, chartProps)
          ) : (
            <Chart {...chartProps} />
          )}
        </ChartsContainerBody>
      </StyledChartsContainer>
    );
  }
}

ChartsContainer.propTypes = {
  charts: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  chartsHeight: PropTypes.number.isRequired,
  defaultPeriod: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};

ChartsContainer.defaultProps = {
  periods: undefined,
};

export default ChartsContainer;

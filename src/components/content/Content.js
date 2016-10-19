import React from 'react';
import { connect } from 'react-redux';
import AppActions from '../../actions/AppActions';
import BillList from '../bills/BillList';
import Timeframe from '../timeframe/Timeframe';

export class Content extends React.Component {

  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  render() {
    const { 
      bills,
      year,
      month
    } = this.props;

    return (
      <div className="main">
        <div>
          <h2>
            <Timeframe year={year} month={month} />
          </h2>
        </div>
        <BillList bills={bills} />
      </div>
    );
  }

  onLogoutClick() {
    AppActions.logout();
  }

}

const setProps = (state) => {
  const { activeTab, year, month } = state.app;
  return {
    bills: state.bills,
    activeTab,
    year,
    month
  };
};

export default connect(setProps)(Content);

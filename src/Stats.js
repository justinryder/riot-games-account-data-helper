import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selectors from './selectors';
import './Stats.css';

class Stat extends PureComponent {
  static propTypes = {
    currencyType: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
  };

  getValueString = () => {
    let value = this.props.value;

    if (this.props.currencyType) {
      value = this.props.value && this.props.value.toLocaleString(
          undefined, {
            style: 'currency',
            currency: this.props.currencyType,
          });
    }

    if (typeof value === 'number') {
      value = value.toLocaleString();
    }

    return value == null ? 'Unknown' : value;
  };

  render() {
    return (
      <div className="stat">
        <div className="stat__label">{this.props.label}:</div>
        <div className="stat__value">{this.getValueString()}</div>
      </div>
    );
  }
}

class Stats extends PureComponent {
  render() {
    return (
      <div className="stats">
        <div className="stats__header">Summary</div>
        <Stat
          currencyType={this.props.currencyType}
          label="Total Spent on RP"
          value={this.props.totalSpentOnRp}
        />
        <Stat
          label="Total RP Transactions"
          value={this.props.totalRpTransactions}
        />
        <Stat
          currencyType={this.props.currencyType}
          label="Largest RP Transaction"
          value={this.props.largestRpTransaction}
        />
        <Stat
          currencyType={this.props.currencyType}
          label="Smallest RP Transaction"
          value={this.props.smallestRpTransaction}
        />
        <div className="store-transaction-breakdown">
          <div className="store-transaction-breakdown__header">Store Transaction Breakdown</div>
          {this.props.storeTransactionBreakdown && Object.values(this.props.storeTransactionBreakdown).map(data =>
            <div className="store-transaction-breakdown__row" key={data.type}>
              <div className="store-transaction-breakdown__type">{data.type} ({data.count} Transactions)</div>
              <Stat
                label="IP"
                value={data.ip}
              />
              <Stat
                label="RP"
                value={data.rp}
              />
              <Stat
                label="Refunds"
                value={data.refunds}
              />
            </div>
          )
            || <div>Drag storeTransactions.json to the box above to see the transaction breakdown.</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencyType: selectors.getCurrencyType(state),
  totalSpentOnRp: selectors.getTotalSpentOnRp(state),
  totalRpTransactions: selectors.getTotalRpTransactions(state),
  largestRpTransaction: selectors.getLargestRpTransaction(state),
  smallestRpTransaction: selectors.getSmallestRpTransaction(state),
  storeTransactionBreakdown: selectors.getStoreTransactionBreakdown(state),
});

export default connect(mapStateToProps)(Stats);

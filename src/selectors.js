import { createSelector } from 'reselect';
import filterDistinct from './filterDistinct';
import * as PurchaseTypes from './purchaseTypes';

const getAccountDataFile = state => state['accountData.json'];
const getAccountEventsFile = state => state['accountEvents.json'];
const getGroupedReportsFile = state => state['groupedReports.json'];
const getLoginEventsFile = state => state['loginEvents.json'];
const getRpPurchasesFile = state => state['rpPurchases.json'];
const getStoreTransactionsFile = state => state['storeTransactions.json'];

export const getAccountDataFileContents = createSelector([
  getAccountDataFile,
], accountData => accountData.contents ? JSON.parse(accountData.contents) : null);

export const getAccountEventsFileContents = createSelector([
  getAccountEventsFile,
], accountEvents => accountEvents.contents ? JSON.parse(accountEvents.contents) : null);

export const getGroupedReportsFileContents = createSelector([
  getGroupedReportsFile,
], groupedReports => groupedReports.contents ? JSON.parse(groupedReports.contents) : null);

export const getLoginEventsFileContents = createSelector([
  getLoginEventsFile,
], loginEvents => loginEvents.contents ? JSON.parse(loginEvents.contents) : null);

export const getRpPurchasesFileContents = createSelector([
  getRpPurchasesFile,
], rpPurchases => rpPurchases.contents ? JSON.parse(rpPurchases.contents) : null);

export const getStoreTransactionsFileContents = createSelector([
  getStoreTransactionsFile,
], storeTransactions => storeTransactions.contents ? JSON.parse(storeTransactions.contents) : null);


export const getCurrencyType = createSelector([
  getRpPurchasesFileContents,
], rpPurchases => rpPurchases && rpPurchases.length ? rpPurchases[0].currencyType : 'USD');

export const getTotalRpTransactions = createSelector([
  getRpPurchasesFileContents,
], rpPurchases => rpPurchases && rpPurchases.length);

export const getLargestRpTransaction = createSelector([
  getRpPurchasesFileContents,
], rpPurchases => rpPurchases && rpPurchases.reduce((max, purchase) => Math.max(max, purchase.amount), 0));

export const getSmallestRpTransaction = createSelector([
  getRpPurchasesFileContents,
], rpPurchases => rpPurchases && rpPurchases.reduce((min, purchase) => Math.min(min, purchase.amount), Number.MAX_VALUE));

export const getTotalSpentOnRp = createSelector([
  getRpPurchasesFileContents,
], rpPurchases => rpPurchases && rpPurchases.reduce((sum, purchase) => sum + purchase.amount, 0));



export const getStoreTransactionBreakdown = createSelector([
  getStoreTransactionsFileContents,
], storeTransactions => storeTransactions && storeTransactions.reduce(
    (accumulator, transaction) => {
      const data = accumulator[transaction.type];
      data.count++;
      data.ip += transaction.ip;
      data.rp += transaction.rp;
      if (transaction.refunded) {
        data.refunds++;
      }
      return accumulator;
    },
    Object.values(PurchaseTypes).reduce((accumulator, type) => {
      accumulator[type] = {
        type,
        count: 0,
        ip: 0,
        rp: 0,
        refunds: 0,
      };
      return accumulator;
    }, {})
  )
);

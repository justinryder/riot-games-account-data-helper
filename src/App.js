import React, { Component } from 'react';
import './App.css';
import './FileDrop.css';
import { connect } from 'react-redux';
import FileDrop from 'react-file-drop';
import * as actions from './actions';
import * as selectors from './selectors';
import ObjectViewer from './ObjectViewer';
import Stats from './Stats';

const readFile = file =>
  new Promise(resolve => {
    const fileReader = new FileReader();

    fileReader.onload = (e) =>
      resolve({
        file,
        contents: e.target.result,
      });;

    fileReader.readAsText(file);
  });

class App extends Component {
  handleFileDrop = (files, event) => {
    Promise.all(Array.from(files).map(readFile))
      .then(readFiles =>
        readFiles.forEach(file =>
          this.props.dispatch(actions.updateFile(file))
        )
      );
  };

  render() {
    return (
      <div className="App">
        <h1>Riot Games Account Data Helper</h1>
        <FileDrop
          onDrop={this.handleFileDrop}
        >
          Drag your account data files here.
        </FileDrop>
        <Stats/>
        <div className="file-contents">
          <div className="file-contents__heading">File Contents</div>
          <ObjectViewer
            name="accountData.json"
            obj={this.props.accountData}
          />
          <ObjectViewer
            name="accountEvents.json"
            obj={this.props.accountEvents}
          />
          <ObjectViewer
            name="groupedReports.json"
            obj={this.props.groupedReports}
          />
          <ObjectViewer
            name="loginEvents.json"
            obj={this.props.loginEvents}
          />
          <ObjectViewer
            name="rpPurchases.json"
            obj={this.props.rpPurchases}
          />
          <ObjectViewer
            name="storeTransactions.json"
            obj={this.props.storeTransactions}
          />
        </div>
        <div className="flex-spacer"></div>
        <div className="disclaimer">
          <div className="disclaimer__header">Disclaimer</div>
          <div>
            <p className="disclaimer__text disclaimer__text--large">This application stores absolutely none of your data. Everything runs on your browser. Nothing is sent to my server.</p>
            <p className="disclaimer__text"><a href="https://github.com/justinryder/riot-games-account-data-helper">Look at the source code on GitHub</a> if you want proof or want to see how this app works or would like to fork it and add more features.</p>
            <p className="disclaimer__text disclaimer__text--small">This app is not associated with Riot Games. I made this tool as a way to understand my account data when I requested it, because JSON files aren&#39;t the most user-friendly way to view data. I am providing it free of charge and without warranty. Post any bugs you may find or features you want as a <a href="https://github.com/justinryder/riot-games-account-data-helper/issues"> GitHub issue</a>. Feel free to fork this project and make a PR with changes or rehost it with any changes yourself.</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountData: selectors.getAccountDataFileContents(state),
  accountEvents: selectors.getAccountEventsFileContents(state),
  groupedReports: selectors.getGroupedReportsFileContents(state),
  loginEvents: selectors.getLoginEventsFileContents(state),
  rpPurchases: selectors.getRpPurchasesFileContents(state),
  storeTransactions: selectors.getStoreTransactionsFileContents(state),
});

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { fromJS } from 'immutable';

export const convert = (amount, rate) => (
  amount*rate
).toFixed(2);

class App extends Component {
  static get namespace(){
    return 'coinx-app';
  }

  static get actions(){
    return {
      fetchBots: () =>({
        network: {
          handler: 'getBots',
          nextAction: { type: 'setBots' },
        },
      }),

    };
  }

  static get reducer(){
    return {
      setBots: (state, { payload }) =>
      state.set('bots', fromJS(payload)),
    };
  }

  static get initState(){
    return fromJS({
      bots: null,
    });
  }

  componentWillMount(){
    this.props.fetchBots();
  }

  render() {
    const bots = this.props.subState.get('bots');

    if ( bots === null ) return (<div> loading bots... </div>);
    return (
      <ul>
        {
          bots.map((bot, i) => (
            <li key={i}>
              <div>{bot.get('name')}</div>
              <div>{bot.get('age')}</div>
            </li>
          ))
        }
      </ul>
    )

  }
}

export default App;

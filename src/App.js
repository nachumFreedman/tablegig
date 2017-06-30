import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'react-bootstrap';
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
      selectBot: (i) => ({
        type: 'selectBot',
        payload: i,
      }),

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

      selectBot: (state, { payload }) =>
      state.update('botSelection', (botSelection) =>
      (payload === botSelection) ? null : payload
    ),
  };
}

static get initState(){
  return fromJS({
    bots: null,
    botSelection: null,
  });
}

componentWillMount(){
  this.props.fetchBots();
}

render() {
  const bots = this.props.subState.get('bots');
  const botSelection = this.props.subState.get('botSelection');


  if ( bots === null ) return (<div> loading bots... </div>);
  return (
    <div className="tablePage">
      <Table striped bordered condensed hover>
        <tbody>
          {
            bots.map((bot, i) => (
              <tr key={i}
                style={{
                  textDecoration: (i === botSelection ? 'underline' : 'none')
                }}
                onClick={ () => this.props.selectBot(i) }>
                <td>{bot.get('name')}</td>
                <td>{bot.get('age')}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )

}
}

export default App;

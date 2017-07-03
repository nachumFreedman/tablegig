import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
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

      setFilterValue: (setActionFilterValue) => console.log(setActionFilterValue.target.value, 'allah akbar')|| ({
        type: 'setFilterValue',
        payload: setActionFilterValue.target.value,
      }),
    };
  }

  static get reducer(){
    return {
      setBots: (state, { payload }) =>
      state.set('bots', fromJS(payload)),

      selectBot: (state, { payload }) =>
      state.update('botSelection', (botSelection) =>
      (payload === botSelection) ? null : payload),

      setFilterValue: (state, { payload }) =>
      state.set('filterValue', payload),

    };
  }

  static get initState(){
    return fromJS({
      bots: null,
      botSelection: null,
      filterValue: '',
    });
  }

  componentWillMount(){
    this.props.fetchBots();
  }

  render() {
    const bots = this.props.subState.get('bots');
    const botSelection = this.props.subState.get('botSelection');
    const filterValue = this.props.subState.get('filterValue').toLowerCase();
    const setFilterValue = this.props.setFilterValue;
    console.log(filterValue);

    if ( bots === null ) return (<div> loading bots... </div>);
    return (
      <div className="tablePage">
        <input onChange={setFilterValue} value={filterValue}/>
        <button className="btn btn-link">Search</button>
        <button className="btn btn-primary">Add</button>
        <div className="modal fade" id="myModal" role="dialog"/>
        <div className="modal-dialog"/>
        <ul>
          {
            bots.filter(bot =>
              bot.get('name').toLowerCase().indexOf(filterValue) > -1)
              .map((bot, i) =>
              (

                <li className="botRow"
                  key={i}
                  style={{
                    backgroundColor: (i === botSelection ? 'grey' : 'white')
                  }}
                  onClick={
                    (event) => this.props.selectBot(i)}>
                    <div>{bot.get('name')}</div>
                    <div>{bot.get('company')}</div>

                    <button
                      onClick={(event) => event.stopPropagation()}
                      type="button"
                      className="btn btn-primary btn-info btn-lg"
                      data-toggle="modal" data-target="#myModal"
                      >Edit</button>
                    <button
                      onClick={(event) => event.stopPropagation()}
                      className="btn btn-warning">Export</button>
                    <button
                      onClick={(event) => event.stopPropagation()}
                      className="btn btn-danger">Delete</button>
                  </li>
                ))
              }
            </ul>
          </div>
        )

      }
    }

    export default App;

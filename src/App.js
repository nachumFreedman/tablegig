import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { fromJS } from 'immutable';
import { Modal, Button } from 'react-bootstrap';
import  FaTrashO  from 'react-icons/lib/fa/trash-o';
import FaEye from 'react-icons/lib/fa/eye';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';


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

      setFilterValue: (setActionFilterValue) =>({
        type: 'setFilterValue',
        payload: setActionFilterValue.target.value,
      }),

      openModal: (i) => ({
        type: 'setOpenModal',
        payload: i,
      }),

      closeModal: () => ({
        type: 'setOpenModal',
        payload: null,
      }),
    };
  }

  static get reducer(){
    return {
      setBots: (state, { payload }) =>
      state.set('bots', fromJS(payload)),

      setFilterValue: (state, { payload }) =>
      state.set('filterValue', payload),

      setOpenModal: (state, {payload}) =>
      state.set('openModal', payload),

    };
  }

  static get initState(){
    return fromJS({
      bots: null,
      filterValue: '',
      openModal: null,
    });
  }

  componentWillMount(){
    this.props.fetchBots();
  }

  render() {
    const bots = this.props.subState.get('bots');
    //  const botSelection = this.props.subState.get('botSelection');
    const filterValue = this.props.subState.get('filterValue').toLowerCase();
    const setFilterValue = this.props.setFilterValue;
    const openModal = this.props.subState.get('openModal');
    const closeModal = this.props.closeModal;

    console.log(filterValue);

    if ( bots === null ) return (<div> loading bots... </div>);
    return (
      <div className="tablePage">
        <input onChange={setFilterValue} value={filterValue}/>
        <button className="btn btn-link">Search</button>
        <button className="btn btn-primary">+</button>
        <div className="modal fade" id="myModal" role="dialog"/>
        <div className="modal-dialog"/>
        <div className="tableBorder">
        <ul className="list-group">
          <li className="botRow list-group-item">
            <div>
              <h2>Bot Name</h2>
            </div>
            <div>
              <h2>Bot Provider</h2>
            </div>
            <div>
              <h2>Edit Bot</h2>
            </div>
            <div>
              <h2>Export Button</h2>
            </div>
            <div>
              <h2>Delete Bot</h2>
            </div>
          </li>
          {
            bots.filter(bot =>
              bot.get('name').toLowerCase().indexOf(filterValue) > -1)
              .map((bot, i) =>
              (
                <li className="botRow list-group-item" key={i}>
                      <div>{bot.get('name')}</div>
                      <div>{bot.get('company')}</div>
                      <div>
                        <button
                          onClick={(event) => event.stopPropagation()}
                          className="listButton btn btn-primary btn-xs">
                          <FaEye className="buttonIcon"/>
                          Edit
                        </button>
                      </div><div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          this.props.openModal(i)
                        }}
                        className="listButton btn btn-warning btn-xs">
                        <FaShoppingCart className="buttonIcon"/>
                        Export
                      </button>
                    </div><div>
                    <button
                      onClick={(event) => event.stopPropagation()}
                      className="listButton btn btn-danger btn-xs ">
                      <FaTrashO className="buttonIcon"/>
                      Delete
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
          {openModal === null ? null :
            <div className="static-modal">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  {openModal}
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={closeModal}>Close</Button>
                  <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>

              </Modal.Dialog>
            </div>
          }
        </div>
      )
    }
  }

  export default App;

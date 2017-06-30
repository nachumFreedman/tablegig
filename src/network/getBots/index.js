const bots = [
  {
    name: 'John',
    age: 89,
    type: 2,
  }, {
    name: 'mick',
    age: 42,
    type: 1
  }
];

class getBots {


  handleRequest(action){
    action.network.url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=BTC,USD,EUR';
    this.fetcher.handleRequest(action);

  }
  constructor(next, done, err, {Fetcher}){
    this.fetcher = new Fetcher(
      pon=> next( { payload: pon } ),
      done,
      err
    );

  }
}

export default getBots;


export const getBotsMock = class getBotsMock {
  constructor(next){
    this.next = next
  }

  handleRequest( action ){
    this.next({ payload: bots });
  }
};

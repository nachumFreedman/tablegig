const bots = [
  {
    name: 'John',
    company: 'salesman',
    _id: 2,
  }, {
    name: 'mick',
    company: 'thievery',
    _id: 1,
  }, {
    name: 'aaron bank',
    company: 'banking',
    _id: 0,
  }, {
    name: 'shachar',
    company: 'programming',
    _id: 666,
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

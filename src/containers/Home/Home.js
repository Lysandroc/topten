import React, { Component } from 'react';
import axios from 'axios';

import styles from './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const promise = (async function myfunc() {
      const get = await axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=BRL&limit=10');
      const [response] = await Promise.all([get]);
      const { data } = response;
      return data;
    }());
    
    promise.then((data) => {
      this.setState({ data });
    });

    const listItems = this.state.data.map((item) => {
      const { name, symbol } = item;
      const price = item['24h_volume_brl'];
      
      return <li> {symbol} {name} - R$ {parseFloat(Math.round(price * 100) / 100).toFixed(2)} </li>;
    });
    return (
      <div className={styles.base}>
        <h1>Cryptocurrency</h1>
        {/* <Link to="/se ttings">Settings</Link> */}
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default Home;

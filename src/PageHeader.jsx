import React, {Component} from 'react';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

export default (props) => (
  <div className="headerBar">
    <div className="dropDown">
      <button className="btn btn-default dropbtn "><FaAngleDown/></button>
      <div className="dropDown-content">
        <ul className="dropDownLinkList">
          <li>
            <a href="#" style={{backgroundColor: props.color}}>Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

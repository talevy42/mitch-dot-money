import React from 'react'
import './footer.scss'
import logo from '../../images/dsa-la-logo.png'

export default function Footer() {
  return (
    <div className="footer content panel dark">
      <a
        href="http://www.dsa-la.org/"
        alt="DSA Los Angeles"
        className="dsala-logo"
      >
        <img className="dsala-logo" src={logo} alt="David Ryu dot money" />
        DSA - Los Angeles{' '}
      </a>{' '}
      <a href="http://www.dsa-la.org/" alt="DSA Los Angeles">
        Created by DSA - Los Angeles{' '}
      </a>{' '}
      <p>
        Paid for by Democratic Socialists of America (DSA-LA), PO Box1038, New
        York, NY 10272
      </p>
    </div>
  )
}

import React from 'react'
import CountUp from 'react-countup'
import H2 from '../h2/h2.component'
import './intro.scss'
import config from '../../config'

const Intro = () => (
  <div className="intro">
    <H2>
      {`${config.target}`}
      <br />
      Total Support
    </H2>
    <p className="donation-value">
      <CountUp
        prefix="$"
        delay={0.5}
        start={0}
        end={config.total_cash}
        separator=","
        duration={2.5}
        useEasing
      />
    </p>
    <p className="donation-subhead">
      including direct donations
      <br />
      and independent expenditures
    </p>
    <p className="introduction">
      {`Learn about the wealthy donors and PACs who fund ${config.target}.`}
    </p>
  </div>
)

export default Intro

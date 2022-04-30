import React from 'react'
import Button from '../../components/button/button.component'
import H2 from '../../components/h2/h2.component'

export default function(props) {
  return (
    <div>
      <H2>Fed Up?</H2>
      <div className="content panel light">
        <div className="inner">
          <p>
            The battle for the future of Los Angeles is being fought in the
            streets and in City Hall. Our opponents are the well-funded
            corporations and billionaires who have completely bought and paid
            for the City Council; as evidenced by the two council members
            prosecuted for corruption in recent years. Donors like the ones
            listed on this site are rigging the game in real time. To combat
            this level of money in politics, we have no choice but to counter
            with a multiracial working class movement that is fighting for the
            soul of Los Angeles and the country. Join us.
          </p>
          <Button href="http://www.dsa-la.org/join-us">GET ORGANIZED</Button>
          <Button href="http://www.dsa-la.org/calendar/list">
            DO SOMETHING
          </Button>
        </div>
      </div>
    </div>
  )
}

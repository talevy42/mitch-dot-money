import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import H2 from '../../components/h2/h2.component'
import config from '../../config'
import './faq.scss'

class Section extends Component {
  state = {
    isOpened: false
  }

  toggleCollapse = () => {
    this.setState(({ isOpened }) => ({
      isOpened: !isOpened
    }))
  }

  render() {
    const { title, children } = this.props
    const { isOpened } = this.state
    return (
      <div className="collapse-container">
        <h3
          className={isOpened ? 'opened' : 'closed'}
          onClick={this.toggleCollapse}
        >
          {title}{' '}
        </h3>{' '}
        <Collapse isOpened={isOpened}> {children} </Collapse>{' '}
      </div>
    )
  }
}

const FAQ = () => (
  <div className="faq-wrapper">
    <H2> FAQ </H2>{' '}
    <div className="content panel light faq">
      <div className="inner">
        <Section title="What’s the big deal about money in politics?">
          <p>
            Simply put, politicians are supposed to represent the masses and the
            masses aren’t rich. At every level of government we’ve seen the
            havoc that can be wreaked by unfettered corporate money in
            campaigns. Here in Los Angeles, three sitting city councilmen have
            been indicted on corruption charges in recent years. Sadly, Mitch
            Englander and Jose Huizar are just the most extreme example of a
            glaring problem that plagues our city council. It is awash in
            corporate money from greedy real estate developers and their ilk.
            These are the people who get sweetheart, tax-free deals to build
            massive condo and hotel complexes that displace the poor and
            unhoused and serve only tourists and wealthy, itinerant Angelenos.
            Even during this pandemic, cranes are hard at work erecting massive
            structures from Hollywood to Downtown. And none of that is housing
            for you or the people you care about.
          </p>
          <p>
            The wealthy have the cash to max out to candidates and contribute to
            PACs that work on the candidates behalf. Their wealth buys them the
            time to make a stink to their local politicians (who they have
            donated tons of money to, remember) until they get their way. This
            is how our unhoused neighbors get criminalized. This is how popular
            bike lanes get killed. This is how we demolish housing to build
            football stadiums. This is how we are STILL demolishing housing to
            build freeways. For the health and future of the city, it has to be
            stopped.
          </p>{' '}
        </Section>{' '}
        <Section title={`Why are you picking on ${config.target}?`}>
          <p>
            {`It’s not personal. He just happens to be a perfect example of a Los
            Angeles City Council member. He talks as progressively as he has to
            in order to get elected. He does so while taking tons of money from
            the real estate developers that are making this city uninhabitable
            to all but the very wealthy. Usually city council races are a real
            race to the bottom affair, but this time you actually have an
            alternative! ${config.candidate} is a corporate-free, democratic socialist
            candidate running against ${config.target} in ${config.district}.
            ${config.candidate_bio}`}
          </p>
          <p>
            {`${config.candidate_first} is running in ${config.district} on a bold, forward thinking plan
            including transforming public safety, rent forgiveness, public
            broadband and protecting small business. Because ${config.candidate_pronoun2}’s sworn off the
            type of big money that ${config.target} accepts, ${config.candidate_pronoun2} doesn’t have the help
            of multinational polluters like Dart Container company; whose scions
            left the country rather than pay taxes. Or slumlords like Mike
            Nijjar of PAMA Management and their typhus infested trailer parks.
            And ${config.candidate_pronoun2} didn’t take thousands and thousands of dollars from the
            police. So, ${config.candidate_pronoun2}’s going to need your help!`}
          </p>{' '}
        </Section>{' '}
        <Section title="Who made this site?">
          <p>
            We did! The Los Angeles chapter of the Democratic Socialists of
            America. We seek to create a system based on justice and equality
            for all people. We believe everyone deserves to live their own life
            with dignity. We work to equalize political and economic power,
            because true democracy cannot coexist with inequality. We urgently
            fight to stop the many crises facing our most powerless members of
            society. We are not a political party. We are a coalition of people,
            united to create a more powerful front against the worst that
            capitalism has to offer. If you are interested in learning more or
            pitching in, we could use your help. Los Angeles is a big city and
            we have lots of work to do.{' '}
          </p>{' '}
        </Section>{' '}
        <Section title="Where’d you get your information from?">
          <p>
            All the donations of the site are available through The Los Angeles
            City Ethics Committee portal,{' '}
            <a href="https://ethics.lacity.org/">here</a>. The articles we
            reference are all linked to and publicly available via Google
            search.
          </p>{' '}
        </Section>{' '}
        <Section
          title={`${config.candidate_first} sounds great. Can I vote for ${config.candidate_pronoun}? I don't know what district I'm in!`}
        >
          <p>
            Don’t feel bad. It’s a big city. It happens to all of us. Find your
            district{' '}
            <a href="http://rrcc.lacounty.gov/OnlineDistrictmapApp/">here</a>
          </p>{' '}
        </Section>{' '}
      </div>{' '}
    </div>{' '}
  </div>
)

export default FAQ

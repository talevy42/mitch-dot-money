import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import H2 from '../../components/h2/h2.component'
import './faq.scss'

class Section extends Component {
  state = {
    isOpened: false
  }

  toggleCollapse = () => {
    this.setState(({ isOpened }) => ({ isOpened: !isOpened }))
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
          {title}
        </h3>
        <Collapse isOpened={isOpened}>{children}</Collapse>
      </div>
    )
  }
}

const FAQ = () => (
  <div className="faq-wrapper">
    <H2>FAQ</H2>
    <div className="content panel light faq">
      <div className="inner">
        <Section title="Why are you so mad about money in politics?">
          <p>
            Cuz it's bullshit
          </p>
        </Section>
        <Section title="I definitely don’t want to vote for Buffy. Who should I vote for instead?">
          <p>
            Nithya, dog.
          </p>
        </Section>
        <Section title="What does David mean when he says he takes no contributions “from corporations”?">
          <p>
            Probs doesn't mean that he doesn't take contributions from corporations
          </p>
        </Section>
        <Section title="David says she doesn’t have any control over who spends money on her behalf. Why does it matter who gives to these PACs?">
          <p>
            Is true.
          </p>
        </Section>
        <Section title="Who made this site? How can I learn more about DSA and get involved in the election?">
          <p>
            DSA-LA baby.
          </p>
        </Section>
        <Section title="Where’d you get all this information from?">
          <p>
            The internet
          </p>
        </Section>
        <Section title="What Assembly District am I in?">
          <p>
            I dunno
          </p>
        </Section>
        <Section title="When is the election, where is my polling place, and am I registered to vote?">
          <p>November 3, 2020. Don't be late
          </p>
        </Section>
        <Section title="I have a corporate candidate running in my local election. How can I make a site like this?">
          <p>
            Steal this shit!
          </p>
        </Section>
      </div>
    </div>
  </div>
)

export default FAQ

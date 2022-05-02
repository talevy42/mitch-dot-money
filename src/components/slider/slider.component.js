import React, { Component, Fragment } from 'react'
import memoize from 'lodash/memoize'
import Slider from 'react-slick'
import Measure from 'react-measure'
import ReactMarkdown from 'react-markdown'
import Select from 'react-select'
import classNames from 'classnames'
import donors from '../../data/donors.json'
import config from '../../config'
import './slider.scss'

const kebabCase = str =>
  str
    .toLowerCase()
    .replace(/\(.*\)/, '')
    .trim()
    .replace(/ \/ /g, '-')
    .replace(/ /g, '-')
    .replace(/("|,|\?)/g, '')
    .replace(/&/g, 'and')

const getImage = donorName => {
  return donorName
  try {
    const fileName = kebabCase(donorName)
    return require(`../../images/donors/${fileName}.png`)
  } catch (e) {
    return require(`../../images/donors/no-photo.jpg`)
  }
}

class Slide extends Component {
  state = {
    nameDimensions: {
      width: 0,
      height: 0
    }
  }

  linkRenderer = props => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )

  render() {
    const {
      imageSrc,
      name,
      directDonation,
      pacDonation,
      title,
      description,
      categories,
      isVisible
    } = this.props
    const categoriesArr = splitCategories(categories).sort()
    return (
      <div className={classNames('ryu-slide', kebabCase(name))}>
        {imageSrc && (
          <div
            className="ryu-slide__image"
            style={{ backgroundImage: `url('${getImage(imageSrc)}')` }}
          />
        )}
        {isVisible && (
          <div
            className={classNames('ryu-slide__content', {
              'ryu-slide__content--no-image': !imageSrc
            })}
          >
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ nameDimensions: contentRect.bounds })
              }}
            >
              {({ measureRef }) => (
                <div ref={measureRef} className="ryu-slide__name">
                  <h3>{name}</h3>
                  <h5>{title}</h5>
                  <div className="ryu-slide__donations">
                    {directDonation && (
                      <div className="ryu-slide__donation">
                        Direct:{' '}
                        <span className="ryu-slide__donation-value">
                          {directDonation}
                        </span>
                      </div>
                    )}
                    {pacDonation && (
                      <div className="ryu-slide__donation">
                        PAC:{' '}
                        <span className="ryu-slide__donation-value">
                          {pacDonation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Measure>
            <div
              className="ryu-slide__scrollable"
              style={{
                height: `calc(100% - ${this.state.nameDimensions.height}px)`
              }}
            >
              {/* <h4>{title}</h4> */}
              <ReactMarkdown
                renderers={{ link: this.linkRenderer }}
                source={description}
              />
              {categoriesArr.length > 0 && (
                <div className="ryu-slide__categories">
                  {categoriesArr.map(category => (
                    <div className="ryu-slide__category" key={category}>
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const splitCategories = category => category.split(', ').filter(Boolean)

const setHash = value => {
  if (!value) {
    return removeHash()
  }
  const hash = `#${value}`
  if ('pushState' in window.history) {
    window.history.pushState(null, null, hash)
  } else {
    window.location.hash = hash
  }
}

// https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r/5298684#5298684
const removeHash = () => {
  let scrollV,
    scrollH,
    loc = window.location
  if ('pushState' in window.history)
    window.history.pushState('', document.title, loc.pathname + loc.search)
  else {
    // Prevent scrolling by storing the page's current scroll offset
    scrollV = document.body.scrollTop
    scrollH = document.body.scrollLeft

    loc.hash = ''

    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scrollV
    document.body.scrollLeft = scrollH
  }
}

const getSlideIndexById = hash => {
  if (!hash) return -1
  const id = hash.replace('#', '')
  return donors.findIndex(donor => id === kebabCase(donor['Name']))
}

const getInitialSlideIndex = () => {
  const index = getSlideIndexById(window.location.hash)
  return index < 0 ? 0 : index
}

const _getDonorsInCategories = categories => {
  return donors.filter(donor => {
    if (!donor['Name']) return false
    if (categories.length === 0) return true
    const cats = splitCategories(donor['Categories'])
    return cats.reduce((inResultSet, cat) => {
      return inResultSet || categories.includes(cat)
    }, false)
  })
}

const getDonorsInCategories = memoize(_getDonorsInCategories)

class DonorSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategories: [],
      query: null,
      currentSlide: getInitialSlideIndex(),
      sliderSettings: Object.assign({}, this.getSliderSettings(), {
        initialSlide: getInitialSlideIndex()
      })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setSliderSettings)
    window.addEventListener('click', this.jumpToSlide, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSliderSettings)
    window.removeEventListener('click', this.jumpToSlide, false)
  }

  bindRef = ref => {
    this.slider = ref
  }

  bindQuerySelectRef = ref => {
    this.querySelect = ref
  }

  baseSliderSettings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '35px',
    slidesToShow: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    lazyLoad: true,
    afterChange: index => {
      this.updateHash(index)
      this.setState({ currentSlide: index })

      const { query } = this.state
      if (query && query.value !== index) {
        this.querySelect.select.clearValue()
      }
    }
  }

  tabletSliderSettings = Object.assign({}, this.baseSliderSettings, {
    slidesToShow: 2,
    slidesToScroll: 1,
    centerPadding: '100px',
    arrows: true
  })

  desktopSliderSettings = Object.assign({}, this.tabletSliderSettings, {
    slidesToShow: 3
  })

  getSliderSettings = () => {
    const windowWidth = window.innerWidth
    if (windowWidth >= 1000) {
      return this.desktopSliderSettings
    } else if (windowWidth >= 768) {
      return this.tabletSliderSettings
    }
    return this.baseSliderSettings
  }

  setSliderSettings = () => {
    const sliderSettings = this.getSliderSettings()
    if (this.state.sliderSettings !== sliderSettings) {
      this.setState({ sliderSettings })
    }
  }

  updateHash = index => {
    const visibleDonors = getDonorsInCategories(this.state.selectedCategories)
    const id = index < 1 ? null : kebabCase(visibleDonors[index]['Name'])
    setHash(id)
  }

  jumpToSlide = event => {
    const { hash } = event.target
    if (hash) {
      const index = getSlideIndexById(hash)
      if (index > -1) {
        event.preventDefault()
        this.slider.slickGoTo(index)
      }
    }
  }

  categories = donors
    .reduce((categories, donor) => {
      const cats = splitCategories(donor['Categories'])
      cats.forEach(cat => {
        if (!categories.includes(cat)) categories.push(cat)
      })
      return categories
    }, [])
    .filter(Boolean)
    .sort()
    .map(cat => ({ value: cat, label: cat }))

  handleCategoryChange = options => {
    this.setState(
      {
        selectedCategories: options.map(option => option.value)
      },
      () => {
        // scroll to top of each scroll container
        // after the card filters are updated
        ;[].forEach.call(
          document.querySelectorAll('.ryu-slide__scrollable'),
          elm => {
            elm.scrollTo(0, 0)
          }
        )
      }
    )
  }

  handleQueryChange = donor => {
    this.setState({ query: donor })
    if (donor) {
      const { value: index } = donor
      this.slider.slickGoTo(index)
    }
  }

  // used for improved performance on mobile
  isVisible = (cardIndex, currentIndex) => {
    const padding = 3
    const visibleDonors = getDonorsInCategories(this.state.selectedCategories)
    const max = visibleDonors.length - 1
    const minVisible = currentIndex - padding
    const maxVisible = currentIndex + padding
    if (minVisible < 0) {
      return cardIndex > max + minVisible || cardIndex < maxVisible
    } else if (maxVisible > max) {
      return cardIndex > minVisible || cardIndex < maxVisible - max
    }
    return cardIndex > minVisible && cardIndex < maxVisible
  }

  render() {
    const { selectedCategories, sliderSettings, currentSlide } = this.state
    const isMobile = sliderSettings.slidesToShow === 1
    const visibleDonors = getDonorsInCategories(selectedCategories)
    const slidesToShow = Math.min(
      visibleDonors.length,
      sliderSettings.slidesToShow
    )
    return (
      <Fragment>
        <div className="filters-wrapper">
          <div className="filter-wrapper">
            <Select
              options={this.categories}
              isMulti
              onChange={this.handleCategoryChange}
              placeholder="Filter donor types..."
              className="react-select-container"
            />
          </div>
          <div className="filter-wrapper">
            <Select
              options={visibleDonors.map((donor, index) => ({
                value: index,
                label: donor['Name']
              }))}
              isClearable
              ref={this.bindQuerySelectRef}
              onChange={this.handleQueryChange}
              placeholder="Search by name..."
              className="react-select-container"
            />
          </div>
        </div>
        <Slider
          ref={this.bindRef}
          {...sliderSettings}
          slidesToShow={slidesToShow}
        >
          {visibleDonors.map((donor, index) => (
            <Slide
              key={donor['Name']}
              imageSrc={donor['Photo Source']}
              name={donor['Name']}
              directDonation={
                donor[`Donations directly to ${config.target_first}`]
              }
              pacDonation={
                donor[`Donations to ${config.target_first}-supporting PACs`]
              }
              title={donor['Title']}
              description={donor['Blurb']}
              categories={donor['Categories']}
              index={index}
              currentSlide={currentSlide}
              isVisible={!isMobile || this.isVisible(index, currentSlide)}
            />
          ))}
        </Slider>
        <div id="arrow-preloader" />
      </Fragment>
    )
  }
}

export default DonorSlider

import React, { Component } from 'react'
import './App.css'
import icon from './covid_icon.png'

let width = window.innerWidth
const resizeWidthThreshold = 700

export class App extends Component {
  state = {
    participantCount: 0,
    recalculate: false
  }

  async componentDidMount() {
    fetch('api/participants')
    .then((response) => response.json())
    .then((result) => this.setState({ participantCount: result.count }))
    .catch(() => {})

    window.addEventListener('resize', () => {
      width = window.innerWidth
      this.setState({
        resize: !this.state.resize
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize')
  }

  determineHeaderFontSize = () => {
    let fontSize = 24

    if (width < resizeWidthThreshold) {
      fontSize = 18
    } else {
      fontSize = 24
    }

    return fontSize
  }

  determineDescriptionFontSize = () => {
    let fontSize = 16

    if (width < resizeWidthThreshold) {
      fontSize = 12
    } else {
      fontSize = 16
    }

    return fontSize
  }

  determineItalicFontSize = () => {
    let fontSize = 14

    if (width < resizeWidthThreshold) {
      fontSize = 10
    } else {
      fontSize = 14
    }

    return fontSize
  }

  determineParticipantFontSize = () => {
    let fontSize = 80

    if (width < resizeWidthThreshold) {
      fontSize = 65
    } else {
      fontSize = 80
    }

    return fontSize
  }

  render() {
    return (
      <div style={{ display: 'flex', backgroundColor: '#fff', flexDirection: 'column', marginBottom: 100 }}>

        <div style={{ display: 'flex', marginTop: 12, marginBottom: 12, marginLeft: 25, marginRight: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <img style={{ height: 35, marginRight: 10 }} src={icon} alt="CovidIcon"/>
            <p style={{ fontSize: '100%', color: '#575757' }}>Global COVID-19 Pandemic Poll</p>
          </div>

          <p style={{ fontSize: '100%', color: '#575757' }}>Beta v0.0.1</p>
        </div>

        <div style={{ height: 1, backgroundColor: '#acb'}}/>
        
        <div style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', flexDirection: 'column', marginTop: window.innerHeight * 0.05, borderColor: '#c8c8c8', borderStyle: 'solid', borderRadius: 3, borderWidth: 1, width: '80%', paddingLeft: window.innerWidth * 0.03, paddingRight: window.innerWidth * 0.03 }}>
          <p style={{ fontWeight: 700, fontSize: this.determineHeaderFontSize(), color: '#d67272' }}>Global COVID-19 Poll Disclaimer</p>
          <p style={{ marginTop: -10, fontWeight: 500, fontSize: this.determineDescriptionFontSize(), color: '#575757', textAlign: 'center' }}>
            This poll is an effort to allow the global community to shed some light into the covid-19 pandemic.
            We ask for an honest participation. Otherwise, this could have a serious negative implication to
            public opinion.
          </p>

          <i style={{ display: 'flex', fontWeight: 400, fontSize: this.determineItalicFontSize(), color: '#575757', fontStyle: 'italics', marginBottom: 20, textAlign: 'center' }}>
            This poll is not backed by any scientific or governmental agency and thus should be treated with
            skepticism; data could be innacurate or tampered through foreign means.
          </i>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: -40 }}>
          <p style={{ fontSize: this.determineParticipantFontSize(), fontWeight: 700, color: '#575757', borderBottomWidth: 3, borderBottomColor: '#575757', borderBottomStyle: 'solid', textAlign: 'center' }}>
            {this.state.participantCount.toLocaleString()}<br/>
            🙋‍♂️&🙋‍♀️👉🗳
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '5%', paddingRight: '5%', marginTop: -30 }}>

          <QuestionContainer question={"How did you feel when the outbreak started in Wuhan?"}>
            <EmojiButton emoji={"😀"} label={"I felt safe"} color={'#bca'} position={'first'}/>
            <EmojiButton emoji={"😟"} label={"I felt anxious"} color={'#ccb3aa'} position={'second'}/>
            <EmojiButton emoji={"🤔"} label={"I wasn't sure"} color={'#abc'} position={'third'}/>
          </QuestionContainer>

          <QuestionContainer question={"Do you think it will get worse around the globe?"}>
            <EmojiButton emoji={"🤕"} label={"Yes"} color={'#a5d3b3'} position={'first'}/>
            <EmojiButton emoji={"🙂"} label={"No"} color={'#a5c9d3'} position={'second'}/>
            <EmojiButton emoji={"🤐"} label={"Possibly, too early to tell"} color={'#b4a5d3'} position={'third'}/>
          </QuestionContainer>

          <QuestionContainer question={"Have you been tested for COVID-19?"}>
            <EmojiButton emoji={"🧑‍🔬"} label={"Yes"} color={'#c3bc87'} position={'first'}/>
            <EmojiButton emoji={"😬"} label={"No"} color={'#879dc3'} position={'second'}/>
            <EmojiButton emoji={"✋"} label={"No, but I plan to!"} color={'#c38794'} position={'third'}/>
          </QuestionContainer>

          <QuestionContainer question={"Do you know where to get tested?"}>
            <EmojiButton emoji={"🤓"} label={"Yes"} color={'#bca'} position={'first'}/>
            <EmojiButton emoji={"😕"} label={"No"} color={'#ccb3aa'} position={'second'}/>
          </QuestionContainer>

          <QuestionContainer question={"Has the pandemic negatively affected your financial situation?"}>
            <EmojiButton emoji={"💸"} label={"Yes"} color={'#bca'} position={'first'}/>
            <EmojiButton emoji={"💰"} label={"No"} color={'#ccb3aa'} position={'second'}/>
          </QuestionContainer>

          <QuestionContainer question={"Do you wash your hands regularly?"}>
            <EmojiButton emoji={"🧼"} label={"I try to"} color={'#bca'} position={'first'}/>
            <EmojiButton emoji={"🛀"} label={"I could do better"} color={'#ccb3aa'} position={'second'}/>
          </QuestionContainer>
        </div>

        <p style={{ display: 'flex', fontSize: 12, marginBottom: -80, alignSelf: 'center' }}>Design and Engineering by Andrei Villasana - Seattle, WA</p>
      </div>
    );
  }
}

class QuestionContainer extends Component {
  state = {
    selectedAnswer: localStorage.getItem(this.props.question),
    pollResults: { question: '', first: 0, second: 0, third: 0, fourth: 0 }
  }

  onClick = (label, position) => {
    const { question } = this.props;
    // User Selected Answer For The Question Answer, Store Answer in Cache - Countermeasure to spamming
    this.setState({ selectedAnswer: label });
    localStorage.setItem(question, label);

    // Update database count for vote selected
    fetch(`api/addVote?question=${question}&position=${position}`)
    .then((response) => response.json())
    .then((result) => {})
    .catch(() => {})

    // Update database count for participants if they haven't voted
    const didAlreadyVote = localStorage.getItem('participationNumber')

    if (!didAlreadyVote) {
      fetch('api/addParticipant')
      .then((response) => response.json())
      .then((result) => localStorage.setItem('participationNumber', result))
      .catch(() => {})
    }
  }

  async componentDidMount() {
    const questionKey = this.props.question
    
    fetch(`api/pollResults?question=${questionKey}`)
    .then((response) => response.json())
    .then((result) => this.setState({ pollResults: result }))
    .catch(() => {})
  }

  determineQuestionFontSize = () => {
    let fontSize = 24

    if (width < resizeWidthThreshold) {
      fontSize = 18
    } else {
      fontSize = 24
    }

    return fontSize
  }

  render() {
    const { selectedAnswer, pollResults } = this.state;
    const pointerEvents = selectedAnswer ? 'none' : '';

    return (
      <div>
        <p style={{ fontSize: this.determineQuestionFontSize(), fontWeight: 400, color: '#d67272' }}>
          {this.props.question}
        </p>

        <div style={{ display: 'flex', pointerEvents, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: window.innerHeight * 0.05 }}>
          {this.props.children.map((child) => {
            const { label, position } = child.props;
            const clonedElement = React.cloneElement(child,
              {
                onClick: this.onClick,
                didSelect: selectedAnswer === label,
                showPolls: !!selectedAnswer,
                pollResults: pollResults[position]
              });
            return clonedElement;
          })}
        </div>
      </div>
    )
  }
}

class EmojiButton extends Component {
  state = {
    isHovering: false,
  }

  onClick = () => {
    const { onClick, label, position } = this.props;
    onClick(label, position);
  }

  determineBackgrounColor = () => {
    const { isHovering } = this.state;
    const { didSelect, color } = this.props;

    if (isHovering || didSelect) {
      return color;
    } else {
      return '#fff';
    }
  }

  determineEmojiFontSize = () => {
    let fontSize = 60

    if (width < resizeWidthThreshold) {
      fontSize = 30
    } else {
      fontSize = 60
    }

    return fontSize
  }

  determineLabelFontSize = () => {
    let fontSize = 20

    if (width < resizeWidthThreshold) {
      fontSize = 18
    } else {
      fontSize = 20
    }

    return fontSize
  }

  determineVoteFontSize = () => {
    let fontSize = 22

    if (width < resizeWidthThreshold) {
      fontSize = 18
    } else {
      fontSize = 22
    }

    return fontSize
  }

  render() {
    const { showPolls, pollResults, emoji, label } = this.props;

    return (
      <div>
        <button
          onMouseOver={() => this.setState({ isHovering: true })}
          onMouseLeave={() => this.setState({ isHovering: false })}
          style={{ display: 'flex', width: (window.innerWidth * 0.22), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: this.determineBackgrounColor(), marginTop: 10, borderWidth: 1, borderRadius: 2, borderColor: '#c8c8c8', borderLeftStyle: 'solid', borderRightStyle: 'solid', borderTopStyle: 'solid' }}
          onClick={this.onClick}>
          <p style={{ display: 'flex', fontSize: this.determineEmojiFontSize(), textAlign: 'center' }}>
            {emoji}
          </p>
          <p style={{ display: 'flex', fontSize: this.determineLabelFontSize(), fontWeight: 400, color: '#575757', textAlign: 'center', marginTop: -(window.innerHeight * 0.02), marginBottom: window.innerHeight * 0.04 }}>
            {label}
          </p>
          <div style={{ display: 'flex', width: (window.innerWidth * 0.22), height: 8, backgroundColor: this.props.color, marginBottom: -3 }}/>
        </button>
        {showPolls &&
          <p style={{ alignSelf: 'center', textAlign: 'center', fontSize: this.determineVoteFontSize() }}>
            {pollResults.toLocaleString()} 🗳<br/>
            submitted
          </p>}
      </div>
    )
  }
}
import React, { Component } from 'react'
import { Statistics } from 'components/Statistics/Statistics'
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions'
import { Section } from 'components/Section/Section'
import { Notification } from 'components/Notification/Notification'
import css from './App.module.css'

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  }

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state
    const total = good + neutral + bad
    return total
  }

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state
    const persentage = Math.round((good / (good + neutral + bad)) * 100)
      ? Math.round((good / (good + neutral + bad)) * 100)
      : 0
    return persentage
  }

  onLeaveFeedback = ({ option }) => {
    this.setState((prevState) => {
      return { [option]: prevState[option] + 1 }
    })
  }

  render() {
    const options = Object.keys(this.state)
    const { good, neutral, bad } = this.state
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.onLeaveFeedback}
          />
          <h2 className={css.title}>Statistics</h2>
          {this.countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    )
  }
}

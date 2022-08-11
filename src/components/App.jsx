import React, { useState } from 'react';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import css from './App.module.css';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  const persentage = Math.round((good / (good + neutral + bad)) * 100)
    ? Math.round((good / (good + neutral + bad)) * 100)
    : 0;

  const options = ['good', 'neutral', 'bad'];

  const onLeaveFeedback = ({ option }) => {
    if (option === 'good') {
      setGood(prevGood => prevGood + 1);
    }
    if (option === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    }
    if (option === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
        <h2 className={css.title}>Statistics</h2>
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={persentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

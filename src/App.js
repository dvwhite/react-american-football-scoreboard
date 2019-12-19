//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

// App has been refactored to be as atomic as possible as per stretch goals
function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const increaseScore = (team, amount) => {
    switch(team) {
      case 'home':
        setHomeScore(homeScore + amount);
        break;
      case 'away':
        setAwayScore(awayScore + amount);
        break;
      default: 
      // Do nothing
    }
  }

  return (
    <div className="container">
      <ScoreBoard className="scoreboard" topRowClassName="topRow" homeScore={homeScore} awayScore={awayScore} topElements={[
        <ScoreReporter className="home" headingClass="home__name" team="Lions" scoreClass="home__score" score={homeScore} />,
        <Timer className="timer" time="1:01" />,
        <ScoreReporter className="away" headingClass="away__name" team="Tigers" scoreClass="away__score" score={awayScore} />
      ]} />
      <Buttons className="buttons" buttonGroups={[ 
        <ButtonGroup className="homeButtons" buttons={[
          <ScoreUpdater className="homeButtons__touchdown" text="Home Touchdown" onUpdateScore={() => {increaseScore('home', 7)}} />,
          <ScoreUpdater className="homeButtons__fieldGoal" text="Home Field Goal" onUpdateScore={() => {increaseScore('home', 3)}} />
        ]} />,

        <ButtonGroup className="homeButtons" buttons={[
          <ScoreUpdater className="awayButtons__touchdown" text="Away Touchdown" onUpdateScore={() => {increaseScore('away', 7)}} />,
          <ScoreUpdater className="awayButtons__fieldGoal" text="Away Field Goal" onUpdateScore={() => {increaseScore('away', 3)}} />
        ]} />
      ]} />
    </div>
  );
}

function ScoreBoard(props) {
  const {homeScore, awayScore, className, topRowClassName, topElements} = props;

  return (
    <section className={className}>
      <TopRow className={topRowClassName} homeScore={homeScore} awayScore={awayScore} topContent={topElements} />
      <BottomRow />
    </section>
  );
}

function Buttons(props) {
  const {className, buttonGroups} = props;
  return (
    <section className={className}>
      {
        buttonGroups.map(buttonGroup => buttonGroup)
      }
    </section>
  );
}

function ButtonGroup(props) {
  const {className, buttons} = props;

  return (
    <div className={className}>
      {
        buttons.map(button => button)
      }
    </div>
  );
}

function TopRow(props) {
  const {className, topContent} = props;
  return (
    <div className={className}>
      {
        topContent.map(content => content)
      }
    </div>
  );
}

function ScoreReporter(props) {
  const {className, headingClass, team, scoreClass, score} = props;
  return (
    <div className={className}>
      <h2 className={headingClass}>{team}</h2>
      <div className={scoreClass}>{score}</div>
    </div>
  );
}

function ScoreUpdater(props) {
  const {className, onUpdateScore, text} = props;
  return (
    <button className={className} onClick={onUpdateScore}>{text}</button>
  );
}

// Stretch goal to add a functioning timer

/*
* Parse at time string into a two element array of minutes, seconds
* @param {string} timeStr: The time to parse
* @returns {Array} timeArr: The array of integers after parsing
*/
function parseTime(timeStr) {
  const colonPos = timeStr.indexOf(':');
  let minutes = 0;
  let seconds = 0;

  if (colonPos !== -1) {
    minutes = parseInt(timeStr.substring(0, colonPos));
    seconds = parseInt(timeStr.substring(colonPos + 1, timeStr.length + 1));
  }

  return [seconds, minutes];
}

function Timer(props) {
  const {className, time} = props;
  const [seconds, setSeconds] = useState(parseTime(time)[0]);
  const [minutes, setMinutes] = useState(parseTime(time)[1]);
  const [timeToDisplay, setTimeToDisplay] = useState(time);
 
  useEffect(() => {
    const interval = setInterval(() => {
      
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes => minutes - 1);
          setSeconds(59)
        }
      }
      let secondsStr = seconds < 10 ? `0${seconds}` : seconds;
      setTimeToDisplay(`${minutes}:${secondsStr}`);
    }, 1000);
      return () => clearInterval(interval);
  }, [seconds, minutes]);

  return (
    <div className={className}>{timeToDisplay}</div>
  );
}

export default App;

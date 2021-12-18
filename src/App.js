import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

// custom styling using styled-components!
const AppContainer = styled.div`
  background-color: #DEDEDE;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
`
const GameContainer = styled.div`
  height: 80%;
  width: 80%;
  background-color: #FFF;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const TitleContainer = styled.div`
  height: 225px;
  width: 80%;
  font-weight: 800;
  text-align: center;
  display: grid;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 40px; 
`

function Instructions(props) {
  if (props.chosen) {
    if (props.winner === "Tie") {
      return (`It's a ${props.winner}!`)
    } else {
      return (`${props.winner} has won!`)
    }
  } else {
    return ("Make your move!")
  }
}

const InstructionsContainer = styled.div`
  height: 50px;
  width: 100%;
  font-size: 26px;
  text-align: center;
`
const GameplayContainer = styled.div`
  height: 300px;
  width: 80%;
  font-size: 24px;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  justify-items: center;
  align-content: center;
`
const PlayerDisplayContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr repeat(3, 2fr);
  row-gap: 20px;
  justify-items: center; 
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  background-color: #C4C4C4;
  font-size: 20px;
  height: 100%;
  width: 80%;
  text-align: center;

  &:hover {
   cursor: pointer;
 } 
`

const ScoreContainer = styled.div`
  width: 200px;
  height: 25px;
  display: flex;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`

function Score(props) {
  if (props.name === 'player')
    return <ScoreContainer>
      <ChoiceLabel>Player Score: {props.score}</ChoiceLabel>
    </ScoreContainer>
  else {
    return <ScoreContainer>
      <ChoiceLabel>Computer Score: {props.score}</ChoiceLabel>
    </ScoreContainer>
  }
}

const ChoiceLabel = styled.p`
  width: 100%;
  align-self: center;
`

function ChoiceButton(props) {
  return (
    <ButtonContainer
      onClick={props.choiceCallback}>
      <ChoiceLabel>{props.name}</ChoiceLabel>
    </ButtonContainer>
  )
}

const ChoiceContainer = styled.div`
display: flex;
height: 100%;
width: 100%; 
justify-content: center;
align-items: center;
grid-column: 1 / 2;
grid-row: 2 / -1;
`

function Choice(props) {
  if (props.name === "Rock") {
    return (
      <ChoiceContainer>
        <i className="fas fa-hand-rock fa-7x"></i>
      </ChoiceContainer>
    )
  } else if (props.name === "Paper") {
    return (
      <ChoiceContainer>
        <i className="fas fa-hand-paper fa-7x"></i>
      </ChoiceContainer>
    )
  } else {
    return (
      <ChoiceContainer>
        <i className="fas fa-hand-scissors fa-7x"></i>
      </ChoiceContainer>
    )
  }
}

const VSContainer = styled.div`
  height: 100%; 
  font-size: 40px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function AiChoice(props) {
  if (props.chosen) {
    if (props.name === "ai-Rock") {
      return (
        <ChoiceContainer>
          <i className="fas fa-hand-rock fa-7x"></i>
        </ChoiceContainer>
      )
    } else if (props.name === "ai-Paper") {
      return (
        <ChoiceContainer>
          <i className="fas fa-hand-paper fa-7x"></i>
        </ChoiceContainer>
      )
    } else {
      return (
        <ChoiceContainer>
          <i className="fas fa-hand-scissors fa-7x"></i>
        </ChoiceContainer>
      )
    }
  } else {
    return (
      <ChoiceContainer>
        <i className="fas fa-question fa-7x"></i>
      </ChoiceContainer>
    )
  }
}

const BotDisplayContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr repeat(3, 2fr);
  row-gap: 20px;
  justify-items: center; 
`

const SettingsContainer = styled.div`
  height: 50px;
  width: 150px;
  font-size: 24px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`

const PlayAgainButtonContainer = styled.div`
  display: flex;
  background-color: #C4C4C4;
  font-size: 20px;
  height: 100%;
  width: 100%;
  text-align: center;

  &:hover {
  cursor: pointer;
`

function PlayAgainButton(props) {
  if (props.chosen) {
    return <PlayAgainButtonContainer onClick={props.resetCallback}>
      <ChoiceLabel>Play Again</ChoiceLabel>
    </PlayAgainButtonContainer>
  } else {
    return (false)
  }
}

function App() {
  const [choices, setChoices] = useState(["Rock", "Paper", "Scissors"])
  const [aiChoices, setAiChoices] = useState(["Rock", "Paper", "Scissors"])
  const [chosen, setChosen] = useState(false)
  const [addedScore, setAddedScore] = useState(false)
  const [score, setScore] = useState([0, 0])

  const chooseAiOption = () => {
    return aiChoices[Math.floor(Math.random() * aiChoices.length)]
  }

  useEffect(() => {
    if (chosen && !addedScore) {
      let newPlayerScore = score[0] + 1
      let newAiScore = score[1] + 1
      let c1 = choices[0]
      let c2 = aiChoices[0]
      setAddedScore(true)
      if ((c1 === "Rock") && (c2 === "Paper")) {
        return setScore([score[0], newAiScore])
      } else if ((c1 === "Rock") && (c2 === "Scissors")) {
        return setScore([newPlayerScore, score[1]])
      } else if ((c1 === "Paper") && (c2 === "Rock")) {
        return setScore([newPlayerScore, score[1]])
      } else if ((c1 === "Paper") && (c2 === "Scissors")) {
        return setScore([score[0], newAiScore])
      } else if ((c1 === "Scissors") && (c2 === "Rock")) {
        return setScore([score[0], newAiScore])
      } else if ((c1 === "Scissors") && (c2 === "Paper")) {
        return setScore([newPlayerScore, score[1]])
      } else {
        return score
      }
    } else {
      return score
    }
  })

  const compareChoices = (c1, c2) => {
    if ((c1 === "Rock") && (c2 === "Paper")) {
      return "Computer"
    } else if ((c1 === "Rock") && (c2 === "Scissors")) {
      return "Player"
    } else if ((c1 === "Paper") && (c2 === "Rock")) {
      return "Player"
    } else if ((c1 === "Paper") && (c2 === "Scissors")) {
      return "Computer"
    } else if ((c1 === "Scissors") && (c2 === "Rock")) {
      return "Computer"
    } else if ((c1 === "Scissors") && (c2 === "Paper")) {
      return "Player"
    } else {
      return "Tie"
    }
  }

  const chooseOption = (index) => {
    const choice = choices[index]
    setChoices([choice])
    setAiChoices([chooseAiOption()])
    setChosen(true)
  }

  const reset = () => {
    setChoices(["Rock", "Paper", "Scissors"])
    setAiChoices(["Rock", "Paper", "Scissors"])
    setChosen(false)
    setAddedScore(false)
  }

  return (
    <AppContainer>
      <GameContainer>
        <TitleContainer>
          <Title>Rock &mdash; Paper &mdash; Scissors</Title>
          <InstructionsContainer>
            <Instructions key={"instructions"}
              name={"instructions"}
              chosen={chosen}
              winner={compareChoices(choices[0], aiChoices[0])}>
            </Instructions>
          </InstructionsContainer>
        </TitleContainer>
        <GameplayContainer>
          <PlayerDisplayContainer>
            <Score name='player' score={score[0]} />
            {choices.map((item, i) => {
              if (choices.length === 1) {
                return <Choice key={i} name={item} chosen={false} />
              } else {
                return <ChoiceButton key={i} name={item} choiceCallback={() => chooseOption(i)} />
              }
            })}
          </PlayerDisplayContainer>
          <VSContainer>
            VS
          </VSContainer>
          <BotDisplayContainer>
            <Score name='ai' score={score[1]} />
            <AiChoice key={"ai-choice"} name={`ai-${aiChoices[0]}`} chosen={chosen} />
          </BotDisplayContainer>
        </GameplayContainer>
        <SettingsContainer>
          <PlayAgainButton chosen={chosen} resetCallback={() => reset()} />
        </SettingsContainer>
      </GameContainer>
    </AppContainer>
  );
}

export default App;

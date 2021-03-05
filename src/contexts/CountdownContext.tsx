import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); //tranforma os minutos em segundos
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); //faz o arredondamento dos minutos p/ baixo
  const seconds = time % 60; //é o resto que sobra do cálculo dos minutos
  //transformou na string 25 -> '25'
  //split() divide a string e transforma no array '25'-> '2','5'
  //pasStart() se a string não tiver 2 caracteres será acrescentado 0
  //'5'->'05'->'0', '5'

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
      //resetCountdown();
      //alert('Tempo esgotado!');
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://assets.codepen.io/4298611/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1585923065&width=512"
        alt="Bianca Reis"
      />
      <div>
        <strong>Bianca Reis</strong>

        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}

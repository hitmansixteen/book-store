import React from 'react'
import styles from './Author.module.css'

// Author Component
export const Author = (props) => {

  return (
  <div className={styles.authorCard}>
    <h2 className={styles.authorName}>{props.author.name}</h2>
    <p className={styles.authorBio}>{props.author.biography}</p>
  </div>
  )

};

export default Author;


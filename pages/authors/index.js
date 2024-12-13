import React from 'react';
import styles from '@/styles/General.module.css';
import Author from '@/components/Authors/author';
import { getAllAuthors } from '@/helpers/api-util';

// '/authors' page (shows all the authors)
const AuthorsPage = ({ authors }) => {
  if (!authors) {
    return <h2>Data Failed to Load</h2>;
  }

  return (
    <div>
      <header className={styles.heading}>Authors Page</header>
      <ul>
        {authors.map((i) => {
          return (
            <li key={i.id}>
              <Author author={i} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const authors = await getAllAuthors();

  if (!authors) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      authors,
    },
  };
}

export default AuthorsPage;

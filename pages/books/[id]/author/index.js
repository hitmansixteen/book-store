
import React  from 'react'
import styles from '@/styles/General.module.css';
import Author from '@/components/Authors/author';
import { getAuthorById, getBookById } from '@/helpers/api-util';
import { getSession } from 'next-auth/react';

// '/books/[id]/author' page (shows a author information of a specific book)
const SpecificBooksAuthor = (props) => {

  if (!props.session) {
    return (
      <div>
        <header className={styles.heading}>Author Information</header>
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div>

    <header className={styles.heading}>Author Information</header>
    <Author author = {props.Author}/>

    </div>
  )

}

export async function getServerSideProps(context){
  // Restrict access to only logged-in users
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }


  const book = await getBookById(context.params.id)

  if(!book){
    return{
      redirect:{
        destination: '/404'
      }
    }
  }

  const author = await getAuthorById(book.authorId)

  return {
    props:{
      Author: author,
      session
    }
  }
}

export default SpecificBooksAuthor;

import React from 'react';
import styles from '@/styles/General.module.css'

// '/info/[...slug]' page
const InfoSlugPage = (props) => {

  return (
    <div>
      <header className={styles.heading}>Info Page - {props.slug}</header>
      <p className={styles.text}>This is the dynamic info page for {props.slug}</p>
    </div>
  );

};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  console.log(slug)

  const allowedSlugs = ['faqs', 'support'];

  if (!allowedSlugs.includes(slug[0])) {
    return {
      notFound: true,
    };
  }

  return {
    props:{
      slug:slug[0]
    },
  };
}


export default InfoSlugPage;
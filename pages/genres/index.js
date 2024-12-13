import React from 'react'
import styling from '../../styles/General.module.css'
import { useRouter } from 'next/router';
import { getAllGenres } from '@/helpers/api-util';


// '/gneres' page (shows all the genres)
const GenrePage = (props) => {

  const router = useRouter()

  const genreClicked = (id) =>{

    //giving the id as a parameter so that it can be used in the filering page
    router.push(`/books?genre=${id}`)
  }

  return (
    <div>
      
      <header className={styling.heading}>All Genres</header>
  
      <ul className={styling.genreList}>
        {props.genres.map((genre) => (
          <li key={genre.id} className={styling.genreItem} onClick={()=> genreClicked(genre.id)}>
            {genre.name}
          </li>
        ))}
      </ul>

    </div>
      
  )
}

export async function getServerSideProps(){

  const Genres = await getAllGenres()

  if(!Genres){
    return{
      redirect:{
        destination: '/error'
      }
    }
  }

  return {
    props:{
      genres:Genres
    }
  }
}

export default GenrePage;

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {useGetSongsBySearchQuery} from '../redux/services/shazemCore'
import {Error, Loader, SongCard} from '../components'

const Search = () => {
  const {searchTerm} = useParams()
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {data, isFetching, error} = useGetSongsBySearchQuery(searchTerm)

  const songs = data?.tracks?.hits?.map((song) => song.track);
  
    if(isFetching) return <Loader title='Loading Top Charts' />
    if(error) return <Error />

    return ( 
        <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-lwft mt-4 mb-10'>Showing Results for <span className='font-black'>{searchTerm}</span></h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {songs?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default Search;
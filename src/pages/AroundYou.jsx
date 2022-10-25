import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import {useGetSongsByCountryQuery} from '../redux/services/shazemCore'
import {Error, Loader, SongCard} from '../components'

const AroundYou = () => {
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {data, isFetching, error} = useGetSongsByCountryQuery(country)

    useEffect(() => {
        axios.get(`https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_ZIZyukgN3UIXKMZMQZK1I5HYn9NBN`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [country])

    if(isFetching && loading) return <Loader title='Loading songs around you' />
    if(error && country) return <Error />

    return ( 
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-lwft mt-4 mb-10'>Around You</h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, i) => (
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

export default AroundYou;

import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext/authContext'
import GuestCounter from '../guests/GuestCounter'
import GuestFilter from '../guests/GuestFilter'
import GuestForm from '../guests/GuestForm'
import Guests from '../guests/Guests'
import GuestSearch from '../guests/GuestSearch'

function Home() {
    const { loadUser } = useContext(AuthContext)

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])
    
    return (
        <div className="app-container">
            <div className="main">
                <div className="filter">
                    <GuestFilter />
                    <GuestSearch /> 
                </div>
                <GuestForm />
                <GuestCounter />
            </div>
            <Guests />
      </div>
    )
}

export default Home

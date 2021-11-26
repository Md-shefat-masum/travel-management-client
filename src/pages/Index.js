import React from 'react'
import Banner from '../components/Banner'
import Caurses from '../components/Events'
import Contact from '../components/Contact'
import TimeSchedule from '../components/Upcomming'
import Blog from '../components/Blog'

function Index() {
    
    return (
        <div>
            <Banner></Banner>
            <Caurses></Caurses>
            <TimeSchedule></TimeSchedule>
            <Blog></Blog>
            <Contact></Contact>
        </div>
    )
}

export default Index

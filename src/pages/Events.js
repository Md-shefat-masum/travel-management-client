import React, { useContext, useEffect, useState } from 'react'
import EventBody from '../components/EventBody';
import authContext from '../context/authContex';

function Events() {
    const [services, setServices] = useState([]);
    const context_data = useContext(authContext)

    useEffect(() => {
        fetch(`${context_data.ApiUrl}/events`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setServices(data);
            })
    }, [context_data.ApiUrl])

    return (
        <section id="caurses">
            <h2 className="section_title">our Events</h2>
            <div className="container mt-5">
                <div className="row">
                    {
                        services.map((item, index) => {
                            return (
                                <div className="col-md-4" key={item._id} >
                                    <EventBody item={item} index={index}></EventBody>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </section >
    )
}

export default Events

import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/authContex';
import EventBody from './EventBody';

export default function Events() {
    const [services, setServices] = useState([]);
    const context_data = useContext(authContext)

    useEffect(() => {
        fetch(`${context_data.ApiUrl}/events`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setServices(data);
            })
    }, [context_data])

    return (
        <section id="caurses">
            <h2 className="section_title">our events</h2>
            <div className="container mt-5">
                <div className="row">
                    {
                        services.map((item, index) => {
                            return index < 6 && (
                                <div className="col-md-4" key={item._id} >
                                    <EventBody item={item}></EventBody>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section >
    )
}

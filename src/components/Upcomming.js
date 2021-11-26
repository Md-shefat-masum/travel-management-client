import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Upcomming() {
    const [events, setevents] = useState([])
    useEffect(() => {
        fetch('/upcomming.json')
        .then(res=>res.json())
        .then(data=>{
            setevents(data);
        })
    }, [])
    return (
        <section id="caurses">
            <h2 className="section_title">Upcomming Events</h2>
            <div className="container mt-5">
                <div className="row">
                    {
                        events.map((item,index)=>{

                            
                            return index < 4 && <div className="col-md-3" key={item.id}>
                                        <div className="card shadow shdow-lg border-0">
                                            <div className="card-body schedule_body">
                                            <img src={'/assets/upcomming/' + item.image} alt="service" className="img-fluid" />
                                                <h4>{item.title}</h4>
                                                <ul className="d-flex justify-content-between">
                                                    <li>
                                                        <i className="icon_table "></i>
                                                        {item.date}
                                                    </li>
                                                    <li>
                                                        <i className="icon_clock_alt "></i>
                                                        11:00 <small>pm</small>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                            
                        })
                    }
                    
                </div>
            </div>
        </section>
    )
}

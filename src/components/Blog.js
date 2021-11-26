import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Blog() {
    const [events, setevents] = useState([])
    useEffect(() => {
        fetch('/blog.json')
            .then(res => res.json())
            .then(data => {
                setevents(data);
            })
    }, [])
    return (
        <section id="caurses">
            <h2 className="section_title">Our Blogs</h2>
            <div className="container mt-5">
                <div className="row">
                    {
                        events.map((item, index) => {


                            return index < 2 && <div className="col-md-6 mb-4 " key={item.id}>
                                <div className="card shadow shdow-lg border-0 h-100">
                                    <div className="card-body schedule_body ">
                                        <div className="row">
                                            <div className="col-4 overflow-hidden">
                                                <img src={'/assets/blog/' + item.image} alt="service" className="rounded-3" style={{height:'190px'}} />
                                            </div>
                                            <div className="col-8">
                                                <h4 className="text-start">{item.title}</h4>
                                                <p>
                                                    {item.description.substr(0,200)}
                                                </p>
                                                {/* <ul className="d-flex justify-content-between">
                                                    <li>
                                                        <i className="icon_table "></i>
                                                        {item.date}
                                                    </li>
                                                    <li>
                                                        <i className="icon_clock_alt "></i>
                                                        11:00 <small>pm</small>
                                                    </li>
                                                </ul> */}
                                            </div>
                                        </div>

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

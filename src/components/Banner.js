import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Banner() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/services.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setServices(data);
            })
    }, [])
    return (
        <>
            <section id="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-md-none d-lg-block"></div>
                        <div className="col-md-12 col-lg-6">
                            <div className="banner_content">
                                <h2>Life is a journey, not a destination</h2>
                                <p>
                                    We are very happy to welcome you for travelling with us. We have events in every week end and government holidays.
                                    Moreover we can also arrange special events for groups.
                                </p>
                                <Link to="/about">Read more</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="search_tour">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <form action="">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group my-2">
                                            <label htmlFor="destinition">Destinition</label>
                                            <select className="form-control">
                                                {
                                                    services.map(item => {
                                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group my-2">
                                            <label htmlFor="destinition">Start Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group my-2">
                                            <label htmlFor="destinition">End Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 d-flex justify-content-center align-items-end">
                                        <button className="btn btn-success w-100 my-2">Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

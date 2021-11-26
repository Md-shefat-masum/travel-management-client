import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import authContext from '../context/authContex';

function EventDetails() {
    let { id } = useParams();
    // const [serviceList, setServiceList] = useState([]);
    const [serviceDetails, setServiceDetails] = useState({});
    const [load, setload] = useState(false);
    const context_data = useContext(authContext)
    
    useEffect(() => {
        fetch(`${context_data.ApiUrl}/events`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // setServiceList(data);
                setServiceDetails(data.find(item => item._id === id));
                setload(true);
                // console.log( );
            })
    }, [id,context_data])

    return (
        <section>
            {load &&
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center pt-5">Event Details</h3>
                        </div>
                        <div className="col-12 my-5 py-5">
                            <div className="card">
                                <div className="card-body">
                                    <img className="w-100" src={`${context_data.ApiUrl}/${serviceDetails.image}`} alt="service details" />
                                    <h4 className="my-4">{serviceDetails.title}</h4>
                                    <p>
                                        {serviceDetails.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default EventDetails

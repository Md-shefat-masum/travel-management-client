import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import authContext from '../context/authContex';

export default function EventBody(props) {
    let item = props.item;
    const context_data = useContext(authContext)

    return (
        <div className="caurses_body h-100 p-0 py-4">
            <div className="details shadow shadow-sm p-4 h-100">
                {/* <i className="icon flaticon-exercise-1"></i> */}
                <img src={`${context_data.ApiUrl}/${item.image}`} alt="service" className="img-fluid" />
                <h3>{item.title}</h3>
                <h4 className="text-danger">Cost: {item.cost} /-</h4>
                <h4><small>Days: {item.days}</small></h4>
                <br />
                <p>
                    {item.description.substring(0, 200)}
                </p>
                <div className="d-flex justify-content-center">
                    <Link className="btn btn-info" to={'/tour-details/' + item._id}>Details</Link>
                    <Link className="btn btn-info ms-4" to={'/tour-cart/' + item._id}>Add to cart</Link>
                    {/* <button onClick={() => { add_to_cart() }} className="btn btn-success ms-4">Add to cart</button> */}
                </div>
            </div>
        </div>
    )
}

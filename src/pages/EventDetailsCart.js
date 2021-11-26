import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import authContext from '../context/authContex';

function EventDetailsCart() {
    let { id } = useParams();
    const [load, setload] = useState(false);
    const context_data = useContext(authContext);

    const [UserName, setUserName] = useState('');
    const [Address, setAddress] = useState('');
    const [Phone, setPhone] = useState('');
    const [AddionalNote, setAddionalNote] = useState('');
    const [serviceDetails, setServiceDetails] = useState({});


    useEffect(() => {
        // console.log(context_data);
        fetch(`${context_data.ApiUrl}/events`)
            .then(res => res.json())
            .then(data => {
                setServiceDetails(data.find(item => item._id === id));
                // console.log(serviceDetails);
                setload(true);
            })
    }, [context_data.ApiUrl,id]);

    const add_to_cart = (e) => {
        e.preventDefault();

        let cart_info = {
            user_name: UserName,
            address: Address,
            phone: Phone,
            addional_note: AddionalNote,
            service_details: serviceDetails,
            status: 'pending',
            email: context_data.authData.email,
        }

        let temp_cart = [...context_data.CartList];
        let my_temp_cart = [...context_data.MyCartList];

        // console.log(cart_info);
        axios.post(`${context_data.ApiUrl}/cart`, cart_info)
            .then(res => {
                temp_cart.push(res.data);
                my_temp_cart.push(res.data);
                context_data.setCartList(temp_cart);
                context_data.setMyCartList(my_temp_cart);
            })

        setAddress('');
        setPhone('');
        setAddionalNote('');
        e.target.reset();
        window.toaster('success', 'added to cart');
        // console.log(cart_info,context_data.CartList);
    }

    return (
        <section>
            {load &&
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center pt-5">Service Cart</h3>
                        </div>
                        <div className="col-12 my-5 py-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img className="w-100" src={`${context_data.ApiUrl}/${serviceDetails.image}`} alt="service details" />
                                        </div>
                                        <div className="col-md-8">
                                            <form action="#" onSubmit={(e) => add_to_cart(e)}>
                                                <ul>
                                                    <li>{serviceDetails.title}</li>
                                                    <li className="mt-4">
                                                        Name:
                                                        <input type="text" name="name" onChange={(e) => setUserName(e.target.value)} defaultValue={context_data.authData.displayName} className="form-control" />
                                                    </li>
                                                    <li className="mt-4">
                                                        Address:
                                                        <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} className="form-control" />
                                                    </li>
                                                    <li className="mt-4">
                                                        Phone:
                                                        <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)} className="form-control" />
                                                    </li>
                                                    <li className="mt-4">
                                                        Addtional Note:
                                                        <input type="text" name="addional_note" onChange={(e) => setAddionalNote(e.target.value)} className="form-control" />
                                                    </li>
                                                    <li className="mt-4">
                                                        <button className="btn btn-success">Submit</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <h4 className="my-4">Description</h4>
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

export default EventDetailsCart

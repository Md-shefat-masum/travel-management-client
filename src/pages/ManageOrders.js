import axios from 'axios';
import React, { useContext } from 'react'
import authContext from '../context/authContex'

function ManageOrders() {
    const context_data = useContext(authContext)

    const delete_event = (id, index) => {
        let confirms = window.confirm('sure want to delete?');
        if (confirms) {
            axios.delete(`${context_data.ApiUrl}/delete-cart/${id}`)
                .then(res => {
                    // console.log(res.data, index);
                    let temp_service = [...context_data.MyCartList];
                    temp_service = temp_service.filter((item)=>item._id !== id);
                    context_data.setMyCartList(temp_service);

                    temp_service = [...context_data.CartList];
                    temp_service = temp_service.filter((item)=>item._id !== id);
                    context_data.setCartList(temp_service);
                })
        }
    }
    const accept_event = (id, index) => {
        let confirms = window.confirm('sure want to accept?');
        if (confirms) {
            axios.delete(`${context_data.ApiUrl}/accept-cart/${id}`)
                .then(res => {
                    // console.log(res.data, index);
                    let temp_service = [...context_data.CartList];
                    temp_service[index].status = 'accepted';
                    context_data.setCartList(temp_service);

                    let my_temp_service = [...context_data.MyCartList];
                    my_temp_service.find((item)=>item._id === id?item.status='accepted':'');
                    context_data.setMyCartList(my_temp_service);
                    // console.log(temp_service,index);
                })
        }
    }
    return (
        <>
            <section className="humburger">
                <h1>Manage Orders</h1>
            </section>
            <section>
                <div className="container">
                    <div className="card my-5">
                        <div className="card-header">
                            <h4>Orders list</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Order Id</th>
                                        <th>Email</th>
                                        <th>Cost</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        context_data.CartList.map((item, index) => {
                                            // console.log(item);
                                            return <tr key={item._id}>
                                                <td><img src={`${context_data.ApiUrl}/${item.service_details.image}`} style={{width:'100px'}} alt="" /></td>
                                                <td>{item.service_details.title}</td>
                                                <td>{item._id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.service_details.cost}</td>
                                                <td>
                                                    <span className={item.status==='pending'?'text-danger ': 'text-success'}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td> 
                                                    <button onClick={()=>accept_event(item._id,index)} className="btn btn-warning me-3">Accept</button>
                                                    <button onClick={()=>delete_event(item._id,index)} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ManageOrders

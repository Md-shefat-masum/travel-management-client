import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/authContex';

function ManageServices() {
    const [services, setServices] = useState([]);
    const [ShowModal, setShowModal] = useState(false);
    const context_data = useContext(authContext)

    useEffect(() => {
        fetch(`${context_data.ApiUrl}/events`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setServices(data);
            })
    }, [context_data.ApiUrl])

    const save_event = (e) => {
        e.preventDefault();
        // console.log(e.target);
        let formData = new FormData(e.target);
        axios.post(`${context_data.ApiUrl}/event`, formData)
            .then(res => {
                // console.log(res.data);
                let temp_service = [...services];
                temp_service.unshift(res.data);
                setServices(temp_service);
                e.target.reset();
                setShowModal(!ShowModal);
                window.toaster('success', 'new data inserted');
            })
            .catch(err => {
                console.log(err);
            })
    }

    const delete_event = (id, index) => {
        let confirms = window.confirm('sure want to delete?');
        if (confirms) {
            axios.delete(`${context_data.ApiUrl}/delete-event/${id}`)
                .then(res => {
                    // console.log(res.data, index);
                    let temp_service = [...services];
                    temp_service.splice(index, 1);
                    setServices(temp_service);
                })
        }
    }

    return (
        <>
            <section className="humburger">
                <h1>Manage Event</h1>
            </section>

            <section>
                <div className="container">
                    <div className="card my-5">
                        <div className="card-header d-flex justify-content-between">
                            <h4>Events list</h4>
                            <a href="#/" onClick={() => { setShowModal(!ShowModal) }} className="btn btn-success">Add new event</a>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th style={{ width: '150px' }}>Description</th>
                                        <th>Cost</th>
                                        <th>Day</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        services.map((item, index) =>
                                        (
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td><img src={`${context_data.ApiUrl}/${item.image}`} alt="service" style={{ width: "100px" }} /></td>
                                                <td>{item.title}</td>
                                                <td>{item.description.substr(0, 100)}..</td>
                                                <td>{item.cost}</td>
                                                <td>{item.days}</td>
                                                <td>
                                                    <a href="#/" onClick={() => { delete_event(item._id, index) }} className="btn btn-danger">Delete</a>
                                                </td>
                                            </tr>
                                        )
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div className={ShowModal ? `modal fade d-block show` : 'modal fade'} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New event from</h5>
                            <button type="button" onClick={() => { setShowModal(!ShowModal) }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="#" onSubmit={(e) => { save_event(e) }} encType="multipart/form-data">
                            <div className="modal-body">
                                <div className="form-group my-2">
                                    <label htmlFor="image">Image Url</label>
                                    <input type="file" name="image" required className="form-control" />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" required className="form-control" />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="text" name="description" required className="form-control" />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="cost">Cost</label>
                                    <input type="text" name="cost" required className="form-control" />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="days">Days</label>
                                    <input type="text" name="days" required className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => { setShowModal(!ShowModal) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageServices

import React from 'react'

export default function Contact() {
    return (
        <section id="contact">
            <div className="overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 pe-0">
                            <div className="form_body">
                                <form action="#/">
                                    <h3>Contact Us</h3>
                                    <div className="form-group mb-4">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" className="form-control" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" id="email" className="form-control" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="subject">Subject</label>
                                        <input type="text" id="subject" className="form-control" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="subject">Subject</label>
                                        <textarea type="text" id="subject" className="form-control" />
                                    </div>
                                    <button>Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 ps-0">
                            <div className="contact_info">
                                <h4>Contact Information</h4>
                                <ul className="address">
                                    <li><i className="icon_clock_alt"></i> Mon-Sat 09.00-18.00</li>
                                    <li><i className="icon_pin_alt"></i> Dolesshor road, Saydabad</li>
                                    <li><i className="icon_phone"></i> +880968585856</li>
                                    <li><i className="icon_mail_alt"></i> contact@gym.com</li>
                                </ul>

                                <ul className="d-flex s_links">
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-facebook-f" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-twitter" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-google-plus" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-tumblr" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="fab fa-instagram" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

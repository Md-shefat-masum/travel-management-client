import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section>
            <div className="container my-5 py-5 text-center">
                <h1>404 <br />  page not found</h1>
                <Link className="btn btn-success mt-4" to="/">gotback</Link>
            </div>
        </section>
    )
}

export default NotFound

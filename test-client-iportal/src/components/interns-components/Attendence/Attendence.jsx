import React from 'react'
import { Link } from 'react-router-dom'
import { AttendaceButton } from '../AttendaceButton'
import Page_Attendence from '../Page_Attendence/Page_Attendence'

export const Attendence = () => {
    return (
        <>
            <div className="app-content content ">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <AttendaceButton />
                        {/* Basic Tables start */}
                        <div className="row" id="basic-table">
                            <div className="col-12">
                                <div className="card" style={{ marginBottom: "", width: "1105px" }}>
                                    <div className="att-btns">

                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>DATE</th>
                                                    <th>To</th>
                                                    <th>FROM</th>
                                                    <th>REASON</th>
                                                    <th>PROGRESS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer footer-static footer-light" style={{ padding: "0px", margin: "0px", marginTop: "154px" }}>
                    <div></div>
                    <p className="clearfix mb-0" style={{ marginLeft: "10px" }}>
                        <span className="mt-25">
                            COPYRIGHT &copy; 2024
                            <a className="ml-25" href="https://ezitech.org/html-css-internship-opportunities/" target="_blank" rel="noopener noreferrer">
                                Ezitech Institute
                            </a>
                            <span className="d-none d-sm-inline-block">, All rights Reserved</span>
                        </span>
                        <span className="float-md-right d-none d-md-block">
                            <a href="https://www.facebook.com/" style={{ color: "#75727f" }}>
                                <i className="mr-1" data-feather='facebook' style={{ color: "#5E5873" }}></i>
                            </a>
                            <a href="https://www.instagram.com/">
                                <i
                                    className="mr-1"
                                    data-feather='instagram'
                                    style={{ color: "#75727f", marginLeft: "15px" }}
                                ></i>
                            </a>
                            <a href="https://www.linkedin.com/">
                                <i
                                    className="mr-1"
                                    data-feather='linkedin'
                                    style={{ color: "#75727f", marginLeft: "15px" }}
                                ></i>
                            </a>
                            <a href="https://twitter.com/i/flow/login">
                                <i
                                    className="mr-1"
                                    data-feather='youtube'
                                    style={{ color: "#75727f", marginLeft: "15px" }}
                                ></i>
                            </a>
                        </span>
                    </p>
                </footer>
                </div>
            </div>
        </>
        // <div>Attendence</div>
    )
}


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { ManagerTopbar } from "../components/ManagerTopbar";
// import { ManagerSidebar } from "../components/ManagerSidebar";
// import { useNavigate } from "react-router-dom";
// import { InternStatics } from "../components/InternStatics";
// import { Pagination } from "../components/Pagination";

// export const RemoteInterns = () => {
//   const [token, setToken] = useState(sessionStorage.getItem("token"));
//   const [singleIntern, setSingleIntern] = useState([]);
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const check = sessionStorage.getItem("isLoggedIn");
//   const userEmail = sessionStorage.getItem("email");
//   const managerContact = sessionStorage.getItem("contact");

//   // Pagination
//   const [currentPage, settCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [dataLimit, setDataLimit] = useState(50);
//   const [loading, setLoading] = useState(false);

//   // const indexOfLastData = currentPage * dataPerPage;
//   // const indexOfFirstData = indexOfLastData - dataPerPage;
//   // const currentData = data.slice(indexOfFirstData, indexOfLastData);

//   // // change page
//   // const paginate = (pageNumber) => settCurrentPage(pageNumber);

//   useEffect(() => {
//     if (!check) {
//       navigate("/");
//     }
//   });

//   const getRemoteRegister = async (page) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://api.ezitech.org/get-remote-interns/${userEmail}`,
//         {
//           headers: { "x-access-token": token },
//           params: {
//             page: page,
//             limit: dataLimit,
//           },
//         }
//       );
//       setData(res.data.data);
//       settCurrentPage(res.data.meta.page);
//       setTotalPages(res.data.meta.totalPages);
//       setLoading(false);

//       // console.log(data);
//       // console.log(currentPage);
//       // console.log(totalPages);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handlePageChange = (page) => {
//     settCurrentPage(page);
//   };

//   useEffect(() => {
//     // setInterval(() => {
//     getRemoteRegister(currentPage);
//     // }, 1000);
//   }, [currentPage, dataLimit]);

//   const RemoveRemote = (email) => {
//     axios
//       .post(
//         "https://api.ezitech.org/remove-intern",
//         { email },
//         { headers: { "x-access-token": token } }
//       )
//       .then((res) => {
//         if (res.data === 1) {
//           alert("Removed Successfully");
//         } else {
//           alert("Something Went Wrong!!!");
//         }
//       });
//   };

//   const ContactWith = (email) => {
//     axios
//       .post(
//         "https://api.ezitech.org/update-contact-status",
//         { email },
//         { headers: { "x-access-token": token } }
//       )
//       .then((res) => {
//         if (res.data === 1) {
//           alert("Status Updated from Interview to Contact");
//         } else {
//           alert("Something Went Wrong!!!");
//         }
//       });
//   };

//   // const [currentPage, settCurrentPage] = useState(1);
//   // const recordPerPage = 15;
//   // const lastIndex = currentPage * recordPerPage;
//   // const firstIndex = lastIndex - recordPerPage;
//   // const records = data.slice(firstIndex, lastIndex);
//   // const nPage = Math.ceil(data.length / recordPerPage);
//   // const numbers = [...Array(nPage + 1).keys()].slice(1);

//   // function prevPage() {
//   //   if (currentPage !== firstIndex) {
//   //     settCurrentPage(currentPage - 1);
//   //   }
//   // }

//   // function changeCurrentPage(id) {
//   //   settCurrentPage(id);
//   // }

//   // function nextPage() {
//   //   if (currentPage !== nPage) {
//   //     settCurrentPage(currentPage + 1);
//   //   }
//   // }

//   const GetSingleIntern = async (id) => {
//     try {
//       const res = await axios.post(
//         "https://api.ezitech.org/single-remote",
//         {
//           id,
//         },
//         { headers: { "x-access-token": token } }
//       );
//       setSingleIntern(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <ManagerTopbar />
//       <ManagerSidebar />
//       <div className="app-content content ">
//         <div className="content-overlay"></div>
//         <div className="header-navbar-shadow"></div>
//         <div className="content-wrapper">
//           <div className="content-header row"></div>
//           <div className="content-body">
//             <section id="dashboard-ecommerce">
//               {/* <!-- Statistics Card --> */}
//               <InternStatics />
//               {/* <!--/ Statistics Card --> */}

//               {/* <!-- Table Hover Animation start --> */}
//               <div className="row" id="table-hover-animation">
//                 <div className="col-12">
//                   <div className="card">
//                     <div className="card-header">
//                       <h4 className="card-title">Remote Interns</h4>
//                       <select
//                         className="form-control w-25"
//                         name=""
//                         id=""
//                         onChange={(e) => setDataLimit(e.target.value)}
//                       >
//                         <option value={50}>50</option>
//                         <option value={100}>100</option>
//                         <option value={200}>200</option>
//                         <option value={300}>300</option>
//                         <option value={500}>500</option>
//                       </select>
//                       {/* <!-- Button trigger modal --> */}
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         data-bs-toggle="modal"
//                         data-bs-target="#staticBackdrop"
//                       >
//                         Add Intern
//                       </button>
//                     </div>
//                     <div className="card-body overflow-x-scroll text-center">
//                       <table className="table">
//                         <thead>
//                           <tr>
//                             <th scope="col">#</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Email</th>
//                             <th scope="col">Contact</th>
//                             <th scope="col">Technology</th>
//                             <th scope="col">Interview</th>
//                             <th scope="col">Status</th>
//                             <th scope="col">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {loading ? (
//                             <>
//                               <div className="text-center">
//                                 <h3>Loading...</h3>
//                               </div>
//                             </>
//                           ) : Array.isArray(data) ? (
//                             data.map((rs) => {
//                               const {
//                                 id,
//                                 name,
//                                 email,
//                                 phone,
//                                 technology,
//                                 interview_type,
//                                 status,
//                               } = rs;

//                               return (
//                                 <>
//                                   <tr>
//                                     <th className="border px-1" scope="row">
//                                       {id}
//                                     </th>
//                                     <td className="border px-1">{name}</td>
//                                     <td className="border px-1">{email}</td>
//                                     <td className="border px-1">{phone}</td>
//                                     <td className="border px-1">
//                                       {technology}
//                                     </td>
//                                     <td className="border px-1">
//                                       {interview_type}
//                                     </td>
//                                     <td className="border px-1">{status}</td>
//                                     <td className="border px-1">
//                                       <div className="dropdown">
//                                         <button
//                                           type="button"
//                                           className="btn btn-warning dropdown-toggle"
//                                           data-toggle="dropdown"
//                                         >
//                                           Action
//                                           {/* <i data-feather="more-vertical"></i> */}
//                                         </button>
//                                         <div>
//                                           <ul className="dropdown-menu">
//                                             {/* <li>
//                                               <a className="dropdown-item" href="#">
//                                                 Send Mail
//                                               </a>
//                                             </li> */}
//                                             <li>
//                                               <a
//                                                 className="dropdown-item"
//                                                 href="#"
//                                                 type="button"
//                                                 onClick={() =>
//                                                   ContactWith(email)
//                                                 }
//                                               >
//                                                 Contact With
//                                               </a>
//                                             </li>
//                                             <li>
//                                               <a
//                                                 className="dropdown-item"
//                                                 href="#"
//                                                 type="button"
//                                                 onClick={() =>
//                                                   RemoveRemote(email)
//                                                 }
//                                               >
//                                                 Remove
//                                               </a>
//                                             </li>
//                                           </ul>
//                                         </div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </>
//                               );
//                             })
//                           ) : (
//                             " "
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                     <br />
//                     {/* Pagination */}
//                     <Pagination
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       onPageChange={handlePageChange}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="modal fade text-left"
//                 id="large"
//                 tabindex="-1"
//                 role="dialog"
//                 aria-labelledby="myModalLabel17"
//                 aria-hidden="true"
//               >
//                 <div
//                   className="modal-dialog modal-dialog-centered modal-lg"
//                   role="document"
//                 >
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h4 className="modal-title" id="myModalLabel17">
//                         Large Modal
//                       </h4>
//                       <button
//                         type="button"
//                         className="close"
//                         data-dismiss="modal"
//                         aria-label="Close"
//                       >
//                         <span aria-hidden="true">&times;</span>
//                       </button>
//                     </div>
//                     <div className="modal-body">
//                       {Array.isArray(singleIntern)
//                         ? singleIntern.map((res) => {
//                             console.log(res);
//                             const {
//                               image,
//                               name,
//                               email,
//                               phone,
//                               cnic,
//                               join_date,
//                               birth_date,
//                               university,
//                               degree,
//                               technology,
//                               duration,
//                               intern_type,
//                             } = res;

//                             return (
//                               <>
//                                 <div className="row shadow rounded p-3">
//                                   <div className="col-sm-4"></div>
//                                   <div className="col-sm-4 text-center">
//                                     <img
//                                       src={image}
//                                       alt=""
//                                       width={100}
//                                       height={100}
//                                       style={{ borderRadius: "50px" }}
//                                     />

//                                     <h3 className="mt-2">{name}</h3>
//                                   </div>
//                                   <div className="col-sm-4"></div>
//                                 </div>

//                                 <div className="row mt-1 shadow rounded p-3">
//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Email: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={email}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>

//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Phone: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={phone}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>
//                                 </div>

//                                 {/* <h6 className="mt-5">Gender</h6> */}
//                                 <div className="row mt-1 shadow rounded p-3">
//                                   <div className="col-sm-6">
//                                     <label htmlFor="">CNIC: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={cnic}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>

//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Join Date: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={join_date}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="row mt-1 shadow rounded p-3">
//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Birth Date: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={birth_date}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>

//                                   <div className="col-sm-6">
//                                     <label htmlFor="">University: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={university}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="row mt-1 shadow rounded p-3">
//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Degree: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={degree}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>

//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Technology: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={technology}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="row mt-1 mb-5 shadow rounded p-3">
//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Duration</label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={duration}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>
//                                   <div className="col-sm-6">
//                                     <label htmlFor="">Internship Type: </label>
//                                     <input
//                                       type="text"
//                                       name=""
//                                       id=""
//                                       value={intern_type}
//                                       readOnly
//                                       className="form-control border-0"
//                                     />
//                                   </div>
//                                 </div>
//                               </>
//                             );
//                           })
//                         : " "}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

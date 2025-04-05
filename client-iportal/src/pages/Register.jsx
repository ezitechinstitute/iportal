import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Calendar from "react-calendar";
import axios from "axios";
import "../styles/custom.css";
import logo from "../assets/AdminAssets/logo-1.png";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export const Register = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    internCnic: " ",
    internPhone: " ",
    interviewDate: " ",
    interviewTime: " ",
    internImage: " ",
  });
  const [tel, setTel] = useState(0);
  const [checkCnic, setCheckCnic] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [interview, setInterview] = useState(false);
  const [phoneMsg, setPhoneMsg] = useState(" ");
  const [registerMsg, setRegisterMsg] = useState(" ");
  const [errorMsg, setErrorMsg] = useState(" ");
  const [loader, setLoader] = useState(false);

  const [getTech, setTech] = useState([]);
  const [getUni, setUni] = useState([]);

  useEffect(() => {
    const GetTech = async () => {
      try {
        const res = await axios.get("https://api.ezitech.org/form-tech");
        setTech(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetTech();

    const GetUniversities = async () => {
      await axios
        .get("https://api.ezitech.org/get-reg-uni")
        .then((res) => {
          setUni(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    GetUniversities();
  }, [2000]);

  const handleDateClick = (date) => {
    setValue({ ...value, interviewDate: date.toDateString() });
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const handleTimeSelect = (time) => {
    setValue({ ...value, interviewTime: time });
    setSelectedTime(time);
    setShowTimePicker(true);
  };

  // ----------------------------------

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // const isValidCNIC = (id) => {
  //   const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

  //   return cnicPattern.test(id);
  // };

  const isValidPhone = (cell) => {
    const phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    return phonePattern.test(cell);
  };

  useEffect(() => {
    // if (value.internCnic !== " ") {
    //   setCheckCnic(isValidCNIC(value.internCnic));
    // }

    if (tel !== 0) {
      setCheckPhone(isValidPhone(tel));
    }
  });

  // const [verified, setVerified] = useState(false);

  // const VerifyEmail = async () => {
  //   await axios
  //     .post(`${process.env.REACT_APP_API_URL}/verify-int-email`, {
  //       email: value.internemail,
  //     })
  //     .then((res) => {
  //       alert(res.data.msg);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   const checkVerificationStatus = () => {
  //     const isVerified = localStorage.getItem("emailVerified");
  //     if (isVerified === "true") {
  //       setVerified(true);
  //     }
  //   };

  //   // Check every 2 seconds
  //   const interval = setInterval(checkVerificationStatus, 2000);

  //   return () => clearInterval(interval); // Cleanup when component unmounts
  // }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setValue({ ...value, internImage: reader.result });
    });
  };

  const RegisterIntern = (e) => {
    e.preventDefault();
    setValue({ ...value, internPhone: tel });

    if (value.internPhone !== " ") {
      if (
        value.internCity !== undefined &&
        value.internGender !== undefined &&
        value.internUniversity !== undefined &&
        value.internDegree !== undefined &&
        value.interviewType !== undefined &&
        value.internTechnology !== undefined &&
        value.internDuration !== undefined &&
        value.internType !== undefined
      ) {
        setLoader(true);

        axios
          .post(`${process.env.REACT_APP_API_URL}/register-inters`, { value })
          .then((res) => {
            console.log(res.data);

            if (res.data === 1) {
              setRegisterMsg("Register Successfully! Please Check Your Email");
              setTimeout(() => {
                localStorage.removeItem("emailVerified");
                setLoader(false);
                window.location.reload();
              }, 2000);
            }

            // if (res.data.codeMsg === false) {
            //   setErrorMsg("Email Verification Failed!!!");
            //   setTimeout(() => {
            //     setLoader(false);
            //     window.location.reload();
            //   }, 2000);
            // }

            if (res.data.exist === true) {
              setErrorMsg("You Already Registered");
              setTimeout(() => {
                localStorage.removeItem("emailVerified");
                setLoader(false);
                window.location.reload();
              }, 2000);
            }

            // Message Info
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please Fill Empty Fields First!!!");
      }
    } else {
      alert(
        "Are your sure to submit this form? If yes click again on Register"
      );
    }
  };

  return (
    <>
      {/* <!-- BEGIN: Content--> */}

      <div
        className="content-wrapper"
        style={{
          backgroundImage: "url(images/bg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      >
        <div className="content-header row"></div>
        <div className="content-body">
          <div className="auth-wrapper auth-v1 px-2">
            <div className="auth-inner py-2">
              {/* <!-- Register v1 --> */}
              <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                  <div className="card mb-0">
                    <div className="card-body">
                      <a href="javascript:void(0);" className="brand-logo">
                        <h2 className="brand-text text-primary ml-1 text-center">
                          <img src={logo} alt="" width={150} />
                        </h2>
                      </a>

                      <h4 className="card-title mb-1 text-center">
                        Welcome to Internship Registration Form
                      </h4>

                      <form
                        className="auth-register-form mt-2 p-2"
                        onSubmit={RegisterIntern}
                      >
                        {/* <section className="auth-register-form mt-2 p-2"> */}
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-username"
                                className="form-label"
                              >
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="register-username"
                                name="internUsername"
                                placeholder="Full Name"
                                aria-describedby="register-username"
                                tabindex="1"
                                autofocus
                                onChange={handleInput}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                Valid Email
                              </label>
                              <div className="d-flex">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="internEmail"
                                  name="internemail"
                                  placeholder="info@ezitech.org"
                                  aria-describedby="register-email"
                                  tabindex="2"
                                  onChange={handleInput}
                                  required
                                />
                                {/* <span> */}
                                {/* <a
                                  type="button"
                                  className="btn btn-primary"
                                  style={{
                                    borderLeft: "0",
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0",
                                    // height: "38px",
                                  }}
                                  onClick={VerifyEmail}
                                >
                                  Click to Verify
                                </a> */}
                              </div>
                              {/* {!verified ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => VerifyEmail()}
                                  style={{
                                    padding: "10px 15px",
                                    marginTop: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Send Verification Email
                                </button>
                              ) : (
                                <p style={{ color: "green" }}>
                                  ✅ Email Verified!
                                </p>
                              )} */}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-username"
                                className="form-label"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="register-username"
                                name="internCity"
                                placeholder="City"
                                aria-describedby="register-username"
                                tabindex="1"
                                autofocus
                                onChange={handleInput}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                WhatsApp
                              </label>
                              <PhoneInput
                                international
                                defaultCountry="PK"
                                value={tel}
                                onChange={setTel}
                                name="internPhone"
                                placeholder="Enter phone number"
                                className="form-control"
                                limitMaxLength="10"
                              />
                              {checkPhone ? (
                                <span style={{ color: "limegreen" }}>
                                  Valid
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>

                        {/* <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                CNIC
                              </label>
                              <input
                                type="text"
                                id="cnic"
                                maxLength={15}
                                name="internCnic"
                                placeholder="XXXXX-XXXXXXX-X"
                                className="form-control"
                                onChange={handleInput}
                                required
                              />
                              {checkCnic ? (
                                <span style={{ color: "limegreen" }}>
                                  Valid
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-gender"
                                className="form-label"
                              >
                                Gender
                              </label>

                              <select
                                className="form-control"
                                name="internGender"
                                onChange={handleInput}
                                required
                                id=""
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Custom">Custom</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-profile"
                                className="form-label"
                              >
                                Profile Image
                              </label>

                              <input
                                type="file"
                                className="form-control"
                                onChange={handleImage}
                                name="internImg"
                                accept=".jpg, .jpeg, .png"
                                id=""
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                Join Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="internJoinDate"
                                onChange={handleInput}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                min={"1995-01-01"}
                                max={"2010-12-31"}
                                className="form-control"
                                name="internDob"
                                onChange={handleInput}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                University
                              </label>
                              <select
                                className="form-control"
                                name="internUniversity"
                                id="universties"
                                onChange={handleInput}
                                required
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                {getUni.map((rs) => (
                                  <option value={rs.uni_name}>
                                    {rs.uni_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                Degree Program
                              </label>
                              <select
                                className="form-control"
                                name="internDegree"
                                id=""
                                onChange={handleInput}
                                required
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                <option value="Others">Others</option>
                                <option value="Matric">Matric</option>
                                <option value="Inter">Inter</option>
                                <option value="Bs">Bs</option>
                                <option value="Ms">Ms</option>
                                <option value="Bsc">Bsc</option>
                                <option value="Msc">Msc</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-email"
                                className="form-label"
                              >
                                Interview Type
                              </label>

                              <select
                                name="interviewType"
                                id="intern-type"
                                className="form-control"
                                onChange={handleInput}
                                required
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                <option value="Onsite">Onsite</option>
                                <option value="Remote">Remote</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-technology"
                                className="form-label"
                              >
                                Technology
                              </label>

                              <select
                                name="internTechnology"
                                id=""
                                className="form-control"
                                onChange={handleInput}
                                required
                              >
                                <option selected disabled>
                                  --Select--
                                </option>

                                {Array.isArray(getTech)
                                  ? getTech.map((rs) => (
                                      <option value={rs.technology}>
                                        {rs.technology}
                                      </option>
                                    ))
                                  : ""}

                                {/* <option value="Web Development">
                                  Web Development
                                </option>
                                <option value="Frontend Development">
                                  Frontend Development
                                </option>
                                <option value="Mern Stack">MERN Stack</option>
                                <option value="React Native">
                                  React Native
                                </option>
                                <option value="PHP Development">
                                  PHP Development
                                </option>
                                <option value="WordPress Development">
                                  WordPress Development
                                </option>
                                <option disabled value="Java Development">
                                  Java Development
                                </option>
                                <option value="Python Development">
                                  Python Development (Django)
                                </option>
                                <option disabled value="Ruby on Rails">
                                  Ruby on Rails
                                </option>
                                <option value="Mobile Development">
                                  Mobile Development
                                </option>
                                <option value="Data Science">
                                  Data Science
                                </option>
                                <option disabled value="Cloud Computing">
                                  Cloud Computing
                                </option>
                                <option value="Machine Learning">
                                  Machine Learning
                                </option>
                                <option disabled value="Blockchain Development">
                                  Blockchain Development
                                </option>
                                <option disabled value="DevOps">
                                  DevOps
                                </option>
                                <option value="Cybersecurity">
                                  Cybersecurity
                                </option>
                                <option value="Graphic Design">
                                  Graphic Design
                                </option>
                                <option value="Search Engine Optimization (SEO)">
                                  Search Engine Optimization (SEO)
                                </option>
                                <option value="Digital Marketing">
                                  Digital Marketing
                                </option>
                                <option value="UI/UX Design">
                                  UI/UX Design
                                </option>
                                <option disabled value="Content Writing">
                                  Content Writing
                                </option>
                                <option value="Video Editing">
                                  Video Editing
                                </option>
                                <option value="Video Editing">
                                  Animation Designing
                                </option>
                                <option value="3D Modeling">3D Modeling</option>
                                <option value="Game Development">
                                  Game Development
                                </option> */}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-duration"
                                className="form-label"
                              >
                                Duration
                              </label>
                              <select
                                className="form-control"
                                name="internDuration"
                                id=""
                                onChange={handleInput}
                                required
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                <option value="2 Month">1 Month</option>
                                <option value="2 Month">2 Month</option>
                                <option value="3 Month">3 Month</option>
                                <option value="6 Month">6 Month</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                for="register-duration"
                                className="form-label"
                              >
                                Internship Type
                              </label>
                              <select
                                className="form-control"
                                name="internType"
                                onChange={handleInput}
                                required
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                <option value="Onsite">Onsite</option>
                                <option value="Remote">Remote</option>
                                {/* <option value="6 Month">6 Month</option> */}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Meeting */}
                        <div className="mt-5">
                          <form
                            className="interview-register-form mt-2 p-2"
                            id="interview-form"
                            style={{ display: "none" }}
                          >
                            <h4
                              className="card-title mb-1 text-center bg-warning p-1"
                              style={{ color: "white" }}
                            >
                              Note: Select Interview Time Between 8:00Pm - 11Pm
                            </h4>
                            <div className="row">
                              <br />
                              <div
                                className={
                                  !showTimePicker
                                    ? "col-sm-6 rules"
                                    : "col-sm-4 rules"
                                }
                              >
                                {/* <div className="overflow-y-auto"> */}
                                {/* <img src={logo} alt="" width={100} /> */}
                                <h2>Interview Meeting</h2>
                                {/* <br /> */}
                                <span>
                                  <i data-feather="clock"></i> &nbsp; 5 Min
                                </span>
                                <br />
                                <br />
                                <span>
                                  <i data-feather="video"></i>
                                  &nbsp; Web conferencing details provided
                                  confirmation.
                                </span>
                                <br />
                                <br />
                                <strong>
                                  Kindly schedule your interview for the
                                  specified day and time, Please be ready to
                                  answer the following questions during the
                                  interview.
                                </strong>
                                <br />
                                <br />
                                <strong>
                                  Kindly be present at the meeting on selected
                                  day or time.
                                </strong>
                                <br />
                                <br />
                                <strong>Brief Introduction:</strong> <br />
                                <span>
                                  Briefly introduce yourself and highlight your
                                  key qualifications in selected technology.
                                </span>
                                <br />
                                <br />
                                <strong>Relevant Experience:</strong> <br />
                                <span>
                                  What specific experience do you bring to this
                                  role?
                                </span>
                                <br />
                                <br />
                                <strong>Key Skills:</strong> <br />
                                <span>
                                  You can mention in interview a few key skills
                                  or strengths that you believe make you
                                  well-suited for this position.
                                </span>
                                <br />
                                <br />
                                <strong>Project Contributions:</strong> <br />
                                <span>
                                  Could you share a brief example of a project
                                  (If You Have) where you made a significant
                                  contribution.
                                </span>
                                <br />
                                <br />
                                <strong>Internship Benefit:</strong> <br />
                                <span>
                                  Why you want to join our internship, What
                                  excites you most about this role, and how does
                                  it align with your career aspirations?
                                </span>
                              </div>
                              {/* </div> */}
                              <div
                                className={
                                  !showTimePicker ? "col-sm-6" : "col-sm-5"
                                }
                              >
                                <h2>Select Date & Time</h2>
                                <br />
                                <Calendar
                                  onClickDay={handleDateClick}
                                  value={selectedDate}
                                />

                                {/* <br /> */}

                                {/* </div> */}
                              </div>

                              <div className="col-sm-3 time-picker">
                                <h5>
                                  {selectedDate
                                    ? selectedDate.toDateString()
                                    : ""}
                                </h5>
                                {showTimePicker && (
                                  <div>
                                    {/* <h3>Select Time</h3> */}
                                    {/* Example time picker, you can replace it with your preferred time picker component */}
                                    <input
                                      className="form-control"
                                      min={"20:00"}
                                      max={"23:00"}
                                      type="time"
                                      onChange={(e) =>
                                        handleTimeSelect(e.target.value)
                                      }
                                    />
                                  </div>
                                )}
                              </div>

                              {/* </div> */}

                              {/* </div> */}
                              {/* </div> */}
                            </div>
                          </form>
                        </div>
                        {/* <div className="form-group">
                          <div className="custom-control custom-checkbox">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              id="register-privacy-policy"
                              tabindex="4"
                            />
                            <label
                              className="custom-control-label"
                              for="register-privacy-policy"
                            >
                              I agree to{" "}
                              <a href="javascript:void(0);">
                                privacy policy & terms
                              </a>
                            </label>
                          </div>
                        </div> */}
                        <div className="text-center">
                          {loader ? <Spinner /> : " "}
                          {registerMsg !== " " ? (
                            <h4 style={{ color: "limegreen" }}>
                              {registerMsg}
                            </h4>
                          ) : (
                            " "
                          )}

                          {errorMsg !== " " ? (
                            <h4 style={{ color: "red" }}>{errorMsg}</h4>
                          ) : (
                            " "
                          )}
                        </div>

                        {/* {verified ? (
                          <button
                            className="btn btn-primary btn-block mt-2"
                            tabindex="5"
                            type="submit"
                          >
                            Register
                          </button>
                        ) : (
                          <button
                            disabled
                            className="btn btn-primary btn-block mt-2"
                            tabindex="5"
                            type="submit"
                          >
                            Register
                          </button>
                        )} */}

                        <input
                          type="submit"
                          className="btn btn-primary btn-block"
                          name=""
                          id=""
                          value={"Register"}
                        />
                      </form>
                      {/* </section> */}

                      {/* <p className="text-center mt-2">
                        <span>Already have an account?</span>
                        <a href="page-auth-login-v1.html">
                          <span>Sign in instead</span>
                        </a>
                      </p> */}
                    </div>
                  </div>
                  {/* <!-- /Register v1 --> */}
                </div>
                <div className="col-sm-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <!-- END: Content--> */}
    </>
  );
};

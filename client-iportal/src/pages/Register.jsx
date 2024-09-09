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

  const GetTech = async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/form-tech");
      setTech(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetTech();
  }, [GetTech]);

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

  const isValidCNIC = (id) => {
    const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

    return cnicPattern.test(id);
  };

  const isValidPhone = (cell) => {
    const phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    return phonePattern.test(cell);
  };

  useEffect(() => {
    if (value.internCnic !== " ") {
      setCheckCnic(isValidCNIC(value.internCnic));
    }

    if (tel !== 0) {
      setCheckPhone(isValidPhone(tel));
    }

    // const interviewForm = document.getElementById("interview-form");
    // const selectOption = document.getElementById("intern-type").value;

    // if (selectOption === "Remote") {
    //   interviewForm.style.display = "block";

    //   setInterview(true);
    // } else {
    //   interviewForm.style.display = "none";
    //   setInterview(false);
    // }
  });

  const VerifyEmail = async () => {
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    try {
      const res = await axios.post(
        "https://api.ezitech.org/verification-code",
        {
          email: value.internemail,
          code: verificationCode,
        }
      );
      alert(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

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
        value.internCode !== undefined &&
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
        // https://api.ezitech.org/register-inters

        axios
          .post("https://api.ezitech.org/register-inters", { value })
          .then((res) => {
            console.log(res.data);

            if (res.data === 1) {
              setRegisterMsg("Register Successfully! Please Check Your Email");
              setTimeout(() => {
                setLoader(false);
                window.location.reload();
              }, 2000);
            }

            if (res.data.codeMsg === false) {
              setErrorMsg("Email Verification Failed!!!");
              setTimeout(() => {
                setLoader(false);
                window.location.reload();
              }, 2000);
            }

            if (res.data.exist === true) {
              setErrorMsg("You Already Registered");
              setTimeout(() => {
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
                                  style={{
                                    borderRight: "0",
                                    borderTopRightRadius: "0",
                                    borderBottomRightRadius: "0",
                                  }}
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
                                <button
                                  className="btn btn-primary"
                                  style={{
                                    borderLeft: "0",
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0",
                                  }}
                                  onClick={VerifyEmail}
                                >
                                  Click to Verify
                                </button>
                              </div>
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
                                Verification Code
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="register-username"
                                name="internCode"
                                placeholder="Verification Code"
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
                        </div>

                        <div className="row">
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
                        </div>
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
                                <option value="Others">Others</option>
                                <option value="Aga Khan University">
                                  Aga Khan University
                                </option>
                                <option value="Air University">
                                  Air University
                                </option>
                                <option value="Allama Iqbal Open University">
                                  Allama Iqbal Open University
                                </option>
                                <option value="Bahauddin Zakariya University">
                                  Bahauddin Zakariya University
                                </option>
                                <option value="Bahria University">
                                  Bahria University
                                </option>
                                <option value="COMSATS University">
                                  COMSATS University
                                </option>
                                <option value="Dow University of Health Sciences">
                                  Dow University of Health Sciences
                                </option>
                                <option value="Fatima Jinnah Medical University">
                                  Fatima Jinnah Medical University
                                </option>
                                <option value="Federal Urdu University of Arts, Science & Technology">
                                  Federal Urdu University of Arts, Science &
                                  Technology
                                </option>
                                <option value="Ghulam Ishaq Khan Institute of Engineering Sciences and Technology">
                                  Ghulam Ishaq Khan Institute of Engineering
                                  Sciences and Technology
                                </option>
                                <option value="Government College University">
                                  Government College University
                                </option>
                                <option value="Hazara University">
                                  Hazara University
                                </option>
                                <option value="Islamia University of Bahawalpur">
                                  Islamia University of Bahawalpur
                                </option>
                                <option value="International Islamic University">
                                  International Islamic University
                                </option>
                                <option value="Karachi University">
                                  Karachi University
                                </option>
                                <option value="Khyber Medical University">
                                  Khyber Medical University
                                </option>
                                <option value="Lahore College for Women University">
                                  Lahore College for Women University
                                </option>
                                <option value="Lahore University of Management Sciences (LUMS)">
                                  Lahore University of Management Sciences
                                  (LUMS)
                                </option>
                                <option value="National Textile University">
                                  National Textile University
                                </option>
                                <option value="National University of Computer and Emerging Sciences">
                                  National University of Computer and Emerging
                                  Sciences
                                </option>
                                <option value="National University of Modern Languages">
                                  National University of Modern Languages
                                </option>
                                <option value="National University of Sciences and Technology (NUST)">
                                  National University of Sciences and Technology
                                  (NUST)
                                </option>
                                <option value="Pakistan Institute of Engineering and Applied Sciences (PIEAS)">
                                  Pakistan Institute of Engineering and Applied
                                  Sciences (PIEAS)
                                </option>
                                <option value="Pir Mehr Ali Shah Arid Agriculture University">
                                  Pir Mehr Ali Shah Arid Agriculture University
                                </option>
                                <option value="Quaid-i-Azam University">
                                  Quaid-i-Azam University
                                </option>
                                <option value="University of Agriculture">
                                  University of Agriculture
                                </option>
                                <option value="University of Balochistan">
                                  University of Balochistan
                                </option>
                                <option value="University of Education, Lahore">
                                  University of Education
                                </option>
                                <option value="University of Engineering and Technology">
                                  University of Engineering and Technology,
                                </option>
                                <option value="University of Health Sciences">
                                  University of Health Sciences
                                </option>
                                <option value="University of Karachi">
                                  University of Karachi
                                </option>
                                <option value="University of Lahore">
                                  University of Lahore
                                </option>
                                <option value="University of Malakand">
                                  University of Malakand
                                </option>
                                <option value="University of Management and Technology">
                                  University of Management and Technology
                                </option>
                                <option value="University of Peshawar">
                                  University of Peshawar
                                </option>
                                <option value="University of the Punjab">
                                  University of the Punjab
                                </option>
                                <option value="University of Sargodha">
                                  University of Sargodha
                                </option>
                                <option value="University of Science and Technology">
                                  University of Science and Technology
                                </option>
                                <option value="University of Sindh">
                                  University of Sindh
                                </option>
                                <option value="University of Swat">
                                  University of Swat
                                </option>
                                <option value="University of Turbat">
                                  University of Turbat
                                </option>
                                <option value="University of Veterinary and Animal Sciences">
                                  University of Veterinary and Animal Sciences
                                </option>
                                <option value="Virtual University of Pakistan">
                                  Virtual University of Pakistan
                                </option>
                                <option value="Balochistan University of Information Technology, Engineering and Management Sciences">
                                  Balochistan University of Information
                                  Technology, Engineering and Management
                                  Sciences
                                </option>
                                <option value="Benazir Bhutto Shaheed University">
                                  Benazir Bhutto Shaheed University
                                </option>
                                <option value="Capital University of Science & Technology">
                                  Capital University of Science & Technology
                                </option>
                                <option value="City University of Science and Information Technology">
                                  City University of Science and Information
                                  Technology
                                </option>
                                <option value="Dadabhoy Institute of Higher Education">
                                  Dadabhoy Institute of Higher Education
                                </option>
                                <option value="Federal Urdu University">
                                  Federal Urdu University
                                </option>
                                <option value="Foundation University Islamabad">
                                  Foundation University Islamabad
                                </option>
                                <option value="Gandhara University">
                                  Gandhara University
                                </option>
                                <option value="Ghulam Ishaq Khan Institute of Science and Technology">
                                  Ghulam Ishaq Khan Institute of Science and
                                  Technology
                                </option>
                                <option value="Greenwich University">
                                  Greenwich University
                                </option>
                                <option value="Hamdard University">
                                  Hamdard University
                                </option>
                                <option value="Habib University">
                                  Habib University
                                </option>
                                <option value="HITEC University">
                                  HITEC University
                                </option>
                                <option value="Indus University">
                                  Indus University
                                </option>
                                <option value="Institute of Business Administration">
                                  Institute of Business Administration
                                </option>
                                <option value="Iqra University">
                                  Iqra University
                                </option>
                                <option value="Islamabad Institute of Technology">
                                  Islamabad Institute of Technology
                                </option>
                                <option value="Islamabad School of Law">
                                  Islamabad School of Law
                                </option>
                                <option value="Jinnah University for Women">
                                  Jinnah University for Women
                                </option>
                                <option value="Karachi Institute of Economics & Technology">
                                  Karachi Institute of Economics & Technology
                                </option>
                                <option value="Karachi School for Business & Leadership">
                                  Karachi School for Business & Leadership
                                </option>
                                <option value="KASB Institute of Technology">
                                  KASB Institute of Technology
                                </option>
                                <option value="Lahore Garrison University">
                                  Lahore Garrison University
                                </option>
                                <option value="Lahore Leads University">
                                  Lahore Leads University
                                </option>
                                <option value="Lahore School of Economics">
                                  Lahore School of Economics
                                </option>
                                <option value="Mohammad Ali Jinnah University">
                                  Mohammad Ali Jinnah University
                                </option>
                                <option value="Namal University">
                                  Namal University
                                </option>
                                <option value="National College of Business Administration & Economics">
                                  National College of Business Administration &
                                  Economics
                                </option>
                                <option value="National University of Computer & Emerging Sciences">
                                  National University of Computer & Emerging
                                  Sciences
                                </option>
                                <option value="Newports Institute of Communications and Economics">
                                  Newports Institute of Communications and
                                  Economics
                                </option>
                                <option value="NFC Institute of Engineering & Technology">
                                  NFC Institute of Engineering & Technology
                                </option>
                                <option value="Northern University, Nowshera">
                                  Northern University, Nowshera
                                </option>
                                <option value="Peoples University of Medical & Health Sciences for Women">
                                  Peoples University of Medical & Health
                                  Sciences for Women
                                </option>
                                <option value="Preston University, Pakistan">
                                  Preston University, Pakistan
                                </option>
                                <option value="Qarshi University">
                                  Qarshi University
                                </option>
                                <option value="Qurtuba University of Science and Information Technology">
                                  Qurtuba University of Science and Information
                                  Technology
                                </option>
                                <option value="Riphah International University">
                                  Riphah International University
                                </option>
                                <option value="Sarhad University of Science and Information Technology">
                                  Sarhad University of Science and Information
                                  Technology
                                </option>
                                <option value="Shaheed Benazir Bhutto City University">
                                  Shaheed Benazir Bhutto City University
                                </option>
                                <option value="Shaheed Benazir Bhutto University">
                                  Shaheed Benazir Bhutto University
                                </option>
                                <option value="Sindh Madressatul Islam University">
                                  Sindh Madressatul Islam University
                                </option>
                                <option value="Sukkur IBA University">
                                  Sukkur IBA University
                                </option>
                                <option value="Textile Institute of Pakistan">
                                  Textile Institute of Pakistan
                                </option>
                                <option value="University of Faisalabad">
                                  University of Faisalabad
                                </option>
                                <option value="University of Management and Technology">
                                  University of Management and Technology
                                </option>
                                <option value="University of South Asia">
                                  University of South Asia
                                </option>
                                <option value="University of Wah">
                                  University of Wah
                                </option>
                                <option value="University of Central Punjab">
                                  University of Central Punjab
                                </option>
                                <option value="University of Sialkot">
                                  University of Sialkot
                                </option>

                                <option value="Gomal University">
                                  Gomal University
                                </option>
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
                        <button
                          className="btn btn-primary btn-block mt-2"
                          tabindex="5"
                          type="submit"
                        >
                          Register
                        </button>

                        {/* <input
                          type="submit"
                          className="btn btn-primary btn-block"
                          name=""
                          id=""
                          value={"Register"}
                        /> */}
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

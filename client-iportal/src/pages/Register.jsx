import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Calendar from "react-calendar";
import axios from "axios";
import "../styles/custom.css";

import logo from "../assets/AdminAssets/logo.png";

export const Register = () => {
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
    const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

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

    const interviewForm = document.getElementById("interview-form");
    const selectOption = document.getElementById("intern-type").value;

    if (selectOption === "Remote") {
      interviewForm.style.display = "block";

      setInterview(true);
    } else {
      interviewForm.style.display = "none";
      setInterview(false);
    }
  });

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

    console.log(value);

    setValue({ ...value, internPhone: tel });
    axios
      .post("http://localhost:8800/register-inters", { value })
      .then((res) => {
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* <!-- BEGIN: Content--> */}

      <div className="content-wrapper">
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
                          <img src={logo} alt="" width={100} />
                        </h2>
                      </a>

                      <h4 className="card-title mb-1 text-center">
                        Welcome to Ezitech Institute Registration Form 🚀
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
                                Username
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="register-username"
                                name="internUsername"
                                placeholder="johndoe"
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
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="internEmail"
                                name="internemail"
                                placeholder="john@example.com"
                                aria-describedby="register-email"
                                tabindex="2"
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
                                Phone
                              </label>
                              <PhoneInput
                                international
                                defaultCountry="PK"
                                value={tel}
                                onChange={setTel}
                                name="internPhone"
                                placeholder="Enter phone number"
                                className="form-control"
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
                                <option value="Others">
                                  Others (For Undergraduate)
                                </option>
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
                                <option value="COMSATS University Islamabad">
                                  COMSATS University Islamabad
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
                                <option value="Government College University Lahore">
                                  Government College University Lahore
                                </option>
                                <option value="Hazara University">
                                  Hazara University
                                </option>
                                <option value="Islamia University of Bahawalpur">
                                  Islamia University of Bahawalpur
                                </option>
                                <option value="International Islamic University, Islamabad">
                                  International Islamic University, Islamabad
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
                                <option value="University of Agriculture, Faisalabad">
                                  University of Agriculture, Faisalabad
                                </option>
                                <option value="University of Balochistan">
                                  University of Balochistan
                                </option>
                                <option value="University of Education, Lahore">
                                  University of Education, Lahore
                                </option>
                                <option value="University of Engineering and Technology, Lahore">
                                  University of Engineering and Technology,
                                  Lahore
                                </option>
                                <option value="University of Health Sciences, Lahore">
                                  University of Health Sciences, Lahore
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
                                <option value="University of the Punjab, Lahore">
                                  University of the Punjab, Lahore
                                </option>
                                <option value="University of Sargodha">
                                  University of Sargodha
                                </option>
                                <option value="University of Science and Technology Bannu">
                                  University of Science and Technology Bannu
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
                                <option value="University of Veterinary and Animal Sciences, Lahore">
                                  University of Veterinary and Animal Sciences,
                                  Lahore
                                </option>
                                <option value="Virtual University of Pakistan">
                                  Virtual University of Pakistan
                                </option>
                                <option value="Balochistan University of Information Technology, Engineering and Management Sciences">
                                  Balochistan University of Information
                                  Technology, Engineering and Management
                                  Sciences
                                </option>
                                <option value="Benazir Bhutto Shaheed University, Karachi">
                                  Benazir Bhutto Shaheed University, Karachi
                                </option>
                                <option value="Capital University of Science & Technology">
                                  Capital University of Science & Technology
                                </option>
                                <option value="City University of Science and Information Technology, Peshawar">
                                  City University of Science and Information
                                  Technology, Peshawar
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
                                <option value="Institute of Business Administration, Karachi">
                                  Institute of Business Administration, Karachi
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
                                <option value="University of Management and Technology, Lahore">
                                  University of Management and Technology,
                                  Lahore
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
                                <option value="University of the Punjab, Lahore">
                                  University of the Punjab, Lahore
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
                                Department
                              </label>

                              <select
                                name="internDpt"
                                id=""
                                className="form-control"
                                onChange={handleInput}
                                required
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                <option value="Computer Science">
                                  Computer Scienece
                                </option>
                                <option value="Information Technology">
                                  Information Technology
                                </option>
                                <option value="Software Engineering">
                                  Software Engineering
                                </option>
                                <option value="Others">Others</option>
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
                                <option value="web_development">
                                  Web Development
                                </option>
                                <option value="frontend_development">
                                  Frontend Development
                                </option>
                                <option value="mern_stack">MERN Stack</option>
                                <option value="php_development">
                                  PHP Development
                                </option>
                                <option value="java_development">
                                  Java Development
                                </option>
                                <option value="python_development">
                                  Python Development
                                </option>
                                <option value="ruby_on_rails">
                                  Ruby on Rails
                                </option>
                                <option value="mobile_development">
                                  Mobile Development
                                </option>
                                <option value="data_science">
                                  Data Science
                                </option>
                                <option value="cloud_computing">
                                  Cloud Computing
                                </option>
                                <option value="machine_learning">
                                  Machine Learning
                                </option>
                                <option value="blockchain">
                                  Blockchain Development
                                </option>
                                <option value="devops">DevOps</option>
                                <option value="cybersecurity">
                                  Cybersecurity
                                </option>
                                <option value="iot">
                                  Internet of Things (IoT)
                                </option>
                                <option value="graphic_design">
                                  Graphic Design
                                </option>
                                <option value="seo">
                                  Search Engine Optimization (SEO)
                                </option>
                                <option value="digital_marketing">
                                  Digital Marketing
                                </option>
                                <option value="ui_ux_design">
                                  UI/UX Design
                                </option>
                                <option value="content_writing">
                                  Content Writing
                                </option>
                                <option value="video_production">
                                  Video Production
                                </option>
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
                                id="intern-type"
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
                          {/* <h4 className="card-title mb-1 text-center">
                            Meeting
                          </h4> */}

                          <form
                            className="interview-register-form mt-2 p-2"
                            id="interview-form"
                            style={{ display: "none" }}
                          >
                            <div className="row">
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
                        <div className="form-group">
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
                        </div>
                        <button
                          className="btn btn-primary btn-block"
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

import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Icons
import { FaHandshake } from "react-icons/fa6";
import { FaTicket } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";
import { FaSquareCheck } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";


export const AdminDashboard = () => {
  return (
    <>
      <section className="mt-5">
        <Container>
          <Card className="shadow rounded-0 border-0 px-2 py-1">
            <h4>Interview Statistics</h4>
          </Card>
          <Row className="mt-4 text-center">
            <Col sm={4} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaHandshake
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>9</h4>
                </span>
                <h6>Yesterday Interview</h6>
              </Card>
            </Col>
            <Col sm={4} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaUserTie
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>7</h4>
                </span>
                <h6>Today Interview</h6>
              </Card>
            </Col>
            <Col sm={4} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaTicket
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>0</h4>
                </span>
                <h6>Token</h6>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="mt-5">
        <Container>
          <Card className="shadow rounded-0 border-0 px-2 py-1">
            <h4>Dashboard Statistics</h4>
          </Card>
          <Row className="mt-4 text-center">
            <Col sm={3} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaUsers style={{ fontSize: "xx-large", color: "#7367f0" }} />
                </span>
                <span>
                  <h4>3552</h4>
                </span>
                <h6>Total Intern</h6>
              </Card>
            </Col>
            <Col sm={3} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaClipboardCheck
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>2122</h4>
                </span>
                <h6>Test</h6>
              </Card>
            </Col>
            <Col sm={3} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaSpinner
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>442</h4>
                </span>
                <h6>In Progress</h6>
              </Card>
            </Col>
            <Col sm={3} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaSquareCheck
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>448</h4>
                </span>
                <h6>Completed</h6>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4 text-center">
            <Col sm={4} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaClipboardList
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>1152</h4>
                </span>
                <h6>Total Projects</h6>
              </Card>
            </Col>
            <Col sm={4} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaSpinner
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>622</h4>
                </span>
                <h6>In Progress</h6>
              </Card>
            </Col>
            <Col sm={4} className="card-m">
              {" "}
              <Card className="shadow rounded border-0 p-3 text-center">
                <span>
                  <FaSquareCheck
                    style={{ fontSize: "xx-large", color: "#7367f0" }}
                  />
                </span>
                <span>
                  <h4>530</h4>
                </span>
                <h6>Completed</h6>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

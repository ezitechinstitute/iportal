import React,{useState} from 'react'
import { Link } from 'react-router-dom'


const ProjectBtn = () => {
  const [active, setActive] = useState("projects");
  return (
    <>
      <Link type="button" className={active === "projects" ? "btn btn-primary" : "btn btn-light"} to="/internProjects" onClick={() => setActive("projects")}  >Total Projects</Link>

      <Link type="button" className={active === "onGoing" ? "btn btn-primary" : "btn btn-light"} to="/internOngoing"  onClick={() => setActive("onGoing")}>On Going</Link>

      <Link type="button" className={active==="Completed" ? "btn btn-primery" : "btn btn-light"} to="/internCompleted" onClick={() => setActive("Completed")}>Completed</Link>

    </>
  )
}

export default ProjectBtn 
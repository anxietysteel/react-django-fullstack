/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import api from "../api";
import Project from "../components/Project";
import "../styles/Home.css"

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    api
      .get("/api/projects/")
      .then((res) => res.data)
      .then((data) => {
        setProjects(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteProject = (id) => {
    api
      .delete(`/api/projects/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Project was deleted!");
        else alert("Failed to delete note.");
        getProjects();
      })
      .catch((error) => alert(error));
  };

  const createProject = (e) => {
    e.preventDefault();
    api
      .post("/api/projects/", { name: projectName })
      .then((res) => {
        if (res.status === 201) alert("Project created!");
        else alert("Failed to make Project.");
        getProjects();
      })
      .catch((err) => alert(err.response ? err.response.data : err));
  };

  return (
    <div>
      <div>
        <h2>Projects</h2>
        {projects.map((project) => (
          <Project
            project={project}
            onDelete={deleteProject}
            key={project.id}
          />
        ))}
      </div>
      <h2>Create a Project</h2>
      <form onSubmit={createProject}>
        <label htmlFor="project-name">Name:</label>
        <br />
        <input
          type="text"
          id="project-name"
          name="project-name"
          required
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

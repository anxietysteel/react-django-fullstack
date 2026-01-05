import React from "react";
import "../styles/Project.css";

export default function Project({ project, onDelete }) {
  const formattedDate = new Date(project.created_at).toLocaleString("ru-RU");

  return (
    <div className="container">
      <p className="project-name">{project.name}</p>
      <p className="project-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(project.id)}>
        Delete
      </button>
    </div>
  );
}

const express = require("express");
const server = express();

server.use(express.json());

let projects = [
  {
    id: 1,
    name: "Work on the API.",
    isComplete: false,
  },
  {
    id: 2,
    name: "Write Code.",
    isComplete: false,
  },
  {
    id: 3,
    name: "Refactor code.",
    isComplete: false,
  },
];

let pid = 3;

server.get("/projects", (req, res) => {
  res.status(200).send(projects);
});

server.post(`/projects`, (req, res) => {
  const project = req.body;
  console.log(req.body, project.name);

  if (project && project.name) {
    projects.push({
      id: ++pid,
      ...project,
      isCompleted: project.isCompleted ?? false,
    });
    res.status(201).send(projects);
  } else {
    res.status(401).json({ message: "project or name is missing." });
  }
});

server.delete(`/projects/:id`, (req, res) => {
  const { id } = req.params;

  if (
    projects.find((project) => {
      return project.id === Number(id);
    })
  ) {
    projects = projects.filter((project) => {
      return project.id !== Number(id);
    });
    res.status(200).json({ id: Number(id) });
  } else {
    res.status(404).json({ message: "id not found." });
  }
});

module.exports = server;

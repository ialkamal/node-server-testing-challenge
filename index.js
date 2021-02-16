require("dotenv").config();
const express = require("express");
const server = express();

const PORT = process.env.PORT || 5000;
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

  projects.push({ id: ++pid, ...project });

  res.status(201).send(projects);
});

server.delete(`/projects/:id`, (req, res) => {
  const { id } = req.params;

  projects = projects.filter((project) => {
    return project.id !== Number(id);
  });

  res.sendStatus(204);
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

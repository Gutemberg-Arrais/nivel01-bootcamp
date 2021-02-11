const express = require('express');
const cors = require('cors');
const app = express();
const { uuid, isUuid } = require('uuidv4')

app.use(cors())

app.use(express.json())

const projects = [];

function logRequests(request, response, next) {
    const { method, url } = request
    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.log(logLabel)

    return next();
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if(!isUuid(id)) {
        return response.status(400).json({error: 'Invalid ID'});
    }
    return next();
}

app.use(logRequests)
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    const { id } = request.query;
    console.log(id)
    const results = id ? projects.filter(project => project.id.includes(id)) : projects;

    return response.json(results);
})

app.post('/project', (request, response) => {
    const { title, owner } = request.query;
    console.log(request.query)
    const project = {
        id: uuid(),
        title: title,
        owner: owner,
    }

    projects.push(project)

    return response.json(project);
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;
    console.log(request.body)
    const projectIndex = projects.findIndex(project => id === project.id)

    if (projectIndex < 0) {
        return response.status(404).json({ error: 'Project not found.' });
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => id === project.id)

    
    if (projectIndex < 0) {
        return response.status(404).json({ error: 'Project not found.' });
    }
    projects.splice(projectIndex, 1)
    return response.status(204).send();
})

app.listen(5000, () => {
    console.log('Back-end Started!')
});
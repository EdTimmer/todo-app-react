const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  { id: 1, text: 'Hello, world!', status: 'active', archive: false },
  { id: 2, text: 'Pick up groceries', status: 'complete', archive: false },
];

let lastId = 2;

app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;
  res.render('index', { bundle });
});

app.get('/todos', (req, res) => {
  res.json(JSON.stringify(todos));
  // res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });
  
  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', (req, res) => {
  const text = req.body.data.text;

  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

// const id = todos.length + 1;
  const id = lastId + 1;
  lastId++;
  const newTodo = { id, text, status: 'active', archive: false };

  todos.push(newTodo);

  res.status(201).json(todos);
});

app.delete('/todos/:id', (req, res) => {
  // res.status(500).send({ message: 'not implemented' });
  const id = parseInt(req.params.id);

  const found = todos.some(todo => todo.id === id);
  
  if (found) {

    let deletedTodo = todos.filter(todo => todo.id === id);

    todos = todos.filter(todo => todo.id !== id);

    res.json({
      msg: 'Todo deleted',
      todo: deletedTodo
    });

  } else {
    res.status(400).json({ msg: `No todo with the id of ${id}` });
  }

});

app.put('/todos', (req, res) => {

  todos.forEach(todo => todo.status = 'complete')
  // res.json(JSON.stringify(todos));
  res.end();
  // res.json(todos);
  // res.status(201).json(todos);
  // res.status(201);
  // res.send('ok');
  // res.json({ msg: 'All todos completed', todos });
});

app.put('/todos/:id', (req, res) => {
  // res.status(500).send({ message: 'not implemented' });
  const id = parseInt(req.params.id);
  const found = todos.some(todo => todo.id === id);

  const body = req.body;
  const archived = body.data.archive;
  const completed = body.data.status === 'complete';



  if (found) {

    if (archived && completed) {
      todos.forEach(todo => {
        if (todo.id === id) {
          // todo.text = updTodo.text ? updTodo.text : todo.text;
          todo.archive = true;
          res.json({ msg: 'Todo archived', todo });
        }
      });
    }
    else if (!archived) {
      todos.forEach(todo => {
        if (todo.id === id) {
          // todo.text = updTodo.text ? updTodo.text : todo.text;
          todo.status = todo.status === 'complete' ? 'active' : 'complete';
          res.json({ msg: 'Todo updated', todo });
        }
      });
    }
    
  } else {
    res.status(400).json({ msg: `No todo with the id of ${id}` });
  }
});



// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});

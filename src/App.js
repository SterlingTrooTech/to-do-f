import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import ToDoList from "./components/toDoList";
import ToDoMForm from "./components/toDoMForm";
function App() {
  return (
    <Router>
      <nav className='nav1'>
        <div className="homeDiv">
          <Link to={"/todos"}>
            <button type="button" className="homeButton" >Home</button>
          </Link>
        </div>
        <div className="navButtonDiv">
          <Link to={"/add"}>
            <button type="button" className="navButton" >Add To-Do</button>
          </Link>
        </div>
      </nav>
      <div>
        <Switch>
          <Route exact path={["/", "/todos"]} component={ToDoList} />
          {/* <Route exact path="/add" component={ToDoMForm} />
          <Route path="/todos/:id" component={ToDoMForm} /> */}
          <Route exact path={["/add", "/todos/:id"]} component={ToDoMForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
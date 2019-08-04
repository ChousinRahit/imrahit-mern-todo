//////////Importing Modules
import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

/////////////// Importing Local files
import TodoListTodo from "./Components/TodoListTodo";
import CompletedTodo from "./Components/CompletedTodo";
import CreateTodo from "./Components/CreateTodo";
import ProgressTodo from "./Components/ProgressTodo";
import classess from "./App.module.css";

export class App extends Component {
  //////////////////////////// STATE
  state = {
    todos: [{}],
    newTodo: {
      subject: "",
      desc: "",
      priority: "imp",
      addTo: "todo"
    },
    subEmpt: false,
    updateToId: 0,
    editMode: false,
    todoListTodos: [{}],
    progressListTodos: [{}],
    completedListTodos: [{}],
    snackBarMessage: "",
    snackberShow: false
  };

  /////////////////////////////// LIFECYCLE DID MOUNT
  componentDidMount() {
    this.getTheTodos();
  }

  ///////////////////////////// ON CHANGE HANDLER
  onChangeHandler = event => {
    const target = event.target;

    this.setState({
      newTodo: {
        ...this.state.newTodo,
        [target.name]: target.value
      },
      subEmpt: false
    });
  };
  //////////////////////////// SUBMIT
  onSubmitTodo = () => {
    const newTodo = this.state.newTodo;

    if (newTodo.subject === "") {
      this.setState({
        subEmpt: true
      });
    } else {
      axios.post("/myTodos/", newTodo).then(res => {
        console.log(res);
      });
    }
    let msg = "";
    if (newTodo.addTo === "todo") {
      msg = `Your Todo's List`;
    } else if (newTodo.addTo === "progress") {
      msg = "Your Prgress List";
    } else if (newTodo.addTo === "completed") {
      msg = "Your Completed List";
    }

    this.setState({
      newTodo: {
        subject: "",
        desc: "",
        priority: "imp",
        addTo: "todo"
      },
      snackBarMessage: `Todo Added to ${msg}`,
      snackberShow: true
    });
    setTimeout(() => {
      this.getTheTodos();
    }, 500);
  };
  //////////////////////////// EDIT
  onEditHandler = id => {
    window.scrollTo(0, 0);
    let toUpdateTodo = this.state.todos.find(todo => {
      return todo._id === id;
    });

    // console.log(toUpdateTodo);

    this.setState({
      newTodo: {
        ...toUpdateTodo
      },
      modelShow: true,
      editMode: true,
      updateToId: id
    });
  };
  //////////////////////////// UPDATE
  onEditInit = () => {
    let urlAlongWithId = `/myTodos/update/${this.state.updateToId}`;

    const newTodo = this.state.newTodo;

    axios.put(urlAlongWithId, newTodo).then(res => {
      console.log(res);
    });

    setTimeout(() => {
      this.getTheTodos();
    }, 500);
    this.setState({
      newTodo: {
        subject: "",
        desc: "",
        priority: "imp",
        addTo: "todo"
      },
      editMode: false,
      snackBarMessage: "Todo Updated",
      snackberShow: true
    });
  };
  ///////////////////////////// CHIP DIRECT UPDATE
  onDirectUpdateToProcess = (id, to) => {
    let updatedTodo = this.state.todos.find(todo => {
      return todo._id === id;
    });

    let snackberMsg = "";

    if (to === "P") {
      updatedTodo = {
        ...updatedTodo,
        subject: updatedTodo.subject,
        desc: updatedTodo.desc,
        priority: updatedTodo.priority,
        addTo: "progress"
      };
      snackberMsg = "Todo shifted to Progress List";
    } else if (to === "T") {
      updatedTodo = {
        ...updatedTodo,
        subject: updatedTodo.subject,
        desc: updatedTodo.desc,
        priority: updatedTodo.priority,
        addTo: "todo"
      };
      snackberMsg = "Todo shifted to Todo's List";
    } else if (to === "C") {
      updatedTodo = {
        ...updatedTodo,
        subject: updatedTodo.subject,
        desc: updatedTodo.desc,
        priority: updatedTodo.priority,
        addTo: "completed"
      };
      snackberMsg = "Todo shifted to Completed List";
    }

    let urlAlongWithId = `/myTodos/update/${id}`;

    axios.put(urlAlongWithId, updatedTodo).then(res => {
      console.log(res);
    });

    setTimeout(() => {
      this.getTheTodos();
    }, 500);
    this.setState({
      snackBarMessage: snackberMsg,
      snackberShow: true
    });
  };
  //////////////////////////// DELETE
  onDeleteHandler = id => {
    axios.delete(`/myTodos/${id}`);

    setTimeout(() => {
      this.getTheTodos();
    }, 500);
    this.setState({
      snackBarMessage: "Todo Deleted",
      snackberShow: true
    });
  };

  //////////////////////////////// GET
  getTheTodos = () => {
    //Get all the todos
    axios.get("/myTodos/").then(res => {
      const todoListTodos = res.data.filter(todo => {
        return todo.addTo === "todo";
      });

      const progressListTodos = res.data.filter(todo => {
        return todo.addTo === "progress";
      });

      const completedListTodos = res.data.filter(todo => {
        return todo.addTo === "completed";
      });

      this.setState({
        todos: res.data,
        todoListTodos,
        progressListTodos,
        completedListTodos
      });
    });
  };

  onSnsckbarClose = () => {
    this.setState({
      snackberShow: false
    });
  };
  onShiftToCreateTodo = () => {
    this.setState({
      newTodo: {
        subject: "",
        desc: "",
        priority: "imp",
        addTo: "todo"
      },
      editMode:false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container className={classess.OuterDiv}>
          <div>
            <AppBar
              position="fixed"
              style={{ background: "#F4F4F9", color: "#000" }}
            >
              <ToolBar>
                <div>
                  <div className={classess.Font_righteous}>The Todo's</div>
                  <div className={classess.Font_Q}>
                    The secret of getting ahead is getting started : start now,
                    here
                  </div>
                </div>
              </ToolBar>
            </AppBar>

            <div
              style={{
                flexGrow: 1,
                width: "95%",
                height: "100vh",
                margin: "auto",
                marginTop: "82px"
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} className={classess.GridBorderDown}>
                  <div>
                    <CreateTodo
                      onChange={this.onChangeHandler}
                      newTodo={this.state.newTodo}
                      onSubmit={this.onSubmitTodo}
                      subEmpty={this.state.subEmpt}
                      onEditInit={this.onEditInit}
                      editMode={this.state.editMode}
                      onShiftToCreateTodo={this.onShiftToCreateTodo}
                    />
                  </div>
                </Grid>

                <Grid
                  item
                  xs={4}
                  className={[classess.Grid, classess.GridRightMargin].join(
                    " "
                  )}
                >
                  <div className={classess.InnerComponent}>
                    <TodoListTodo
                      todos={this.state.todoListTodos}
                      onEdit={this.onEditHandler}
                      onDelete={this.onDeleteHandler}
                      dUp={this.onDirectUpdateToProcess}
                    />
                  </div>
                </Grid>

                <Grid
                  item
                  xs={4}
                  className={[classess.Grid, classess.GridRightMargin].join(
                    " "
                  )}
                >
                  <div className={classess.InnerComponent}>
                    <ProgressTodo
                      onEdit={this.onEditHandler}
                      todos={this.state.progressListTodos}
                      onDelete={this.onDeleteHandler}
                      dUp={this.onDirectUpdateToProcess}
                    />
                  </div>
                </Grid>

                <Grid item xs={4} className={classess.Grid}>
                  <div className={classess.InnerComponent}>
                    <CompletedTodo
                      onEdit={this.onEditHandler}
                      todos={this.state.completedListTodos}
                      onDelete={this.onDeleteHandler}
                      dUp={this.onDirectUpdateToProcess}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <Snackbar
            style={{ background: "green" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.snackberShow}
            autoHideDuration={3000}
            onClose={this.onSnsckbarClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.snackBarMessage}</span>}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;

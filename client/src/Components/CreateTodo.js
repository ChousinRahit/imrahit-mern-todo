import React from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Zoom from "react-reveal/Zoom";

import classes from "./CreateTodo.module.css";

const CreateTodo = props => {
  const { subject, desc, priority, addTo } = props.newTodo;

  const { onSubmit, editMode, onEditInit, onShiftToCreateTodo } = props;

  return (
    <div>
      <Zoom>
        <Card>
          <CardContent style={{ marginLeft: "30px", padding: "26px" }}>
            <div>
              <Typography variant="h4">Create a Todo</Typography>
            </div>
            {/* */}
            <TextField
              label="Subject"
              name="subject"
              margin="normal"
              style={{ width: "50%", marginRight: "20px" }}
              value={subject}
              onChange={props.onChange}
            />
            <TextField
              select
              label="Priority"
              name="priority"
              margin="normal"
              className={classes.Priority}
              style={{ width: "30%", marginRight: "20px" }}
              value={priority}
              onChange={props.onChange}
            >
              <MenuItem value="imp">Important</MenuItem>
              <MenuItem value="!imp">I can do that later</MenuItem>
            </TextField>
            <br />
            <TextField
              label="Description"
              name="desc"
              margin="normal"
              multiline
              rows="2"
              style={{ width: "70%" }}
              value={desc}
              onChange={props.onChange}
            />

            <RadioGroup row onChange={props.onChange} value={addTo}>
              <Typography variant="h6">Add to ? </Typography>
              <FormControlLabel
                value="todo"
                name="addTo"
                control={<Radio color="primary" />}
                label="Todo"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="progress"
                name="addTo"
                control={<Radio color="primary" />}
                label="In Progress"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="completed"
                name="addTo"
                control={<Radio color="primary" />}
                label="Completed"
                labelPlacement="bottom"
              />
            </RadioGroup>

            {!editMode ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "5px" }}
                onClick={onSubmit}
              >
                Add to {addTo}
              </Button>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "5px" }}
                  onClick={onEditInit}
                >
                  Update
                </Button>
                <Button
                  style={{ marginLeft: "20px", marginTop: "5px" }}
                  variant="text"
                  color="secondary"
                  onClick={onShiftToCreateTodo}
                >
                  Shit to Adding New Todo
                </Button>
              </div>
            )}

            <Typography>
              {" "}
              {props.subEmpty ? "Please Provide Subject..." : null}
            </Typography>
          </CardContent>
        </Card>
      </Zoom>
    </div>
  );
};

export default CreateTodo;

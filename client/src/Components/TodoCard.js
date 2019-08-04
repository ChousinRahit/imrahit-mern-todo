import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Star from "@material-ui/icons/Star";
import Slide from "react-reveal/Slide";

const TodoCard = props => {
  const { sub, desc, priority, addTo, date, id, cn, directUp } = props;

  // console.log(props);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let pdate = new Date(date);
  let tdate = pdate.getDate();
  let month = pdate.getMonth();
  let hour = pdate.getHours();
  let timemin = pdate.getMinutes();

  let iTime = ` ${tdate} ${months[month]} ${hour}:${timemin} `;

  let color = "";
  let label = "";

  switch (addTo) {
    case "todo":
      color = "#FFAE03";
      label = (
        <React.Fragment>
          <Chip
            style={{
              position: "absolute",
              top: "10px",
              right: "3px"
            }}
            label="C"
            size="small"
            onDelete={() => directUp(id, "C")}
          />
          <Chip
            style={{
              position: "absolute",
              top: "10px",
              right: "20%"
            }}
            label="P"
            size="small"
            onDelete={() => directUp(id, "P")}
          />
        </React.Fragment>
      );
      break;
    case "progress":
      color = "#1BE7FF";
      label = (
        <React.Fragment>
          <Chip
            style={{
              position: "absolute",
              top: "10px",
              right: "3px"
            }}
            label="T"
            size="small"
            onDelete={() => directUp(id, "T")}
          />
          <Chip
            style={{
              position: "absolute",
              top: "10px",
              right: "20%"
            }}
            label="C"
            size="small"
            onDelete={() => directUp(id, "C")}
          />
        </React.Fragment>
      );
      break;
    case "completed":
      color = "#0496FF";
      label = (
        <React.Fragment>
          <Chip
            style={{
              position: "absolute",
              top: "10px",
              right: "3px"
            }}
            label="T"
            size="small"
            onDelete={() => directUp(id, "T")}
          />
          <Chip
            style={{
              position: "absolute",
              top: "10px",
              right: "20%"
            }}
            label="P"
            size="small"
            onDelete={() => directUp(id, "P")}
          />
        </React.Fragment>
      );
      break;
    default:
      color = "#FFAE03";
      break;
  }

  return (
    <div>
      <Slide bottom>
        <Card
          style={{
            textAlign: "left",
            marginBottom: "10px",
            background: color,
            position: "relative",
            color: "rgba(10, 10, 10, 0.668)"
          }}
        >
          <Chip
            style={{
              position: "absolute",
              top: "1px",
              right: "3px"
            }}
            label={`Card ${cn}`}
            size="small"
          />
          <CardHeader title={sub} subheader={iTime} />
          <CardContent style={{ position: "relative" }}>
            <Typography color="textSecondary" variant="body2" component="p">
              {desc}
            </Typography>

            {priority === "imp" ? (
              <Chip
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "3px"
                }}
                label="Imp"
                size="small"
                icon={<Star style={{ color: "	#C5B358" }} />}
              />
            ) : null}
          </CardContent>
          <CardActions style={{ position: "relative" }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => props.onEdit(id)}
            >
              Edit
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => props.onDelete(id)}
            >
              Remove
            </Button>
            {label}
          </CardActions>
        </Card>
      </Slide>
    </div>
  );
};

export default TodoCard;

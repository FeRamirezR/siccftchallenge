import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Home from "@material-ui/icons/Home";
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BadgeIcon from '@mui/icons-material/Badge';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "200px"
  }
});

const Drawer = (props) => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Pagina Principal",
      icon: <Home />,
      onClick: () => history.push("/")
    },
    {
      text: "Usuarios",
      icon: <PersonIcon />,
      onClick: () => history.push("/persons")
    },
    {
      text: "Tramites",
      icon: <AddBoxIcon />,
      onClick: () => history.push("/procedures")
    },
    {
      text: "Empleados",
      icon: <BadgeIcon />,
      onClick: () => history.push("/employees")
    }
  ];
  return (
    <MUIDrawer variant="permanent" className={classes.drawer}>
      <List className={classes.drawer}>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);

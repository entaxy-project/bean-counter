import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'
import Accounts from '../../core/Accounts'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    maxWidth: 200
  }
})

const LeftDrawer = ({ classes }) => {
  return (
    <Drawer
      elevation={3}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          key="Dashboard"
          component={NavLink}
          to="/dashboard"
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      <Divider />
      <Accounts />
    </Drawer>
  )
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}


export default withStyles(styles)(LeftDrawer)

/*
External libraries
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Enum from "es6-enum";

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import IconCreate from '@material-ui/icons/Create';
import IconDelete from '@material-ui/icons/Delete';
import IconDeleteForever from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';

const POSTACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

/*
Styles
*/
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
  },
});

class UsersTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    users: null,
    categoryId: null,
    postAction: null,
    dialogOpen: false,
    dialogTitle: '',
    dialogMessage: ''
  };

  

  handleDialogOpen = (categoryId, postAction) => {
    let title = '';
    let message = '';

    switch(postAction) {
      case POSTACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the post with id ${categoryId}?`;
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the post with id ${categoryId}?`;
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the post with id ${categoryId}?`;
        break;
    }

    this.setState({
      categoryId: categoryId,
      postAction: postAction,
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    });
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  };

  handleDialogSubmit = () => {
    let url = '';
    let options = {};

    switch(this.state.postAction) {
      case POSTACTIONSENUM.DELETE:
        url = `/api/v1/users/${this.state.categoryId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        url = `/api/v1/users/${this.state.categoryId}?mode=softdelete`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/users/${this.state.categoryId}?mode=softundelete`;
        options = {
          method: 'DELETE'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if(results.mode && results.mode === 'delete') {
          this.loadUsers();
        } else {
          const user = results.user;
          const i = this.state.users.findIndex((obj, index, array) => {
            return obj._id === user._id;
          });
          const users = this.state.users;
          users[i] = user;
  
          this.setState(prevState => ({
            ...prevState,
            users: users
          }));
        }
        }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    fetch('/api/v1/users')
      .then( response => response.json())
      .then( item => this.setState({ users: item })); 
  }

  render() {
    const { classes } = this.props;
    const { users } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Synopsis</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.map( (user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{user.title}</TableCell>
                  <TableCell>{user.synopsis}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link} to={ `/admin/users/${user.id}/edit`}>
                      <IconCreate />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(category.id, (category.deleted_at)?POSTACTIONSENUM.SOFTUNDELETE:POSTACTIONSENUM.SOFTDELETE)} style={{ opacity: ((category.deleted_at)?0.3:1) }}>
                      <IconDelete/>
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(category.id, POSTACTIONSENUM.DELETE)}>
                      <IconDeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Dialog
          fullScreen={false}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleDialogSubmit()} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );  
  }
}

export default withStyles(styles)(UsersTable);

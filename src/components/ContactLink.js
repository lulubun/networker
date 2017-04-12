import React from 'react';
import { styles } from 'material-ui/styles';
import {Link} from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';

export class ContactLink extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    {this.props.changeDate(dateInput)}
  };

 render() {
   const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return(
      <div>
        <p>Appointment for Next Contact: {this.props.appointment}</p><RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} />
          <Dialog
            title="Change"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <DatePicker
              hintText="Update the due date for your next follow up with this contact"
              onChange={(event, date) => {
              dateInput = date
            }}/>
          </Dialog>
        <Link to={'/:one_contact'}>name: {this.props.first} {this.props.last}</Link>
        <Checkbox
        id="importantHeart"
        disabled={true}
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label="Important"
        style={styles.checkbox}
        />
        <p>co: {this.props.conCompany}</p>
      </div>
    )
 }
 if (importantHeart = true) {
   document.getElementyById('importantHeart').checked = true;
 }
};

const mapStateToProps = (state, props) => ({
  appointment: state.ContactState.dateNext,
  first: state.ContactState.firstName,
  last: state.ContactState.lastName,
  conCompany: state.ContactState.company,
  importantHeart: state.ContactState.important
});

const mapDispatchToProps = (dispatch) => ({
  changeDate: this.props.updateDateNext
})

export default connect(mapStateToProps)(ContactLink);

import React from 'react';
import {Link} from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import * as actions from '../actions/contactActions';


class Contacts extends React.Component {
  componentDidMount() {
    this.props.getAllContacts();
  };

  render() {
    const style = {
      height: 200,
      margin: 20,
      padding: 20,
      width: 600,
      display: 'inline-block',
    };
    return (
      <div className="Contacts-List">
        {this.props.contactList.map((contact, index) => (
          <div className="oneLink" key={index}>
            <Paper style={style} zDepth={5} rounded={false}>
            <p>Appointment for Next Contact: {contact.serNextContact}</p>
            <Checkbox
             checked={contact.serImportant}
             checkedIcon={<ActionFavorite />}
             uncheckedIcon={<ActionFavoriteBorder />}
             disabled={true}
             />
             <Link to={'/one_contact/' + contact._id}>{contact.serFirst} {contact.serLast}</Link>
             <p>{contact.serCompany}</p>
           </Paper>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  contactList: state.AllContactsState.allContacts
});

const mapDispatchToProps = (dispatch) => ({
  getAllContacts: () => dispatch(actions.fetchAllContacts()),
  handleClick: (linkId) => dispatch(actions.fetchWholeContact(linkId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

import React from 'react';
import {Link} from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions';
import '../index.css';
import {yellowA200} from 'material-ui/styles/colors';

class Contacts extends React.Component {
  componentDidMount() {
    this.props.getAllContacts();
  };

  render() {
    const style = {
      height: 200,
      marginTop: 20,
      marginBottom: 20,
      marginLeft: '25%',
      marginRight: 'auto',
      padding: 20,
      width: '50%',
      display: 'inline-block',
      backgroundColor: '#B5B4A7',
      color: '#F1F1EF',
    };

    return (
      <div className="Contacts">
        <div className="New_Button">
          <Link to={'/new_contact'} className="Link"><RaisedButton className="NewButton" label="Create a New Contact" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
        </div>
        <div className="Contacts-List">
          {this.props.contactList.map((contact, index) =>
            (<div className="oneLink" key={index}>
              <Paper style={style} zDepth={5} rounded={false} className="onePaper">
              <p>Appointment for Next Contact: {contact.serNextContact}</p>
              <Link to={'/one_contact/' + contact._id} className="Link">
              <Checkbox
               checked={contact.serImportant}
               checkedIcon={<ActionFavorite />}
               uncheckedIcon={<ActionFavoriteBorder />}
               style={{paddingBottom: 15, margin: '0 auto'}}
               label={contact.serFirst + ' ' + contact.serLast}
               labelStyle={{color: '#F1F1EF'}}
               />
               </Link>
               <p>{contact.serCompany}</p>
             </Paper>
            </div>
          ))}
        </div>
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

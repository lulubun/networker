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
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
  response.grant({scope: 'https://www.googleapis.com/auth/calendar'})
}

class Contacts extends React.Component {
  componentDidMount() {
    const user = this.props.params.user;
    this.props.getAllContacts(user);
  };

  render() {
    const user = this.props.params.user;

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

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div className="Contacts">
        <GoogleLogin
          style={{width: '110%', marginRight: -5, marginLeft: -10}}
          clientId={'42592128683-4eruu5b4pjfk70nmpmdp9t5c2n1e33bn.apps.googleusercontent.com'}
          onSuccess={this.props.setLogin(true), responseGoogle}
          onFailure={this.props.setLogin(false), responseGoogle}
          offline={false}
        >
          <RaisedButton label="Login with Google to add follow up reminders to your calendar" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/>
        </GoogleLogin>
        <div className="New_Button">
          <Link to={'/' + user + '/new_contact'} className="Link"><RaisedButton className="NewButton" label="Create a New Contact" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
        </div>
        <div className="Contacts-List">
          {this.props.contactList.map((contact, index) =>
            (<div className="oneLink" key={index}>
              <Paper style={style} zDepth={5} rounded={false} className="onePaper">
              <p>Appointment for Next Contact: {contact.serNextContact}</p>
              <Link to={'/' + user + '/one_contact/' + contact._id} className="Link">
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
  contactList: state.AllContactsState.allContacts,
});

const mapDispatchToProps = (dispatch) => ({
  getAllContacts: (user) => dispatch(actions.fetchAllContacts(user)),
  handleClick: (linkId) => dispatch(actions.fetchWholeContact(linkId)),
  startGoogle: () => dispatch(actions.initClient()),
  setLogin: (boolean) => dispatch(actions.setGoogleLogin(boolean))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

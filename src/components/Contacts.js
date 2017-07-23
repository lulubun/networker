import React from 'react';
import {Link} from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/toggle/star';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/star-border';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions';
import '../index.css';
import MediaQuery from 'react-responsive';


class Contacts extends React.Component {
  componentDidMount() {
    const user = this.props.user;
    console.log(user);
    this.props.getAllContacts(user);
  };

  render() {
    const user = this.props.user;

    const style = {
      height: 175,
      marginTop: 70,
      marginBottom: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 30,
      // paddingLeft: 60,
      width: '80%',
      display: 'block',
    };

    const styleMin = {
      height: 175,
      marginTop: 50,
      marginBottom: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 20,
      width: '70%',
      display: 'block',
    };

    const iconStyle = {
      position: 'relative',
      top: '6px',
      paddingRight: '15px'
    }

    const noneStyle = {
      textAlign: 'center',
      color: '#cbc8d2',
      marginTop: 60
    }


    if (this.props.contactList.length == 0) {
      return(
        <div>
          <div className="New_Button">
            <Link to={'/' + user + '/new_contact'} className="Link"><RaisedButton className="NewButton" label="Create a New Contact" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
          </div>
          <h3 style={noneStyle}>Press the button above to add a new contact</h3>
        </div>
      )
    }

    return (
      <div className="Contacts">
        <div className="New_Button">
          <Link to={'/' + user + '/new_contact'} className="Link"><RaisedButton className="NewButton" label="Create a New Contact" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"  style={{zIndex: 2, borderRadius: 0}}/></Link>
        </div>
        <div className="Contacts-List">
        <MediaQuery query='(min-device-width: 1000px)'>
          {this.props.contactList.map((contact, index) =>
            (<div className="oneLink" key={index}>
              <Paper style={style} zDepth={1} rounded={false} className="onePaper">
                  <Link to={'/' + user + '/one_contact/' + contact._id} className="Link">
                    <Checkbox
                      checked={contact.serImportant}
                      checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}
                      style={{paddingBottom: 15, margin: '0 auto'}}
                      label={contact.serFirst + ' ' + contact.serLast}
                      labelStyle={{fontSize: '1.75em'}}
                    />
                  </Link>
                  <p>at {contact.serCompany}</p>
                  <p style={{marginBottom: 40}}>Next Follow-Up: {contact.serNextContact}</p>
             </Paper>
            </div>
          ))}
        </MediaQuery>
        <MediaQuery query='(max-device-width: 999px)'>
          {this.props.contactList.map((contact, index) =>
            (<div className="oneLink" key={index}>
              <Paper style={styleMin} zDepth={1} rounded={false} className="onePaper">
              <Link to={'/' + user + '/one_contact/' + contact._id} className="Link">
              <Checkbox
               checked={contact.serImportant}
               checkedIcon={<ActionFavorite />}
               uncheckedIcon={<ActionFavoriteBorder />}
               style={{paddingBottom: 15, margin: '0 auto'}}
               label={contact.serFirst + ' ' + contact.serLast}
               labelStyle={{fontSize: '1.75em'}}
               />
               </Link>
               <p style={{marginRight: '10px'}}>at {contact.serCompany}</p>
               <p style={{marginBottom: 40}}>Next Follow-Up: {contact.serNextContact}</p>
             </Paper>
            </div>
          ))}
        </MediaQuery>
        </div>
        {/* <Link to={'/' + user + '/network'} className="Link"><RaisedButton
          className="DoneButton" label="Back to Options" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link> */}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

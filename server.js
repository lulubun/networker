const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {PORT, DATABASE_URL} = require('./config');
const {ContactModel, PastModel} = require('./models');
const app = express();
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/contacts', (req, res) => {
  ContactModel
    .find()
    .exec()
    .then(data => {
      res.json(data.map(data => data.contactApi()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'cannot retrieve contacts'});
    });
});

app.get('/one_contact/:id', (req, res) => {
  ContactModel
  .findById(req.params.id)
  .exec()
  .then(data => res.json(data.contactApi()))
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'cannot retrieve contact'});
  });
});

app.get('/one_contact/:id/past_contact/:contactId', (req, res) => {
    PastModel
    .findById(req.params.id)
    .exec()
    .then(data => res.json(data.pastApi()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'cannot retrieve contact history'})
    })
});

app.put('/one_contact/:id', (req, res) => {
  PastModel
  .create({
    serDateContact: req.body.serPast.serDateContact,
    serTypeContact: req.body.serPast.serTypeContact,
    serNotesContact: req.body.serPast.serNotesContact
  })
  .then(data => res.status(201).json(data.pastApi()))
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'Could not save contact'})
  });
})

app.post('/new_contact', (req, res) => {
  const needsDate = 'serNextContact';
  needsDate => {
    if(!(needsDate in req.body)) {
      alert('You must pick a date to follow up with this person')
      res.status(400).json(
        {error: `Missing follow up date in request body`}
        );
    }
  }
  const needsName1 ='serFirst';
  const needsName2 = 'serLast';
  (needsName1, needsName2) => {
    if (!(needsName1 || needsName2 in req.body)) {
      alert('You must include at least either a first or last name for your contact')
      res.status(400).json(
        {error: 'Missing a name in request body'}
      );
    }
  }

  const needsContact1 = 'serPhone';
  const needsContact2 = 'serEmail';
  (needsContact1, needsContact2) => {
    if (!(needsContact1 || needsContact2 in req.body)) {
      alert('You must include at least one method to contact this person')
      res.status(400).json(
        {error: 'Missing contact info in request body'}
      );
    }
  }
  let serFirst = req.body.serFirst ? req.body.serFirst : '';
  let serLast = req.body.serLast ? req.body.serLast: '';
  let serImportant = req.body.serImportant ? req.body.serImportant: false;
  let serCompany = req.body.serCompany ? req.body.serCompany: '';
  let serPhone = req.body.serPhone ? req.body.serPhone: '';
  let serEmail = req.body.serEmail ? req.body.serEmail: '';
  let serMeetDate = req.body.serMeetDate ? req.body.serMeetDate: '';
  let serNote = req.body.serNote ? req.body.serNote: '';
  let serPast = req.body.serPast ? req.body.serPast: [];

  ContactModel
    .create({
      serNextContact: req.body.serNextContact,
      serFirst: serFirst,
      serLast: serLast,
      serImportant: serImportant,
      serCompany: serCompany,
      serPhone: serPhone,
      serEmail: serEmail,
      serMeetDate: serMeetDate,
      serNote: serNote,
      serPast: req.body.serPast
    })
    .then(data => res.status(201).json(data.contactApi()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Could not save contact'})
    });
});

app.delete('/one_contact/:id', (req, res) => {
  ContactModel
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(() => {
    res.status(201).json({message: 'Contact deleted'})
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'Contact not deleted'})
  });
});

app.delete('/one_contact/:id/past_contact:contactId', (req, res) => {
  PastModel
  .findByIdAndRemove(req.params.contactId)
  .exec()
  .then(() => {
    res.status(201).json({message: 'Contact instance deleted'})
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'Contact instance not deleted'})
  });
});

app.put('/one_contact/:id', (req, res) => {
  if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
  const updated = {};
  const updatableFields = ['serNextContact', 'serFirst', 'serLast', 'serImportant', 'serCompany', 'serPhone', 'serEmail', 'serMeet', 'serNote'];
  updatableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  ContactModel
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new:true})
    .exec()
    .then(updatedContact => res.status(201).json(updatedContact.contactApi()))
    .catch(err => res.status(500).json({message: 'Contact not updated'}));
});

app.put('/one_contact/:id/past_contact/:contactId', (req, res) => {
  if(!(req.params.contactId && req.body.contactId && req.params.contactId === req.body.contactId)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
  const updated = {};
  const updatableFields = ['serDateContact', 'serTypeContact', 'serNotesContact'];
  updatableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  PastModel
    .findByIdAndUpdate(req.params.contactId, {$set: updated}, {new:true})
    .exec()
    .then(updatedContact => res.status(201).json(updatedContact.pastApi()))
    .catch(err => res.status(500).json({message: 'Contact not updated'}));
});

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};

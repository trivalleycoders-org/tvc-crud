import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import * as ku from '../client/src/lib/ke-utils'

var config = require('./config');
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

let db;

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))

app.use(staticFiles)

router.get('/events', (req, res) => {
  db.collection('events').find().toArray()
    .then(events => {
      res.json(events)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

router.get('/projects', (req, res) => {
  db.collection('projects').find().toArray()
    .then(projects => {
      res.json(projects)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

/*
    Members
 */
router.get('/members', (req, res) => {
  db.collection('members').find().toArray()
    .then(members => {
      res.json(members)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' })
    })
})

router.post('/members', (req, res) => {
  const member = {
    picture: "",
    firstName: "",
    lastName: "",
    role: "",
    indexNum: "",
  }
  console.log('post.req.body', req.body)
  // console.log('member', member);
  db.collection('members').insertOne(member)
    .then(result =>
      db.collection('members').find({_id: result.insertedId}).limit(1)
      .next()
    )
    .then(savedMember => {
      // console.log('savedMember', savedMember);
      res.json(savedMember);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});

router.put('/members/:id', (req, res) => {
  // ku.log('router.put/members/:id body', req.body);
  // ku.log('req.params.id', req.params.id);
  // ku.log('req.body.firstName', req.body.member.firstName)
  let memberId;
  try {
    memberId = new ObjectId(req.params.id);
  } catch (error) {
    resp.status(422).json({ message: `Invalid member._id: ${error}`});
    return;
  }
  // ku.log('memberId', memberId);
  // const member = req.body;
  // Don't need the _id as stored in the member object so delete it
  delete res._id;
  // ** should do some validation here to check that all required
  // data is present of of a valid type **
  console.log(req.body)
  console.log(req.body.member.indexNum);
  db.collection('members').findOneAndUpdate(
    { _id: memberId },
    { $set:
      {
        picture: req.body.member.picture,
        firstName: req.body.member.firstName,
        lastName: req.body.member.lastName,
        role: req.body.member.role,
        indexNum: req.body.member.indexNum,
      }
    },
    { returnNewDocument: true },
  )
  .then(updatedMember => {
    let udm = JSON.stringify(updatedMember)
    ku.log('updatedMember', udm);
    res.json(updatedMember);
  })
  .catch(error => {
    console.log('put./members', error);
    res.status(500).json( { message: `Internal server error: ${error}`});
  });
});

app.delete('/members/:id', (req, res) => {
  let memberId;
  try {
    memberId = new ObjectId(req.params.id);
  } catch (error) {
    resp.status(422).json({ message: `Invalid member._id: ${error}`});
    return;
  }
  db.collection('members').deleteOne({ _id: memberId })
})

app.use(router)

app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

MongoClient.connect(config.db.connection).then(connection => {
  db = connection;
  app.listen(3002, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});

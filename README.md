# Note on the note
This is essentially a note from one developer to another, not really a readme

# TVC-CRUD

This project is a stripped down version of trivalleycoders. It is used for writing CRUD code in the context of Members as well as developing the ManageMembers form.

## Notes
- Is both client and server
- Client and server have their own package.json files
- There is a 3rd package.json in the project root which ties the two together using concurrently
- concurrently essentiall launches both client and server and makes sure they can speak to each other. To see this, check out this line in the root package.json
````
 "start": "concurrently \"cd client && yarn start PORT=3000\" \"cd server && yarn start PORT=3001\"",
 ````
 
 Here is the basic flow of an API call
 
1. Client calles action (see .../Member/index.jsc componentWillMount
1. Actions are located in store/actions.js
1. CRUD actions for Members are in actions.js lines 123 to 147
1. Action calls into src/api/index.js which has methods that make api call to the server
* I think up to this point you could learn to use by following the pattern, focus on the Express/server & DB connection stuff which comes next, and then get deeper into client code later. up to you.

Unline the client code which I would not want to change the methodology or flow, I'm not at all attached to they way the server code is written and actually think the following:
1. not sure we need to have the server and client tied together with concurrently. When we deployed trivalley coders site we deployed the client and server together and let Heroku take care of treating them as 2 separate apps (ports, ip address stuff). I think we should create 2 separate apps, server and client, and deploy them separately. From a development standpoint, this means either
1. we have to launch the app from 2 separate terminals OR
2. Keep them tied together in dev with concurrently and then separate for deployment
I don't know the answer yet

### Express Generator
For TVC site I didn't use express generator. My guess is we should as they know more about writing servers than I do :)
https://www.npmjs.com/package/express-generator

That is about it for now

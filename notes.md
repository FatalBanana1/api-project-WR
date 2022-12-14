<!-- Meet Project Notes -->

<!-- phase-0-setup -->

<!-- Backend -->

<!-- SQL -->

-npm dev dependencies
npm i -D

-random JWT secret:
t> openssl rand -base64 10

.env >> JWToken

-update config >> index.js

.sequelizerc

-initialize sequelize
t> npx sequelize init

-update config >> database.js

-sqlite for development
-postgres for production

-touch
psql-setup-script.js

-migrate db
t> npx dotenv sequelize db:migrate

<!-- EXPRESS -->

-reset token url/path
http://localhost:8000/api/csrf/restore

touch app.js

-set up routes

-test route

-import routes into app.js

<!-- create server -->

-bin/www = entry file = start express server

<!-- csrf token access for dev -->

-get /api/csrf/restore =
allow dev to reset csrf token cookie xsrf-token

<!-- phase-1/2-api-routes -->

-mkdir api >> routes
index.js

-1-resource not found error handler
app.js

-2-sequelize error handler

-3-err handler
formatting all errors into res.JSON
includes: e.msg + e.array + e.stack-trace

<!-- phase 3 - user auth -->

-user table create
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

-apply the constraints in the schema
-apply validations in model

-generate seeders file
npx sequelize seed:generate --name demo-user

-setup bcrypt in seeder file
-seed data
npx dotenv sequelize db:seed:all

-user model scope
-exclude from being sent to frontend:
1.default: hashedPassword, updatedAt, email, and createdAt
2.currentUser: hashedpass

-create methods that api routes for authentication will use to interact with Users t
-tosafeobject method: return obj with only user instance info safe to save to jwt: id, username, email
-validatepass method: return boolean if there is match with user instance and hashedpass
-getcurrentuserbyid static method: return user with that id
-login static method: return search for user with credential and password keys , return:
-signin static method

-User auth middlewares = 3 fxns

-create utils folder in backend
-file inside = auth.js = store auth helper fxns

-settokencookie method
-restoreuser method
-requireAuth method

-test user middleware
-add test route in backend > routes > api > index.js

-import restoreuser and connect to router before other middlew/routehan

<!-- phase 4 - user auth routes -->

-session router
-touch session.js > backend/routes/api
-touch users.js > backend/routes/api

-connect all routers exported from 2 files in index.js > api
-connect routes AFTER restoreUser

-session.js - import and post route

-user logout api route:
-delete route > api/session
logout route will remove token cookie and return success json msg

-signup: > router/api/users
post route

-get session user route > api/session
restore session user

-validate login inputs git feature branch
-adding user input validation on user login reqs

t> npm install express-validator

-validation middleware:
-touch validation.js > utils

-validating login req body > api/session
import check fxn from express-validator and handleVErr fxn

-connect post api/session to validatelogin middleware

-validating sugnup req.body: > routes/api/users.js
-post api/users signup route
-check with validatesignup
-validateSignup middleware is composed of the check and handleValidationErrors middleware
-checks to see if req.body.email exists and is an email, req.body.username is a minimum length of 4 and is not an email, and req.body.password is not empty and has a minimum length of 6

-connect the POST /api/users route to the validateSignup middleware

-wrapping up backend:
-refactor to add firstname and lastname attr

<!-- migrations -->

-create groups table and model
npx sequelize model:generate --name Group --attributes organizerId:integer,name:string,about:string,type:enum,private:boolean,city:string,state:string

-seeders for groups t
npx sequelize seed:generate --name test-groups

-create groupimages t
npx sequelize model:generate --name GroupImage --attributes groupId:integer,url:string,preview:boolean

-add skydiving imgs - seed file
npx sequelize seed:generate --name add-skydiving-imgs-test-1

-add membership seeders
npx sequelize seed:generate --name add-test-memberships

-usergroups join table = memberships
npx sequelize model:generate --name Membership --attributes userId:integer,groupId:integer,status:enum

//---------------------------

-EVENTS

-create events table
npx sequelize model:generate --name Event --attributes venueId:integer,groupId:integer,name:string,description:string,type:enum,capacity:integer,price:integer,startDate:date,endDate:date

-create seeders - events t
npx sequelize seed:generate --name add-test-events

-link events to group by groupid

-create eventimages table
npx sequelize model:generate --name EventImage --attributes eventId:integer,url:string,preview:boolean

-create seeders - eventimages t
npx sequelize seed:generate --name add-modernart-eventimages

-link eventimages to events

//---------------------------

-VENUES

-create venues table
npx sequelize model:generate --name Venue --attributes groupId:integer,address:string,city:string,state:string,lat:decimal,lng:decimal

-create seeders - venues t
npx sequelize seed:generate --name add-test-venues

-link venues to group by groupid
-link venues to events by venueid

//---------------------------

-Attendances

-create attendances table
npx sequelize model:generate --name Attendance --attributes eventId:integer,userId:integer,status:enum

-create seeders - attend t
npx sequelize seed:generate --name add-test-attendances

-link venues to group by groupid
-link venues to events by venueid

//---------------------------
tables:
venueid: 1 = online

venueid: 2 = broadway
1681 BROADWAY, NEW YORK, NY 10036

venueid: 3 = metropolitan museum of art
1000 5th ave, nyc, ny

venueid: 4 = american museum of natural history
200 Central Park West, New York, NY 10024

venueid: 5 = The Museum of Modern Art
11 W 53rd St, New York, NY 10019

//---------------------------

/_
// lazy load destructure - get all attendees of event
// let attends = await Attendance.findAll({
// where: { eventId },
// attributes: ["status"],
// });
// users.forEach((el, i) => {
// el.dataValues.Attendance = { status: attends[i].status };
// return el;
// });
_/

//---------------------------

//---------------------------

-TODO

//---------------------------

//---------------------------

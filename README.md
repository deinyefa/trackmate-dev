This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Trackmate - Admin
Part of a workflow that helps small business owners and customers keep track of stages in the order status process. This half is the admin side that features a dashboard, orders list, and a form to add an orders. 
It also contains a section that lets merchants modify their profile and update their password from inside the app. The billing page contains placeholder text and links to forms that would ideally handle payments.

## View demo
To get the full experience, you will need to create and hook up a [firebase](https://firebase.google.com/?gclid=EAIaIQobChMIxcXfuP_N4gIVlbjACh1ougt7EAAYASAAEgLEkvD_BwE) project to trackmate. 

You will need: 
```sh
REACT_APP_API_KEY=xxxxxx
REACT_APP_AUTH_DOMAIN=xxxxx.firebaseapp.com
REACT_APP_DATABASE_URL=xxxxx.firebaseio.com
REACT_APP_PROJECT_ID=xxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxx.appspot.com
REACT_APP_MESSAGING_SENDER_ID=xxxxxxxxxx
```

### cloning the app
In your terminal in your desired directory, run `git clone git@github.com:deinyefa/trackmate-dev.git`

### install all the dependencies
I used yarn as my package manager, so you can run `yarn` in the trackmate root directory to install all the dependencies 

### run the app!
Wait! Before that, create a `.env` file and paste the firebase config information, then run `yarn start`

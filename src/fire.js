import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDLfXpW9_-D3WMu1rzXubG_MghIn6utyWE",
  authDomain: "ruined-day.firebaseapp.com",
  databaseURL: "https://ruined-day.firebaseio.com",
  projectId: "ruined-day",
  storageBucket: "ruined-day.appspot.com",
  messagingSenderId: "932131879177",
  appId: "1:932131879177:web:4775ffb216765c6018bbd8",
  measurementId: "G-JGYBPXV9GR"
};

const fire = firebase.initializeApp(config);

export default fire;


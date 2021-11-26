import { initializeApp } from "firebase/app";
import FireBaseConfig from '../config/FireBaseConfig';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

initializeApp(FireBaseConfig);
const auth = getAuth();

let CheckAuth = false;
let AuthData = false;

onAuthStateChanged(auth, (user) => {
    if (user) {
        CheckAuth = true;
        AuthData = user;
        console.log(user);
    } else {
        CheckAuth = false;
        AuthData = false;
        console.log('loged out');
    }
});

const FireBaseLogedInfo = {CheckAuth, AuthData}
export default FireBaseLogedInfo;
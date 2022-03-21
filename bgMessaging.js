
// Optional flow type
import firebase, { RemoteMessage } from 'react-native-firebase';

export default (message: RemoteMessage ) => {
    // handle your message
    console.log(message);

    return Promise.resolve();
}
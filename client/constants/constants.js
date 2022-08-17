import * as Network from 'expo-network';
const Constants = {
  MY_SECURE_AUTH_STATE_KEY_TOKEN: "MySecureAuthStateKeyUserToken",  
  MY_SECURE_AUTH_STATE_KEY_HOUSING: "MySecureAuthStateKeyHousing",
  MY_SECURE_AUTH_STATE_KEY_USER: "MySecureAuthStateKeyUser",
  MY_SECURE_AUTH_STATE_KEY_REDUX: "MySecureAuthStateKeyRedux",
  MY_SECURE_AUTH_STATE_IMAGE_URI: "MySecureAuthStateKeyImageUri",
  IOS_GOOGLE_CLIENT_ID:
    "314578595226-3pfqh454mrmhneevoetc6ensm0blsa4a.apps.googleusercontent.com",
  FIREBASE_PASSWORD: "R$KfEHv7fqQh*8C2#ntXkB55X6gnjT14l$Sk6dy9LdY6rz2iUJ",
  CHAT_API_KEY: "uuzp677szard",
  CHAT_API_SECRET:
    "6k9v2bhb79yu3x9ckz824xr5z6wtzakevrneazf3xesp6tgcx9n9rzwzmht3vjau",
  BASE_URL: async () => {
    let id = await Network.getIpAddressAsync();
    return `http:192.168.50.183:3000`
  }
};

export default Constants;

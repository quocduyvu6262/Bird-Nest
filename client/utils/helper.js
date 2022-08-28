import * as SecureStore from 'expo-secure-store';
import Constants from '../constants/constants';
import Axios from 'axios';
import {storage, ref, getDownloadURL} from '../firebaseConfig'


/**
 * Generate chat uid from
 * user fullname and uid 
 * @param fullname the user full name
 * @param uid the user uid
 * @returns the chat uid
 */
export const getChatUID = (fullname, uid) => {
    const trimName = fullname.replace(/\s/g, '');
    const chatId = `${trimName}_${uid}`;
    return chatId
}

/**
 * Remove item from given array
 * @param array the array contain the item to be removed
 * @param item the item to be removed
 * @returns the new array
 */
export const removeItem = (array, item) => {
    const newArray = Array.from(array);
    const index = newArray.indexOf(item);
    if (index > -1) { // only splice array when item is found
        newArray.splice(index, 1); // 2nd parameter means remove one item only
    }
    return newArray;
}

/**
 * Update new matched user chat in Secure Store
 * @param userObject the original user object
 * @param newMatchedUserChat new matched user chat to be added 
 * into userObject
 */
export const updateMatchedUserChatSecureStore = (userObject,newMatchedUserChat) => {
    SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_USER,JSON.stringify({
        ...userObject,
        matchedChat: newMatchedUserChat
    }));
}

/**
 * Update new matched user chat in database
 * @param id the if of user whose matched chat user to be updated
 * @param newMatchedUserChat new matched user chat to be updated 
 */
export const updateMatchedChatUserDatabase = async (id, newMatchedUserChat) => {
    Axios.post(`${await Constants.BASE_URL()}/api/chat/updateMatchedChatUsersFromList`,{
        id: id,
        uidList: newMatchedUserChat
    }).then().catch(err => {
        console.log("Fail to update matched user chat");
        throw err;
    });
}

/**
 * View matched user chat from database
 * @param uidList the list of id of user to be viewd
 * @returns the promise whose data is the matched user chat.
 * Data will be null if uidList is either undefined or empty
 */
export const viewMatchedUserChat = async (uidList) => {
    if(!uidList || uidList.length == 0){

        return new Promise((resolve, reject) => {
            resolve({
                data: []
            })
        });
    }
    // post the list matched ID
    return Axios.post(`${await Constants.BASE_URL()}/api/chat/getMatchedChatUsersFromList`, {
        uidList: uidList,
    })
}

/**
 * Get new matched user chat
 * @param id the current user id
 */
export const getUpdatedMatchedUserChat = async (id) => {
    return Axios.post(`${await Constants.BASE_URL()}/api/chat/getUpdatedMatchedChatUsers`, {
        id: id,
    })
}

/**
 * @param path the uri to image in Firebase Cloud Storage
 * Function to retrieve image from firebase cloud storage
 * @returns the image url
 */
export const retrieveImage = async (path) => {
    if(path){
        const reference = ref(storage, path);
        const url = await getDownloadURL(reference).catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }})
        return url;
    }
}

/**
 * store user data into database and SecureStore 
 * @param user the user object (can be viewed in redux)
 * @param housing the housing object (can be viewed in redux)
 * @param imageFileSystemUri the image file object (can be viewed in redux)
 */
export const storeData = async (user, housing, imageFileSystemUri = null) => {
    // Store into Secure Store
    await SecureStore.setItemAsync(
        Constants.MY_SECURE_AUTH_STATE_KEY_USER,
        JSON.stringify(user)
    )
        .catch((err) => {
            console.log("Fail to store user in Secure Store");
            throw err;
        });
    await SecureStore.setItemAsync(
        Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING,
        JSON.stringify(housing)
    )
        .catch((err) => {
        console.log("Fail to store housing in Secure Store");
            throw err;
        });
    await SecureStore.setItemAsync(
        Constants.MY_SECURE_AUTH_STATE_IMAGE_URI,
        JSON.stringify({
            avatar: imageFileSystemUri ? imageFileSystemUri.avatar : null,
            album: imageFileSystemUri? imageFileSystemUri.album : null,
        })
    )
        .catch((err) => {
            console.log("Fail to store images in Secure Store"); 
            throw err;
        });

    // Store user into database
    Axios.post(`${await Constants.BASE_URL()}/api/users/questionnaire`, {
        userInfo: user,
    }).catch((err) => {
        console.log(err);
        //console.log(user);
        console.log("Fail to store user into database from questionnaire");
        throw err;
    });

    // Store user into history table
    Axios.post(`${await Constants.BASE_URL()}/api/history/create`, {
        user_id: user.id,
    }).catch((err) => {
        console.log(err);
        //console.log(user);
        console.log("Fail to store user into history");
        throw err;
    });

    // Store housing into database
    if (user.role === "Flamingo" || user.role === "Owl") {
        // delete no housing
        Axios.post(`${await Constants.BASE_URL()}/api/nohousing/delete`, {
        user_id: user.id,
        });
        // Post to housing
        Axios.post(`${await Constants.BASE_URL()}/api/housings/create`, {
            user_id: user.id,
            housing: housing,
        }).catch((err) => {
            console.log("Fail to update/insert housing from questionnaire");
            throw err;
        });
    } else if (
        user.role === "Parrot" ||
        user.role === "Penguin" ||
        user.role === "Duck"
    ) {
        // delete housing
        Axios.post(`${await Constants.BASE_URL()}/api/housings/delete`, {
            user_id: user.id,
        });
        // Post to nohousing
        Axios.post(`${await Constants.BASE_URL()}/api/Nohousing/create`, {
            user_id: user.id,
            housing: housing,
        }).catch((err) => {
            console.log("Fail to update/insert nohousing from questionnaire");
            throw err;
        });
    }
}
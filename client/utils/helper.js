import * as SecureStore from 'expo-secure-store';
import Constants from '../constants/constants';
import Axios from 'axios';

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


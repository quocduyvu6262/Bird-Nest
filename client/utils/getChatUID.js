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
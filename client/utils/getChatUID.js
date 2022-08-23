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
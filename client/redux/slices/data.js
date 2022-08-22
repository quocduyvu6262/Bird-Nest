import { createSlice } from "@reduxjs/toolkit";




const userInfo = {
    id: "",
    uid: "",
    firstname: "",
    lastname: "",
    fullname: null,
    email: null,
    role: "",
    gender: null,
    age: null,
    pronouns: null,
    graduationyear: null,
    bio: "",
    status: null,
    major: null,
    profilepic: null,
    picsList: [], // array
    token: null,
    notiNames: [], //array
    notiPics: [], //array
    notiLength: 0,
    notiSeen: [], //array
    notiunRead: 0,
    notiDate: [], //array

    // BASIC INFO
    pets: [], // array
    cook: "",
    alcohol: "",
    sleep: "",
    guests: "",
    outside: "",
    silent: "",
    roommateWorkWhileYouSleep: "",
    shareAppliances: "",
    carWithRoommate: "",
    roommateInteraction: "",
    tellRoommateIfBothered: "",

    //PERSONALITY
    personality: "",
    hogwartHouse: "",
    anime: "",
    athletic: "",
    marvelDC: "",
    talkative: "",
    dayout: [], // array
    vanillaChocolate: "",
    interiorDesign: [], // array
    favoriteSport: [], // array
    michaelLebron: "",
    coffeeBoba: "",
    bobaBubble: "",

    cleanliness: "",
    isHousing: null,
}

const housing = {
    cityList: [],
    neighborhoodList: [], // for no housing only
    neighborhood: null,
    city: null,
    squarefeet: 1000,
    lease: null,
    rent: 500, //500?

    garage: null,
    parking: null,
    gym: null,
    pool: null,
    appliances: null,
    furniture: null,
    AC: null,

    allergy: null,
    car: null,
    drugs: null,
}

const imageFileSystemUri = {
    avatar: "",
    album: []
}

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        userInfo: userInfo,
        housing: housing,
        imageFileSystemUri: imageFileSystemUri,
        channel: null
    },
    reducers: {
        // ALL
        updateUser: (state, action) => {
            let toAddUserInfoObj = action.payload;
            state.userInfo = {...state.userInfo, ...toAddUserInfoObj};
        },
        updateHousing: (state, action) => {
            let toAddHousingObj = action.payload;
            state.housing = {...state.housing, ...toAddHousingObj};
        },
        updateAllAlbum: (state, action) => {
            let toAddImagesObj = action.payload;
            state.imageFileSystemUri.album = action.payload;
        },
        // USER
        updateID: (state, action) => {
            state.userInfo.id = action.payload;
        },
        updateFullname: (state, action) => {
            state.userInfo.fullname = action.payload;
        },
        updateUID: (state, action) => {
            state.userInfo.uid = action.payload;
        },
        updateFirstname: (state, action) => {
            state.userInfo.firstname = action.payload;
        },
        updateLastname: (state, action) => {
            state.userInfo.lastname = action.payload;
        },
        updateEmail: (state, action) => {
            state.userInfo.email = action.payload;
        },
        updateRole: (state, action) => {
            state.userInfo.role = action.payload;
        },
        updateGender: (state, action) => {
            state.userInfo.gender = action.payload;
        },
        updateAge: (state, action) => {
            state.userInfo.age = action.payload;
        },
        updatePronouns: (state, action) => {
            state.userInfo.pronouns = action.payload;
        },
        updateMajor: (state, action) => {
            state.userInfo.major = action.payload;
        },
        updateGraduationyear: (state, action) => {
            state.userInfo.graduationyear = action.payload;
        },
        updateBio: (state, action) => {
            state.userInfo.bio = action.payload;
        },
        updateProfilepic: (state, action) => {
            state.userInfo.profilepic = action.payload;
        },
        updatePets: (state, action) => {
            let {pet, add} = action.payload;
            if(state.userInfo.pets === null){
                state.userInfo.pets = [];
            }
            let temp = state.userInfo.pets;
            if(add){
                if(temp.indexOf(pet) === -1) {
                    temp.push(pet);
                }
            } else {
                let toRemoveIndex = temp.indexOf(pet)
                if(toRemoveIndex > -1){
                    temp.splice(toRemoveIndex,1);
                }
            }
            // assign temp to pets
            state.userInfo.pets = temp;
        },
        updatePicsList: (state, action) => {
            let pic = action.payload;
            /**
             * Helper function: unique filter
             * @param value 
             * @param index 
             * @param self 
             * @returns 
             */
            const unique = (value, index, self) => {
                return self.indexOf(value) === index;
            }
            if(state.userInfo.picsList === null){
                state.userInfo.picsList = [];
            }
            state.userInfo.picsList.push(pic);
            state.userInfo.picsList.filter(unique);
        },
        updateToken: (state, action) => {
            state.userInfo.token = action.payload;
        },
        updateNotiNames: (state, action) => {
            let name = action.payload;
            state.userInfo.notiNames.unshift(name);
        },
        updateNotiPics: (state, action) => {
            let pic = action.payload;
            state.userInfo.notiPics.unshift(pic);
        },
        updateNotiLength: (state, action) => {
            state.userInfo.notiLength = action.payload;
        },
        updateSingleSeen: (state, action) => {
            state.userInfo.notiSeen.unshift(false);
        },
        updateNotiSeen: (state, action) => {
            state.userInfo.notiSeen.fill(true);
        },
        updateNotiUnread: (state, action) => {
            state.userInfo.notiunRead = state.userInfo.notiunRead + 1; 
        },
        updateNotiDate: (state, action) => {
            let date = action.payload;
            state.userInfo.notiDate.unshift(date);
        },
        removePics: (state, action) => {
            let pic = action.payload;
            if(state.userInfo.picsList === null){
                state.userInfo.picsList = [];
            }
            let temp = state.userInfo.picsList;
            const index = temp.indexOf(pic);
            if (index > -1) { // only splice array when item is found
                temp.splice(index, 1); // 2nd parameter means remove one item only
            }
            state.userInfo.picsList = temp;
        },
        updateCook: (state, action) => {
            state.userInfo.cook = action.payload;
        },
        updateAlcohol: (state, action) => {
            state.userInfo.alcohol = action.payload;
        },
        updateSleep: (state, action) => {
            state.userInfo.sleep = action.payload;
        },
        updateGuess: (state, action) => {
            state.userInfo.guests = action.payload;
        },
        updateOutside: (state, action) => {
            state.userInfo.outside = action.payload;
        },
        updateSilent: (state, action) => {
            state.userInfo.silent = action.payload;
        },
        updateRoommateWork: (state, action) => {
            state.userInfo.roommateWorkWhileYouSleep = action.payload;
        },
        updateShareAppliances: (state, action) => {
            state.userInfo.shareAppliances = action.payload;
        },
        updateCarWithRoommate: (state, action) => {
            state.userInfo.carWithRoommate = action.payload;
        },
        updateRoommateInteraction: (state, action) => {
            state.userInfo.roommateInteraction = action.payload;
        },
        updateTellRoommateIfBothered: (state, action) => {
            state.userInfo.tellRoommateIfBothered = action.payload;
        },
        updateIsHousing: (state, action) => {
            state.userInfo.isHousing = action.payload;
        },
        // PERSONALITY
        updatePersonality: (state, action) => {
            state.userInfo.personality = action.payload;
        },
        updateHogwartHouse: (state, action) => {
            state.userInfo.hogwartHouse = action.payload;
        },
        updateAnime: (state, action) => {
            state.userInfo.anime = action.payload;
        },
        updateAthletic: (state, action) => {
            state.userInfo.athletic = action.payload;
        },
        updateMarvelDC: (state, action) => {
            state.userInfo.marvelDC = action.payload;
        },
        updateTalkative: (state, action) => {
            state.userInfo.talkative = action.payload;
        },
        updateDayout: (state, action) => {
            let {activity, add} = action.payload;
            if (state.userInfo.dayout === null) {
                state.userInfo.dayout = [];
            }
            let temp = state.userInfo.dayout;
            if(add){
                if(temp.indexOf(activity) === -1) {
                    temp.push(activity);
                }
            } else {
                let toRemoveIndex = temp.indexOf(activity)
                if(toRemoveIndex > -1){
                    temp.splice(toRemoveIndex,1);
                }
            }
            // assign temp to pets
            state.userInfo.dayout = temp;
        },
        updateVanillaChocolate: (state, action) => {
            state.userInfo.vanillaChocolate = action.payload;
        },
        updateInteriorDesign: (state, action) => {
            let {activity, add} = action.payload;
            if (state.userInfo.interiorDesign === null) {
                state.userInfo.interiorDesign = [];
            }
            let temp = state.userInfo.interiorDesign;
            if(add){
                if(temp.indexOf(activity) === -1) {
                    temp.push(activity);
                }
            } else {
                let toRemoveIndex = temp.indexOf(activity)
                if(toRemoveIndex > -1){
                    temp.splice(toRemoveIndex,1);
                }
            }
            // assign temp to pets
            state.userInfo.interiorDesign = temp;
        },
        updateFavoriteSport: (state, action) => {
            let {activity, add} = action.payload;
            if (state.userInfo.favoriteSport === null) {
                state.userInfo.favoriteSport = [];
            }
            let temp = state.userInfo.favoriteSport;
            if(add){
                if(temp.indexOf(activity) === -1) {
                    temp.push(activity);
                }
            } else {
                let toRemoveIndex = temp.indexOf(activity)
                if(toRemoveIndex > -1){
                    temp.splice(toRemoveIndex,1);
                }
            }
            // assign temp to pets
            state.userInfo.favoriteSport = temp;
        },
        updateMichaelLebron: (state, action) => {
            state.userInfo.michaelLebron = action.payload;
        },
        updateCoffeeBoba: (state, action) => {
            state.userInfo.coffeeBoba = action.payload;
        },
        updateBobaBubble: (state, action) => {
            state.userInfo.bobaBubble = action.payload;
        },

        // HOUSING
        updateNeighborhoodList: (state, action) => {
            let {activity, add} = action.payload;
            if (state.housing.neighborhoodList === null) {
                state.housing.neighborhoodList = [];
            }
            let temp = state.housing.neighborhoodList;
            if(add){
                if(temp.indexOf(activity) === -1) {
                    temp.push(activity);
                }
            } else {
                let toRemoveIndex = temp.indexOf(activity)
                if(toRemoveIndex > -1){
                    temp.splice(toRemoveIndex,1);
                }
            }
            // assign temp to pets
            state.housing.neighborhoodList = temp;
        },
        updateCitylist: (state, action) => {
            let {activity, add} = action.payload;
            if (state.housing.neighborhoodList === null) {
                state.housing.neighborhoodList = [];
            }
            let temp = state.housing.neighborhoodList;
            if(add){
                if(temp.indexOf(activity) === -1) {
                    temp.push(activity);
                }
            } else {
                let toRemoveIndex = temp.indexOf(activity)
                if(toRemoveIndex > -1){
                    temp.splice(toRemoveIndex,1);
                }
            }
            // assign temp to pets
            state.housing.neighborhoodList = temp;
        },
        updateNeighborhood: (state, action) => {
            state.housing.neighborhood = action.payload;
        },
        updateRent: (state, action) => {
            state.housing.rent = action.payload
        },
        updateLease: (state, action) => {
            state.housing.lease = action.payload
        },
        updateGarage: (state, action) => {
            state.housing.garage = action.payload;
        },
        updateParking: (state, action) => {
            state.housing.parking = action.payload;
        },
        updateGym: (state, action) => {
            state.housing.gym = action.payload;
        },
        updatePool: (state, action) => {
            state.housing.pool = action.payload;
        },
        updateAppliances: (state, action) => {
            state.housing.appliances = action.payload;
        },
        updateFurniture: (state, action) => {
            state.housing.furniture = action.payload;
        },
        updateAC: (state, action) => {
            state.housing.AC = action.payload;
        },
        // IMAGE FILESYSTEM URI
        updateAvatar: (state, action) => {
            state.imageFileSystemUri.avatar = action.payload;
        },
        updateAlbum: (state, action) => {
            let pic = action.payload;
            /**
             * Helper function: unique filter
             * @param value 
             * @param index 
             * @param self 
             * @returns 
             */
            const unique = (value, index, self) => {
                return self.indexOf(value) === index;
            }
            if(state.imageFileSystemUri.album === null){
                state.imageFileSystemUri.album = [];
            }
            state.imageFileSystemUri.album.push(pic);
            state.imageFileSystemUri.album.filter(unique);
        },
        deleteAlbumItem:(state, action) => {
            let pic = action.payload;
            if(state.imageFileSystemUri.album === null){
                state.imageFileSystemUri.album = [];
            }
            let temp = state.imageFileSystemUri.album;
            const index = temp.indexOf(pic);
            if (index > -1) { // only splice array when item is found
                temp.splice(index, 1); // 2nd parameter means remove one item only
            }
            state.imageFileSystemUri.album = temp;
        }
    }
});

export const {
    // UPDATE ALL
    updateUser, 
    updateHousing, 
    updateAllAlbum,
    // UPDATE USER
    updateID,
    updateUID,
    updateFullname,
    updateFirstname, 
    updateEmail,
    updateRole, 
    updateLastname, 
    updateGender, 
    updateAge, 
    updatePronouns, 
    updateMajor, 
    updateGraduationyear, 
    updateBio, 
    updateProfilepic, 
    updatePets, 
    updateCook, 
    updatePicsList,
    updateToken,
    updateNotiNames,
    updateNotiPics,
    removePics,
    updateAlcohol,
    updateNotiLength, 
    updateSleep, 
    updateGuess, 
    updateOutside, 
    updateSilent, 
    updateRoommateWork, 
    updateShareAppliances, 
    updateCarWithRoommate,
    updateNotiDate, 
    updateRoommateInteraction, 
    updateTellRoommateIfBothered,
    updateIsHousing,
    // UPDATE PERSONALITY
    updatePersonality,
    updateHogwartHouse,
    updateAnime,
    updateAthletic,
    updateMarvelDC,
    updateTalkative,
    updateDayout,
    updateNotiUnread,
    updateVanillaChocolate,
    updateInteriorDesign,
    updateFavoriteSport,
    updateMichaelLebron,
    updateCoffeeBoba,
    updateBobaBubble,
    // UPDATE HOUSING 
    updateNeighborhoodList,
    updateNeighborhood, 
    updateCitylist,
    updateRent, 
    updateLease,
    updateNotiSeen,
    updateSingleSeen, 
    updateGarage,
    updateParking,
    updateGym,
    updatePool,
    updateAppliances,
    updateFurniture,
    updateAC,
    // IMAGE FILESYSTEM URI
    updateAvatar,
    updateAlbum,
    deleteAlbumItem
} = dataSlice.actions;
export default dataSlice.reducer;

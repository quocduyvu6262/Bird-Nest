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

    // BASIC INFO
    pets: "", // array
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
    dayout: "", // array
    vanillaChocolate: "",
    interiorDesign: "", // array
    favoriteSport: "", // array
    michaelLebron: "",
    coffeeBoba: "",
    bobaBubble: "",

    cleanliness: "",
    isHousing: null,
}

const housing = {
    neighborhood: null,
    city: null,
    squarefeet: 1000,
    lease: null,
    rent: null,

    garage: null,
    parking: null,
    gym: null,
    pool: null,
    appliances: null,
    furniture: null,
    AC: null,

    allegry: null,
    car: null,
    drugs: null,
}

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        userInfo: userInfo,
        housing: housing,
        channel: null
    },
    reducers: {
        // USER
        updateUser: (state, action) => {
            let toAddUserInfoObj = action.payload;
            state.userInfo = {...state.userInfo, ...toAddUserInfoObj};
        },
        updateHousing: (state, action) => {
            let toAddHousingObj = action.payload;
            state.housing = {...state.housing, ...toAddHousingObj};
        },
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
            if(state.userInfo.pets === ""){
                state.userInfo.pets = "[]";
            } 
            if(typeof state.userInfo.pets === "object"){
                state.userInfo.pets = JSON.stringify(state.userInfo.pets);
            }
            const temp = JSON.parse(state.userInfo.pets)
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
            state.userInfo.pets = JSON.stringify(temp);
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
            if(!state.userInfo.dayout){
                state.userInfo.dayout = "[]";
            } 
            if(typeof state.userInfo.dayout === "object"){
                state.userInfo.dayout = JSON.stringify(state.userInfo.dayout);
            }
            const temp = JSON.parse(state.userInfo.dayout)
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
            state.userInfo.dayout = JSON.stringify(temp);
        },
        updateVanillaChocolate: (state, action) => {
            state.userInfo.vanillaChocolate = action.payload;
        },
        updateInteriorDesign: (state, action) => {
            let {activity, add} = action.payload;
            if(!state.userInfo.interiorDesign){
                state.userInfo.interiorDesign = "[]";
            }
            if(typeof state.userInfo.interiorDesign === "object"){
                state.userInfo.interiorDesign = JSON.stringify(state.userInfo.interiorDesign);
            }
            const temp = JSON.parse(state.userInfo.interiorDesign)
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
            state.userInfo.interiorDesign = JSON.stringify(temp);
        },
        updateFavoriteSport: (state, action) => {
            let {activity, add} = action.payload;
            if(!state.userInfo.favoriteSport){
                state.userInfo.favoriteSport = "[]";
            } 
            if(typeof state.userInfo.favoriteSport === "object"){
                state.userInfo.favoriteSport = JSON.stringify(state.userInfo.favoriteSport);
            }
            const temp = JSON.parse(state.userInfo.favoriteSport)
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
            state.userInfo.favoriteSport = JSON.stringify(temp);
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
        }
    }
});

export const {
    // UPDATE USER
    updateUser, 
    updateHousing, 
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
    updateAlcohol, 
    updateSleep, 
    updateGuess, 
    updateOutside, 
    updateSilent, 
    updateRoommateWork, 
    updateShareAppliances, 
    updateCarWithRoommate, 
    updateRoommateInteraction, 
    updateTellRoommateIfBothered,
    // UPDATE PERSONALITY
    updatePersonality,
    updateHogwartHouse,
    updateAnime,
    updateAthletic,
    updateMarvelDC,
    updateTalkative,
    updateDayout,
    updateVanillaChocolate,
    updateInteriorDesign,
    updateFavoriteSport,
    updateMichaelLebron,
    updateCoffeeBoba,
    updateBobaBubble,
    // UPDATE HOUSING 
    updateNeighborhood, 
    updateRent, 
    updateLease, 
    updateGarage,
    updateParking,
    updateGym,
    updatePool,
    updateAppliances,
    updateFurniture,
    updateAC
} = dataSlice.actions;
export default dataSlice.reducer;

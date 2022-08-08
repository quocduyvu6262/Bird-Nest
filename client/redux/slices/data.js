import { createSlice } from "@reduxjs/toolkit";


const userInfo = {
    uid: "",
    firstname: "",
    lastname: "",
    fullname: "",
    email: "",
    role: "",
    gender: "",
    age: "",
    pronouns: "",
    graduationyear: "",
    bio: "",
    status: null,
    major: "",
    profilepic: null,

    // BASIC INFO
    pets: [],
    cook: "",
    alcohol: "",
    sleep: "",
    guests: "",
    outsise: "",
    slient: "",
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
    dayout: [],
    vanillaChocolate: "",
    interiorDesign: [],
    favoriteSport: [],
    michaelLebron: "",
    coffeeBoba: "",
    bobaBubble: "",

    cleanliness: "",
    isHousing: null,
}

const housing = {
    neighborhood: null,
    city: null,
    squarefeet: null,
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
        housing: housing
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
            if(add){
                if(state.userInfo.pets.indexOf(pet) === -1) {
                    state.userInfo.pets.push(pet);
                }
            } else {
                let toRemoveIndex = state.userInfo.pets.indexOf(pet)
                if(toRemoveIndex > -1){
                    state.userInfo.pets.splice(toRemoveIndex,1);
                }
            }
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
            state.userInfo.outsise = action.payload;
        },
        updateSilent: (state, action) => {
            state.userInfo.slient = action.payload;
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
            if(add){
                if(state.userInfo.dayout.indexOf(activity) === -1) {
                    state.userInfo.dayout.push(activity);
                }
            } else {
                let toRemoveIndex = state.userInfo.dayout.indexOf(activity)
                if(toRemoveIndex > -1){
                    state.userInfo.dayout.splice(toRemoveIndex,1);
                }
            }
        },
        updateVanillaChocolate: (state, action) => {
            state.userInfo.vanillaChocolate = action.payload;
        },
        updateInteriorDesign: (state, action) => {
            let {activity, add} = action.payload;
            if(add){
                if(state.userInfo.interiorDesign.indexOf(activity) === -1) {
                    state.userInfo.interiorDesign.push(activity);
                }
            } else {
                let toRemoveIndex = state.userInfo.interiorDesign.indexOf(activity)
                if(toRemoveIndex > -1){
                    state.userInfo.interiorDesign.splice(toRemoveIndex,1);
                }
            }
        },
        updateFavoriteSport: (state, action) => {
            let {activity, add} = action.payload;
            if(add){
                if(state.userInfo.favoriteSport.indexOf(activity) === -1) {
                    state.userInfo.favoriteSport.push(activity);
                }
            } else {
                let toRemoveIndex = state.userInfo.favoriteSport.indexOf(activity)
                if(toRemoveIndex > -1){
                    state.userInfo.favoriteSport.splice(toRemoveIndex,1);
                }
            }
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
    updateUID,
    updateFullname,
    updateFirstname, 
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

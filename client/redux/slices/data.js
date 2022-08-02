import { createSlice } from "@reduxjs/toolkit";


const userInfo = {
    firstname: "",
    lastname: "",
    fullname: null,
    email: null,
    role: null,
    gender: null,
    age: null,
    pronouns: null,
    graduationyear: null,
    bio: "",
    status: null,
    major: null,
    profilepic: null,
    alcohol: null,
    sleep: null,
    guests: null,
    cleanliness: null,
    isHousing: null,

    interests: null
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

        updateUser: (state, action) => {
            let toAddUserInfoObj = action.payload;
            state.userInfo = {...state.userInfo, ...toAddUserInfoObj};
        },
        updateHousing: (state, action) => {
            let toAddHousingObj = action.payload;
            state.userInfo = {...state.userInfo, ...toAddHousingObj};
        },
        updateFirstname: (state, action) => {
            state.userInfo.firstname = action.payload;
        },
        updateLastname: (state, action) => {
            state.userInfo.lastname = action.payload;
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
        updateNeighborhood: (state, action) => {
            state.housing.neighborhood = action.payload;
        },
        updateRent: (state, action) => {
            state.housing.rent = action.payload
        },
        updateLease: (state, action) => {
            state.housing.lease = action.payload
        }
    }
});

export const {updateUser, updateHousing, updateFirstname, updateLastname, updateGender, updateAge, updatePronouns, updateMajor, updateGraduationyear, updateBio, updateProfilepic, updateNeighborhood, updateRent, updateLease} = dataSlice.actions;
export default dataSlice.reducer;
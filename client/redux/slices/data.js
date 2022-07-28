import { createSlice } from "@reduxjs/toolkit";


const userInfo = {
    firstname: null,
    lastname: null,
    fullname: null,
    email: null,
    role: null,
    gender: null,
    age: null,
    pronouns: null,
    graduationyear: null,
    bio: null,
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
    neighborhoos: null,
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
        updateProfilepic: (state, action) => {
            state.userInfo.profilepic = action.payload;
        },
    }
});

export const {updateUser, updateHousing, updateFirstname, updateLastname, updateGender, updateAge, updatePronouns, updateMajor, updateGraduationyear, updateProfilepic} = dataSlice.actions;
export default dataSlice.reducer;
import Constants from "../../constants/constants";
import Axios from "axios";
import { useDispatch } from "react-redux";
import * as dataActions from '../../redux/slices/data';




const useNotification = () => {
    /**
     * Redux state
     */
    const dispatch = useDispatch();
    const user = useSelector(state => state.data.userInfo);

    /**
     * Update UI for matched users
     */
    const updateMatchUI = async () => {
        Axios.post(`${await Constants.BASE_URL()}/api/history/picName1`, {
            user_id: user.id,
        })
        .then((response) => {
            let userData = response.data;
            let name = userData[0].fullname;
            let pic = userData[0].profilepic;
            if(pic == null) {
            pic = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"; //update to not require link
            }
            dispatch(dataActions.updateNotiNames(name));
            dispatch(dataActions.updateNotiPics(pic)); //need to load pic from firebase
            dispatch(dataActions.updateNotiUnread());
            var currentDate = moment().format("YYYYMMDD HHmmss");
            dispatch(dataActions.updateNotiDate(currentDate));
            dispatch(dataActions.updateIsMatch());
            dispatch(dataActions.updateSingleSeen());
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Update UI for Swiped Users
     */
    const updateSwipeUI = async () => {
        Axios.post(`${await Constants.BASE_URL()}/api/history/picName2`, {
          user_id: user.id,
        }).then((response) => {
            let userData = response.data;
            let name = userData[0].fullname;
            let pic = userData[0].profilepic;
            if(pic == null) {
              pic = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"; //update to not require link
            }
            dispatch(dataActions.updateNotiNames(name));
            dispatch(dataActions.updateNotiPics(pic)); //need to load pic from firebase
            dispatch(dataActions.updateNotiUnread());
            var currentDate = moment().format("YYYYMMDD HHmmss");
            dispatch(dataActions.updateNotiDate(currentDate));
            dispatch(dataActions.updateIsNotMatch());
            dispatch(dataActions.updateSingleSeen());
        }).catch((error) => {
            console.log(error);
        });
    }
}
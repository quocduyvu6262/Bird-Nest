<<<<<<< HEAD
import React, { useLayoutEffect,  useEffect, useState } from 'react'
import { SafeAreaView, View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
//import data from '../../assets/data'
import Axios from "axios";
import { useSelector } from 'react-redux'
import {storage, ref, getDownloadURL} from '../../firebaseConfig'
const UserCarouselCards = ({avatar, picList}) => {

    const isCarousel = React.useRef(null)
    const [picsListCarouselData, setPicsListCarouselData] = useState([]);

    /**
     * @params path the uri to image in Firebase Cloud Storage
     * Function to retrieve image from firebase cloud storage
     */
    const retrieveImage = async (path) => {
        if(path){
            const reference = ref(storage, path);
            const url = await getDownloadURL(reference);
            return url;
        }
    }

    /**
     * Download all images
     */
    const downloadImages = async () => {
        let picsListCarouselData = []
        const avatarPath = await retrieveImage(avatar);
        if(avatar){
            picsListCarouselData.push({
                title: "Coral Reef",
                body: "Location: Red Sea",
                imgUrl: avatarPath
            })
        }
        if(picList && picList.length){
            await picList.map(async picUrl => {
                    picsListCarouselData.push({
                    title: "Coral Reef",
                    body: "Location: Red Sea",
                    imgUrl: await retrieveImage(picUrl)
                })
            })
        }
        return new Promise((resolve, reject) => {
            resolve(picsListCarouselData);
        })
    }

    /**
     * use effect
     */
    useEffect(() => {
        downloadImages().then(picsListCarouselData => {
            setPicsListCarouselData(picsListCarouselData);
        });
        //setPicsListCarouselData(picsListCarouselData);
    }, [])
    
    
    return (
        <SafeAreaView>
            <Carousel
                layout="stack"
                layoutCardOffset={12}
                ref={isCarousel}
                data={picsListCarouselData}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollSafeAreaView={true}
                containerCustomStyle={{
                flexGrow: 0,
                marginBottom: 10,
                }}
            />
        </SafeAreaView>
    )
}


export default UserCarouselCards
=======
import React, { useLayoutEffect, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
//import data from '../../assets/data'
import Axios from "axios";
import { useSelector } from "react-redux";
import { storage, ref, getDownloadURL } from "../../firebaseConfig";

const UserCarouselCards = ({ avatar, picsList }) => {
  const isCarousel = React.useRef(null);
  const [picsListCarouselData, setPicsListCarouselData] = useState([]);

  /**
   * @params path the uri to image in Firebase Cloud Storage
   * Function to retrieve image from firebase cloud storage
   */
  const retrieveImage = async (path) => {
    if (path) {
      const reference = ref(storage, path);
      const url = await getDownloadURL(reference).catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn’t exist
            break;
          case "storage/unauthorized":
            // User doesn’t have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
      return url;
    }
  };

  /**
   * Download picsList
   */
  const downloadPicsList = async (list) => {
    const urlList = await list.map(async (url) => ({
      title: "Coral Reef",
      body: "Location: Red Sea",
      imgUrl: await retrieveImage(url),
    }));
    const toReturnUrlList = await Promise.all(urlList);
    return toReturnUrlList;
  };

  /**
   * Download all images
   */
  const downloadAllImages = async () => {
    let picsListCarouselData = [];
    const avatarPath = await retrieveImage(avatar);
    if (avatar) {
      picsListCarouselData.push({
        title: "Coral Reef",
        body: "Location: Red Sea",
        imgUrl: avatarPath,
      });
    }
    if (picsList && picsList.length) {
      const listUrl = await downloadPicsList(picsList);
      picsListCarouselData = [...picsListCarouselData, ...listUrl];
    }
    return new Promise((resolve, reject) => {
      resolve(picsListCarouselData);
    });
  };

  /**
   * use effect
   */
  useEffect(() => {
    downloadAllImages().then((picsListCarouselData) => {
      setPicsListCarouselData(picsListCarouselData);
    });
    //setPicsListCarouselData(picsListCarouselData);
  }, []);

  return (
    <SafeAreaView>
      <Carousel
        layout="stack"
        layoutCardOffset={12}
        ref={isCarousel}
        data={picsListCarouselData}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollSafeAreaView={true}
        containerCustomStyle={{
          flexGrow: 0,
          marginBottom: 10,
        }}
      />
    </SafeAreaView>
  );
};

export default UserCarouselCards;
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5

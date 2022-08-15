import React from 'react'
import { SafeAreaView, View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import { useEffect, useState } from "react"
//import data from '../../assets/data'
import Axios from "axios";
import { useSelector } from 'react-redux'
const CarouselCards = () => {
  const isCarousel = React.useRef(null)
  
  const user = useSelector(state => state.data.userInfo);
  let data2 = [];
  let picList = [];
  if(user.picsList.length > 0) {
    picList = user.picsList;
  }
  if(user.profilepic != null) {
    data2[0] = {
      title: "Coral Reef",
      body: "Location: Red Sea",
      imgUrl:
      user.profilepic
    };
    /*
    console.log('ran');
    Axios.get(`http:192.168.50.183:3000/api/pictures/getPic`, {
      id: 6
    })
      .then((response) => {
        console.log('received');
      })
      .catch((error) => {
        console.log(error);
      });
      */
  }
  else {
    data2[0] = {
      title: "Coral Reef",
      body: "Location: Red Sea",
      imgUrl:
      "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
    };
  }
  for(let i = 0; i < picList.length; i++) {
    data2.push({
      title: "Coral Reef",
      body: "Location: Red Sea",
      imgUrl:
      picList[i]
    })
  }
  
  
  return (
    <SafeAreaView>
      <Carousel
        layout="stack"
        layoutCardOffset={12}
        ref={isCarousel}
        data={data2}
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


export default CarouselCards

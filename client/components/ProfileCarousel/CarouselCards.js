import React from 'react'
import { SafeAreaView, View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import { useEffect, useState } from "react"
//import data from '../../assets/data'
import Axios from "axios";
import { useSelector } from 'react-redux'
import {storage, ref, getDownloadURL} from '../../firebaseConfig'
const CarouselCards = () => {

  const isCarousel = React.useRef(null)
  const [picsListCarouselData, setPicsListCarouselData] = useState([]);
  const user = useSelector(state => state.data.userInfo);
  const imageFileSystemUri = useSelector(state => state.data.imageFileSystemUri);

  /**
   * use effect
   */
  useEffect(() => {
    let picsListCarouselData = []
    // avatar
    if(imageFileSystemUri.avatar){
      picsListCarouselData.push({
        title: "Coral Reef",
        body: "Location: Red Sea",
        imgUrl: imageFileSystemUri.avatar
      })
    }
    if(imageFileSystemUri.album.length){
      imageFileSystemUri.album.map(picUrl => {
        picsListCarouselData.push({
          title: "Coral Reef",
          body: "Location: Red Sea",
          imgUrl: picUrl
        })
      })
    }
    setPicsListCarouselData(picsListCarouselData);    
  }, [imageFileSystemUri])
  
  
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


export default CarouselCards

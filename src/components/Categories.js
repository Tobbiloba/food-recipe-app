import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { categoryData } from "../constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

// function App() {
//   return <Animated.View entering={FadeIn} exiting={FadeOut} />;
// }
const Categories = ({activeCategory, setActiveCategory, categories}) => {
    // const [activeCategory, setActiveCategory] = useState('Beef')
  return (
    <Animated.View entering={FadeInDown.duration(2500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
            categories.map((cat, index)=> {
                let isActive = cat.strCategory === activeCategory;
                let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10'
                return (
                <TouchableOpacity key={index} className="flex items-center space-y-1" onPress={() => setActiveCategory(cat.strCategory)}>
                    <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                        <Image source={{uri: cat.strCategoryThumb}}
                        style={{width: hp(6), height: hp(6)}}
                        className="rounded-full"
                        />
                    </View>
                    <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                    {cat.strCategory}
                    </Text>
                    
                </TouchableOpacity>)
})
        }
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({});

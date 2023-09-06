import { ScrollView, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Recipes from '../components/Recipes';
const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef')

const [categories, setCategories] = useState([])
const [meals, setMeals] = useState([])
  const getCategory = async () => {

    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      // console.log(Response)
      if (response && response.data) {
setCategories(response.data.categories)
      }
    } catch(error) {
      console.log('error: ', error)
    }
  }

  const getRecipe = async (category=activeCategory) => {

    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      // console.log(Response)
      if (response && response.data) {
        setMeals(response.data.meals)
      }
    } catch(error) {
      console.log('error: ', error)
    }
  }
  useEffect(() => {
    getCategory()
    
  }, [])
  useEffect(() => {
    getRecipe()
  }, [activeCategory])
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}} className="space-y-6 pt-8">
        <View className="mx-4 flex-row justify-between items-center">
          <Image source={require('../../assets/images/avatar.png')} style={{height: hp(5), width: hp(5)}}/>
          <BellIcon size={hp(4)} color="gray"/>


          
        </View>
        {/* greetins and punchline */}
        <View className="mx-4 space-y-2 mb-2">
            <Text style={{fontSize: hp(1.8)}} className="text-neutral-600">Hello, Tobbie</Text>
            <View>
              <Text className="font-semibold text-neutral-600" style={{fontSize: hp(3.8)}}>Make your own food,</Text>
            </View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Stay at <Text className="text-amber-400">home</Text></Text>
          </View>

          {/* Search bar */}
          <View className="mx-4 flex flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput 
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            />
            <View className="bg-white p-3 rounded-full">
              <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color="gray"/>
            </View>
          </View>

          {/* Category section  */}
          <View>
            {
              categories.length > 0 &&
            
            <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
            }
            </View>
            {/* Recipies */}
            <View>
              <Recipes meals={meals} categories={categories}/>
            </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
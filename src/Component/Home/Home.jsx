import React from 'react'
import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts.jsx'
import MainSlider from './../MainSlider/MainSlider';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';

export default function Home() {
  return <>
  <Helmet>
    <meta charSet='utf-8' />
    <title>FreshCart</title>
  </Helmet>
  <MainSlider/>
  <CategoriesSlider/>
  <FeaturedProducts/>
  </>
}

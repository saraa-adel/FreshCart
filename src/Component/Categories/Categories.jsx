import React, { useEffect } from 'react';
import logo from '../../Assets/images/freshcart-logo.svg';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Categories() {

  useEffect(() => {
    document.title = "Categories";
  }, []);

    function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data, isLoading, isError, isFetching, isFetcher} = useQuery('Categories', getCategories)
    

  return <>
      {isLoading ? <div className="loading flex-column pb-5">
          <BallTriangle
            width={70}
            radius={4}
            ariaLabel="ball-triangle-loading"
            wrapperClass="d-flex justify-content-center align-items-center mt-5 text-main"
            visible={true}
          />
          <div>
            <img src={logo} className='w-100' alt="logo" />
          </div>
        </div> : <>
      <div className='py-4'>
      <h4 className='fw-bold fs-1 mx-auto text-center header position-relative d-flex justify-content-center align-items-end'>All Categories</h4>
        <div className='row pt-4 g-4'>
          {data?.data.data.map((category) => (
            <div key={category._id} className="col-md-3 h-100">
              <Link to={`/categoriesDetails/${category._id}`}>
              <div className="product p-2 rounded-2 cursor-pointer d-flex flex-column justify-content-between">
                <div>
                  <img src={category.image} className='w-100 rounded' alt={category.name} height={350}/>
                </div>
                <h3 className='text-center fs-4 pt-2'>{category.name}</h3>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      </>}
    </>
}

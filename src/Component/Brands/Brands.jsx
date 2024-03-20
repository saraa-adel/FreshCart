import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../Assets/images/freshcart-logo.svg';
import { getBrands } from '../../Redux/brandsSlice';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {
  const { brands, isLoading } = useSelector(state => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Brands";
  }, []);

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
      <h4 className='fw-bold fs-1 mx-auto text-center header position-relative d-flex justify-content-center align-items-end'>All Brands</h4>
        <div className='row pt-4 g-4'>
          {brands.map((brand) => (
            <div key={brand._id} className="col-md-2">
              <div className="product p-2 rounded-2 cursor-pointer">
                <Link to={`/brandDetails/${brand._id}`}>
                  <img src={brand.image} className='w-100' alt={brand.name} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        </div>
        </>}
    </>;
}

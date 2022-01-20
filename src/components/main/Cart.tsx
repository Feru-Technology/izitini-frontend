import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './footer'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { product } from '../../redux/products/product.slice'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { IProduct } from '../../redux/products/product.interface'

import {
    fetchingProducts,
    storeProducts,
    productFailed
} from '../../redux/products/storeProducts.slice '
const Cart = () => {

    return (<>
        my Cart
    </>
    )
}

export default Cart

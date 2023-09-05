import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {BsSearch} from 'react-icons/bs'
import {FiDelete} from 'react-icons/fi'
import pro1 from '../img/pro1.jpg'
import pro2 from '../img/pro2.jpg'
import pro3 from '../img/pro3.jpg'
import pro4 from '../img/pro4.jpg'
import pro6 from '../img/pro6.jpg'
import pro7 from '../img/pro7.jpg'
import { selectProduct,totalPrice,deleteSingleList,createPrice,deleteQty,editPrice} from '../redux/services/shopSlice'
import { useDispatch, useSelector } from 'react-redux'

let addNum='';

const Shop = () => {

    const products = [
        {
            name : 'avocado',
            price : 10000,
            img : pro1,
            id : 1,
            qty : 1
        },
        {
            name : 'lychee',
            price : 20000,
            img : pro2,
            id : 2,
            qty : 1
        },
        {
            name : 'apple',
            price : 30000,
            img : pro3,
            id : 3,
            qty : 1
        },
        {
            name : 'mango',
            price : 50000,
            img : pro4,
            id : 4,
            qty : 1
        },
        {
            name : 'kiwi',
            price : 50000,
            img : pro6,
            id : 5,
            qty : 1
        },
    ]

    const dispatch = useDispatch()
    const receiveList = useSelector((state) => state.shop.list)
    const [selectedList,setSelectedList] = useState(null)
    const [selectedAction,setSelectedAction] = useState('qty')
    const [price,setPrice] = useState('')
    // console.log(receiveList);
    let all=0;
    
    if(receiveList.length > 0){
        const unit = receiveList.map((value)=> value.price*value.qty)
        // console.log(unit)
        const total = unit.reduce((pv,cv)=>Number(pv)+Number(cv),[0])
        all=total
        // console.log(total);
    } 

    const onListClickHandler=(x,e)=>{

        setSelectedList(x.id)
        const selected = document.querySelector('.active-list')
        const getList = e.target.closest('.list')
        // console.log(getList)
        if(selected !=null ){
            // console.log(e);
            selected.classList.remove('active-list')
            setTimeout(()=>{
                getList.classList.add('active-list')
            },100)
            
        }else{

            getList.classList.add('active-list')

        }
        // const ind = receiveList.indexOf(value)
        // setSelectedList(ind)
        // console.log(ind);
    }

    const onQtyClickHandler=()=>{
        setSelectedAction('qty')
        if(selectedList == null){
            window.alert('select a list')
        }else{
            dispatch(totalPrice(selectedList))
        } 
    }

    const onDeleteHandler=()=>{
        if(selectedAction == 'qty'){
            dispatch(deleteQty(selectedList))
            console.log('run');
        }else{
            const data = {id : selectedList,pro : products}
            dispatch(editPrice(data))
        }
        // dispatch(deleteSingleList(selectedList))
    }

    const onPriceChangeHandler=()=>{
        setSelectedAction('price')
    }

    const check =(e)=>{
        if(receiveList.length >= 1){
            if(selectedAction == 'price'){
                if( selectedList != null){
                   const addNum = e.target.closest('.num-data').childNodes[0].innerText
                    // console.log(addNum)
                    const data = {price : addNum,id : selectedList}
                    // console.log(typeof(data.price),data.price)
                    dispatch(createPrice(data))
                }else{
                    window.alert('Oops! select a list')
                }
            }

        }else{
            window.alert(' pick up your product')
        }
    }
        

    console.log(addNum);

  return (
    <div className="">
        <div className=' print:hidden'>
        <Navbar/>
        </div>
        <div className=' flex '>
            <div className=' w-[65vw] bg-gray-900 print:hidden'>
                <div className=' flex bg-slate-800 py-3 px-5 justify-between border-y border-gray-400'>
                    <div className=' flex items-center'>
                        <p className=' text-gray-400 font-medium text-sm  me-5'>Sale / Cashier</p>
                        <p className=' text-gray-200 font-semibold text-lg  me-5'>All </p>
                        <p className=' text-gray-200 font-semibold text-lg  me-5'>Drink </p>
                        <p className=' text-gray-200 font-semibold text-lg  me-5'>Cake </p>
                        <p className=' text-gray-200 font-semibold text-lg  me-5'>Dessert </p>
                        <p className=' text-gray-200 font-semibold text-lg  me-5'>Set </p>
                    </div>
                    <div className='border-gray-300 rounded border px-2 py-1'>
                        <BsSearch className=" inline text-gray-200 me-3"/>
                        <input type="text" placeholder='search' className=' w-[250px] outline-none bg-transparent text-gray-200 text-sm font-semibold' />
                    </div>
                </div>
                {/* products */}
                <div className=' bg-gray-900 px-4 pt-4'>
                    <div className=' flex gap-4 flex-wrap'>
                        {
                            products.map((value)=><div className=' border border-gray-700 rounded overflow-hidden' key={value.id} onClick={()=> dispatch(selectProduct(value)) }>
                            <img src={value.img } alt="" className=' w-[180px] h-[160px]' />
                            <div className=' text-gray-400 p-3 text-end'>
                                <p>{value.name}</p>
                                <p className=' font-bold'>{value.price}</p>
                            </div>
                        </div>)
                        }
                    </div>
                </div>
            </div>
            {/* Receive */}
            <div className=' w-[35vw] h-full bg-slate-950 flex flex-col print:w-full'>
                <div className='h-[400px] overflow-auto shop-list'>
                    <h1 className=' font-extrabold hidden text-4xl pt-3 ps-5 print:my-6 print:ps-0 print:text-center print:block'>MMS Shop</h1>
                    <h1 className=' font-bold text-3xl text-gray-200 pt-3 ps-5 print:my-6 print:text-gray-400 print:ps-0 print:text-center'>Receive</h1>
                    <ul >
                        {
                            receiveList.length != 0 ? receiveList.map((value)=><li className=' flex py-2 px-5 border-b border-gray-600 justify-between items-center list ' key={value?.id} onClick={(e)=>onListClickHandler(value,e)}>
                            <div>
                                <p className=' text-gray-300 font-thin '>{value.name}</p>
                                <span className=' text-gray-400 font-medium text-sm'>{value.qty} / Unit</span><span className=' text-gray-400 font-medium text-sm'>{value?.price}</span>
                            </div>
                            <p className=' text-gray-100 font-semibold price print:text-gray-400' >{value.price*value.qty}</p>
                        </li>):null  
                        }
                    </ul>
                </div>
                {/* Keypad */}
                <div className=' mt-auto '>
                    <div className=' text-end pe-5 mt-3'>
                        <span className=' uppercase text-gray-300 me-3'>total - </span>
                        <span className=' text-gray-200 text-2xl font-bold inline-block w-[100px] print:text-gray-600'>{all}</span>
                    </div>
                     <div className=' flex flex-col keypad print:hidden'>
                        <div className='flex '>
                            <button className='flex justify-center w-[50%] items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600'>
                                <span className=' block text-gray-300 text-center'>Note</span>
                            </button>
                            <button className='flex justify-center w-[50%] items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                <span className=' block text-gray-300 text-center'>Tax</span>
                            </button>
                            
                        </div>
                        <div className='flex w-full' >
                            <div onClick={(e)=>check(e)} className=' w-[75%] flex'>
                                <button className='flex justify-center num-data w-[33.35%]  items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600' >
                                    <span className=' block text-gray-300 text-center '>1</span>
                                </button>
                                <button className='flex justify-center num-data w-[33.35%]  items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                    <span className=' block text-gray-300 text-center '>2</span>
                                </button>
                                <button className='flex justify-center num-data w-[33.40%] items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                    <span className=' block text-gray-300 text-center '>3</span>
                                </button>
                            </div>
                            <button className={`  flex justify-center w-[25%] items-center ${selectedAction == 'qty'? 'bg-gray-300 selected' : 'bg-gray-800'} px-12 py-3 border border-e-0 border-gray-600`} onClick={()=>onQtyClickHandler()} >
                                <span className=' block text-gray-300 text-center font-semibold'>QTY</span>
                            </button>
                        </div>                        
                        <div className='flex ' onClick={(e)=>check(e)}>
                            <button className='flex justify-center w-[25%] num-data items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600'>
                                <span className=' block text-gray-300 text-center '>4</span>
                            </button>
                            <button className='flex justify-center w-[25%] num-data items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                <span className=' block text-gray-300 text-center '>5</span>
                            </button>
                            <button className='flex justify-center w-[25%] num-data items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                <span className=' block text-gray-300 text-center '>6</span>
                            </button>
                            <button className='flex justify-center w-[25%]  items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                <span className=' block text-gray-600 text-center font-semibold'>DISC</span>
                            </button>
                        </div>
                        <div className='flex ' >
                            <div onClick={(e)=>check(e)} className=' w-[75%] flex'>
                                <button className='flex justify-center num-data w-[33.35%]  items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600' >
                                    <span className=' block text-gray-300 text-center '>7</span>
                                </button>
                                <button className='flex justify-center num-data w-[33.35%]  items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                    <span className=' block text-gray-300 text-center '>8</span>
                                </button>
                                <button className='flex justify-center num-data w-[33.40%] items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                    <span className=' block text-gray-300 text-center '>9</span>
                                </button>
                            </div>
                            <button className={` flex-1 flex justify-center w-[25%] items-center ${selectedAction == 'price'? 'bg-gray-300 selected' : 'bg-gray-800'} px-12 py-3 border border-e-0 border-gray-600`} onClick={()=>onPriceChangeHandler()} >
                                <span className=' block text-gray-300 text-center font-semibold'>Price</span>
                            </button>
                        </div>
                        <div className='flex '>
                            <div onClick={(e)=>check(e)} className=' flex-1 flex'>
                                <button className='flex justify-center num-data w-[33.35%]  items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600' >
                                    <span className=' block text-gray-300 text-center '>+/-</span>
                                </button>
                                <button className='flex justify-center num-data w-[33.35%]  items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                    <span className=' block text-gray-300 text-center '>0</span>
                                </button>
                                <button className='flex justify-center num-data w-[33.40%] items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600 '>
                                    <span className=' block text-gray-300 text-center '>.</span>
                                </button>
                            </div>
                            <button className={` flex justify-center w-[25%] items-center bg-gray-800 px-12 py-3 border border-e-0 border-gray-600`} onClick={()=>onDeleteHandler()} >
                                <FiDelete className=' block text-gray-300 text-center font-semibold'/>
                            </button>
                        </div>
                    </div>
                    <div className=' text-center py-3 bg-gray-900 border-s border-gray-600 print:hidden' onClick={()=>window.print()}>
                        <span className=' text-gray-300 font-semibold'>Payment</span>
                    </div>
                </div>  
            </div>
        </div> 
    </div>
  )
}

export default Shop
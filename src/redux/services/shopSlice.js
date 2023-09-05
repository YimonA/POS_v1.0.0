import { createSlice,current } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name : 'shop',
    initialState  : {
        list : [],
        price : ''
    },
    reducers :{
        selectProduct :(state,{payload})=>{
            const list = state.list
            const id = list.map((v)=>v.id)
            const alreadyselected = id.includes(payload.id)
            // console.log(alreadyselected);
            // console.log(id);

            if(alreadyselected){
                const filterData = list.filter((v)=>v.id != payload.id)
                state.list = [...filterData,{...payload,qty:payload.qty+1}]
                // console.log(alreadyselected);
                // console.log(state.list)
            }else{
                state.list = [...state.list,payload]
                // console.log(state.list)

            }
            
        },
        totalPrice :(state,{payload})=>{
            const filterdata = state.list.filter((value)=>{
                // console.log(payload)
                return value.id != payload
            })
            const updateQty = state.list.find((value)=>value.id == payload)
            state.list = [...filterdata,{...updateQty,qty : updateQty.qty+1 }]

            // const filterdata = state.list.filter((value,index)=>{
            //     console.log(index,payload)
            //     return index != payload
            // })
            // const update = state.list[payload]
            // console.log(current(update));
            // state.list = [...filterdata,{...update,qty : update.qty+1}]
            // console.log(state.list)
        },
        deleteSingleList :(state,{payload})=>{
            const filterdata = state.list.filter((value)=>{
                console.log(payload)
                return value.id != payload
            })
            state.list = [...filterdata]
        },
        createPrice :(state,{payload})=>{
            console.log(payload)
            const filterdata = state.list.filter((value)=>{
                console.log(payload)
                return value.id != payload.id
            })
            const updateData = state.list.find((value)=>value.id == payload.id)
            state.price = `${state.price}${payload.price}`
            console.log(state.price)
            state.list = [...filterdata,{...updateData,price : Number(state.price) }]
            
            console.log(state.list)

        },
        deleteQty : (state,{payload})=>{
            const filterdata = state.list.filter((value)=>{
                // console.log(payload)
                return value.id != payload
            })
            const updateQty = state.list.find((value)=>value.id == payload)
            if(updateQty.qty ==1){
                state.list = [...filterdata]
            }else{
                state.list = [...filterdata,{...updateQty,qty : updateQty.qty-1 }]
                console.log(state.list);

            }
        },
        editPrice :(state,{payload})=>{
            console.log(payload)
            const filterdata = state.list.filter((value)=>{
                console.log(payload)
                return value.id != payload.id
            })
            const updateData = payload.pro.find((value)=>value.id == payload.id)
            console.log(updateData);
            const updatePrice = String(state.price)
            console.log(updatePrice)
            if(updatePrice.length == 1){
                state.list = [...filterdata,{...updateData,price: updateData.price}]
                console.log('rr');
            }else{
                const editPrice = updatePrice.slice(`-${updatePrice.length}`,'-1')
                state.price = editPrice
                console.log(editPrice)
                console.log(state.price)
                state.list = [...filterdata,{...updateData,price : editPrice}]
                console.log(state.list);
                // ,price: Number(editPrice)
            }

        }
    }
})

export default shopSlice.reducer;
export const {selectProduct,totalPrice,deleteSingleList,createPrice,deleteQty,editPrice} = shopSlice.actions
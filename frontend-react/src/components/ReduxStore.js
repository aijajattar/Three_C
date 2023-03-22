import { configureStore } from "@reduxjs/toolkit"


const TCReducer = (
    state={
        consumer:{
            consumerId:0,
            fullname:"",
            phone:"",
            email:"",
            username:"",
            addresses:[],
            posts:[]
        },
        SP:{
            serviceProviderId:0,
            fullname:"",
            phone:"",
            email:"",
            city:"",
            username:"",
            expertise:[],
            bids:[]
        },  
        posts:[],

        user:false,
        link:`http://192.168.1.100:7070`
    }, 
    action)=>{

    if(action.type==="login"){
        return {...state, consumer:action.consumer, user:true}
    }

    else if(action.type==="logout"){
            return {...state, consumer:{consumerId:0}, user:false, SP:{serviceProviderId:0}}
    }

    else if(action.type==="savepost"){
        return {...state, consumer:{...state.consumer, posts:[...state.consumer.posts, action.newpost]}}
    }

    else if(action.type==="newaddress"){
        return {...state, consumer:{...state.consumer, addresses:[...state.consumer.addresses, action.address]}}
    }

    else if(action.type==="splogin"){
        return {...state, SP:action.sp, user:true}
    }

    return {...state}

}

const store = configureStore({reducer:TCReducer})

export default store;  
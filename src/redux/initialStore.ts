import { IReduxStore } from "./types"


const initialStore: IReduxStore = {
    product:{
         name: '' ,
         category: '' ,
         imageLink: '', 
         descLink: '',
         price: 0,
         index:  0,
         unit: 0,
         status: undefined
    },
    order:{
        productId:'',
        seller: '',
        buyer: '',
        escrow: ''
    },

    products: [],

    owner: '',
    
}


export default initialStore
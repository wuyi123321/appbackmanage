
// initial state
// shape: [{ id, quantity }]
const state = {
    activeItem:{
        a:155,
        b:"ssss"
    }
}

// getters
const getters = {
    getactiveItem:function (state) {
        return state.activeItem
    }
}

// actions
const actions = {
    checkout ({ commit, state }, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
        // empty cart
        commit('setCartItems', { items: [] })
        shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successful'),
            () => {
                commit('setCheckoutStatus', 'failed')
                // rollback to the cart saved before sending the request
                commit('setCartItems', { items: savedCartItems })
            }
        )
    },

    addProductToCart ({ state, commit }, product) {
        commit('setCheckoutStatus', null)
        if (product.inventory > 0) {
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                commit('pushProductToCart', { id: product.id })
            } else {
                commit('incrementItemQuantity', cartItem)
            }
            // remove 1 item from stock
            commit('products/decrementProductInventory', { id: product.id }, { root: true })
        }
    }
}

// mutations
const mutations = {
    setactiveItem:function (state,acitem) {
        state.activeItem = acitem;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

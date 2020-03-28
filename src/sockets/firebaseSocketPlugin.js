import provinceServices from '@/services/provinceServices'

export default function firebaseSocketPlugin (socket) {

    return store => {

        socket.auth.onAuthStateChanged(user => {
            if (user) {
                store.commit('setCurrentUser', user)
                provinceServices.getProvincesOberserve(provinces => store.commit('setProvinces', provinces) )
                provinceServices.getProvincesStatObserve( provincesStat => store.commit('setProvincesStat', provincesStat))
                provinceServices.getCollaboratorsObserve( collaborators => store.commit('setCollaborators', collaborators))
            }
        })

    }
}

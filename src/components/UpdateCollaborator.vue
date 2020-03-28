<template>
    <div>
        <collaborator
                v-for="(collaborator, i) in collaborators"
                :key="i"
                :id="i"
                :collaborator="collaborator"
                @updateCollaborator="updateCollaborator"
        />
        <div>
            <mdb-btn class="float-right" @click="addCollaborator" >Add Colaborador</mdb-btn>
        </div>
    </div>
</template>

<script>
    import { mapState }  from 'vuex'
    import { mdbBtn } from 'mdbvue'
    import Collaborator from './Collaborator'
    import provinceServices from '@/services/provinceServices'

    export default {
        name: "UpdateCollaborator",
        components: {
            Collaborator,
            mdbBtn
        },
        computed: {
            ...mapState(['collaborators'])
        },
        methods: {
            updateCollaborator(collaborator) {
                let index = this.collaborators.findIndex(
                    item => item.id === collaborator.id
                )
                this.collaborators.splice(index, 1, collaborator)
                provinceServices.updateCollaborator(this.collaborators)
            },
            addCollaborator() {
                this.collaborators.push({ links: [{}]})
            }
        }
    }
</script>

<style scoped>

</style>

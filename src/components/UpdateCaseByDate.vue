<template>
    <section>
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <mdb-card>
                    <mdb-card-header>Actualizar casos por fecha</mdb-card-header>
                    <mdb-card-body>
                        <mdb-input v-model.trim="stat.date" label="Date" icon="clock" type="text"/>
                        <mdb-input v-model.trim="stat.infects" label="Infectado" icon="hospital" type="text"/>
                        <mdb-input v-model.trim="stat.deaths" label="Muertes" icon="skull-crossbones" type="text"/>
                        <mdb-input v-model.trim="stat.recoverers" label="Recuperados" icon="walking" type="text"/>
                        <mdb-btn class="float-right" @click="addCase" >{{ addBtnLabel }}</mdb-btn>
                        <mdb-tbl responsive hover>
                            <thead class="blue lighten-4">
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Infectados</th>
                                <th>Muertes</th>
                                <th>Recuperados</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody v-if="provincesStat.stats && provincesStat.stats.length">
                            <tr v-for="(item, i) in  provincesStat.stats" :key="i" >
                                <th scope="row">{{ i + 1}}</th>
                                <td>{{item.date}}</td>
                                <td>{{item.infects}}</td>
                                <td>{{item.deaths}}</td>
                                <td>{{item.recoverers}}</td>
                                <td>
                                    <mdb-btn @click="updateCase(i)" ><mdb-icon icon="edit" /></mdb-btn>
                                    <mdb-btn @click="removeCase(i)" ><mdb-icon icon="trash" /></mdb-btn>
                                </td>
                            </tr>
                            </tbody>
                        </mdb-tbl>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </section>
</template>

<script>
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader, mdbTbl, mdbInput, mdbBtn, mdbIcon } from 'mdbvue'
    import { mapState }  from 'vuex'
    import provinceServices from '@/services/provinceServices'

    export default {
        name: "UpdateCaseByDate",
        data() {
            return {
                stat: {},
                currentIndex: null,
            }
        },
        methods: {
            addCase() {
                if(!this.stat.date) {
                    return
                }
                if(!this.provincesStat.stats) {
                    this.provincesStat.stats = []
                }
                if(this.currentIndex === null) {
                    this.provincesStat.stats.push(this.stat)
                }

                provinceServices.updateProvincesStat(this.provincesStat)
                this.stat = {}
                this.currentIndex = null
            },
            removeCase(index) {
                this.provincesStat.stats.splice(index,1)
                provinceServices.updateProvincesStat(this.provincesStat)
            },
            updateCase(index) {
                this.currentIndex = index
                this.stat = this.provincesStat.stats.find( (stat, i) => index === i)
            }
        },
        computed: {
            ...mapState(['provincesStat']),
            addBtnLabel() {
                return this.currentIndex !== null ? 'Actualizar' : 'Agregar'
            }
        },
        components: {
            mdbRow,
            mdbCol,
            mdbCard,
            mdbCardBody,
            mdbCardHeader,
            mdbTbl,
            mdbInput,
            mdbBtn,
            mdbIcon
        }
    }
</script>

<style scoped>

</style>

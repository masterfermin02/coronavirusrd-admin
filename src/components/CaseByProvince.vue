<template>
    <section>
        <mdb-card class="mb-4">
            <mdb-card-body class="d-sm-flex justify-content-between ">
                <p class="mb-6" >Seleccione la provincia que quiere introducir:</p>
                <select class="browser-default custom-select" v-model="provinceId" >
                    <option
                            v-for="(province, i) in provinces"
                            :key="i"
                            :value="province.id"
                    >{{ province.title }}</option>
                </select>
            </mdb-card-body>
        </mdb-card>
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
                            <tbody v-if="currentProvince && currentProvince.stats && currentProvince.stats.length">
                            <tr v-for="(item, i) in  currentProvince.stats" :key="i" >
                                <th scope="row">{{ i + 1}}</th>
                                <td><mdb-input v-model.trim="item.date" label="Date" type="text"/></td>
                                <td><mdb-input v-model.trim="item.infects" label="Infectados" type="text"/></td>
                                <td><mdb-input v-model.trim="item.deaths" label="Muertos" type="text"/></td>
                                <td><mdb-input v-model.trim="item.recoverers" label="Recuperados" type="text"/></td>
                                <td>
                                    <mdb-btn @click="update" ><mdb-icon icon="edit" /></mdb-btn>
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
    import {
        mdbRow,
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbCardHeader,
        mdbTbl,
        mdbInput,
        mdbBtn,
        mdbIcon
    } from 'mdbvue'
    import { mapState }  from 'vuex'
    import provinceServices from '@/services/provinceServices'

    export default {
        name: "CaseByProvince",
        data() {
            return {
                stat: {}
            }
        },
        methods: {
            addCase() {

                if(!this.stat.date && !this.currentIndex) {
                    return
                }

                if(!this.provinces[this.currentIndex].stats) {
                    this.provinces[this.currentIndex].stats = []
                }

                this.provinces[this.currentIndex].stats.push(this.stat);

                provinceServices.updateProvinces(this.provinces)
                this.stat = {}
                this.currentIndex = null
            },
            removeCase(index) {
                this.provinces[this.currentIndex].stats.splice(index,1);
                provinceServices.updateProvinces(this.provinces);
            },
            update() {
                provinceServices.updateProvinces(this.provinces);
            },
            byId(province) {
                return province.id === this.provinceId;
            }
        },
        computed: {
            ...mapState(['selectProvince', 'provinces']),
            provinceId: {
                get() {
                    return this.selectProvince;
                },
                set (value) {
                    return this.$store.dispatch('setSelectProvince', value);
                }
            },
            currentProvince() {
                return this.provinces.find(this.byId);
            },
            currentIndex() {
                return this.provinces.findIndex(this.byId)
            },
            addBtnLabel() {
                return 'Agregar'
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
 .custom-select {
     width: 70%;
 }
</style>

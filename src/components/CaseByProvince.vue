<template>
    <section>
        <mdb-card class="mb-4">
            <mdb-card-body class="d-sm-flex justify-content-between ">
                <p class="mb-6" >Seleccione la provincia que quiere introducir:</p>
                <select class="browser-default custom-select" v-model="name" >
                    <option
                            v-for="(province, i) in provinces"
                            :key="i"
                            :value="province.name"
                    >{{ province.name }}</option>
                </select>
            </mdb-card-body>
        </mdb-card>
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <mdb-card>
                    <mdb-card-header>Actualizar casos por fecha</mdb-card-header>
                    <mdb-card-body>
                        <mdb-input v-model.trim="stat.date" label="Date" icon="clock" type="text"/>
                        <mdb-input v-model.trim="stat.total_cases" label="Infectado" icon="hospital" type="text"/>
                        <mdb-input v-model.trim="stat.total_deaths" label="Muertes" icon="skull-crossbones" type="text"/>
                        <mdb-input v-model.trim="stat.total_recovered" label="Recuperados" icon="walking" type="text"/>
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
                            <tbody v-if="currentProvince && currentProvince.cases && currentProvince.cases.length">
                            <tr v-for="(item, i) in  currentProvince.cases" :key="i" >
                                <th scope="row">{{ i + 1}}</th>
                                <td><mdb-input v-model.trim="item.date" label="Date" type="text"/></td>
                                <td><mdb-input v-model.trim="item.total_cases" label="Infectados" type="text"/></td>
                                <td><mdb-input v-model.trim="item.total_deaths" label="Muertos" type="text"/></td>
                                <td><mdb-input v-model.trim="item.total_recovered" label="Recuperados" type="text"/></td>
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

                if(!this.provinces[this.currentIndex].cases) {
                    this.provinces[this.currentIndex].cases = []
                }

                this.provinces[this.currentIndex].cases.push(this.stat);

                provinceServices.updateProvincesStat(this.provincesStat);
                this.stat = {
                    date: this.stat.date
                };
                this.currentIndex = null;
            },
            removeCase(index) {
                this.provinces[this.currentIndex].stats.splice(index,1);
                provinceServices.updateProvincesStat(this.provincesStat);
            },
            update() {
                provinceServices.updateProvincesStat(this.provincesStat);
            },
            byName(province) {
                return province.name === this.name;
            }
        },
        computed: {
            ...mapState(['selectProvince', 'provincesStat']),
            name: {
                get() {
                    return this.selectProvince;
                },
                set (value) {
                    return this.$store.dispatch('setSelectProvince', value);
                }
            },
            provinces: {
                get() {
                    if(this.provincesStat.province) {
                        return this.provincesStat.province.provinces;
                    }
                    return [];
                }
            },
            currentProvince() {
                return this.provinces.find(this.byName);
            },
            currentIndex() {
                return this.provinces.findIndex(this.byName)
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

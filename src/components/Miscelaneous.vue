<template>
    <section>
        <mdb-card class="mb-4">
            <mdb-card-body class="d-sm-flex justify-content-between">
                <h4 class="mb-sm-0 pt-2">
                    Actualizar Informaciones Mixtas
                </h4>
            </mdb-card-body>
        </mdb-card>
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <mdb-card>
                    <mdb-card-header>Distribucion de Muertos por Edad</mdb-card-header>
                    <mdb-card-body>
                        <mdb-input v-model.trim="provincesStat.avrgAge" label="Edad Promedio" icon="user-clock" type="text"/>
                        <mdb-input v-model.trim="provincesStat.minAge" label="Edad Minima" icon="user-minus" type="text"/>
                        <mdb-input v-model.trim="provincesStat.maxAge" label="Edad Maxima" icon="user-plus" type="text"/>
                        <mdb-btn class="float-right" @click="updateAgeRange" >Guardar</mdb-btn>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </section>
</template>

<script>
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader, mdbInput, mdbBtn } from 'mdbvue'
    import { mapState }  from 'vuex'
    import provinceServices from '@/services/provinceServices'

    export default {
        name: "Miscelanous",
        methods: {
           updateAgeRange(){
               provinceServices.updateProvincesStat(this.provincesStat); 
           }
        },
        computed: {
            ...mapState(['provincesStat'])
        },
        components: {
            mdbRow,
            mdbCol,
            mdbCard,
            mdbCardBody,
            mdbCardHeader,
            mdbInput,
            mdbBtn,
        }
    }
</script>

<style scoped>

</style>

<template>
  <section id="dashboard">
    <mdb-card class="mb-4">
      <mdb-card-body class="d-sm-flex justify-content-between">
        <h4 class="mb-sm-0 pt-2">
          Introducir estado actual y por provincias.
        </h4>
      </mdb-card-body>
    </mdb-card>
     <section>
      <mdb-row>
          <mdb-col md="12" class="mb-4">
              <mdb-card>
                  <mdb-card-header>Detalle por provincias</mdb-card-header>
                  <mdb-card-body>
                      <mdb-input v-model.trim="provincesStat.cases" label="Infectados" icon="hospital" type="text"/>
                      <mdb-input v-model.trim="provincesStat.discarted" label="Descartados" icon="vials" type="text"/>
                      <mdb-input v-model.trim="provincesStat.recoverers" label="recuperados" icon="walking" type="text"/>
                      <mdb-input v-model.trim="provincesStat.deaths" label="Muertes" icon="skull-crossbones" type="text"/>
                      <mdb-input v-model.trim="provincesStat.male" label="Home por ciento" icon="male"  type="text"/>
                      <mdb-input v-model.trim="provincesStat.female" label="Mujer por ciento" icon="female" type="text"/>
                      <mdb-input v-model.trim="provincesStat.lastUpdate" label="Ultima actualizacion" icon="clock" type="text"/>
                      <mdb-btn class="float-right" @click="updateProvincesStat" >Actualizar</mdb-btn>
                  </mdb-card-body>
              </mdb-card>
          </mdb-col>
      </mdb-row>
    </section>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader, mdbInput, mdbBtn } from 'mdbvue'
import { mapState }  from 'vuex'
import provinceServices from '@/services/provinceServices'

export default {

    name: 'Dashboard',
    components: {
        mdbRow,
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbCardHeader,
        mdbInput,
        mdbBtn
    },
    computed: {
        ...mapState(['provincesStat'])
    },
    methods: {
        updateProvincesStat() {
            provinceServices.updateProvincesStat(this.provincesStat)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

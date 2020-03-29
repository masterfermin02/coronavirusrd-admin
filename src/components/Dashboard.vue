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
                      <mdb-input v-model.trim="provincesStat.investigations" label="Investigacion" icon="vials" type="text"/>
                      <mdb-input v-model.trim="provincesStat.recoverers" label="recuperados" icon="walking" type="text"/>
                      <mdb-input v-model.trim="provincesStat.deaths" label="Muertes" icon="skull-crossbones" type="text"/>
                      <mdb-input v-model.trim="provincesStat.male" label="Home por ciento" icon="male"  type="text"/>
                      <mdb-input v-model.trim="provincesStat.female" label="Mujer por ciento" icon="female" type="text"/>
                      <mdb-input v-model.trim="provincesStat.lastUpdate" label="Ultima actualizacion" icon="clock" type="text"/>
                      <mdb-btn class="float-right" @click="updateProvincesStat" >Actualizar</mdb-btn>
                      <mdb-tbl responsive hover>
                          <thead class="blue lighten-4">
                              <tr>
                                  <th>#</th>
                                  <th>Provincia</th>
                                  <th>Infectados</th>
                                  <th>Muertes</th>
                                  <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody v-if="provinces.length">
                              <tr v-for="(province, i) in provinces" :key="i" >
                                  <th scope="row">{{ i + 1}}</th>
                                  <td><mdb-input v-model.trim="province.title" label="Casos" icon="hospital" type="text"/></td>
                                  <td><mdb-input v-model.trim="province.cases" label="Casos" icon="hospital" type="text"/></td>
                                  <td><mdb-input v-model.trim="province.deaths" label="Muetes" icon="skull-crossbones" type="text"/></td>
                                  <td><mdb-btn @click="updateProvinces" >Actualizar</mdb-btn></td>
                              </tr>
                          </tbody>
                      </mdb-tbl>
                      <mdb-btn @click="updateProvinces" class="float-right">Update provincias</mdb-btn>
                  </mdb-card-body>
              </mdb-card>
          </mdb-col>
      </mdb-row>
    </section>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader, mdbTbl, mdbInput, mdbBtn } from 'mdbvue'
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
        mdbTbl,
        mdbInput,
        mdbBtn
    },
    computed: {
      ...mapState(['provinces', 'provincesStat'])
    },
    methods: {
        updateProvinces() {
            provinceServices.updateProvinces(this.provinces)
        },
        updateProvincesStat() {
            provinceServices.updateProvincesStat(this.provincesStat)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

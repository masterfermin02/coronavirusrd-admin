<template>
  <div class="flexible-content">
     <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <mdb-navbar-brand to="/"
        >COVID19-RD</mdb-navbar-brand
      >
      <mdb-navbar-toggler v-if="currentUser" >
        <mdb-navbar-nav left>
          <mdb-nav-item to="/dashboard" waves-fixed @click.native="active = 1"
            >Inicio</mdb-nav-item
          >
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <mdb-nav-item @click.native="logout"  waves-fixed
            ><mdb-icon icon="sign-out-alt"
          /></mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed">
      <a class="logo-wrapper"
        ><img alt="" class="img-fluid" src="./assets/logo-mdb-vue-small.png"
      /></a>
      <mdb-list-group v-if="currentUser" class="list-group-flush">

        <router-link to="/dashboard" @click.native="activeItem = 1">
          <mdb-list-group-item
            :action="true"
            :class="activeItem === 1 && 'active'"
            >
            <mdb-icon
              icon="chart-pie"
              class="mr-3"
            />
            Estado Actual Nacional
            </mdb-list-group-item>
        </router-link>
        <router-link to="/provinces" @click.native="activeItem = 6">
          <mdb-list-group-item
                  :action="true"
                  :class="activeItem === 6 && 'active'"
          >
            <mdb-icon
                    icon="chart-pie"
                    class="mr-3"
            />
            Estado Actual Por Provincia
          </mdb-list-group-item>
        </router-link>
        <router-link :to="{ name: 'Collaborators'}" @click.native="activeItem = 4">
          <mdb-list-group-item
                  :action="true"
                  :class="activeItem === 4 && 'active'"
          >
            <mdb-icon
                    icon="user-friends"
                    class="mr-3"
            />
            Colaboradores
          </mdb-list-group-item>
        </router-link>
        <router-link :to="{ name: 'stats'}" @click.native="activeItem = 5">
          <mdb-list-group-item
                  :action="true"
                  :class="activeItem === 5 && 'active'"
          >
            <mdb-icon
                    icon="chart-line"
                    class="mr-3"
            />
            Evolucion de casos Nacionales
          </mdb-list-group-item>
        </router-link>
        <router-link :to="{ name: 'Miscelaneous'}" @click.native="activeItem = 3">
          <mdb-list-group-item
                  :action="true"
                  :class="activeItem === 3 && 'active'"
          >
            <mdb-icon
                    icon="columns"
                    class="mr-3"
            />
            Miscelanous
          </mdb-list-group-item>
        </router-link>
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div class="mt-5 p-5">
        <router-view></router-view>
      </div>
      <ftr color="primary-color-dark" class="text-center font-small darken-2">

        <div class="pt-4">
          <p>Este es un proyecto Open Source y sin fines de lucro, puedes colaborar aqui:</p>
          <mdb-btn
            outline="white"
            tag="a"
            href="https://github.com/masterfermin02/coronavirusrd"
            target="_blank"
            >Repositorio <mdb-icon fab icon="github" class="ml-2"
          /></mdb-btn>
          <mdb-btn
            outline="white"
            tag="a"
            href="https://trello.com/b/57BtTWlZ"
            target="_blank"
            >Pizarra <mdb-icon icon="chalkboard" class="ml-2"
          /></mdb-btn>
        </div>
        <hr>
        <p class="footer-copyright mb-0 py-3 text-center">

         Creadores:
          <a href="https://github.com/masterfermin02"> Fermin Perdomo </a> y
          <a href="https://github.com/aneudyx"> Aneudy Caceres </a>
        </p>
      </ftr>
    </main>
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbBtn,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  mdbFooter,
  waves
} from "mdbvue";
import { mapState } from 'vuex'
const fb = require('@/firebaseConfig.js')

export default {
  name: "AdminTemplate",
  components: {
     mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn,
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon,
    ftr: mdbFooter
  },
  data() {
    return {
      activeItem: 1,
      err: null
    };
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/#login')
      }).catch(err => {
        this.err = err
      })
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeMount() {
    if (this.$route.matched[0]) {
      this.activeItem = this.$route.matched[0].props.default.page;
    }
  },
  mixins: [waves]
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>

<style scoped>
main {
  background-color: #ededee;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 1.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>

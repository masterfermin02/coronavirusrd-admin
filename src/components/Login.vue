<template>
    <section class="container">
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <transition name="fade">
                    <div v-if="performingRequest" class="loading">
                        <p>Loading...</p>
                    </div>
                </transition>
                <!-- Card -->
                <mdb-card>
                    <mdb-card-body>
                    <!-- Material form login -->
                    <form>
                        <p class="h4 text-center mb-4">Sign in</p>
                        <div class="grey-text">
                            <mdb-input v-model.trim="loginForm.email" label="Your email" icon="envelope" type="email"/>
                            <mdb-input v-model.trim="loginForm.password" label="Your password" icon="lock" type="password"/>
                        </div>
                        <div class="text-center">
                            <mdb-btn @click="login" >Login</mdb-btn>
                        </div>
                    </form>
                    <!-- Material form login -->
                    </mdb-card-body>
                </mdb-card>
                <!-- Card -->
                <transition name="fade">
                    <mdb-alert v-if="errorMsg !== ''" color="danger">
                        <p>{{ errorMsg }}</p>
                    </mdb-alert>
                </transition>
            </mdb-col>
        </mdb-row>
    </section>
</template>

<script>
    import { mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbRow, mdbCol, mdbAlert  } from 'mdbvue';
    const fb = require('@/firebaseConfig.js')

    export default {
        name: "Login",
        components: {
            mdbInput,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            mdbRow,
            mdbCol,
            mdbAlert
        },
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                errorMsg: '',
                performingRequest: false,
                errorCode: ''
            }
        },
        methods: {
            login() {
                this.performingRequest = true
                fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
                    this.$store.commit('setCurrentUser', user)
                    this.performingRequest = false
                    this.$router.push('/dashboard')
                }).catch(err => {
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            },
            loginWithGoogle() {
                fb.auth.signInWithPopup(fb.googleAuthProvider).then(result => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    // The signed-in user info.
                    this.$store.commit('setCurrentUser', result.user)
                    this.$store.commit('setToken', result.credential.accessToken)
                    this.$router.push('/dashboard')

                }).catch( error => {
                    // Handle Errors here.
                    console.log(error)
                    this.errorCode = error.code;
                    this.errorMsg = error.message;
                    // The email of the user's account used.
                    this.email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    this.credential = error.credential;
                })
            }
        }

    }
</script>

<style scoped>

</style>

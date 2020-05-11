<template>

    <section>
        <mdb-card class="mb-4">
            <mdb-card-body class="d-sm-flex justify-content-between">
                <h4 class="mb-sm-0 pt-2">
                    Lista de articulos
                </h4>
            </mdb-card-body>
        </mdb-card>
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <mdb-card>
                    <mdb-card-header>
                        Articulos <mdb-btn @click="create" color="info" size="md" class="waves-ligh float-right ">Add</mdb-btn>
                    </mdb-card-header>
                    <mdb-card-body v-if="posts.length" >
                        <mdb-row v-for="(post, i) in posts"
                                 :key="i"
                                 :id="i"
                        >
                            <mdb-col lg="5">
                                <mdb-view class="rounded z-depth-2 mb-lg-0 mb-4" hover>
                                    <img class="img-fluid" :src="post.imgUrl" :alt="post.title" />
                                    <a>
                                        <mdb-mask overlay="white-slight" waves/>
                                    </a>
                                </mdb-view>
                            </mdb-col>
                            <mdb-col lg="7">
                                <h3 class="font-weight-bold mb-3 p-0">
                                    <strong>{{post.title}}</strong>
                                </h3>
                                <p>
                                    <span v-html="truncateString(post.content)"></span>
                                </p>
                                <p>
                                    <img class="preview" >
                                </p>
                                <p>by
                                    <a>
                                        <strong>Author</strong>
                                    </a>, {{ post.date.seconds | formatDate }}</p>
                                <mdb-btn @click="editPost(post)" color="info" size="md" class="waves-light ">Edit</mdb-btn>
                                <mdb-btn color="danger" size="md" class="waves-light ">Delete</mdb-btn>
                            </mdb-col>
                            <hr class="my-5" />
                        </mdb-row>
                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </section>
</template>

<script>
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader, mdbBtn, mdbView, mdbMask } from 'mdbvue'
    const moment = require('moment');
    const fb = require('@/firebaseConfig.js');
    moment.locale('es-do');
    export default {
        name: "PostList",
        components: {
            mdbRow,
            mdbCol,
            mdbCard,
            mdbCardBody,
            mdbCardHeader,
            mdbBtn,
            mdbView,
            mdbMask
        },
        computed: {

        },
        methods: {
            truncateString (v) {
                if (!v) return '';
                return v.slice(0, 80);
            },
            create() {
                this.$router.push('/posts/create');
            },
            editPost(post) {
                this.setKey(post.key);
                this.setTitle(post.title);
                this.setContent(post.content);
                this.setDate(post.date);
                this.setWriter(post.writer);
                this.setImgUrl(post.imgUrl);
                this.$router.push({ name: 'postCreate', params: { key: post.key } })
            }
        },
        created() {
           fb.posts
               .where('show', '==', true)
               .get()
               .then( docs => {
                   docs.forEach( doc => this.posts.push(doc.data()));
               });
        },
        data() {
            return {
                posts: []
            }
        },
        filters: {
            formatDate: function (value) {
                if (!value) return ''
                return moment(value).format('LLL')
            }
        }
    }
</script>

<style scoped>
    img.preview {
        width: 200px;
    }
</style>

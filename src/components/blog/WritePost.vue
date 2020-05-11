<template>

    <section>
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <mdb-card>
                    <mdb-card-header>Arcticulo</mdb-card-header>
                    <mdb-card-body>
                        <mdb-input v-model.trim="title"  label="Titulo" type="text"/>
                        <mdb-input
                                type="textarea"
                                outline
                                inputClass="z-depth-1 p-3"
                                v-model.trim="content"
                                placeholder="shadow textarea"
                        />
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupFileAddon01">Upload an image</span>
                            </div>
                            <div class="custom-file">
                                <input type="file" @change="previewImage" accept="image/*" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                            </div>
                        </div>
                        <div>
                            <p>Progress: {{uploadValue.toFixed()+"%"}}
                                <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                        </div>
                        <img class="preview" :src="imgUrl">
                        <div v-if="imageData!=null">
                            <mdb-btn  @click="onUpload" >Upload</mdb-btn>
                        </div>
                        <hr />
                        <div>
                            Autor : {{ getUser.displayName }}
                        </div>
                        <div>
                            <mdb-btn class="float-right" @click="updatePost" >Actualizar</mdb-btn>
                        </div>

                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </section>
</template>

<script>
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader, mdbInput, mdbBtn } from 'mdbvue'
    import { mapGetters, mapMutations } from 'vuex'
    import * as types from '@/vuex/blog/mutation_types'
    const fb = require('@/firebaseConfig.js');
    const folder = fb.postImageStore;
    let storageRef = null;

    export default {
        name: "WritePost",
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
            ...mapGetters(['getKey', 'getTitle', 'getContent', 'getImgUrl', 'getWriter', 'getUser']),
            title: {
                get () {
                    return this.getTitle
                },
                set (value) {
                    this.updateTitle(value)
                }
            },
            content: {
                get () {
                    return this.getContent
                },
                set (value) {
                    this.updateContent(value)
                }
            },
            key: {
                get () {
                    return this.getKey;
                },
                set (value) {
                    this.updateKey(value);
                }
            },
            imgUrl: {
                get () {
                    return this.getImgUrl
                },
                set (value) {
                    this.setImgUrl(value);
                }

            },
            imageName() {
              return this.key + '-' + this.imageData.name
            }
        },
        methods: {
            ...mapMutations({
                updateTitle: types.SET_TITLE,
                updateContent: types.SET_CONTENT,
                updateKey: types.SET_KEY,
                initArticleData: types.INIT_ARTICLE_DATA,
                setDate: types.SET_DATE,
                setWriter: types.SET_WRITER,
                setImgUrl: types.SET_IMG_URL
            }),
            previewImage(event) {
                this.uploadValue=0;
                this.imageData = event.target.files[0];
            },
            onUpload(){
                storageRef = folder.child(`${this.imageName}`).put(this.imageData);
                storageRef.on(`state_changed`,snapshot=>{
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, error=>{console.log(error.message)},
                    ()=>{this.uploadValue=100;
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.imgUrl = url;
                        });
                    }
                );
            },
            updatePost() {
                !this.updating
                    ? this.addPost()
                    : fb
                        .posts.doc(this.key).set({
                            title: this.title,
                            content: this.content,
                            slug: this.title.toLowerCase()
                                .replace(/ /g,'-')
                                .replace(/[^\w-]+/g,''),
                            date: {
                                seconds: new Date().getTime(),
                                nanoseconds: 0
                            },
                            userId: this.getUser.uid,
                            imgUrl: this.imgUrl || this.getImgUrl,
                            show: true
                        })
                        .then(() => this.$router.push('/posts'))
                        .catch((error) => {
                            console.error(`Error adding document: ${error}`)
                        })
            },
            addPost() {
                fb
                    .posts.add({
                    title: this.title,
                    content: this.content,
                    slug: this.title.toLowerCase()
                        .replace(/ /g,'-')
                        .replace(/[^\w-]+/g,''),
                    date: {
                        seconds: new Date().getTime(),
                        nanoseconds: 0
                    },
                    userId: this.getUser.uid,
                    imgUrl: this.imgUrl || this.getImgUrl,
                    show: true
                })
                    .then(() => this.$router.push('/posts'))
                    .catch((error) => {
                        console.error(`Error adding document: ${error}`)
                    });
            },
            getPost () {
                fb
                    .posts
                    .doc(this.$route.params.key)
                    .get()
                    .then(doc => {
                        let post = doc.data();
                        this.setKey(this.$route.params.key);
                        this.setTitle(post.title);
                        this.setContent(post.content);
                        this.setDate(post.date.seconds);
                        this.setWriter(post.writer);
                        this.setImgUrl(post.imgUrl);
                        this.updating = true;
                    })
                    .catch(error => {
                        console.error(`getPost error: ${error}`)
                    })
            },
            getNewPost() {
                this.initArticleData();
                this.key = new Date().getTime().toString();
                this.updating = false
            }
        },
        data() {
            return {
                imageData: null,
                uploadValue: 0,
                oldImgUrl: '',
                updating: false
            }
        },
        created () {
            this.$route.params.key
                ? this.getPost()
                : this.getNewPost();

        }
    }
</script>

<style scoped>
    img.preview {
        width: 200px;
    }
</style>

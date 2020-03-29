<template>
    
    <section>
        <mdb-card class="mb-4">
            <mdb-card-body class="d-sm-flex justify-content-between">
                <h4 class="mb-sm-0 pt-2">
                    Agregar colaboradores
                </h4>
            </mdb-card-body>
        </mdb-card>
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <mdb-card>
                    <mdb-card-header>Update colaboradores</mdb-card-header>
                    <mdb-card-body>
                        <mdb-input v-model.trim="collaborator.name"  label="Nombre" type="text"/>
                        <mdb-input v-model.trim="collaborator.role"  label="Role" type="text"/>
                        <mdb-input v-model.trim="collaborator.description"  label="description" type="textarea" />
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
                        <img class="preview" :src="picture">
                        <div v-if="imageData!=null">
                            <mdb-btn  @click="onUpload" >Upload</mdb-btn>
                        </div>
                        <div>Redes sociales:</div>
                        <div v-for="(link, i) in collaborator.links" :key="i" >
                            <mdb-input v-model.trim="link.name" label="name" type="text" />
                            <mdb-input v-model.trim="link.icon" label="icon" type="text" />
                            <mdb-input v-model.trim="link.url" label="url" type="text" />
                        </div>
                        <div>
                            <mdb-btn class="float-right" @click="collaborator.links.push({})" >Agregar red</mdb-btn>
                        </div>
                        <div class="clearfix"></div>
                        <hr />
                        <div>
                            <mdb-btn class="float-right" @click="updateCollaborator" >Actualizar</mdb-btn>
                        </div>

                    </mdb-card-body>
                </mdb-card>
            </mdb-col>
        </mdb-row>
    </section>
</template>

<script>
    import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader, mdbInput, mdbBtn } from 'mdbvue'
    const fb = require('@/firebaseConfig.js')
    const folder = fb.collaboratorImageStore
    let storageRef = null
    export default {
        name: "Collaborator",
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
          imageName() {
              return this.id + '-' + this.imageData.name
          }
        },
        methods: {
            previewImage(event) {
                this.uploadValue=0;
                this.picture=null;
                this.imageData = event.target.files[0];
            },
            onUpload(){
                this.picture=null;
                storageRef = folder.child(`${this.imageName}`).put(this.imageData);
                storageRef.on(`state_changed`,snapshot=>{
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, error=>{console.log(error.message)},
                    ()=>{this.uploadValue=100;
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.picture =url;
                        });
                    }
                );
            },
            updateCollaborator() {
                this.collaborator.links = this.collaborator.links.filter(link => link.name)
                if(this.imageData) {
                    this.collaborator.picture = this.imageName
                }
                this.collaborator.id = this.id

                this.$emit('updateCollaborator',this.collaborator)
            }
        },
        props: ['id', 'collaborator'],
        data() {
            return {
                imageData: null,
                picture: null,
                uploadValue: 0
            }
        },
        mounted() {
            if(this.collaborator.picture) {
                storageRef = folder.child(`${this.collaborator.picture}`)
                storageRef.getDownloadURL().then((url)=>{
                    this.picture =url;
                }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>
    img.preview {
        width: 200px;
    }
</style>

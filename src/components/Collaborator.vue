<template>

    <section>
        <mdb-row>
            <mdb-col md="12" class="mb-4">
                <mdb-card>
                    <mdb-card-header>Colaborador: {{collaborator.name}}</mdb-card-header>
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
                        <img class="preview" :src="pictureUrl">
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
          },
            pictureUrl: {
              get() {
                  return this.collaborator.pictureUrl;
              },
                set(val) {
                    this.imageUrl = val;
                }
            }
        },
        methods: {
            previewImage(event) {
                this.uploadValue = 0;
                this.pictureUrl = null;
                this.imageData = event.target.files[0];
            },
            onUpload(){
                this.pictureUrl=null;
                storageRef = folder.child(`${this.imageName}`).put(this.imageData);
                storageRef.on(`state_changed`,snapshot=>{
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, error=>{console.log(error.message)},
                    ()=>{this.uploadValue=100;
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.pictureUrl = url;
                            this.updateCollaborator();
                            this.imageData = null;
                        });
                    }
                );
            },
            updateCollaborator() {
                this.$emit('updateCollaborator', {
                    id: this.id,
                    name: this.collaborator.name,
                    role: this.collaborator.role,
                    description: this.collaborator.description,
                    links: this.collaborator.links,
                    pictureUrl: this.imageUrl,
                });
            }
        },
        props: ['id', 'collaborator'],
        data() {
            return {
                imageData: null,
                uploadValue: 0,
                imageUrl: ''
            }
        }
    }
</script>

<style scoped>
    img.preview {
        width: 200px;
    }
</style>

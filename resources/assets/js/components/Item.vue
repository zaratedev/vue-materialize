<template>
    <div class="container">
        <div class="card-panel blue lighten-3">CRUD Laravel - Vue 2 using Materialize CSS</div>
        
        <div class="row">

            <div v-for="item in items" class="col s12 m4 l4 xl4">
                <div class="card">
                    <div class="card-image">
                        <img src="img/fondo.jpg">
                        <span class="card-title">{{ item.title }}</span>
                        
                    </div>
                    <div class="card-action no-padding">
                        <div class="fixed-action-btn horizontal btn-move-up" >
                            <a class="btn-floating btn-large red">
                                <i class="fa fa-pencil"></i>
                            </a>
                            <ul>
                                <li>
                                   <button class="btn-floating blue" @click.prevent="editItem( item )"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
                                </li>
                                <li>
                                  <button class="btn-floating red" @click.prevent="deleteItem( item )"><i class="fa fa-trash-o" aria-hidden="true"></i></button>  
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-content">
                        <p>
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="floating">
                <a class="btn-floating btn-large waves-effect waves-light pink modal-trigger" href="#create-item"><i class="fa fa-plus" aria-hidden="true"></i></a>
            </div>
            
            <!-- Create item -->
          <div id="create-item" class="modal">
            <form class="col s12" method="post" enctype="multipart/form-data" @submit.prevent="createItem">
            <div class="modal-content">
              <h4>Create item</h4>
              <div class="row">
                  
                        <div class="input-field col s12">
                            <input id="title" type="text" class="validate" v-model="newItem.title">
                            <label for="title">Title</label>
                        </div>
                        <div class="input-field col s12">
                          <textarea id="description" class="materialize-textarea" v-model="newItem.description"></textarea>
                          <label for="description">Description</label>
                        </div>
                    
              </div>
              
            </div>
            <div class="modal-footer">
                <button type="submit" class="modal-action modal-close waves-effect waves-green btn"> Save</button>
            </div>
            </form>
            
          </div>
        
        <!-- Edit item -->
          <div id="edit-item" class="modal">
            <form class="col s12" method="post" enctype="multipart/form-data" @submit.prevent="updateItem( fillItem.id )">
            <div class="modal-content">
              <h4>Edit item</h4>
              <div class="row">
                  
                        <div class="input-field col s12">
                            <input id="title" type="text" class="validate" v-model="fillItem.title">
                            <label for="title">Title</label>
                        </div>
                        <div class="input-field col s12">
                          <textarea id="description" class="materialize-textarea" v-model="fillItem.description"></textarea>
                          <label for="description">Description</label>
                        </div>
                    
              </div>
              
            </div>
            <div class="modal-footer">
                <button type="submit" class="modal-action modal-close waves-effect waves-green btn"> Save</button>
            </div>
            </form>
            
          </div>

        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.getItems();
        },
        data: () => ({
            items: [],
            newItem: { 'title': '', 'description': ''},
            fillItem: { 'title': '', 'description': '', 'id': ''}
        }),
        methods: {
            getItems() {
                axios.get( 'vue-items' ).then( response => {
                    let answer = response.data;
                    this.items = answer.items;
                })
            },
            createItem() {
                let input = this.newItem;

                axios.post('vue-items', input).then( (response) => {

                    this.items.push(response.data);
                    this.newItem = {'title': '', 'description': ''};
                    $('#create-item').modal('close');
                    Materialize.toast('Item created!', 3000, 'rounded');
                }).catch( (error) => {
                    console.log( error.response.data )
                })
            },
            editItem( item ) {
                let edit = this.fillItem;

                edit.title = item.title;
                edit.description = item.description;
                edit.id = item.id;

                $('#edit-item').modal('open');
                
            },
            updateItem( id ){
                let input = this.fillItem;

                axios.put('vue-items/' + id, input).then( (response)=> {

                    this.getItems();
                    this.fillItem = {'title': '', 'description': '', 'id': ''};
                    $('#edit-item').modal('close');
                    Materialize.toast('Item updated!', 3000, 'rounded');

                }).catch( (error)=> {
                    console.log( error.response.data )
                })
            },
            deleteItem( item ) {
                axios.delete('vue-items/' + item.id).then( (response) => {
                    this.getItems();
                    Materialize.toast('Item removed!', 3000, 'rounded');
                });
            }
        }
    }
</script>
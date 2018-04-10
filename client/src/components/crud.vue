<template>
    <div id="crudeTable">
      <div v-if="isData">
        <table v-if="tHeader" class="table-striped">
        <thead>
          <tr>
            <th v-for="header in tHeader" :key="header" scope="col">{{header}}</th>
            <th class="bg-info" v-if="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tBody" :key="row.id">
            <td v-for="(item, index) in row" :key="item" :data-label="index">{{item}}</td>
            <td data-label="Action" v-if="actions">
              <button class="btn btn-info" @click="actionPressed('view', row)"><i class="fa fa-eye"></i></button>                  
              <button class="btn btn-warning" @click="actionPressed('edit', row)"><i class="fa fa-edit"></i></button>
              <button class="btn btn-danger" @click="actionPressed('delete', row)"><i class="fa fa-times"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      </div> 
      <div v-else class="">
        <h1 class="text-center text-warning bg-dark">No More Data Available</h1>
      </div>      
    </div>
</template>
<script>


export default {
  name:'crudeTable',
  props:['headers', 'data', 'exclude', 'actions', 'changes', 'order'],
  data(){
    return{
      tHeader:[],
      tBody:[],
      isData: true,
      act: {
        view: false,
        edit: false,
        delete: false,
      }
    }
  },
  methods:{
    
    getHeader(data){
        return Object.keys(data[0])
    },
    propName(element){
      return 'Hello'
    },
    actionPressed(action, row){
      console.log('done')
    }
  },
  created(){
    if (this.data) {
    //Exclude Columns
    let data = this.data
    let propRow = 0
  if (this.exclude != undefined) {
    //Going through the data object
    data.forEach(function(row) {
      //iterating through each row 
      // note* we increment the propRow after row has done a loop
      for( let col in row){
        this.exclude.forEach(function(exclude){
          if (exclude == col) {
            //Note This is a really slow but the proper way to do it 
              delete data[propRow][col]

              //The Faster way but recommended for performanace and leaves it undefined :>
              //data[propRow][col] = undefined
          }
        })
      }
      propRow++
    }, this);

    propRow = 0
  }
  
    //Its Alive!!!
    //Use it as a computed property and return the data
    console.log(data)
    

    //Apply Name Changes
    //
    var changes = this.changes
    if(changes != undefined){
        var changeKeys = Object.keys(changes)
    
    //Iterating through the data
    data.forEach(function(row) {
    
      //Getting each column from the row
      for (var col in row) {
        changeKeys.forEach(function(change) {
          if (col == change) {
            data[propRow][changes[change]] = data[propRow][change]
            delete data[propRow][change]
          }
        });
        /* var count = 0
        for( var change in changes){
          if(col == change){
            //console.log(data[propRow][col] = )

          }
        } */
      }propRow++
    }, this)

    }
    
    //Add Order By  
    console.log(data)
    this.tBody = data


    //Final checks
    //Setting the headers
    if (!this.tHeader[0]) {
      this.tHeader = Object.keys(data[0])
        console.log(this.tHeader)
    }

    if (this.actions != undefined) {
      this.actions.forEach(function (perm) {
        switch (perm) {
          case 'view': this.act.view = true
            break;
          case 'edit': this.act.edit = true
            break;
          case 'delete': this.act.delete = true
            break;
          default:
            break;
        }
      },this)

      
      
    }
    //getting actions
    }else{
      this.isData = false
    }
    
  }
}
</script>
<style scoped>
  table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}
table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}
table tr {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}
table th,
table td {
  padding: .625em;
  text-align: center;
  min-height: 35px
}
table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
  background: #00bcd4;
  color: #fff;
}
@media screen and (max-width: 1024px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  table td:before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}
</style>

src="https://cdn.jsdelivr.net/npm/vue"

Vue.component('search_item', {
    props:["[item"],
    template: '<h2>{{item}}</h2>'
})


var alacena= new Vue({
    el: '#alacena',
    data: {
        niveles: [],
        tipo_productos: [],
        productos: [],
        productos_filtered:[],
        url_niveles: './dataset/nivel.json',
        url_productos: './dataset/productos.json',
        url_tipo_productos: './dataset/tipos_producto.json',
        search:"",
        Texto:[
            {
                id:1,
                product:'Peperoni'

            },
            {
                id:2,
                product:'Papaya'

            },
            
            {
                id:1,
                product:'Carne'

            },
            {
                id:1,
                product:'pollo'

            }
        ]
    },
        methods: {
            cargar_dataset: function () {
                let self = this;
                axios.get(self.url_niveles)
                    .then(function (response) {
                        console.log(response);
                        self.niveles = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios.get(self.url_tipo_productos)
                    .then(function (response) {
                        console.log(response);
                        self.tipo_productos = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    axios.get(self.url_productos)
                        .then(function (response) {
                            console.log(response);
                            self.productos = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    
            },
            validate_search:function(){
                //obtengo el string busueda
                let string_validation=this.search;
                //valido con la expresion regular
                validation=/\W/g;
                let new_str= string_validation.replace(validation, "");
                console.log("PROBANDO VALIDACION"+new_str);
                return new_str;

            }
        },
        computed:{
            filtered_products(){
                //Declare variable to evaluate computer property
                
                let product_search=this.validate_search();
                let lista_productos=this.productos 
                // Creating regular expression and ignoring Caps or Mins
                let item_val=new RegExp(product_search,"i");
                //  Validate field if is "".
                if(product_search==""){
                    return lista_productos;

                }
                else{
                    //Use filter function to return a modified array
                    return lista_productos.filter(function (filter_productos) {
                        if(item_val.test(filter_productos.nombre)==true){
                            return filter_productos.nombre;
                        }
                    });
                }  
            }

        },
        mounted(){
            this.cargar_dataset()
        }
    
});

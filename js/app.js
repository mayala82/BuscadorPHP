 $(document).ready(function(){
     $('select').material_select();
     var buscador = { 
         Init: function(){
             this.inicializarListas()           
             this.mostrarDatos()
             $('#formulario').submit(function(event){
                 event.preventDefault()                
             })                            
         },
         /*-------------------------------------------------------------------------------*/
         mostrarDatos: function(){
             $("#mostrarTodos").on('click', (e)=>{
                 obtenerDatos(1)
             })
             $("#submitButton").on('click', (e)=>{
                 obtenerDatos(2)
             })              
         },
         /*-------------------------------------------------------------------------------*/
         inicializarListas: function(){                          
             $.ajax({url : "./php/inicializarListas.php",
                 success : function (data){                              
                     $.each(JSON.parse(data).ciudades, function(i,item){
                         $("#selectCiudad").append(
                               '<option>' + item + '</option>'
                         )               
                     })
                     $.each(JSON.parse(data).tipos, function(i,item){
                         $("#selectTipo").append(
                             '<option>' + item + '</option>'
                         )
                     })
                     $('select').material_select();
                 }
             })             
         }
         /*-------------------------------------------------------------------------------*/
     }
     buscador.Init();
     /*-------------------------------------------------------------------------------*/
     function obtenerDatos(tipoConsulta){
         var ciudad = $('form').find('select[id="selectCiudad"]').val()         
         var tipo = $('form').find('select[id="selectTipo"]').val()
         var precioInicial = parseInt($('.irs-from').text().trim().replace( /[\s$]+/g, '' ))
         var precioFinal = parseInt($('.irs-to').text().trim().replace( /[\s$]+/g, '' ))
         console.log("Ciudad: " + ciudad + ". Tipo: " + tipo)         
         console.log("Precio inicial: " + precioInicial + " PrecioFinal: " + precioFinal);
         $.ajax({url : "./php/obtenerDatos.php",                 
             dataType: "text",
             success : function (data){
                 var obj = jQuery.parseJSON(data)                   
                 if(tipoConsulta == 2){
                     obj=obj.filter(function(item){
                         if(ciudad != null && tipo != null){
                             return item.Ciudad == ciudad &&
                             item.Tipo == tipo &&
                             parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) >= precioInicial && 
                             parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) <= precioFinal //Quita las comas,los espacios y los signos de pesos de una cadena de caracteres: parseInt(("$30,600").trim().replace( /[\s$,]+/g, '' ) )
                         }
                         if(ciudad == null && tipo == null){
                            return parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) >= precioInicial && 
                            parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) <= precioFinal //Quita las comas,los espacios y los signos de pesos de una cadena de caracteres: parseInt(("$30,600").trim().replace( /[\s$,]+/g, '' ) )
                        }                         
                         if(ciudad != null && tipo == null){
                             return item.Ciudad == ciudad &&
                             parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) >= precioInicial && 
                             parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) <= precioFinal //Quita las comas,los espacios y los signos de pesos de una cadena de caracteres: parseInt(("$30,600").trim().replace( /[\s$,]+/g, '' ) )
                         } 
                         if(ciudad == null && tipo != null){
                             return item.Tipo == tipo &&
                             parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) >= precioInicial && 
                             parseInt((item.Precio).trim().replace( /[\s$,]+/g, '')) <= precioFinal //Quita las comas,los espacios y los signos de pesos de una cadena de caracteres: parseInt(("$30,600").trim().replace( /[\s$,]+/g, '' ) )
                         }                                                         
                     })
                 }
                 $(".contenido_res").empty()
                 obj.forEach(function(item, index) {                         
                     var divTemplete = '<div class="contenido_res"> '+
                                     '	   <div class="card horizontal itemMostrado"> '+
                                     '			 <div class="card-image" > '+
                                     '			    <img src="img/home.jpg"> '+
                                     '			 </div> '+
                                     '			 <div class="card-stacked"> '+
                                     '			   <div class="card-content"> '+                    
                                     '					<p><strong>Dirección: </strong>:direccion</p> '+
                                     '					<p><strong>Ciudad: </strong>:ciudad</p> '+
                                     '					<p><strong>Teléfono: </strong>:telefono</p> '+
                                     '					<p><strong>Código postal: </strong>:codigoPostal</p> '+
                                     '					<p><strong>Tipo: </strong>:tipo</p> '+
                                     ' 				    <p><strong>Precio: </strong><span class="precioTexto">:precio</p></span> '+
                                     '			   </div> '+
                                     '		       <div class="card-action"> '+
                                     '					<a href="#">VER MAS</a>'+
                                     '			   </div> '+
                                     '			 </div> '+
                                     ' 	</div> '+
                                     '</div>'
                     divTemplete = divTemplete.replace(':direccion',item.Direccion)
                                             .replace(':ciudad',item.Ciudad)
                                             .replace(':telefono',item.Telefono)
                                             .replace(':codigoPostal',item.Codigo_Postal)
                                             .replace(':tipo',item.Tipo)
                                             .replace(':precio',item.Precio)
                     $('.colContenido').append(divTemplete)   
                })
            }
         })
     }     
 })
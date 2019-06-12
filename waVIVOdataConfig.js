(function() {
/******************************DIGITAL ANALYTICS VIVO***********************************
******************************Tracker de componentes AEM********************************
***********************************Version: 0.1*****************************************/

  var isMobile = {{isMobile}};

  // init
  var WAVIVOdataConfig = function(){
    this.init();
  }

  // @name: sanitizeData 
  // @function description: padroniza valores das propriedades
  // @params: value = valor que o objeto deverá receber. obrigatorio.
  // @return: array.
  WAVIVOdataConfig.prototype.sanitizeData = function( obj ){
    var rtn_data = obj;
    if( rtn_data.hasOwnProperty('links') ){
      rtn_data.links = ( rtn_data.links.typeof === 'array' ) ? rtn_data.links : [].push(rtn_data.links);
    }
    return rtn_data;
  }

  // @name: getComponentsValues
  // @function description: coleta dados do componente
  // @return: objeto de componente
  WAVIVOdataConfig.prototype.getComponentsValues = function(){
    var rtn_data = {};
    try{
      if(!!window.dataLayer){
        rtn_data = window.dataLayer[window.dataLayer.length-1];
        rtn_data = this.sanitizeData(rtn_data);
      }
    }catch(err){
      //console.log(err);
    };
    return rtn_data;
  }

  // @name: setDataComponents
  // @function description: atualiza valor do objeto components do dataLayer
  // @params: obj = componente que deverá ser incluso na array components. Obrigatório.
  // @params: dl_com = objeto do dataLayer que retorna components. Opcional.
  // @return: push de objeto com array de componentes no dataLayer
  WAVIVOdataConfig.prototype.setDataComponents = function( obj, dl_comp ){
    var rtn_data = obj,
        dl_components = dl_comp,
        temp = {'components': false};
    dl_components = (!dl_components) ? [] : dl_components;
    dl_components = (dl_components.length < 1 || !dl_components.length ) ? [] : dl_components;
    try{
      dl_components.push(rtn_data);
    }catch(err){
      dl_components = [];
      dl_components.push(rtn_data);
    }
    temp.components = dl_components;
    rtn_data = temp;
    window.dataLayer.push(rtn_data);
  }

  // @name: setDataForm 
  // @function description: atualiza objeto components.forms no dataLayer
  // @params: value = valor que o objeto deverá receber. Opcional.
  // @return: array de objetos  
  WAVIVOdataConfig.prototype.setDataForm = function( obj ){
    var rtn_data = obj,
        dl_components = {{dataLayer.components.forms}};
    dl_components = (!dl_components) ? [] : dl_components;
    dl_components.push(rtn_data);
    var temp = {'forms': []};
    rtn_data = temp.forms.push(rtn_data);
    return window.dataLayer.push(rtn_data);
  }

  // @name: init 
  // @function description: indicar que library está pronta para utilização
  // @return: push de evento no dataLayer
  WAVIVOdataConfig.prototype.init = function(){
    dataLayer.push({'event':'waVIVOdataConfig_load'});
  }

  window.waVIVOdataConfig = new WAVIVOdataConfig();
}());
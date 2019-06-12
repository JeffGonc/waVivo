# waVIVOdataConfig Documentation
Thats a complete doc for use the waVIVOdataConfig, a library to setup Digital Analytics to Vivo sites with Adobe Experience Manager platform and Google Tag Manager.

## Description
waVIVOdataConfig is a complete library to setup all components views on AEM platform. This library have too many functions to favour your Digital Analytics day hour and translate the dataLayer of all components visualizations.

## How to implement:
waVIVOdataConfig need to be implement on a Google Tag Manager container that access a AEM site.
In your Google Tag Manager create a new tag HTML with all code below and setup this tag to run in all pages of your site.

```html
<script>
 //copy and paste waVIVOdataConfig here
</script>
```
Setup your tag to run in all pages.

This library work by itself, you just need to implement a simple code in a diferent tag on the GTM container in set up to hit in all custom events "view".

```html
<script>
if( !!waVIVOdataConfig ){
  var componente;
  try{
    componente = waVIVOdataConfig.getComponentsValues();
    waVIVOdataConfig.setDataComponents( componente, {{dataLayer.components}} );
  }catch(err){
    console.log('waVIVOdataConfig is not ready', err);
  }
}
</script>
```

Make sure that you setup at least two variables on your GTM container:
### {{isMobile}}
This variable need to return true if your page is or note a Mobile page. You can return a dataLayer value or implement a custom javascript function that return this value to you.

### {{dataLayer.components}}
This variable need to return a array on your dataLayer root. If you dont have the components array on your dataLayer you can implement by yourself if the code below:
```javascript
function(){
  var components = [];
  if( !window.dataLayer ){
    window.dataLayer = window.dataLayer || [];
  }
  return window.dataLayer.push(components);
}
```

# Functions explanations:
## sanitizeData
This function just sanitize the property links to always return a array type value.
##### parameters:
Parameters | Type | Description | required?
---------  | ---- | ----------- | ---------
obj | object | the object push on dataLayer in a component visualization | yes
 
## setDataForm
This function just sanitize the property forms to always return a array type value.
##### parameters:
Parameters | Type | Description | required?
---------  | ---- | ----------- | ---------
obj | object | the object push on dataLayer in a component visualization | yes

## getComponentsValues
This function just get the last objetc of the dataLayer and try to sanitize it. This functions has any parameter and is started by the second tag implement on steps below.

## setDataComponents
This is the main function of the library. It make all objects components view return in a single array.
##### parameters:
Parameters | Type | Description | required?
---------  | ---- | ----------- | ---------
obj | object | the object push on dataLayer in a component visualization | yes
dl_comp | array | the array set up to receive all components objects | yes

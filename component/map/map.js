// Page({
//     data: {
//         controls: [],
//     },
//     onLoad(){},
//     onReady(){
//         this.mapCtx = my.createMapContext('map');
//     },
// })
Component({
  data: {
      controls: [],
  },
  props:{
      
  },

  didMount(){
      this.mapCtx = my.createMapContext('map');
  },

  didUpdate(prevProps,prevData){

  },
  didUnmount(){

  },
  methods:{
    
  },
})
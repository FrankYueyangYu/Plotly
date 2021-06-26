 function charts(sample){   
    
  d3.json("samples.json").then((data) => {
    var result = data.samples.filter(x => x.id.toString() === sample)[0];
    var id = result.otu_ids;
    var label = result.otu_labels;
    var value = result.sample_values;

  
  var bar = [{
      type:"bar",
      y:id.slice(0,10).map(y => `OTU ${y}`).reverse(),
      x:value.slice(0,10).reverse(),
      text:label.slice(0,10).reverse(),
      orientation:"h"
  }];
  var barlayout = {
      title:"Top 10 OTU"
  }
  Plotly.newPlot('bar-plot',bar,barlayout);


  var bubble = [{
      x:id,
      y:value,
      text:label,
      mode:"markers",
      marker:{
          color:id,
          size:value,
      }
  }];
  
  var bubblelay = {
      xaxis:{title:{text:'OTU ID'}},
      title:"Bacteria Culture Per Sample"
  };
  Plotly.newPlot("bubble-plot", bubble, bubblelay)
});
}

function demo(sample){
    d3.json("../../samples.json").then((data)=> {
        var result = data.metadata.filter(x => x.id.toString() === sample)[0];
        var demographic = d3.select("#sample-metadata");
        demographic.html("");
        Object.entries(result).forEach((k)=>{
            demographic.append("h6").text(k[0] + ": " +k[1] + "\n")
        })});
}


function optionChanged(sample){
    charts(sample);
    demo(sample);
}

function init(){
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> { 
        data.names.forEach((sample)=>{
            dropdown.append("option").text(sample).property("value",sample);
        });
        charts(data.names[0]);
        demo(data.names[0]);
    });
}



init();

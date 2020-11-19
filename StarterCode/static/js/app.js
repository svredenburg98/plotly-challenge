//allow user to choose from dropdown

//select value from dropdown

//select data from json based on dropdown value

d3.json("samples.json").then((data) => {
    var i;
    for (i=0; i < data.names.length; i++) {
        var dropDown = document.getElementById("selDataset");
        var option = document.createElement("option");
        option.text = data.names[i].toString();
        dropDown.add(option);
    }
    
    
});



function optionChanged() {

idChoice = d3.select("#selDataset").node().value;


d3.json("samples.json").then((data) => {

    samples = data.samples;

    var dataChoice
    var samp;
    for (samp = 0; samp < samples.length; samp++) {
        if (samples[samp].id.toString() === idChoice) {
            dataChoice = samp;
        }
    }

    console.log(dataChoice);

    var trace1 = {
        x: samples[dataChoice].otu_labels,
        y: samples[dataChoice].sample_values,
        type: "bar"
    };

    var data1 = [trace1];

    var layout = {
        title: "test",
        xaxis: { title: "test1" },
        yaxis: { title: "test2" }
    };

    Plotly.newPlot("bar", data1, layout);


    var trace2 = {
        x: samples[dataChoice].otu_ids,
        y: samples[dataChoice].sample_values,
        mode: 'markers',
        marker: {
        size: samples[dataChoice].sample_values
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: 'Marker Size',
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', data2, layout2);
  });
}
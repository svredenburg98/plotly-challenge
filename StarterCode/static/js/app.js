//fill the dropdown menu

d3.json("samples.json").then((data) => {
    var i;
    for (i=0; i < data.names.length; i++) {
        var dropDown = document.getElementById("selDataset");
        var option = document.createElement("option");
        option.text = data.names[i].toString();
        dropDown.add(option);
    }
    
    
});


//everything that happens after a new dataset is chosen
function optionChanged() {

idChoice = d3.select("#selDataset").node().value;

//read the json
d3.json("samples.json").then((data) => {

    samples = data.samples;
    metas = data.metadata;
//search for selected dataset
    var dataChoice
    var samp;
    for (samp = 0; samp < samples.length; samp++) {
        if (samples[samp].id.toString() === idChoice) {
            dataChoice = samp;
        }
    }

    console.log(dataChoice);
//create bar trace
    var trace1 = {
        x: samples[dataChoice].otu_ids.toString(),
        y: samples[dataChoice].sample_values,
        text: samples[dataChoice].otu_labels,
        type: "bar"
    };

    var data1 = [trace1];

    var layout = {
        title: "Bacteria in Sample",
        xaxis: { title: "Bacteria ID" },
        yaxis: { title: "Number of Bacteria" }
    };
//plot bar
    Plotly.newPlot("bar", data1, layout);

//create bubble trace
    var trace2 = {
        x: samples[dataChoice].otu_ids,
        y: samples[dataChoice].sample_values,
        text: samples[dataChoice].otu_labels,
        color: samples[dataChoice].sample_values,
        mode: 'markers',
        marker: {
        size: samples[dataChoice].sample_values
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: 'Bacteria in Sample',
        showlegend: false,
      };
      //plot bubble
      Plotly.newPlot('bubble', data2, layout2);
//find metadata for selection
      var meta;
        for (meta = 0; meta < metas.length; meta++) {
            if (metas[meta].id.toString() === idChoice) {
            metaChoice = meta;
            }
        }
        
        //creates and replaces list elements every time a new dataset is chosen
        var age = document.createTextNode("AGE: " + data.metadata[metaChoice].age);
        var bbtype = document.createTextNode("BBTYPE: " + data.metadata[metaChoice].bbtype);
        var ethnicity = document.createTextNode("ETHNICITY: " + data.metadata[metaChoice].ethnicity);
        var gender = document.createTextNode("GENDER: " + data.metadata[metaChoice].gender);
        var location = document.createTextNode("LOCATION: " + data.metadata[metaChoice].location);
        var wfreq = document.createTextNode("WFREQ: " + data.metadata[metaChoice].wfreq);
        var id = document.createTextNode("SAMPLE: " + data.metadata[metaChoice].id);
        
        var listAge = document.createElement("li");
        listAge.setAttribute("id", "age");
        var listBbtype = document.createElement("li");
        listBbtype.setAttribute("id", "bbtype");
        var listEthnicity = document.createElement("li");
        listEthnicity.setAttribute("id", "ethnicity");
        var listGender = document.createElement("li");
        listGender.setAttribute("id", "gender");
        var listLocation = document.createElement("li");
        listLocation.setAttribute("id", "location");
        var listWfreq = document.createElement("li");
        listWfreq.setAttribute("id", "wfreq");
        var listId = document.createElement("li");
        listId.setAttribute("id", "id");

        listAge.appendChild(age);
        listBbtype.appendChild(bbtype);
        listEthnicity.appendChild(ethnicity);
        listGender.appendChild(gender);
        listLocation.appendChild(location);
        listWfreq.appendChild(wfreq);
        listId.appendChild(id);

        var list = document.getElementById("meta-list");

        childAge = document.getElementById("age");
        childBbtype = document.getElementById("bbtype");
        childEthnicity = document.getElementById("ethnicity");
        childGender = document.getElementById("gender");
        childLocation = document.getElementById("location");
        childWfreq = document.getElementById("wfreq");
        childId = document.getElementById("id");

        list.replaceChild(listAge, childAge);
        list.replaceChild(listBbtype, childBbtype);
        list.replaceChild(listEthnicity, childEthnicity);
        list.replaceChild(listGender, childGender);
        list.replaceChild(listLocation, childLocation);
        list.replaceChild(listWfreq, childWfreq);
        list.replaceChild(listId, childId);
  });
}
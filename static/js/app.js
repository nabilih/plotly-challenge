
function init() {
  //find the element in html file which is for data selection 
  var userSelection = d3.select("#selDataset");

  // Use the names for the JSON data
  d3.json("samples.json").then((data) => {
    //add the names as options in the dropdown box userSelection 
    data.names.forEach(function(name) {
        userSelection.append("option")
        .text(name)
        .property("value", name);
    });

    // select the first entry in the drop-down to update the page
    const selectedName = data.names[0];
    updateCharts(selectedName);
    updateDemographicInfo(selectedName);
    updateGauge(selectedName);

  });
};

function updateCharts(selectedName){
    // read samples data
    d3.json("samples.json").then(data => {
        //check data is ok
        //console.log(data);

        //filter data for the selected individual
        var filteredData = data.samples.filter(info => info.id == selectedName )
        filteredData = filteredData[0];

        var values = filteredData.sample_values.slice(0,10).reverse();
        var otu_ids = filteredData.otu_ids.slice(0,10).reverse();
        var labels = filteredData.otu_labels.slice(0,10).reverse();
        // check values, otu_ids and labels
        //console.log(values);
        //console.log(otu_ids);
        //console.log(labels);

        //create trace for the data
        var traceBar = {
            x: values,
            y: otu_ids.map(d => "OTU " + d),
            text: labels,
            type: "bar",
            orientation: "h"
        };

        //data for the bar plot
        var data1 = [traceBar];

        //create layout for bar chart
        var layout_bar = {
            title: "Top Ten Sample OTU Values",
        }

        //draw bar plot
        Plotly.newPlot("bar", data1, layout_bar);

        // Create bubble plot
        var traceBubble = {
            x: otu_ids,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                size: values,
                sizemode: 'diameter',
                color: otu_ids,
            }
        };

        //data for the bubble plot
        var data2 = [traceBubble];

        // create layout for bubble chart
        var layout_bubble = {
            xaxis: {title: 'OTU ID'},
            height: 600,
            width: 1000
        };

        //draw bubble plot
        Plotly.newPlot("bubble", data2, layout_bubble);
        
        //create a trace for pie chart
        tracePie = {
            values: values,
            labels: otu_ids,
            hovertext: labels,
            type: "pie"
        }

        //data for the pie chart
        var data3 = [tracePie];

        // layout for pie chart
        var layout_pie = {
            height: 600,
            width: 600
        };

        Plotly.newPlot("pie", data3, layout_pie);
    });
};

function updateDemographicInfo(selectedName){
    //read samples data
    d3.json("samples.json").then(data => {
        //get the metadata details for the selected option selectedName
        var filteredData = data.metadata.filter(info => info.id == selectedName )
        filteredData = filteredData[0];

        // check if we have the data
        // console.log(filteredData);

        //place data in the designated div on html called sample-metadata
        var metadata_div = d3.select("#sample-metadata");
        metadata_div.html(""); //clear the section first
        //for each of the items in the dictionary, append key and value
        Object.entries(filteredData).forEach(([key, value]) => {
            metadata_div.append("h4")
                .text(key + ": " + value + "\n");    
        });
    });

};

// when user selects an entry from drop-down, this function is called from the html
function optionChanged(name) {
    updateCharts(name);
    updateDemographicInfo(name);
    updateGauge(name);
}

//initialize webpage
init();


function updateGauge(selectedName){

    d3.json("samples.json").then(data => {
    //check data is ok; uncomment for testing
    //console.log(data);

    var filteredData = data.metadata.filter(info => info.id == selectedName )
    filteredData = filteredData[0];

    //filter data for the selected individual
    var wfreq = filteredData.wfreq;
    // check if we have the correct value for washing frquency
    //console.log(wfreq);

    // define data for gauge chart
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 9 },
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color: "lightgray" },
              { range: [1, 2], color: "gray" },
              { range: [2, 3], color: "lightblue" },
              { range: [3, 4], color: "Azure" },
              { range: [4, 5], color: "lightgreen" },
              { range: [5, 6], color: "Beige" },
              { range: [6, 7], color: "Bisque" },
              { range: [7, 8], color: "DarkSeaGreen" },
              { range: [8, 9], color: "Blue" },

            ],
          }
        }
      ];
      
      // define a layout for gauge chart
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

      // draw gauge
      Plotly.newPlot('gauge', data, layout);
    });
};

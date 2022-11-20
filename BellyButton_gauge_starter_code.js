// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
   
    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample)
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;

    // Create a variable that holds the first sample in the array.
    var Result = resultArray[0];
    
    // 2. Create a variable that holds the first sample in the metadata array.
    var metadata = data.metadata;

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var sampleOtuID = Result.otu_ids;
    var sampleOtuLabel = Result.otu_labels;
    console.log(sampleOtuLabel);
    var sampleValue = Result.sample_values.map((value) => parseInt(value));
    // 3. Create a variable that holds the washing frequency.
    var wFreq = parseFloat(Result.wfreq);
    // Create the yticks for the bar chart.
    var yticks = sampleOtuID.slice(0,10).map((id) => "OTU " + id).reverse();
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData , barLayout);
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = {
        type: "indicator",
        value: wFreq,
        mode: "gauge+number",
        gauge: {
          axis: {range: [0,10], dtick: 2},
          bar: {color: "black"},
          steps: [
            {range: [0,2], color: "red"},
            {range: [2,4], color: "orange"},
            {range: [4,6], color: "yellow"},
            {range: [6,8], color: "lightgreen"},
            {range: [8,10], color: "darkgreen"}
          ],
        }
      };   
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
        title: {
          text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
          y: 0.75,
        },
        margin: {
          l: 50,
          r: 50,
          b: 0,
          t: 50,
          pad: 50
        },
      };
  
    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}

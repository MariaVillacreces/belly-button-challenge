// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
 // get the metadata field
console.log("data",data)

console.log(data['metadata'])
data['metadata']

metadata = data['metadata']

var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
   var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
   var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
   
    });

  })}
 
buildMetadata(940)


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var sampleInfo = data.samples

    // Filter the samples for the object with the desired sample number
    var results = sampleInfo.filter(sampleObj => sampleObj.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    var otu_ids = results[0].otu_ids;
    var otu_labels = results[0].otu_labels;
    var sample_values = results[0].sample_values;

    // Build a Bubble Chart
    var bubblechart = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode:"markers",
      marker:{
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
    }
}];

    // Render the Bubble Chart
    var layout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title:"OTU ID"}
  };
    Plotly.newPlot("bubble", bubblechart, layout);
       // For the Bar Chart, map the otu_ids to a list of strings for your yticks
   var yticks = otu_ids.map(otuID => `OTU ${otuID}`).reverse();

   // Build a Bar Chart
   // Don't forget to slice and reverse the input data appropriately
 
   var bar_trace = {
     y: yticks,
     x: sample_values.slice(0, 10).reverse(),
     text: otu_labels.slice(0, 10).reverse(),
     orientation: 'h',
     type: 'bar'
   }; 

   var bar_data = [bar_trace];

   var bar_layout = {
     title: 'Top ten Bacteria Cultures Found',
     barmode: 'group'

   }

   // Render the Bar Chart

   Plotly.newPlot('bar', bar_data, bar_layout);
  });


};

   
// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    var sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
      var dropdownMenu = d3.select(`#selDataset`);

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
      sampleNames.forEach((name) => {
        dropdownMenu.append("option").text(name).property("value", name);
    });

    // Get the first sample from the list
      var firstsample = sampleNames[0]

    // Build charts and metadata panel with the first sample
      buildCharts(firstsample);
      buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();









//////////////////////////////
// NEW CODE STARTS HERE:
//////////////////////////////







// Function to populate dropdown and initialize dashboard
function init() {
  // Select the dropdown element
  let dropdown = d3.select("#selDataset");

  // Load JSON data
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract sample names from metadata
    if (data.metadata && data.metadata.length > 0) {
      let namesField = data.metadata.map(item => item.id); 
      console.log("Sample names:", namesField);
    
      // Populate dropdown options with sample names
      namesField.forEach((name) => {
        dropdown.append("option")
          .attr("value", name)
          .text(name)
      });
    }
  });



    
/////////////////////// Use the list of sample names to populate the select options
//sampleNames.forEach((sample) => {
//d3.select
    //.append('option')
    //.text(sample)
    //.property('value', sample);








      // Get the first sample from the list
      let firstSampleId = namesField[0];
      console.log("First sample:", firstSampleId);

      // Build charts and metadata panel with the first sample
      buildCharts(firstSampleId); 
      buildMetadata(firstSampleId); // Function to populate metadata panel

      // Event listener for dropdown change
      dropdown.on("change", function(event) {
        let selectedSampleId = event.target.value;
        console.log("Selected sample ID:", selectedSampleId);

        // Call functions to update charts and metadata panel based on new sample
        buildCharts(selectedSampleId);
        buildMetadata(selectedSampleId);
      });

    {
    
      console.log("No metadata found or metadata is empty.");
    }
  //.catch((error) => {
    //console.error("Error loading JSON:", error);
  //});
}




// Function to build metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
  console.log(sample)
  // Get the metadata for the selected sample
    let metadata =  metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    //=data.metadata.find(item => item.id === sample.toString());
//????????
                
//????????/


    // Select the panel where metadata will be displayed
    let metadataPanel = d3.select("#sample-metadata");

    // Clear any existing metadata
    metadataPanel.html("");

    // Check if metadata for the selected sample exists
    if (!metadata) {
      metadataPanel.append("p")
        .text(`No metadata found for sample ${sample}`);
      return;
    }

    // Append tags for each key-value pair in the metadata
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p")
        .text(`${key}: ${value}`);
    });

  }).catch((error) => {
    console.error("Error loading metadata:", error);
  });
}



// Function to build charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Filter the samples for the selected sample
    let sampleData = data.samples.find((item) => item.id === sample.toString());


    console.log(sampleData)
    console.log(sample)
    // Extract necessary data for charts
    let otuIds = sampleData.otu_ids;
    let otuLabels = sampleData.otu_labels;
    let sampleValues = sampleData.sample_values;


















    // Build a Bubble Chart
    // (Implementation of Bubble Chart creation goes here)
    function buildBubbleChart(sampleData) {
      let trace = {
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        text: sampleData.otu_labels,
        mode: 'markers',
        marker: {
          size: sampleData.sample_values,  // Marker size based on sample values
          color: sampleData.otu_ids,       // Marker color based on OTU ids
          colorscale: 'Earth'              // Color scale for markers
        }
      };
     // Define data array for the plot
  let data = [trace];

  // Define layout for the plot
  let layout = {
    xaxis: { title: 'OTU ID' },
    yaxis: { title: 'Sample Values' },
    hovermode: 'closest',
    showlegend: false
  };

  // Plot the bubble chart using Plotly
  Plotly.newPlot('bubble', data, layout);
}

// Inside your buildCharts function, after extracting necessary data
// Call the function to build the bubble chart
buildBubbleChart(sampleData);
















    // Build a Bar Chart
    // (Implementation of Bar Chart creation goes here)
// Function to build bar chart
function buildBarChart(sampleData) {
  // Sort the sample values in descending order
  let sortedData = sampleData.sample_values.slice(0, 10).reverse();
  let sortedIds = sampleData.otu_ids.slice(0, 10).reverse();
  let sortedLabels = sampleData.otu_labels.slice(0, 10).reverse();

  // Define trace for the bar chart
  let trace = {
    x: sortedData,
    y: sortedIds.map(id => `OTU ${id}`),
    text: sortedLabels,
    type: 'bar',
    orientation: 'h'
  };

  // Define data array for the plot
  let data = [trace];

  // Define layout for the plot
  let layout = {
    title: 'Top 10 OTUs',
    xaxis: { title: 'Sample Values' },
    yaxis: { title: 'OTU ID', automargin: true }
  };

  // Plot the bar chart using Plotly
  Plotly.newPlot('bar', data, layout);
}

// Inside your buildCharts function, after extracting necessary data
// Call the function to build the bar chart
buildBarChart(sampleData);









    // Render charts
buildBarChart(sampleData);
buildBubbleChart(sampleData);





  }).catch((error) => {
    console.error("Error loading JSON:", error);
  });
}

// Initialize the dashboard on page load
init();
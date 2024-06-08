
//Available globals
var domo = window.domo; // For more on domo.js: https://developer.domo.com/docs/dev-studio-guides/domo-js#domo.get
var datasets = window.datasets;

document.getElementById('downloadBtn').addEventListener('click', async () => {
    try {
        // Assuming domo.get() returns a Promise
        const query = `/data/v1/${datasets[0]}`;
        const data = await domo.get(query);
        //console.log(response)
        
        // Extracting data from the API response
        //const data = response.data;

        // Extracting headers from the first item in the data array
        const headers = Object.keys(data[0]);

        // Creating CSV content with headers
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + '\n';
        csvContent += data.map(item => headers.map(header => item[header]).join(',')).join('\n');

        // Creating download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);

        // Triggering download
        link.click();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});



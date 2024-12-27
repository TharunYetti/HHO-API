import autocannon from "autocannon";

function runTest() {
  const urls = [
    "http://localhost:8000/api/events",
    "http://localhost:8000/api/activities/getAll",
    "http://localhost:8000/api/testimonials/",
    "http://localhost:8000/api/users/offUsers/",
    "http://localhost:8000/api/donations/getall",

  ];
  urls.forEach((url) => {
    autocannon(
      {
        url,
        connections: 100, // Number of concurrent connections
        duration: 10, // Test duration in seconds
      },
      (err, result) => {
        if (err) {
          console.error("Error running benchmark:", err);
          return;
        }

        console.log(
          `For url ${url}, Total Responses Received: ${result.requests.total}`
        );
        console.log(`Average Latency: ${result.latency.average} ms`);
        console.log(`Throughput: ${result.throughput.total} bytes/sec`);
      }
    );
  });
}

runTest();

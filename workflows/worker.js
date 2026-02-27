onmessage = function(event) {
  console.log('Worker received:', event.data);
  postMessage('Hello from worker');
};

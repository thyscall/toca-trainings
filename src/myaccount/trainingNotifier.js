// class TrainingNotifier {
//     handlers = [];
  
//     constructor() {
//       const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
//       this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${window.location.port}/ws`);
  
//       this.socket.onmessage = (msg) => {
//         try {
//           const event = JSON.parse(msg.data);
//           this.handlers.forEach((handler) => handler(event));
//         } catch (error) {
//           console.error('Error parsing WebSocket message:', error);
//         }
//       };
//     }
  
//     addHandler(handler) {
//       this.handlers.push(handler);
//     }
  
//     removeHandler(handler) {
//       this.handlers = this.handlers.filter((h) => h !== handler);
//     }
//   }
  
//   const trainingNotifier = new TrainingNotifier();
//   export { trainingNotifier };
  
class LoginNotifier {
  constructor() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const backendPort = 4000; 
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${backendPort}/ws`);

    this.socket.onopen = () => {
      console.log('WebSocket connected.');
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'userLogin') {
          console.log(`${data.username} has logged in.`);
        }
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    };
  }
}

const notifier = new LoginNotifier();
export default notifier;

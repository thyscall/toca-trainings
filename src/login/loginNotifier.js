class LoginNotifier {
    constructor() {
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  
      this.socket.onopen = () => {
        console.log('WebSocket connected.');
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected.');
      };
  
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'userLogin') {
            console.log(`${data.username} has logged in.`);
            alert(`${data.username} has logged in.`);
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      };
    }
  
    sendLoginNotification(username) {
      const message = JSON.stringify({ type: 'userLogin', username });
      this.socket.send(message);
    }
  }
  
  const notifier = new LoginNotifier();
  export default notifier;
  
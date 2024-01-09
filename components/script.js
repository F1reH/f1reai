const request = require('request');

const webhookUrl = 'https://discord.com/api/webhooks/1194353169971560488/z5bKRRiXyLOGetm4jyTOJmNJMuyxHG_UiRTxGp2l976iKDd4GCoRJy0OHubMYa-sQV7x';

function sendWebhookMessage(content) {
  const options = {
    uri: webhookUrl,
    method: 'POST',
    json: {
      content: content,
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error sending webhook message:', error);
    } else if (response.statusCode !== 200) {
      console.error('Received error response with status', response.statusCode, ':', body);
    } else {
      console.log('Webhook message sent successfully!');
    }
  });
}

function getCountry(ipAddress) {
  // Use a geolocation API service to fetch the country based on the IP address
  const apiUrl = `https://api.ipgeolocationapi.com/geolocate/${ipAddress}`;
  
  // Send an HTTP GET request to the API
  request.get(apiUrl, (error, response, body) => {
    if (error) {
      console.error('Error fetching country information:', error);
    } else if (response.statusCode !== 200) {
      console.error('Received error response with status', response.statusCode, ':', body);
    } else {
      const data = JSON.parse(body);
      const country = data.country_name || 'Unknown';
      
      const ipAddress = data.ip;
      const timestamp = new Date().toLocaleString();
      const messageContent = `User with IP ${ipAddress} from ${country} accessed the website at ${timestamp}.`;
      
      sendWebhookMessage(messageContent);
    }
  });
}

// Example usage
const ipAddress = '192.168.0.1';
getCountry(ipAddress);

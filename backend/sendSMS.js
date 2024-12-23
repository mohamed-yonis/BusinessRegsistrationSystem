// smsService.js
import axios from 'axios';

export async function sendSMS(message, phoneNumber) {
  const url = 'https://tabaarakict.so/SendSMS.aspx';
  const params = {
    user: 'Bile2024',
    pass: 'Bile@2024@',
    cont: message,
    to: phoneNumber,
  };

  try {
    const response = await axios.get(url, { params });
    if (response.status === 200) {
      console.log("SMS sent successfully:", response.data);
    } else {
      console.error("Failed to send SMS. Status:", response.status);
    }
  } catch (error) {
    console.error("Error occurred while sending SMS:", error.message);
    if (error.response) {
      console.log("Error details:", error.response.data);
    }
  }
}

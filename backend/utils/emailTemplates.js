export const registrationEmail = (business) => `
  <h3>New Business Registration</h3>
  <p>A new business has been registered with the following details:</p>
  <ul>
    <li><strong>Name:</strong> ${business.business_name}</li>
    <li><strong>Type:</strong> ${business.business_type}</li>
    <li><strong>City:</strong> ${business.city}</li>
  </ul>
  <p>Please review and approve if necessary.</p>
`;

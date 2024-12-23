// CertificateGenerator.jsx
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import axios from 'axios';
import certificateBackground from '../assets/certificateBackground.jpeg';

const CertificateGenerator = ({ business, onClose }) => {
  const [ministryInfo, setMinistryInfo] = useState(null);

  const approvalDate = new Date(business.created_at || Date.now());
  const validDate = new Date(approvalDate);
  validDate.setFullYear(validDate.getFullYear() + 1);

  // Fetch Ministry details
  useEffect(() => {
    const fetchMinistryInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/ministry/info');
        setMinistryInfo(response.data.ministry);
      } catch (error) {
        console.error('Failed to fetch ministry information:', error);
      }
    };
    fetchMinistryInfo();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <img src={certificateBackground} alt="Certificate Background" className="absolute inset-0 w-full h-full opacity-10 z-0" />
        <div className="relative z-10">
          {/* Header Section */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-gray-800">Certificate of Business Registration</h1>
            <p className="text-sm text-gray-600">Issued by the Business Registration Authority</p>
          </div>

          {/* Certificate Details Table */}
          <table className="w-full mb-4 border border-gray-300 rounded-md bg-white">
            <tbody>
              <tr>
                <td className="p-2 font-semibold text-gray-600">Business Name:</td>
                <td className="p-2">{business.business_name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-gray-600">Business Type:</td>
                <td className="p-2">{business.business_type_id?.name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-gray-600">Owner Name:</td>
                <td className="p-2">{business.owner_id?.full_name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-gray-600">Address:</td>
                <td className="p-2">{business.full_address}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-gray-600">Passport Number:</td>
                <td className="p-2">{business.owner_id?.passport_number}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-gray-600">Valid From:</td>
                <td className="p-2">{approvalDate.toDateString()}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-gray-600">Valid Until:</td>
                <td className="p-2">{validDate.toDateString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Ministry Info */}
          <div className="flex justify-around items-center mt-4">
            <p className="text-gray-600 font-semibold">{ministryInfo?.ministryName || "Ministry of Commerce"}</p>
         
            {ministryInfo?.signatureUrl && (
              <img
                src={`http://localhost:3000${ministryInfo.signatureUrl}`}
                alt="Signature"
                className="w-16 h-10 mt-2 object-contain"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
            <PDFDownloadLink
              document={<CertificateDocument business={business} validDate={validDate} ministryInfo={ministryInfo} />}
              fileName={`${business.business_name}_certificate.pdf`}
            >
              {({ loading }) => (
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {loading ? "Loading..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

// PDF Document for Download
const CertificateDocument = ({ business, validDate, ministryInfo }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Image src={certificateBackground} style={pdfStyles.backgroundImage} fixed />

      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>Certificate of Business Registration</Text>
        <Text style={pdfStyles.subtitle}>Issued by the Business Registration Authority</Text>
      </View>

      <View style={pdfStyles.table}>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Business Name:</Text>
          <Text>{business.business_name}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Registration Date:</Text>
          <Text>{new Date(business.created_at).toDateString()}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Type of Business:</Text>
          <Text>{business.business_type_id?.name || 'Private Limited'}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Address:</Text>
          <Text>{business.city_id?.name}, {business.full_address}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Business Activity:</Text>
          <Text>{business.business_activity}, {business.description}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Passport Number:</Text>
          <Text>{business.owner_id?.passport_number}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Date of Issue:</Text>
          <Text>{new Date(business.created_at).toDateString()}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Expiry Date:</Text>
          <Text>{validDate.toDateString()}</Text>
        </View>
      </View>

      <View style={pdfStyles.footer}>
        <Text>{ministryInfo?.ministryName || "Ministry of Commerce"}</Text>
        {ministryInfo?.signatureUrl && (
          <Image src={`http://localhost:3000${ministryInfo.signatureUrl}`} style={pdfStyles.signature} />
        )}
      </View>
    </Page>
  </Document>
);

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0.1,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  table: {
    width: '100%',
    border: '1px solid #000000',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottom: '1px solid #000000',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  signature: {
    width: 80,
    height: 40,
    marginTop: 10,
  },
});

export default CertificateGenerator;

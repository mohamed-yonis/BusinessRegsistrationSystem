// controllers/ministryController.js
import Ministry from '../Models/Ministry.js';

// Add Ministry Info
export const addMinistry = async (req, res) => {
  const { ministryName } = req.body;
  const signatureUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const ministry = new Ministry({ ministryName, signatureUrl });
    await ministry.save();
    res.status(201).json({ message: 'Ministry information added successfully', ministry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add ministry information' });
  }
};

// Update Ministry Info
export const updateMinistry = async (req, res) => {
  const { ministryName } = req.body;
  const signatureUrl = req.file ? `/uploads/${req.file.filename}` : req.body.signatureUrl;

  try {
    const ministry = await Ministry.findByIdAndUpdate(req.params.id, { ministryName, signatureUrl }, { new: true });
    res.status(200).json({ message: 'Ministry information updated successfully', ministry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ministry information' });
  }
};

// Get Ministry Info
export const getMinistry = async (req, res) => {
  try {
    const ministry = await Ministry.findOne();
    res.status(200).json({ ministry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ministry information' });
  }
};

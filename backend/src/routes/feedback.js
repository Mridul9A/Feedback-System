router.post('/feedback', async (req, res) => {
  try {
    console.log('Received feedback data:', req.body);
    // Your existing code...
  } catch (error) {
    console.error('Error processing feedback:', error);
    res.status(500).json({ message: error.message });
  }
}); 
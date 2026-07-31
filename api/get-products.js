export default async function handler(req, res) {
  // Allow your frontend to talk to this backend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Fetch data using your Vercel Environment Variables
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.BASE_ID}/cat-database`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
        },
      }
    );

    const data = await response.json();
    
    // INJECT THE SECURE WHATSAPP NUMBER HERE
    // This pulls the number from Vercel so it is never hardcoded in GitHub
    data.businessNumber = process.env.WHATSAPP_NUMBER;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch catalog data' });
  }
}
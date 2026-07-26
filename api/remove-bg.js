export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    res.json({
      success: true,
      result_url: 'https://placehold.co/600x400/6366f1/ffffff?text=抠图结果',
      note: 'AI抠图功能即将上线，敬请期待！'
    });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

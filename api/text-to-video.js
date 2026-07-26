export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    res.json({
      success: true,
      video_url: 'https://download.samplelib.com/mp4/sample-10s.mp4',
      note: '文生视频功能即将上线，敬请期待！'
    });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

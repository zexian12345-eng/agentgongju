export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    res.json({
      success: true,
      audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      note: 'AI配音功能即将上线，敬请期待！'
    });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

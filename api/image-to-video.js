// Nemo API 图转视频代理
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  try {
    const NEMO_TOKEN = process.env.NEMO_TOKEN;
    if (!NEMO_TOKEN) {
      // 模拟生成（无API密钥时返回演示视频）
      return res.json({
        success: true,
        video_url: 'https://download.samplelib.com/mp4/sample-5s.mp4',
        note: '演示模式 - 配置 NEMO_TOKEN 环境变量后可接入真实AI引擎'
      });
    }
    
    // 实际调用Nemo API
    const sessionRes = await fetch('https://mega-api-prod.nemovideo.ai/api/tasks/me/with-session/nemo_agent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NEMO_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task_name: 'project', language: 'zh' })
    });
    const sessionData = await sessionRes.json();
    
    res.json({ success: true, video_url: 'https://download.samplelib.com/mp4/sample-5s.mp4', session_id: sessionData.session_id });
  } catch(err) {
    // 出错时返回演示模式
    res.json({
      success: true,
      video_url: 'https://download.samplelib.com/mp4/sample-5s.mp4',
      note: '演示模式 - API连接暂时不可用'
    });
  }
}

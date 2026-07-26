export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { scene, content } = req.body;
    const texts = {
      '小红书种草文案': `✨ 一定要收藏！发现了这个宝藏好物！\n\n最近入手了这款产品，真的太好用了！\n\n🌟 颜值：满分！包装精致，放在桌上就是一道风景\n🌟 使用感受：第一次用就被惊艳到了，效果立竿见影\n🌟 性价比：这个价位能买到这样的品质，真的太值了\n\n姐妹们冲就完了！真的不会后悔！\n\n#好物分享 #种草 #必入好物`,
      '抖音短视频脚本': `【画面】镜头从远处推向产品\n【音效】科技感音效\n【旁白】今天给大家推荐一个神器！\n【画面】特写产品细节\n【旁白】用了它之后，工作效率提升了三倍！\n【画面】使用场景展示\n【旁白】关键是！它完全免费！\n【结尾】关注我，每天分享一个实用小工具`,
      '默认': `【${scene}】\n\n${content}\n\n（此为AI自动生成的演示文案，正式版将接入更多AI模型）`
    };
    const text = texts[scene] || texts['默认'];
    res.json({ success: true, text });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

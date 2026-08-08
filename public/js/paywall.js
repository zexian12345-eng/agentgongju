/**
 * AgentGongju.com 收费机制（v1）
 * 规则：
 * 1. 每个工具免费使用前 9 次，第 10 次触发付费墙
 * 2. 下载类工具：点击下载时触发付费墙
 * 3. localStorage 记录使用次数与付费状态
 * 
 * 用法：在工具页 <head> 引入本脚本，然后：
 *   - 在生成按钮点击事件开头调用 Paywall.countUse('工具名')，返回 true 则放行，false 则拦截
 *   - 下载按钮调用 Paywall.checkDownload('工具名')
 */
(function () {
  var KEY_PREFIX = 'agj_';
  var FREE_USES = 9; // 前9次免费

  function getKey(name) {
    return KEY_PREFIX + 'count_' + name;
  }
  function getPaidKey(name) {
    return KEY_PREFIX + 'paid_' + name;
  }

  var Paywall = {
    /** 获取当前使用次数 */
    getCount: function (name) {
      return parseInt(localStorage.getItem(getKey(name)) || '0', 10);
    },
    /** 是否已付费 */
    isPaid: function (name) {
      return localStorage.getItem(getPaidKey(name)) === '1';
    },
    /** 记录一次使用，返回是否放行 */
    countUse: function (name) {
      if (this.isPaid(name)) return true;
      var n = this.getCount(name) + 1;
      localStorage.setItem(getKey(name), String(n));
      if (n > FREE_USES) {
        this.showPaywall(name);
        return false;
      }
      return true;
    },
    /** 下载检查：直接触发付费墙 */
    checkDownload: function (name) {
      if (this.isPaid(name)) return true;
      this.showPaywall(name);
      return false;
    },
    /** 展示付费墙弹窗 */
    showPaywall: function (name) {
      if (document.getElementById('agj-paywall')) return;
      var overlay = document.createElement('div');
      overlay.id = 'agj-paywall';
      overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.8);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
      overlay.innerHTML =
        '<div style="background:#0f1220;border:1px solid #6366f1;border-radius:20px;max-width:420px;width:90%;padding:36px 28px;text-align:center;color:#e2e8f0;font-family:-apple-system,BlinkMacSystemFont,\'PingFang SC\',sans-serif">' +
        '<div style="font-size:44px;margin-bottom:12px">🔓</div>' +
        '<h2 style="color:#fff;margin:0 0 8px;font-size:1.4rem">免费次数已用完</h2>' +
        '<p style="color:#94a3b8;font-size:.9rem;line-height:1.7;margin:0 0 20px">「' + name + '」已免费使用 ' + FREE_USES + ' 次<br>解锁后不限次数使用</p>' +
        '<div style="background:rgba(99,102,241,.12);border:1px dashed #6366f1;border-radius:12px;padding:14px;margin-bottom:20px">' +
        '<div style="font-size:1.3rem;font-weight:700;color:#a5b4fc;margin-bottom:4px">解锁价格</div>' +
        '<div style="font-size:.85rem;color:#94a3b8">单工具永久解锁：<b style="color:#22c55e">3元</b></div>' +
        '<div style="font-size:.85rem;color:#94a3b8">全站全部工具：<b style="color:#22c55e">15元/年</b></div>' +
        '</div>' +
        '<div style="font-size:.85rem;color:#94a3b8;margin-bottom:16px">📱 微信 / 支付宝扫码支付后<br>在下方输入 6 位解锁码 即可解锁</div>' +
        '<div style="display:flex;gap:10px;margin-bottom:14px">' +
        '<input id="agj-code" placeholder="输入解锁码" style="flex:1;padding:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:10px;color:#fff;text-align:center;letter-spacing:4px;font-size:1.1rem;outline:none">' +
        '</div>' +
        '<button id="agj-unlock" style="width:100%;padding:14px;background:linear-gradient(135deg,#6366f1,#a855f7);border:none;border-radius:12px;color:#fff;font-size:1rem;font-weight:600;cursor:pointer">🔓 立即解锁</button>' +
        '<button id="agj-later" style="width:100%;padding:10px;background:transparent;border:none;color:#64748b;font-size:.85rem;cursor:pointer;margin-top:10px">稍后再说</button>' +
        '<div style="font-size:.75rem;color:#475569;margin-top:14px;line-height:1.6">解锁码请通过网站客服获取<br>支付后截图发客服即可获得解锁码</div>' +
        '</div>';
      document.body.appendChild(overlay);

      // 解锁按钮
      document.getElementById('agj-unlock').addEventListener('click', function () {
        var code = document.getElementById('agj-code').value.trim();
        if (Paywall.verifyCode(code, name)) {
          localStorage.setItem(getPaidKey(name), '1');
          overlay.remove();
          alert('✅ 解锁成功！现在可以继续使用了');
          location.reload();
        } else {
          alert('❌ 解锁码错误，请核对后重试');
        }
      });
      // 稍后再说
      document.getElementById('agj-later').addEventListener('click', function () {
        overlay.remove();
      });
    },
    /** 验证解锁码（简单校验，正式版接后端） */
    verifyCode: function (code, name) {
      if (!code || code.length < 6) return false;
      // v1：内置演示码 888888，正式版由后端签发
      return code === '888888';
    }
  };

  window.Paywall = Paywall;
})();

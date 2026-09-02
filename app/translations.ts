export const supportedLanguages = ['en', 'zh-Hans', 'zh-Hant'] as const;

export type Language = (typeof supportedLanguages)[number];

export const languageLabels: Record<Language, string> = {
  en: 'EN',
  'zh-Hans': '简',
  'zh-Hant': '繁',
};

export function resolveLanguage(requested?: string, acceptLanguage = ''): Language {
  if (supportedLanguages.includes(requested as Language)) return requested as Language;
  const normalized = acceptLanguage.toLowerCase();
  if (normalized.includes('zh-hant') || normalized.includes('zh-tw') || normalized.includes('zh-hk')) return 'zh-Hant';
  if (normalized.includes('zh')) return 'zh-Hans';
  return 'en';
}

export const translations = {
  en: {
    navHow: 'How it works', navPrivacy: 'Privacy', downloadFor: 'Download for', device: 'iPhone',
    eyebrow: 'A CALMER WAY TO PACK', heroLine: 'Stop remembering.', heroAccent: 'Start packing.',
    description: 'PackCalm turns the things you already bring into reusable lists—so every trip starts organized and nothing important gets left behind.',
    seeHow: 'See how it works', trust: ['Free to download', 'No account', 'No ads'], highlights: 'Product highlights',
    home: 'HOME', nextTrip: 'NEXT TRIP', departure: 'DEPARTURE', gate: 'GATE 12 · 07:45', packed: 'PACKED', readyToGo: 'READY TO GO',
    packingList: 'PACKING LIST', passport: 'Passport', charger: 'Charger', headphones: 'Headphones',
    preview: 'PackCalm app preview', tripsAlt: 'Current PackCalm Trips screen', packingAlt: 'Current packing checklist and progress in PackCalm', itemsAlt: 'Current personal item library in PackCalm',
    readyCount: '9 of 14', readyCaption: 'ready to go', localTitle: '100% local', localCaption: 'your lists stay yours',
    howEyebrow: 'HOW IT WORKS', howTitle: 'Build once. Pack faster every time.',
    saveTitle: 'Save it once', saveDescription: 'Build a personal catalog of what you actually bring—from your passport to your lucky socks.',
    reuseTitle: 'Reuse what works', reuseDescription: 'Start from My Core List, a ready-made pack, or a past trip. Adjust only what changed.',
    coreList: 'My Core List', businessTrip: 'Business Trip', beachWeekend: 'Beach Weekend',
    confidenceTitle: 'Pack with confidence', confidenceDescription: 'Check things off as they go into your bag and see exactly what is still waiting.',
    ready: 'Ready', nothingLeft: 'Nothing left to pack',
    simpleEyebrow: 'SIMPLE ON PURPOSE', essentialsTitle: ['Everything you need.', 'Nothing in the way.'],
    privateTitle: 'Private by default', privateDescription: 'Your trips, notes, lists, and custom photo icons stay on your iPhone. No account, ads, or behavioral tracking.', privateProof: 'Core packing works offline',
    freeTitle: 'Free for real trips', freeDescription: 'The complete core packing flow is free. PackCalm Pro is an optional one-time unlock, never another subscription.', freeProof: 'Unlimited personal items',
    downloadEyebrow: 'YOUR NEXT TRIP STARTS CALMER', downloadTitle: ['Pack the bag.', 'Leave the worry.'], downloadDescription: 'Free to download. No account required.', launchNote: 'App Store link will activate at launch.',
    footerTagline: 'Remember what to bring, without starting from scratch.', privacy: 'Privacy', terms: 'Terms', support: 'Support',
    copyright: '© 2026 PackCalm. Apple and iPhone are trademarks of Apple Inc.', homeLabel: 'PackCalm home', topLabel: 'Back to the top', navigation: 'Primary navigation', language: 'Language',
  },
  'zh-Hans': {
    navHow: '使用方式', navPrivacy: '隐私', downloadFor: '下载到', device: 'iPhone',
    eyebrow: '更从容地打包', heroLine: '别再费心记。', heroAccent: '开始从容打包。',
    description: 'PackCalm 会把你常带的物品变成可重复使用的清单，让每次出发都有条理，不再漏掉重要物品。',
    seeHow: '看看如何使用', trust: ['免费下载', '无需账户', '无广告'], highlights: '产品亮点',
    home: '家', nextTrip: '下一趟旅程', departure: '出发', gate: '12号登机口 · 07:45', packed: '已打包', readyToGo: '准备出发',
    packingList: '打包清单', passport: '护照', charger: '充电器', headphones: '耳机',
    preview: 'PackCalm App 预览', tripsAlt: 'PackCalm 旅程页面', packingAlt: 'PackCalm 打包清单与进度页面', itemsAlt: 'PackCalm 个人物品库页面',
    readyCount: '9 / 14 件', readyCaption: '准备就绪', localTitle: '100% 本地保存', localCaption: '清单只属于你',
    howEyebrow: '使用方式', howTitle: '整理一次，以后每次都更快。',
    saveTitle: '保存一次', saveDescription: '建立真正属于你的常用物品库——从护照到那双最喜欢的袜子。',
    reuseTitle: '复用好用的清单', reuseDescription: '从核心清单、现成方案或过去的旅程开始，只调整本次不同的部分。',
    coreList: '我的核心清单', businessTrip: '商务出差', beachWeekend: '周末海边',
    confidenceTitle: '放心打包', confidenceDescription: '物品装进行李时逐一确认，清楚看到还有什么没带。',
    ready: '已就绪', nothingLeft: '没有遗漏',
    simpleEyebrow: '刻意保持简单', essentialsTitle: ['需要的都有。', '多余的都没有。'],
    privateTitle: '默认保护隐私', privateDescription: '旅程、备注、清单和自定义照片图标都保存在你的 iPhone 上。无需账户，没有广告或行为追踪。', privateProof: '核心打包功能可离线使用',
    freeTitle: '真正为旅行免费', freeDescription: '完整的核心打包流程永久免费。PackCalm Pro 仅提供可选的一次性解锁，不会变成又一个订阅。', freeProof: '个人物品数量不限',
    downloadEyebrow: '下一趟旅程，从容出发', downloadTitle: ['打包行李。', '放下担心。'], downloadDescription: '免费下载，无需注册。', launchNote: 'App Store 链接将在发布时启用。',
    footerTagline: '记住该带什么，不必每次从头开始。', privacy: '隐私', terms: '条款', support: '支持',
    copyright: '© 2026 PackCalm。Apple 和 iPhone 是 Apple Inc. 的商标。', homeLabel: 'PackCalm 首页', topLabel: '返回顶部', navigation: '主导航', language: '语言',
  },
  'zh-Hant': {
    navHow: '使用方式', navPrivacy: '隱私', downloadFor: '下載到', device: 'iPhone',
    eyebrow: '更從容地打包', heroLine: '別再費心記。', heroAccent: '開始從容打包。',
    description: 'PackCalm 會把你常帶的物品變成可重複使用的清單，讓每次出發都有條理，不再漏掉重要物品。',
    seeHow: '看看如何使用', trust: ['免費下載', '無需帳戶', '無廣告'], highlights: '產品亮點',
    home: '家', nextTrip: '下一趟旅程', departure: '出發', gate: '12號登機門 · 07:45', packed: '已打包', readyToGo: '準備出發',
    packingList: '打包清單', passport: '護照', charger: '充電器', headphones: '耳機',
    preview: 'PackCalm App 預覽', tripsAlt: 'PackCalm 旅程頁面', packingAlt: 'PackCalm 打包清單與進度頁面', itemsAlt: 'PackCalm 個人物品庫頁面',
    readyCount: '9 / 14 件', readyCaption: '準備就緒', localTitle: '100% 本機儲存', localCaption: '清單只屬於你',
    howEyebrow: '使用方式', howTitle: '整理一次，以後每次都更快。',
    saveTitle: '儲存一次', saveDescription: '建立真正屬於你的常用物品庫——從護照到那雙最喜歡的襪子。',
    reuseTitle: '重複使用好清單', reuseDescription: '從核心清單、現成方案或過去的旅程開始，只調整這次不同的部分。',
    coreList: '我的核心清單', businessTrip: '商務出差', beachWeekend: '週末海邊',
    confidenceTitle: '放心打包', confidenceDescription: '物品放進行李時逐一確認，清楚看到還有什麼沒帶。',
    ready: '已就緒', nothingLeft: '沒有遺漏',
    simpleEyebrow: '刻意保持簡單', essentialsTitle: ['需要的都有。', '多餘的都沒有。'],
    privateTitle: '預設保護隱私', privateDescription: '旅程、備註、清單和自訂照片圖示都保存在你的 iPhone 上。無需帳戶，沒有廣告或行為追蹤。', privateProof: '核心打包功能可離線使用',
    freeTitle: '真正為旅行免費', freeDescription: '完整的核心打包流程永久免費。PackCalm Pro 只提供可選的一次性解鎖，不會變成又一個訂閱。', freeProof: '個人物品數量不限',
    downloadEyebrow: '下一趟旅程，從容出發', downloadTitle: ['打包行李。', '放下擔心。'], downloadDescription: '免費下載，無需註冊。', launchNote: 'App Store 連結將在發佈時啟用。',
    footerTagline: '記住該帶什麼，不必每次從頭開始。', privacy: '隱私', terms: '條款', support: '支援',
    copyright: '© 2026 PackCalm。Apple 和 iPhone 是 Apple Inc. 的商標。', homeLabel: 'PackCalm 首頁', topLabel: '返回頂部', navigation: '主導覽', language: '語言',
  },
} as const;

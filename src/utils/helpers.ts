// import { Chef } from '../types'; // Chef类型未使用，暂时注释

// 生成随机食材提示 - 随机选择3个单个食材
export const getRandomIngredients = (): string => {
  const individualIngredients = [
    '鸡蛋', '番茄', '牛肉', '土豆', '洋葱', '鸡肉', '豆腐', '青菜', '蘑菇',
    '鱼肉', '生姜', '葱', '猪肉', '白菜', '虾仁', '黄瓜', '胡萝卜', '玉米', '青豆',
    '茄子', '青椒', '豆芽', '冬瓜', '南瓜', '山药', '莲藕', '菠菜', '芹菜', '韭菜',
    '豆角', '黄瓜', '西红柿', '白萝卜', '红萝卜', '豆腐皮', '腐竹', '粉丝', '木耳',
    '银耳', '紫菜', '海带', '金针菇', '香菇', '平菇', '杏鲍菇', '西兰花', '菜花',
    '圆白菜', '生菜', '油麦菜', '莴笋', '茭白', '竹笋', '芦笋', '荷兰豆', '秋葵'
  ];
  
  // 随机选择3个不重复的食材
  const shuffled = [...individualIngredients].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).join('，');
};

// 获取随机炒菜步骤
export const getRandomCookingStep = (): string => {
  const steps = [
    '正在热锅...',
    '加点盐...',
    '加点水...',
    '搅拌中...',
    '翻炒中...',
    '加点蒜...',
    '撒点辣椒...',
    '淋点酱油...',
    '切配菜...',
    '挤点柠檬...',
    '撒点香菜...',
    '大火爆炒...'
  ];
  return steps[Math.floor(Math.random() * steps.length)];
};

// 格式化菜品详情显示
export const formatDishDetails = (dish: any): string => {
  return `
**${dish.dish_name}**

**食材清单：**
主要食材：${dish.ingredients.main.join('、')}
辅助食材：${dish.ingredients.auxiliary.join('、')}
调料：${dish.ingredients.seasoning.join('、')}

**制作步骤：**
${dish.steps.map((step: any) => `
${step.step}. ${step.title}
   ${step.details.map((detail: string) => `   ${detail}`).join('\n   ')}
`).join('\n')}

**小贴士：**
${dish.tips.map((tip: string) => `• ${tip}`).join('\n')}

**风味特点：**
${dish.flavor_profile.taste}
${dish.flavor_profile.special_effect ? `\n${dish.flavor_profile.special_effect}` : ''}
${dish.disclaimer ? `\n${dish.disclaimer}` : ''}
  `;
};

// 延迟函数
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 检查食材是否有效
export const isValidIngredients = (ingredients: string): boolean => {
  return ingredients.trim().length > 0 && ingredients.trim().length < 200;
};

// 生成厨师ID
export const generateChefId = (cuisine: string): string => {
  return `chef_${cuisine}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
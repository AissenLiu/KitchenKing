import { Dish, ApiResponse } from '../types';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 菜系配置
export const CUISINES = [
  { 
    name: '湘菜', 
    emoji: '/湘菜.png', 
    color: 'text-red-600', 
    chefName: '辣椒王老张',
    completedMessages: [
      '小心烫手，赶紧尝尝！',
      '辣椒够劲，正宗湘味！',
      '火辣出锅，趁热享用！',
      '这个辣度刚刚好！',
      '湘菜精髓，一尝便知！',
      '麻辣鲜香，回味无穷！',
      '老张出品，必属精品！',
      '够辣够味，就是巴适！',
      '湖南风味，地道正宗！',
      '辣到心坎里，爽！'
    ]
  },
  { 
    name: '粤菜', 
    emoji: '/粤菜.png', 
    color: 'text-green-600', 
    chefName: '阿华师傅',
    completedMessages: [
      '请您品鉴，越吃越香！',
      '广式做法，原汁原味！',
      '清淡鲜美，营养丰富！',
      '火候刚好，嫩滑爽口！',
      '粤菜精髓，尽在其中！',
      '色香味俱全，请慢用！',
      '师傅手艺，值得信赖！',
      '岭南风味，独具特色！',
      '清香淡雅，回味甘甜！',
      '粤式经典，传统工艺！'
    ]
  },
  { 
    name: '川菜', 
    emoji: '/川菜.png', 
    color: 'text-orange-600', 
    chefName: '麻辣刘大厨',
    completedMessages: [
      '辣得巴适，赶紧吃起！',
      '川味十足，麻辣过瘾！',
      '正宗川菜，香辣开胃！',
      '麻婆豆腐般的感觉！',
      '四川火锅的味道！',
      '巴蜀风味，地道正宗！',
      '麻辣鲜香，层次丰富！',
      '刘师傅出品，必须安逸！',
      '川菜之魂，尽在此菜！',
      '辣椒花椒，双重享受！'
    ]
  },
  { 
    name: '法国菜', 
    emoji: '/法国菜.png', 
    color: 'text-blue-600', 
    chefName: 'Pierre大师',
    completedMessages: [
      'Bon appétit，慢慢品尝！',
      'C\'est magnifique，太棒了！',
      '法式浪漫，尽在盘中！',
      'Très délicieux，非常美味！',
      '米其林级别的享受！',
      'Voilà，完美呈现！',
      '法国大厨的骄傲！',
      'Exquis，精致绝伦！',
      '巴黎风味，浪漫满溢！',
      'Chef Pierre签名菜！'
    ]
  },
  { 
    name: '泰国菜', 
    emoji: '/泰国菜.png', 
    color: 'text-purple-600', 
    chefName: 'Somchai师傅',
    completedMessages: [
      '酸辣开胃，请享用！',
      'Sawasdee，泰式风味！',
      '椰浆香浓，回味无穷！',
      '冬阴功般的酸爽！',
      '泰式经典，正宗口味！',
      '香茅柠檬，清香怡人！',
      '曼谷街头的味道！',
      '酸甜辣咸，层次分明！',
       'Very good，非常棒！',
      '泰国师傅亲手制作！'
    ]
  },
  { 
    name: '俄罗斯菜', 
    emoji: '/俄罗斯.png', 
    color: 'text-indigo-600', 
    chefName: 'Ivan大叔',
    completedMessages: [
      '热乎乎出锅，快吃吧！',
      'Очень вкусно，太好吃了！',
      '俄式大餐，分量十足！',
      '西伯利亚的温暖！',
      '伏特加配菜，绝配！',
      '莫斯科风味，正宗地道！',
      '战斗民族的手艺！',
      '红菜汤般的浓郁！',
      '大叔秘制，独家配方！',
      '俄罗斯传统，世代传承！'
    ]
  }
];

// 炒菜步骤提示词
export const COOKING_STEPS = [
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

// 制作失败的幽默话语
export const ERROR_MESSAGES = [
  '太难了，做不出来！',
  '臣妾做不到呀！',
  '翻车了，下次再来！',
  '这道菜太护心了！',
  '技术不过关，告辞！',
  '实在搭不出来！',
  '我的天，太复杂了！',
  '打败，重新来过！',
  '这个难度超纲了！',
  '做砸了，换个试试！'
];

// 获取随机失败消息
export const getRandomErrorMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * ERROR_MESSAGES.length);
  return ERROR_MESSAGES[randomIndex];
};

// 获取厨师完成后的话语（随机选择）
export const getChefCompletedMessage = (cuisine: string): string => {
  const cuisineConfig = CUISINES.find(c => c.name === cuisine);
  if (cuisineConfig && cuisineConfig.completedMessages) {
    const randomIndex = Math.floor(Math.random() * cuisineConfig.completedMessages.length);
    return cuisineConfig.completedMessages[randomIndex];
  }
  return '菜品完成！';
};

// 生成API提示词
const generatePrompt = (ingredients: string, cuisine: string): string => {
  return `你是一名精通${cuisine}的五星级大厨，根据用户提供的食材创作菜谱。

食材：${ingredients}

**重要指示**：
请根据食材的特性智能判断创作风格：
- 如果是正常食材（如蔬菜、肉类、调料等），请提供专业的烹饪指导
- 如果是非食用物品或奇特组合（如电子产品、办公用品等），请用幽默夸张的方式创作，添加娱乐性质的内容

**通用要求**：
1. **智能判断风格**：根据食材特性决定是专业模式还是幽默模式
2. **${cuisine}特色**：充分体现${cuisine}的烹饪特点
3. **详细步骤**：提供完整的制作流程
4. **技术要点**：包含火候控制、预处理技巧等专业指导
5. **除了菜品名字外的所有文字都配上Emoji**

**幽默模式额外要求**（当判断为幽默模式时）：
- 用夸张和网络梗的风格描述
- 保持专业感但内容荒诞有趣
- 添加安全警告和冷笑话
- 必填免责声明提醒这只是娱乐

输出格式（严格JSON）：
\`\`\`json
{
  "dish_name": "创意菜名",
  "ingredients": {
    "main": ["主要食材"],
    "auxiliary": ["辅助食材"],
    "seasoning": ["调料"]
  },
  "steps": [
    {
      "step": 1,
      "title": "步骤名称",
      "details": ["详细说明1", "详细说明2"]
    }
  ],
  "tips": ["小贴士1", "小贴士2"],
  "flavor_profile": {
    "taste": "口感描述",
    "special_effect": "特殊效果（可选）"
  },
  "disclaimer": "免责声明（幽默模式时必填）"
}
\`\`\``;
};

// 调用DeepSeek API
export const callDeepSeekAPI = async (
  ingredients: string,
  cuisine: string,
  apiKey: string
): Promise<ApiResponse> => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  
  try {
    const prompt = generatePrompt(ingredients, cuisine);
    const requestBody = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
    };

    // 📋 打印请求详情
    console.log(`🚀 [DeepSeek API Request] ${requestId}`);
    console.log(`📝 [菜系]: ${cuisine}`);
    console.log(`🥘 [食材]: ${ingredients}`);
    console.log(`💬 [提示词]:\n${prompt}`);
    console.log(`📦 [请求体]:`, JSON.stringify(requestBody, null, 2));

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    // 📋 打印响应状态
    console.log(`📡 [响应状态] ${requestId}: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ [错误响应] ${requestId}:`, errorText);
      throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    // 📋 打印响应内容
    console.log(`✅ [API响应] ${requestId}:`);
    console.log(`📊 [完整响应]:`, JSON.stringify(data, null, 2));
    console.log(`💭 [生成内容]:\n${content}`);

    if (!content) {
      console.log(`⚠️ [内容为空] ${requestId}`);
      throw new Error('API返回内容为空');
    }

    // 提取JSON内容
    const jsonMatch = content.match(/\`\`\`json\n([\s\S]*?)\n\`\`\`/) || 
                     content.match(/{[\s\S]*}/);
    
    if (!jsonMatch) {
      console.log(`⚠️ [JSON解析失败] ${requestId}: 找不到有效的JSON格式`);
      console.log(`🔍 [原始内容]:`, content);
      throw new Error('无法解析API返回的JSON格式');
    }

    const jsonString = jsonMatch[1] || jsonMatch[0];
    console.log(`📋 [提取的JSON] ${requestId}:\n${jsonString}`);
    
    const dish: Dish = JSON.parse(jsonString);

    console.log(`🎉 [解析成功] ${requestId}: 菜品 "${dish.dish_name}" 生成成功`);

    return {
      success: true,
      data: dish
    };

  } catch (error) {
    console.log(`💥 [请求失败] ${requestId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
};

// 单个API调用并实时返回结果
export const callChefWithProgress = async (
  ingredients: string,
  cuisine: string,
  apiKey: string,
  onProgress: (result: { cuisine: string; result: ApiResponse }) => void
): Promise<{ cuisine: string; result: ApiResponse }> => {
  const result = await callDeepSeekAPI(ingredients, cuisine, apiKey);
  const finalResult = { cuisine, result };
  onProgress(finalResult);
  return finalResult;
};

// 并行调用多个API并实时更新
export const callAllChefsWithProgress = async (
  ingredients: string,
  apiKey: string,
  onProgress: (result: { cuisine: string; result: ApiResponse }) => void
): Promise<{ cuisine: string; result: ApiResponse }[]> => {
  const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  
  console.log(`🍽️ [开始批量请求] ${batchId}`);
  console.log(`👨‍🍳 [菜系数量]: ${CUISINES.length}`);
  console.log(`🥘 [统一食材]: ${ingredients}`);
  console.log(`⏱️ [预计并发]: ${CUISINES.length} 个请求同时进行`);

  const startTime = Date.now();
  let completedCount = 0;
  
  const promises = CUISINES.map(async ({ name }) => {
    const result = await callChefWithProgress(
      ingredients, 
      name, 
      apiKey, 
      (progressResult) => {
        completedCount++;
        console.log(`⚡ [实时更新] ${batchId}: ${name} 完成 (${completedCount}/${CUISINES.length})`);
        
        // 统计当前进度
        const successCount = completedCount - (progressResult.result.success ? 0 : 1);
        console.log(`📊 [当前进度] ${batchId}: ${successCount} 成功, ${completedCount - successCount} 失败`);
        
        // 调用外部回调函数进行页面更新
        onProgress(progressResult);
      }
    );
    return result;
  });

  const results = await Promise.all(promises);
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // 统计最终结果
  const successCount = results.filter(r => r.result.success).length;
  const errorCount = results.filter(r => !r.result.success).length;
  
  console.log(`📊 [批量请求完成] ${batchId}`);
  console.log(`⏱️ [总耗时]: ${duration}ms`);
  console.log(`✅ [成功]: ${successCount}/${CUISINES.length}`);
  console.log(`❌ [失败]: ${errorCount}/${CUISINES.length}`);
  
  results.forEach(({ cuisine, result }) => {
    if (result.success) {
      console.log(`🎉 [${cuisine}]: 成功生成 "${result.data?.dish_name}"`);
    } else {
      console.log(`💥 [${cuisine}]: 失败 - ${result.error}`);
    }
  });

  return results;
};

// 保持原有的callAllChefs函数以兼容性
export const callAllChefs = async (
  ingredients: string,
  apiKey: string
): Promise<{ cuisine: string; result: ApiResponse }[]> => {
  return callAllChefsWithProgress(ingredients, apiKey, () => {});
};
import React, { useState, useEffect } from 'react';
import { Chef, Dish } from './types';
import { CUISINES, callAllChefsWithProgress } from './services/deepseekApi';
import { generateChefId } from './utils/helpers';
import IngredientInput from './components/IngredientInput';
import ChefCard from './components/ChefCard';
import DishDetail from './components/DishDetail';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';

const App: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [completionOrder, setCompletionOrder] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey] = useState('sk-26801bf0212a4cbeb0dc4ecc14e5e7b5');

  // 背景音乐控制
  const backgroundMusic = useBackgroundMusic('/background-music.mp3', {
    volume: 0.2,
    loop: true
  });

  // 初始化厨师
  const initializeChefs = () => {
    return CUISINES.map(cuisine => ({
      id: generateChefId(cuisine.name),
      name: cuisine.chefName,
      cuisine: cuisine.name,
      emoji: cuisine.emoji,
      color: cuisine.color,
      status: 'idle' as const
    }));
  };

  // 处理生成菜谱
  const handleGenerate = async (ingredients: string) => {

    setIsLoading(true);
    
    // 开始播放背景音乐
    backgroundMusic.play();
    
    // 初始化厨师状态
    const initialChefs = initializeChefs().map(chef => ({
      ...chef,
      status: 'cooking' as const
    }));
    setChefs(initialChefs);

    try {
      // 重置完成顺序
      setCompletionOrder([]);
      
      // 并行调用所有API，实时更新
      await callAllChefsWithProgress(
        ingredients, 
        apiKey, 
        (progressResult) => {
          // 只有成功完成才更新完成顺序
          if (progressResult.result.success && progressResult.result.data) {
            setCompletionOrder(prev => {
              if (!prev.includes(progressResult.cuisine)) {
                return [...prev, progressResult.cuisine];
              }
              return prev;
            });
          }
          
          // 实时更新厨师状态
          setChefs(currentChefs => {
            return currentChefs.map(chef => {
              if (chef.cuisine === progressResult.cuisine) {
                if (progressResult.result.success && progressResult.result.data) {
                  return {
                    ...chef,
                    status: 'completed' as const,
                    dish: progressResult.result.data
                  };
                } else {
                  return {
                    ...chef,
                    status: 'error' as const
                  };
                }
              }
              return chef;
            });
          });
        }
      );
    } catch (error) {
      console.error('生成菜谱失败:', error);
      // 设置所有厨师为错误状态
      setChefs(initialChefs.map(chef => ({
        ...chef,
        status: 'error' as const
      })));
    } finally {
      setIsLoading(false);
      // 停止背景音乐
      backgroundMusic.stop();
    }
  };

  // 处理菜品点击
  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  // 重置状态
  const handleReset = () => {
    setChefs([]);
    setCompletionOrder([]);
    setIsLoading(false);
    setIsModalOpen(false);
    setSelectedDish(null);
    // 停止背景音乐
    backgroundMusic.stop();
  };

  // 监听所有厨师任务完成状态
  useEffect(() => {
    if (chefs.length > 0 && !isLoading) {
      const allFinished = chefs.every(chef => 
        chef.status === 'completed' || chef.status === 'error'
      );
      
      if (allFinished && backgroundMusic.isPlaying) {
        // 延迟3秒后停止音乐，让用户听到完整的循环
        setTimeout(() => {
          backgroundMusic.stop();
        }, 3000);
      }
    }
  }, [chefs, isLoading, backgroundMusic]);

  // 按完成顺序排序厨师
  const sortedChefs = [...chefs].sort((a, b) => {
    const aIndex = completionOrder.indexOf(a.cuisine);
    const bIndex = completionOrder.indexOf(b.cuisine);
    
    // 如果都已完成，按完成顺序排序
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    // 如果只有a已完成，a排在前面
    if (aIndex !== -1) {
      return -1;
    }
    // 如果只有b已完成，b排在前面
    if (bIndex !== -1) {
      return 1;
    }
    // 都未完成，保持原顺序
    return 0;
  });

  // 获取奖牌角标
  const getMedalEmoji = (cuisine: string) => {
    const index = completionOrder.indexOf(cuisine);
    switch (index) {
      case 0: return '🥇'; // 金牌
      case 1: return '🥈'; // 银牌
      case 2: return '🥉'; // 铜牌
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-100/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-green-100/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-purple-100/30 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 md:px-6 md:py-8 flex-1 flex flex-col min-h-screen">
        {/* 主要内容 */}
        <div className={`space-y-4 md:space-y-8 ${chefs.length === 0 ? 'flex-1 flex flex-col justify-center' : 'flex-1'}`}>
          {/* 输入区域 */}
          <IngredientInput
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          {/* 厨师展示区域 */}
          {chefs.length > 0 && (
            <div className="space-y-6 md:space-y-8">
              {/* 状态统计和重置按钮 */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white/50">
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm pixel-text">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400"></div>
                    <span>制作中: {chefs.filter(c => c.status === 'cooking').length}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500"></div>
                    <span>已完成: {chefs.filter(c => c.status === 'completed').length}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500"></div>
                    <span>失败: {chefs.filter(c => c.status === 'error').length}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* 音乐控制按钮 */}
                  <button
                    onClick={() => backgroundMusic.isPlaying ? backgroundMusic.pause() : backgroundMusic.play()}
                    className="px-2 py-2 sm:px-3 sm:py-2 btn-pixel text-xs sm:text-sm transition-transform hover:scale-105"
                    title={backgroundMusic.isPlaying ? '暂停音乐' : '播放音乐'}
                  >
                    {backgroundMusic.isPlaying ? '🔇' : '🎵'}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={isLoading || chefs.some(chef => chef.status === 'cooking')}
                    className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 btn-pixel text-xs sm:text-sm md:text-base transition-transform ${
                      isLoading || chefs.some(chef => chef.status === 'cooking')
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-105'
                    }`}
                  >
                    重新开始
                  </button>
                </div>
              </div>

              {/* 厨师卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {sortedChefs.map((chef) => (
                  <div key={chef.id} className="relative group">
                    {/* 奖牌角标 */}
                    {getMedalEmoji(chef.cuisine) && (
                      <div className="absolute -top-3 -right-3 z-20 text-3xl medal-celebration animate-bounce">
                        {getMedalEmoji(chef.cuisine)}
                      </div>
                    )}
                    {/* 排名显示 - 只显示第4名及以后 */}
                    {chef.status === 'completed' && completionOrder.indexOf(chef.cuisine) > 2 && (
                      <div className="absolute -top-2 -left-2 z-10 w-7 h-7 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600 text-white text-xs font-bold shadow-md">
                        {completionOrder.indexOf(chef.cuisine) + 1}
                      </div>
                    )}
                    <ChefCard
                      chef={chef}
                      onDishClick={handleDishClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 菜品详情弹窗 */}
      <DishDetail
        dish={selectedDish}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

    </div>
  );
};

export default App;
import React, { useState, useEffect, useCallback } from 'react';
import { getRandomIngredients, isValidIngredients } from '../utils/helpers';

interface IngredientInputProps {
  onGenerate: (ingredients: string) => void;
  isLoading: boolean;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onGenerate, isLoading }) => {
  const [ingredients, setIngredients] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // 食材提示词列表
  const placeholders = [
    '鸡蛋，番茄，牛肉',
    '土豆，洋葱，鸡肉',
    '豆腐，青菜，蘑菇',
    '鱼肉，生姜，葱',
    '猪肉，白菜，豆腐',
    '虾仁，黄瓜，鸡蛋',
    '牛肉，胡萝卜，土豆',
    '鸡肉，玉米，青豆'
  ];

  // 轮播显示提示词
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 更新当前提示词
  useEffect(() => {
    setPlaceholder(placeholders[placeholderIndex]);
  }, [placeholderIndex]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isValidIngredients(ingredients) && !isLoading) {
      onGenerate(ingredients.trim());
    }
  }, [ingredients, onGenerate, isLoading]);

  const handleRandomIngredients = useCallback(() => {
    const randomIngredients = getRandomIngredients();
    setIngredients(randomIngredients);
  }, []);

  const isValid = isValidIngredients(ingredients);

  return (
    <>
      {/* 优化的头部区域 */}
      <div className="w-full max-w-2xl mx-auto mb-4 md:mb-8">
        <div className="p-4 md:p-6">
          {/* 皇冠和标题组合 */}
          <div className="text-center space-y-3 md:space-y-4">
            <div className="relative inline-block">
              <img 
                src="/crown.png" 
                alt="皇冠" 
                className="w-20 h-20 md:w-28 md:h-28 mx-auto drop-shadow-lg pixel-hover" 
              />
              <div className="absolute -inset-2 bg-yellow-200/20 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl font-bold pixel-title text-black drop-shadow-sm">
                厨王争霸
              </h1>
              <p className="text-xs md:text-sm pixel-text text-gray-600 max-w-md mx-auto leading-relaxed">
                输入你的食材，让各大菜系的名厨为你创造独特菜谱
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 输入区域 */}
      <div className="w-full max-w-2xl mx-auto p-4 md:p-6 card-pixel pixel-border bg-white">

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* 食材输入区域 */}
          <div className="space-y-3">
            <label htmlFor="ingredients" className="block text-sm md:text-base font-medium pixel-text text-gray-800">
              🥬 输入你的食材
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="ingredients"
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder={`例如：${placeholder}`}
                  className="w-full px-4 py-3 md:px-5 md:py-4 input-pixel text-sm md:text-base"
                  disabled={isLoading}
                />
                {/* 输入状态指示器 */}
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
                  isValid ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>
              <button
                type="button"
                onClick={handleRandomIngredients}
                className="px-4 py-3 md:px-5 md:py-4 btn-pixel text-sm md:text-base whitespace-nowrap hover:scale-105 transition-transform"
                disabled={isLoading}
                title="随机选择食材"
              >
                随机
              </button>
            </div>
            {/* 输入提示 */}
            <p className="text-xs text-gray-500 pixel-text">
              多个食材请用逗号分隔，如：鸡蛋，番茄，牛肉
            </p>
          </div>

          {/* 生成按钮 */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full py-4 md:py-5 px-6 font-medium btn-pixel text-sm md:text-base transition-all duration-200 ${
              isValid && !isLoading
                ? 'hover:scale-105 hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed opacity-60'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="pixel-loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>厨师们正在制作中...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>开始厨王争霸</span>
              </span>
            )}
          </button>
        </form>

    </div>
    </>
  );
};

export default IngredientInput;
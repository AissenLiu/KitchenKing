import React, { useState, useEffect } from 'react';
import { Chef, Dish } from '../types';
import { getRandomCookingStep } from '../utils/helpers';
import { getChefCompletedMessage, getRandomErrorMessage } from '../services/deepseekApi';
import Celebration from './Celebration';

interface ChefCardProps {
  chef: Chef;
  onDishClick: (dish: Dish) => void;
}

const ChefCard: React.FC<ChefCardProps> = ({ chef, onDishClick }) => {
  const [currentStep, setCurrentStep] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // 更新炒菜步骤
  useEffect(() => {
    if (chef.status === 'cooking') {
      const interval = setInterval(() => {
        setCurrentStep(getRandomCookingStep());
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [chef.status]);

  // 检测厨师完成状态并触发庆祝
  useEffect(() => {
    if (chef.status === 'completed' && !hasCelebrated) {
      setHasCelebrated(true);
      setShowCelebration(true);
      
      // 3秒后隐藏庆祝特效
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [chef.status, hasCelebrated]);

  const getCardClasses = () => {
    const baseClasses = 'w-full p-4 sm:p-5 md:p-6 card-pixel transition-all duration-300 min-h-[120px] sm:min-h-[130px] md:min-h-[140px] flex flex-col';
    
    switch (chef.status) {
      case 'cooking':
        return `${baseClasses} bg-gradient-to-br from-yellow-50 to-orange-50 text-black border-yellow-300 shadow-lg transform hover:scale-102`;
      case 'completed':
        return `${baseClasses} bg-gradient-to-br from-green-50 to-white text-black border-green-400 shadow-xl ${hasCelebrated ? 'celebrate-chef' : ''}`;
      case 'error':
        return `${baseClasses} bg-gradient-to-br from-red-50 to-gray-100 text-red-800 border-red-400`;
      default:
        return `${baseClasses} bg-white text-black hover:bg-gray-50`;
    }
  };

  const getStatusText = () => {
    switch (chef.status) {
      case 'idle':
        return '待命中...';
      case 'cooking':
        return currentStep || '正在努力炒菜中...';
      case 'completed':
        return getChefCompletedMessage(chef.cuisine);
      case 'error':
        return getRandomErrorMessage();
      default:
        return '';
    }
  };

  const getStatusAnimation = () => {
    switch (chef.status) {
      case 'cooking':
        return 'animate-bounce-slow';
      case 'completed':
        return 'animate-pulse-slow';
      default:
        return '';
    }
  };

  const getTextAnimation = () => {
    if (chef.status === 'cooking') {
      return 'animate-fade-in-out text-visible';
    }
    return '';
  };

  return (
    <div className={getCardClasses()}>
      {/* 庆祝特效 */}
      <Celebration trigger={showCelebration} />
      
      {/* 卡片头部 */}
      <div className="flex items-start gap-3 sm:gap-4 mb-3">
        {/* 厨师头像和状态 */}
        <div className="relative flex-shrink-0">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 ${getStatusAnimation()}`}>
            <img 
              src={chef.emoji} 
              alt={chef.name}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          {/* 状态指示器 */}
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 border border-white ${
            chef.status === 'cooking' ? 'bg-yellow-400 animate-pulse' :
            chef.status === 'completed' ? 'bg-green-500' :
            chef.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
          }`}></div>
        </div>
        
        {/* 厨师信息 */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="space-y-1 sm:space-y-2">
            {/* 名字和菜系标签 */}
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-sm sm:text-base md:text-lg font-bold pixel-title leading-tight flex-1 min-w-0 ${
                chef.status === 'cooking' ? 'text-gray-900' : 
                chef.status === 'completed' ? 'text-gray-900' :
                chef.status === 'error' ? 'text-red-900' :
                'text-gray-900'
              }`}>
                {chef.name}
              </h3>
              
              <span className={`text-xs px-2 py-1 pixel-badge flex-shrink-0 border text-center ${
                chef.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                chef.status === 'cooking' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                chef.status === 'error' ? 'bg-red-100 text-red-800 border-red-300' :
                'bg-gray-100 text-gray-800 border-gray-300'
              }`}>
                {chef.cuisine}
              </span>
            </div>
            
            {/* 状态文字 */}
            <div className={`text-xs sm:text-sm font-medium pixel-text leading-tight text-gray-600 ${getTextAnimation()}`}>
              {getStatusText()}
            </div>
          </div>
        </div>
      </div>
      
      {/* 卡片内容区域 */}
      <div className="flex-1 flex flex-col justify-end">
        {/* 完成的菜品 */}
        {chef.status === 'completed' && chef.dish && (
          <div className="mt-2 p-2 sm:p-3 bg-white/60 cursor-pointer hover:bg-white/80 transition-colors duration-200"
               onClick={() => onDishClick(chef.dish!)}>
            <div className="text-center">
              <h4 className="font-semibold pixel-text text-gray-900 text-xs sm:text-sm leading-tight">
                {chef.dish.dish_name}
              </h4>
            </div>
          </div>
        )}
        
        {/* 错误信息 */}
        {chef.status === 'error' && (
          <div className="mt-2 p-2 sm:p-3 bg-red-50 border border-red-300">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-red-500 text-xs sm:text-sm">😅</span>
              <p className="text-xs pixel-text text-red-700 leading-tight">
                {getRandomErrorMessage()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefCard;
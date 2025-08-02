import React from 'react';
import { Dish } from '../types';

interface DishDetailProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

const DishDetail: React.FC<DishDetailProps> = ({ dish, isOpen, onClose }) => {
  if (!isOpen || !dish) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 p-2 md:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white border-2 border-black w-full max-w-[98vw] md:max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-hidden">
        {/* 简约头部 */}
        <div className="border-b-2 border-black p-4 md:p-6">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-2xl font-bold pixel-title truncate pr-4 text-black">
                {dish.dish_name}
              </h2>
              <p className="text-xs md:text-sm pixel-text mt-1 text-gray-600">
                详细制作方法和小贴士
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 text-lg md:text-xl"
              title="关闭"
            >
              ×
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-180px)] md:max-h-[calc(90vh-200px)] custom-scrollbar">
          {/* 食材清单 */}
          <div className="mb-6 md:mb-8">
            <div className="border-b border-black pb-2 mb-4">
              <h3 className="text-base md:text-lg font-semibold pixel-title text-black">
                食材清单
              </h3>
            </div>
            {/* 移动端统一列表布局 */}
            <div className="block md:hidden space-y-4">
              {/* 主要食材 */}
              <div className="border border-black p-4">
                <h4 className="font-medium pixel-text text-black mb-3 text-lg border-b border-gray-300 pb-2">主要食材</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {dish.ingredients.main.map((ingredient, index) => (
                    <div key={index} className="flex items-start text-gray-700">
                      <span className="mr-2 text-black flex-shrink-0">•</span>
                      <span className="text-sm leading-relaxed">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 辅助食材 */}
              <div className="border border-black p-4">
                <h4 className="font-medium pixel-text text-black mb-3 text-lg border-b border-gray-300 pb-2">辅助食材</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {dish.ingredients.auxiliary.map((ingredient, index) => (
                    <div key={index} className="flex items-start text-gray-700">
                      <span className="mr-2 text-black flex-shrink-0">•</span>
                      <span className="text-sm leading-relaxed">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 调料配菜 */}
              <div className="border border-black p-4">
                <h4 className="font-medium pixel-text text-black mb-3 text-lg border-b border-gray-300 pb-2">调料配菜</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {dish.ingredients.seasoning.map((ingredient, index) => (
                    <div key={index} className="flex items-start text-gray-700">
                      <span className="mr-2 text-black flex-shrink-0">•</span>
                      <span className="text-sm leading-relaxed">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 桌面端网格布局 */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
              <div className="border border-black p-3">
                <h4 className="font-medium pixel-text text-black mb-2 text-base">主要食材</h4>
                <ul className="text-base space-y-1 pixel-text">
                  {dish.ingredients.main.map((ingredient, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="mr-2 text-black">•</span>
                      <span className="flex-1 leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-black p-3">
                <h4 className="font-medium pixel-text text-black mb-2 text-base">辅助食材</h4>
                <ul className="text-base space-y-1 pixel-text">
                  {dish.ingredients.auxiliary.map((ingredient, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="mr-2 text-black">•</span>
                      <span className="flex-1 leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-black p-3">
                <h4 className="font-medium pixel-text text-black mb-2 text-base">调料配菜</h4>
                <ul className="text-base space-y-1 pixel-text">
                  {dish.ingredients.seasoning.map((ingredient, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="mr-2 text-black">•</span>
                      <span className="flex-1 leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 制作步骤 */}
          <div className="mb-6 md:mb-8">
            <div className="border-b border-black pb-2 mb-4">
              <h3 className="text-base md:text-lg font-semibold pixel-title text-black">
                制作步骤
              </h3>
            </div>
            <div className="space-y-4">
              {dish.steps.map((step, index) => (
                <div key={index} className="border border-black p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 border-2 border-black bg-white text-black flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2 pixel-text text-black text-base">
                        {step.title}
                      </h4>
                      <ul className="text-base space-y-1 pixel-text text-gray-700">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <span className="mr-2 text-black">•</span>
                            <span className="flex-1 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 小贴士 */}
          {dish.tips.length > 0 && (
            <div className="mb-6 md:mb-8">
              <div className="border-b border-black pb-2 mb-3">
                <h3 className="text-lg md:text-xl font-semibold pixel-title text-black">
                  制作小贴士
                </h3>
              </div>
              <div className="border border-black p-3">
                <ul className="text-base space-y-2 pixel-text">
                  {dish.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-black">•</span>
                      <span className="flex-1 leading-relaxed text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 风味特点 */}
          <div className="mb-6 md:mb-8">
            <div className="border-b border-black pb-2 mb-3">
              <h3 className="text-lg md:text-xl font-semibold pixel-title text-black">
                风味特点
              </h3>
            </div>
            <div className="border border-black p-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-medium pixel-text text-black text-base">口感：</span>
                <span className="pixel-text text-gray-700 text-base leading-relaxed">{dish.flavor_profile.taste}</span>
              </div>
              {dish.flavor_profile.special_effect && (
                <div className="flex items-start gap-2 border-t border-gray-300 pt-2">
                  <span className="font-medium pixel-text text-black text-base">特色：</span>
                  <span className="pixel-text text-gray-700 text-base leading-relaxed">{dish.flavor_profile.special_effect}</span>
                </div>
              )}
            </div>
          </div>

          {/* 免责声明 */}
          {dish.disclaimer && (
            <div className="mb-6">
              <div className="border-b border-black pb-2 mb-3">
                <h3 className="text-lg md:text-xl font-semibold pixel-title text-black">
                  免责声明
                </h3>
              </div>
              <div className="border border-black p-3">
                <p className="text-base pixel-text text-gray-700 leading-relaxed">
                  {dish.disclaimer}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* 简约底部按钮 */}
        <div className="border-t-2 border-black px-4 md:px-6 py-4 md:py-6 flex-shrink-0 bg-white">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 md:py-4 px-4 font-medium border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-200 pixel-text"
            >
              我学会了
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
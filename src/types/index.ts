export interface Ingredient {
  name: string;
  category: 'main' | 'auxiliary' | 'seasoning';
}

export interface CookingStep {
  step: number;
  title: string;
  details: string[];
}

export interface FlavorProfile {
  taste: string;
  special_effect?: string;
}

export interface Dish {
  dish_name: string;
  ingredients: {
    main: string[];
    auxiliary: string[];
    seasoning: string[];
  };
  steps: CookingStep[];
  tips: string[];
  flavor_profile: FlavorProfile;
  disclaimer?: string;
}

export interface Chef {
  id: string;
  name: string;
  cuisine: string;
  emoji: string; // 现在存储图片路径
  color: string;
  status: 'idle' | 'cooking' | 'completed' | 'error';
  dish?: Dish;
  cookingStep?: string;
}

export type ChefStatus = Chef['status'];

export interface ApiResponse {
  success: boolean;
  data?: Dish;
  error?: string;
}

export interface AppSettings {
  deepseekApiKey: string;
  chefCount: number;
  cookingSteps: string[];
}
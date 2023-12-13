export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    category: CategoryDTO; 
    inventoryStock: number;
    createdDate: string;
    updatedDate: string;
  }
  
  export interface CategoryDTO {
    id: number;
    name: string;
    description: string;
  }
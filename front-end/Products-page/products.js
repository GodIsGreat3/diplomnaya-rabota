const products = [
    {
        id: 1,
        name: "Gradient Graphic T-shirt",
        price: 180,
        originalPrice: 240,
        discount: 20,
        category: "Футболки",
        rating: 4.5,
        reviews: 124,
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["white", "black", "gray"],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Классическая футболка из 100% хлопка. Идеально подходит для повседневной носки.",
        isNew: false,
        isFeatured: true
    },
    {
        id: 2,
        name: "Black Striped T-shirt",
        price: 250,
        originalPrice: 359,
        discount: 15,
        category: "Джинсы",
        rating: 4.2,
        reviews: 89,
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["blue", "black", "gray"],
        sizes: ["S", "M", "L", "XL"],
        description: "Стильные облегающие джинсы с высокой посадкой. Отлично сидят и подчеркивают фигуру.",
        isNew: false,
        isFeatured: false
    },
    {
        id: 3,
        name: "Hooded Sweatshirt",
        price: 249,
        originalPrice: null,
        discount: null,
        category: "Толстовки",
        rating: 4.8,
        reviews: 156,
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["red", "black", "gray", "blue"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        description: "Тёплая и уютная толстовка с капюшоном. Подходит для прохладной погоды и спортивных тренировок.",
        isNew: true,
        isFeatured: true
    },
    {
        id: 4,
        name: "LOOSE FIT BERMUDA SHORTS",
        price: 179,
        originalPrice: 229,
        discount: 20,
        category: "Шорты",
        rating: 3.9,
        reviews: 67,
        images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["blue", "black"],
        sizes: ["XS", "S", "M", "L"],
        description: "Джинсовые шорты свободного кроя. Идеально подходят для жаркой летней погоды.",
        isNew: false,
        isFeatured: false
    },
    {
        id: 5,
        name: "VERTICAL STRIPED SHIRT",
        price: 199,
        originalPrice: null,
        discount: null,
        category: "Рубашки",
        rating: 4.1,
        reviews: 42,
        images: ["https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["red", "blue", "green"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Классическая рубашка в клетку из натурального хлопка. Хорошо сочетается с джинсами и брюками.",
        isNew: false,
        isFeatured: true
    },
    
    {
        id: 7,
        name: "Polo with Tipping Details",
        price: 129,
        originalPrice: null,
        discount: null,
        category: "Футболки",
        rating: 4.7,
        reviews: 93,
        images: ["https://images.unsplash.com/photo-1572539188687-4113c4b74e8f?q=80&w=2135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        colors: ["white", "black", "gray"],
        sizes: ["XS", "S", "M", "L"],
        description: "Стильная футболка с оригинальным принтом. Сделана из 100% хлопка премиального качества.",
        isNew: true,
        isFeatured: true
    },
    {
        id: 8,
        name: "Straight Jeans",
        price: 279,
        originalPrice: null,
        discount: null,
        category: "Джинсы",
        rating: 4.4,
        reviews: 76,
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["blue", "black"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Прямые джинсы классического кроя. Универсальная модель, которая подойдет для любого случая.",
        isNew: false,
        isFeatured: false
    },
    {
        id: 9,
        name: "Basic Shirt",
        price: 169,
        originalPrice: 219,
        discount: 20,
        category: "Рубашки",
        rating: 4.0,
        reviews: 51,
        images: ["https://images.unsplash.com/photo-1685328403783-00925c2a4301?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1583691690382-3996ddbb37c2?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1622736000556-cbc2ab91f00f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1628093413155-5925b858791b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1676790408056-d9f15be7f8fb?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1542849987-9300fd7aa983?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1542925581-8db3deffbebb?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1730926113324-2ed98f695074?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1735323694299-e23e3a49e71a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        colors: ["white", "blue", "black"],
        sizes: ["S", "M", "L", "XL"],
        description: "Базовая рубашка из хлопка. Прямой крой и минималистичный дизайн позволяют сочетать ее с любой одеждой.",
        isNew: false,
        isFeatured: true
    },
    {
        id: 10,
        name: "Sports Shorts",
        price: 129,
        originalPrice: null,
        discount: null,
        category: "Шорты",
        rating: 4.6,
        reviews: 112,
        images: ["https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["black", "gray", "blue"],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Удобные спортивные шорты с карманами. Идеальны для тренировок и активного отдыха.",
        isNew: true,
        isFeatured: false
    },
    {
        id: 11,
        name: "Polo T-shirt",
        price: 159,
        originalPrice: 199,
        discount: 20,
        category: "Футболки",
        rating: 4.2,
        reviews: 68,
        images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
        colors: ["white", "black", "blue", "red"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Классическая футболка поло из хлопка пике. Отлично подходит как для повседневной носки, так и для особых случаев.",
        isNew: false,
        isFeatured: true
    },
    {
        id: 12,
        name: "Patterned Sweatshirt",
        price: 229,
        originalPrice: 279,
        discount: 15,
        category: "Толстовки",
        rating: 4.3,
        reviews: 47,
        images: ["https://images.unsplash.com/photo-1642978277577-83c6ceac4820?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        colors: ["black", "gray", "white"],
        sizes: ["XS", "S", "M", "L"],
        description: "Стильная толстовка с оригинальным узором. Теплая и комфортная, подходит для прохладной погоды.",
        isNew: false,
        isFeatured: false
    }
];

// Color map
const colorMap = {
    "red": "#FF0000",
    "green": "#00FF00",
    "blue": "#0000FF",
    "yellow": "#FFFF00",
    "orange": "#FFA500",
    "purple": "#800080",
    "pink": "#FFC0CB",
    "cyan": "#00FFFF",
    "white": "#FFFFFF",
    "black": "#000000",
    "gray": "#808080"
};
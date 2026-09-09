// Simulamos una llamada asíncrona a una API externa usando setTimeout
const products = [
  {
    id: 1,
    name: "Auriculares Bluetooth XPods",
    category: "Auriculares",
    price: 15000,
    stock: 20,
    img: "/img/auriculares-xpods.jpg",
    description: "Auriculares inalámbricos con cancelación de ruido y estuche de carga."
  },
  {
    id: 2,
    name: "Smartwatch Fit Pro",
    category: "Smartwatches",
    price: 28000,
    stock: 12,
    img: "/img/smartwatch-fitpro.jpg",
    description: "Reloj inteligente con monitor de ritmo cardíaco y notificaciones."
  },
  {
    id: 3,
    name: "Cargador Inalámbrico Rápido 15W",
    category: "Cargadores",
    price: 8500,
    stock: 30,
    img: "/img/cargador-inalambrico.jpg",
    description: "Base de carga rápida compatible con la mayoría de smartphones."
  },
  {
    id: 4,
    name: "Funda Protectora Universal",
    category: "Accesorios",
    price: 4200,
    stock: 45,
    img: "/img/funda-protectora.jpg",
    description: "Funda resistente a golpes y caídas, diseño universal."
  },
  {
    id: 5,
    name: "Auriculares In-Ear Deportivos",
    category: "Auriculares",
    price: 9800,
    stock: 18,
    img: "/img/auriculares-inear.jpg",
    description: "Ideales para entrenar, resistentes al sudor y con ajuste ergonómico."
  },
  {
    id: 6,
    name: "Cargador Portátil 10000mAh",
    category: "Cargadores",
    price: 12500,
    stock: 15,
    img: "/img/cargador-portatil.jpg",
    description: "Batería externa de alta capacidad con doble puerto USB."
  }
];

// Retorna una Promise que resuelve con el array de productos luego de 2 segundos
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 2000);
  });
};

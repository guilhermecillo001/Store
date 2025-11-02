// FORMATO DO PREÇO:
// Use números para price e oldPrice.
// Se oldPrice for null ou não existir, o preço normal será mostrado.
// Se oldPrice for um número, o preço de promoção será ativado.

// Use placehold.co para imagens provisórias (formato: Largura x Altura)

const products = [
    {
        id: 1,
        name: "Camiseta Básica Branca",
        price: 49.90,
        oldPrice: 69.90, // Preço antigo (riscado)
        image: "img/mod1.png",
        category: "feminino",
        tags: ["camiseta", "basico"],
        sizes: ["P", "M", "G", "GG"],
        description: "Camiseta 100% algodão com toque macio. Perfeita para o dia a dia."
    },
    {
        id: 2,
        name: "Calça Jeans Skinny",
        price: 129.90,
        oldPrice: null,
        image: "img/mod2.png",
        category: "feminino",
        tags: ["calca", "jeans"],
        sizes: ["36", "38", "40", "42", "44"],
        description: "Calça jeans com elastano, modelagem skinny que se ajusta ao corpo."
    },
    {
        id: 3,
        name: "Vestido Floral",
        price: 159.90,
        oldPrice: 199.90,
        image: "img/mod3.png",
        category: "feminino",
        tags: ["vestido", "floral"],
        sizes: ["P", "M", "G"],
        description: "Vestido leve e fluído com estampa floral. Ideal para o verão."
    },
    {
        id: 4,
        name: "Jaqueta de Couro (Sintético)",
        price: 249.90,
        oldPrice: null,
        image: "img/mod4.png",
        category: "feminino",
        tags: ["jaqueta", "couro"],
        sizes: ["M", "G", "GG"],
        description: "Jaqueta estilo 'biker' em material sintético de alta qualidade."
    },
    {
        id: 5,
        name: "Camisa Polo Preta",
        price: 89.90,
        oldPrice: null,
        image: "img/mod1mas.png",
        category: "masculino",
        tags: ["camiseta", "polo"],
        sizes: ["P", "M", "G", "GG"],
        description: "Camisa polo em piquet, confortável e estilosa."
    },
    {
        id: 6,
        name: "Bermuda Cargo",
        price: 99.90,
        oldPrice: 119.90,
        image: "img/mod2mas.png",
        category: "masculino",
        tags: ["bermuda", "cargo"],
        sizes: ["38", "40", "42", "44", "46"],
        description: "Bermuda cargo com bolsos laterais, prática e resistente."
    },
     {
        id: 7,
        name: "Bermuda Cargo",
        price: 99.90,
        oldPrice: 119.90,
        image: "img/mod3mas.png",
        category: "masculino",
        tags: ["bermuda", "cargo"],
        sizes: ["38", "40", "42", "44", "46"],
        description: "Bermuda cargo com bolsos laterais, prática e resistente."
    },
    {
        id: 8,
        name: "Blusa Ciganinha Plus",
        price: 79.90,
        oldPrice: null,
        image: "img/modplus1.png",
        category: "plus-size",
        tags: ["blusa"],
        sizes: ["G1", "G2", "G3"],
        description: "Blusa ombro a ombro (ciganinha) em viscose. Super confortável."
    },
    {
        id: 9,
        name: "Calça Jogger Plus",
        price: 139.90,
        oldPrice: 159.90,
        image: "img/modplus2.png",
        category: "plus-size",
        tags: ["calca", "jogger"],
        sizes: ["G1", "G2", "G3", "G4"],
        description: "Calça jogger em moletom, perfeita para um look casual."
    },
    {
        id: 9,
        name: "Calça Jogger Plus",
        price: 139.90,
        oldPrice: 159.90,
        image: "img/modplus2.png",
        category: "plus-size",
        tags: ["calca", "jogger"],
        sizes: ["G1", "G2", "G3", "G4"],
        description: "Calça jogger em moletom, perfeita para um look casual."
    }
    // Adicione quantos produtos quiser...
];
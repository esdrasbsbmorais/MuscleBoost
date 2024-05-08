const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
    // Proteínas
    {
      name: "Whey Protein Concentrado",
      description: "Suplemento de proteína concentrada ideal para ganho muscular.",
      price: 149.99,
      quantity: 50,
      photoPath: "/products/whey-protein-concentrado.png",
      flavor: ["Chocolate", "Baunilha", "Morango"],
      size: ["900g", "2kg"],
      brand: "MusclePharm",
      type: "Proteína",
    },
    {
      name: "Whey Protein Isolado",
      description: "Suplemento de proteína isolada de alta qualidade.",
      price: 199.99,
      quantity: 50,
      photoPath: "/products/whey-protein-isolado.png",
      flavor: ["Baunilha", "Morango", "Chocolate"],
      size: ["900g", "2kg"],
      brand: "Optimum Nutrition",
      type: "Proteína",
    },
    {
      name: "Whey Protein Hidrolisado",
      description: "Suplemento de proteína hidrolisada para absorção rápida.",
      price: 229.99,
      quantity: 50,
      photoPath: "/products/whey-protein-hidrolisado.png",
      flavor: ["Morango", "Baunilha", "Chocolate"],
      size: ["900g", "2kg"],
      brand: "Dymatize",
      type: "Proteína",
    },
    {
      name: "Caseína Micelar",
      description: "Suplemento de proteína de liberação lenta ideal para a noite.",
      price: 129.99,
      quantity: 50,
      photoPath: "/products/caseina-micelar.png",
      flavor: ["Cookies and Cream", "Chocolate", "Baunilha"],
      size: ["900g", "2kg"],
      brand: "MuscleTech",
      type: "Proteína",
    },
    {
      name: "Proteína Vegana",
      description: "Suplemento de proteína vegana ideal para dieta plant-based.",
      price: 139.99,
      quantity: 50,
      photoPath: "/products/proteina-vegana.png",
      flavor: ["Chocolate", "Baunilha"],
      size: ["600g", "1kg"],
      brand: "Vega",
      type: "Proteína",
    },
    // Pré-Treino
    {
      name: "Pré-treino em pó",
      description: "Suplemento pré-treino para energia e foco durante o treino.",
      price: 119.99,
      quantity: 50,
      photoPath: "/products/pre-treino-em-po.png",
      flavor: ["Fruit Punch", "Blue Raspberry"],
      size: ["300g", "500g"],
      brand: "C4",
      type: "Pré-Treino",
    },
    {
      name: "Óxido Nítrico (NO) Boosters",
      description: "Suplemento para melhorar o fluxo sanguíneo durante o treino.",
      price: 129.99,
      quantity: 50,
      photoPath: "/products/oxido-nitrico.png",
      flavor: "Neutro",
      size: ["300g", "500g"],
      brand: "BSN",
      type: "Pré-Treino",
    },
    {
      name: "Energéticos pré-treino em gel",
      description: "Energético em gel para dar um impulso extra no treino.",
      price: 99.99,
      quantity: 50,
      photoPath: "/products/energetico-pre-treino-gel.png",
      flavor: ["Limão", "Morango"],
      size: ["30ml", "50ml"],
      brand: "GU Energy",
      type: "Pré-Treino",
    },
    // BCAAs
    {
      name: "BCAA em pó 2:1:1",
      description: "Suplemento de BCAA em pó na proporção 2:1:1.",
      price: 89.99,
      quantity: 50,
      photoPath: "/products/bcaa-em-po.png",
      flavor: ["Tangerina", "Limão", "Morango"],
      size: ["300g", "500g"],
      brand: "XTEND",
      type: "BCAA",
    },
    {
      name: "BCAA em cápsulas",
      description: "Suplemento de BCAA em cápsulas.",
      price: 79.99,
      quantity: 50,
      photoPath: "/products/bcaa-em-capsulas.png",
      flavor: "Neutro",
      size: ["90 cápsulas", "180 cápsulas"],
      brand: "Optimum Nutrition",
      type: "BCAA",
    },
    {
      name: "BCAA líquido",
      description: "Suplemento de BCAA em formato líquido.",
      price: 69.99,
      quantity: 50,
      photoPath: "/products/bcaa-em-liquido.png",
      flavor: ["Laranja", "Limão"],
      size: ["500ml", "1L"],
      brand: "Ultimate Nutrition",
      type: "BCAA",
    },
    // Creatina
    {
      name: "Monohidrato de Creatina",
      description: "Suplemento de creatina monohidratada para ganho de força.",
      price: 59.99,
      quantity: 50,
      photoPath: "/products/monohidrato-de-creatina.png",
      flavor: "Neutro",
      size: ["300g", "500g"],
      brand: "Universal Nutrition",
      type: "Creatina",
    },
    {
      name: "Creatina Micronizada",
      description: "Suplemento de creatina micronizada para melhor absorção.",
      price: 69.99,
      quantity: 50,
      photoPath: "/products/creatina-micronizada.png",
      flavor: "Neutro",
      size: ["300g", "500g"],
      brand: "Optimum Nutrition",
      type: "Creatina",
    },
    {
      name: "Creatina Kre-Alkalyn",
      description: "Suplemento de creatina Kre-Alkalyn para desempenho atlético.",
      price: 79.99,
      quantity: 50,
      photoPath: "/products/creatina-kre-alkalyn.png",
      flavor: "Neutro",
      size: ["300g", "500g"],
      brand: "EFX Sports",
      type: "Creatina",
    },
    {
      name: "Creatina HCL (Cloridrato de Creatina)",
      description: "Suplemento de creatina HCL para absorção rápida.",
      price: 89.99,
      quantity: 50,
      photoPath: "/products/creatina-hcl.png",
      flavor: "Neutro",
      size: ["300g", "500g"],
      brand: "Kaged Muscle",
      type: "Creatina",
    },
    // Emagrecimento e Definição
    {
      name: "Termogênicos",
      description: "Suplemento termogênico para perda de gordura.",
      price: 79.99,
      quantity: 50,
      photoPath: "/products/termogenicos.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Hydroxycut",
      type: "Emagrecimento e Definição",
    },
    {
      name: "L-Carnitina",
      description: "Suplemento de L-Carnitina para queima de gordura.",
      price: 69.99,
      quantity: 50,
      photoPath: "/products/l-carnitina.png",
      flavor: "Neutro",
      size: ["300ml", "500ml"],
      brand: "NOW Foods",
      type: "Emagrecimento e Definição",
    },
    {
      name: "Queimadores de gordura",
      description: "Suplemento queimador de gordura para perda de peso.",
      price: 89.99,
      quantity: 50,
      photoPath: "/products/queimadores-de-gordura.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Grenade",
      type: "Emagrecimento e Definição",
    },
    // Vitaminas e Minerais
    {
      name: "Multivitamínicos específicos para atletas",
      description: "Multivitamínico para atender as necessidades dos atletas.",
      price: 59.99,
      quantity: 50,
      photoPath: "/products/multivitaminicos-atletas.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Animal Pak",
      type: "Vitaminas e Minerais",
    },
    {
      name: "Zinco e Magnésio (ZMA)",
      description: "Suplemento de Zinco e Magnésio para recuperação muscular.",
      price: 49.99,
      quantity: 50,
      photoPath: "/products/zma.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "SNAC System",
      type: "Vitaminas e Minerais",
    },
    {
      name: "Vitamina D3 + K2",
      description: "Suplemento de Vitamina D3 e K2 para suporte imunológico.",
      price: 39.99,
      quantity: 50,
      photoPath: "/products/vitamina-d3-k2.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "NOW Foods",
      type: "Vitaminas e Minerais",
    },
    {
      name: "Complexo B",
      description: "Suplemento de Complexo B para energia e saúde mental.",
      price: 29.99,
      quantity: 50,
      photoPath: "/products/complexo-b.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Solgar",
      type: "Vitaminas e Minerais",
    },
    // Saúde das Articulações
    {
      name: "Glucosamina e Condroitina",
      description: "Suplemento para suporte da saúde articular.",
      price: 69.99,
      quantity: 50,
      photoPath: "/products/glucosamina-condroitina.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "NOW Foods",
      type: "Saúde das Articulações",
    },
    {
      name: "Colágeno Tipo II",
      description: "Suplemento de Colágeno Tipo II para suporte articular.",
      price: 79.99,
      quantity: 50,
      photoPath: "/products/colageno-tipo-ii.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Doctor's Best",
      type: "Saúde das Articulações",
    },
    {
      name: "MSM (Metilsulfonilmetano)",
      description: "Suplemento de MSM para saúde articular.",
      price: 59.99,
      quantity: 50,
      photoPath: "/products/msm.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Doctor's Best",
      type: "Saúde das Articulações",
    },
    // Energia e Resistência
    {
      name: "Repositores Energéticos",
      description: "Repositores energéticos para aumentar a resistência.",
      price: 49.99,
      quantity: 50,
      photoPath: "/products/repositores-energeticos.png",
      flavor: ["Neutro", "Morango", "Banana"],
      size: ["300g", "500g"],
      brand: "GU Energy",
      type: "Energia e Resistência",
    },
    {
      name: "Eletrólitos",
      description: "Suplemento de eletrólitos para hidratação.",
      price: 29.99,
      quantity: 50,
      photoPath: "/products/eletrolitos.png",
      flavor: "Neutro",
      size: ["30g", "50g"],
      brand: "SaltStick",
      type: "Energia e Resistência",
    },
    {
      name: "Beta-alanina",
      description: "Suplemento de Beta-alanina para melhorar a resistência.",
      price: 39.99,
      quantity: 50,
      photoPath: "/products/beta-alanina.png",
      flavor: "Neutro",
      size: ["300g", "500g"],
      brand: "NOW Foods",
      type: "Energia e Resistência",
    },
    {
      name: "Citrulina Malato",
      description: "Suplemento de Citrulina Malato para resistência e pump.",
      price: 49.99,
      quantity: 50,
      photoPath: "/products/citrulina-malato.png",
      flavor: "Neutro",
      size: ["300g", "500g"],
      brand: "Bulk Supplements",
      type: "Energia e Resistência",
    },
    // Saúde Digestiva
    {
      name: "Probióticos específicos para atletas",
      description: "Probiótico específico para melhorar a saúde digestiva.",
      price: 49.99,
      quantity: 50,
      photoPath: "/products/probioticos-atletas.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Jarrow Formulas",
      type: "Saúde Digestiva",
    },
    {
      name: "Enzimas Digestivas",
      description: "Suplemento de enzimas digestivas para melhorar a digestão.",
      price: 39.99,
      quantity: 50,
      photoPath: "/products/enzimas-digestivas.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "NOW Foods",
      type: "Saúde Digestiva",
    },
    // Óleos e Ácidos Graxos
    {
      name: "Óleo de peixe (ômega-3)",
      description: "Suplemento de óleo de peixe para saúde cardiovascular.",
      price: 49.99,
      quantity: 50,
      photoPath: "/products/oleo-de-peixe.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Nordic Naturals",
      type: "Óleos e Ácidos Graxos",
    },
    {
      name: "Óleo de krill",
      description: "Suplemento de óleo de krill para saúde do coração.",
      price: 59.99,
      quantity: 50,
      photoPath: "/products/oleo-de-krill.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "MegaRed",
      type: "Óleos e Ácidos Graxos",
    },
    {
      name: "Óleo de linhaça",
      description: "Suplemento de óleo de linhaça para saúde cardiovascular.",
      price: 39.99,
      quantity: 50,
      photoPath: "/products/oleo-de-linhaca.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Nature Made",
      type: "Óleos e Ácidos Graxos",
    },
    {
      name: "CLA (Ácido Linoleico Conjugado)",
      description: "Suplemento de CLA para suporte na perda de gordura.",
      price: 49.99,
      quantity: 50,
      photoPath: "/products/cla.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Nature's Bounty",
      type: "Óleos e Ácidos Graxos",
    },
    // Suplementos Específicos
    {
      name: "Maca Peruana",
      description: "Suplemento de Maca Peruana para energia e libido.",
      price: 39.99,
      quantity: 50,
      photoPath: "/products/maca-peruana.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "NOW Foods",
      type: "Suplementos Específicos",
    },
    {
      name: "Ashwagandha",
      description: "Suplemento de Ashwagandha para controle do estresse.",
      price: 29.99,
      quantity: 50,
      photoPath: "/products/ashwagandha.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Himalaya",
      type: "Suplementos Específicos",
    },
    {
      name: "Tribulus Terrestris",
      description: "Suplemento de Tribulus Terrestris para suporte hormonal.",
      price: 49.99,
      quantity: 50,
      photoPath: "/products/tribulus-terrestris.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "NOW Foods",
      type: "Suplementos Específicos",
    },
    {
      name: "HMB",
      description: "Suplemento de HMB para aumento da massa muscular.",
      price: 59.99,
      quantity: 50,
      photoPath: "/products/hmb.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Optimum Nutrition",
      type: "Suplementos Específicos",
    },
    // Saúde Mental e Cognitiva
    {
      name: "Omega-3 DHA",
      description: "Suplemento de Omega-3 DHA para saúde cognitiva.",
      price: 39.99,
      quantity: 50,
      photoPath: "/products/omega-3-dha.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "Nordic Naturals",
      type: "Saúde Mental e Cognitiva",
    },
    {
      name: "Bacopa Monnieri",
      description: "Suplemento de Bacopa Monnieri para foco e memória.",
      price: 29.99,
      quantity: 50,
      photoPath: "/products/bacopa-monnieri.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "NOW Foods",
      type: "Saúde Mental e Cognitiva",
    },
    {
      name: "Rhodiola Rosea",
      description: "Suplemento de Rhodiola Rosea para combate ao estresse.",
      price: 34.99,
      quantity: 50,
      photoPath: "/products/rhodiola-rosea.png",
      flavor: "Neutro",
      size: ["60 cápsulas", "120 cápsulas"],
      brand: "NOW Foods",
      type: "Saúde Mental e Cognitiva",
    },
  ];  

  async function main() {
    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          photoPath: product.photoPath,
          brand: product.brand,
          type: product.type,
        },
      });
  
      if (product.flavors) {
        for (const flavor of product.flavors) {
          await prisma.flavor.create({
            data: {
              name: flavor,
              productId: createdProduct.id,
            },
          });
        }
      }
  
      if (product.sizes) {
        for (const size of product.sizes) {
          await prisma.size.create({
            data: {
              name: size,
              productId: createdProduct.id,
            },
          });
        }
      }
    }
    console.log("Produtos inseridos com sucesso!");
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
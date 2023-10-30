export const filters = [
  {
    label: 'top_products',
    id: 1,
  },
  {
    label: 'sale_products',
    id: 2,
  },
  {
    label: 'recent_products',
    id: 3,
  },
  {
    label: 'sale_products',
    id: 4,
  },
]
export const categories = [
  {
    id: 1,
    title: "Xo'jalik mollari",
    slug: 'xojalik-mollari',
    icon: 'https://b8a0-82-215-73-99.ngrok-free.app/media/category/image.png',
    categories: [
      {
        id: 1,
        title: 'Havo tozalagichlar',
        slug: 'havo-tozalagichlar',
        parent: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Oziq-ovqat mahsulotlari',
    slug: 'oziq-ovqat-mahsulotlari',
    icon: 'https://example.com/icons/food.png',
    categories: [
      {
        id: 21,
        title: 'Asalar',
        slug: 'asalar',
        parent: 2,
      },
      {
        id: 22,
        title: 'Mevalar va sabzavotlar',
        slug: 'mevalar-va-sabzavotlar',
        parent: 2,
      },
      {
        id: 23,
        title: 'Sut va sut mahsulotlari',
        slug: 'sut-va-sut-mahsulotlari',
        parent: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'Yengil sutoq va elektronika',
    slug: 'yengil-sutoq-va-elektronika',
    icon: 'https://example.com/icons/electronics.png',
    categories: [
      {
        id: 31,
        title: 'Telefonlar va planshetlar',
        slug: 'telefonlar-va-planshetlar',
        parent: 3,
      },
      {
        id: 32,
        title: 'Kompyuterlar va aksessuarlar',
        slug: 'kompyuterlar-va-aksessuarlar',
        parent: 3,
      },
      {
        id: 33,
        title: 'Televizorlar va audiouzbeklar',
        slug: 'televizorlar-va-audiouzbeklar',
        parent: 3,
      },
    ],
  },
  {
    id: 4,
    title: 'Kiyim-kechak mahsulotlari',
    slug: 'kiyim-kechak-mahsulotlari',
    icon: 'https://example.com/icons/clothing.png',
    categories: [
      {
        id: 41,
        title: 'Erkaklar kiyimi',
        slug: 'erkaklar-kiyimi',
        parent: 4,
      },
      {
        id: 42,
        title: 'Ayollar kiyimi',
        slug: 'ayollar-kiyimi',
        parent: 4,
      },
      {
        id: 43,
        title: 'Bolalar kiyimi',
        slug: 'bolalar-kiyimi',
        parent: 4,
      },
    ],
  },
  {
    id: 5,
    title: 'Uy-joy mahsulotlari',
    slug: 'uy-joy-mahsulotlari',
    icon: 'https://example.com/icons/home.png',
    categories: [
      {
        id: 51,
        title: 'Mebel va uyat',
        slug: 'mebel-va-uyat',
        parent: 5,
      },
      {
        id: 52,
        title: 'Toshkent saroyi',
        slug: 'toshkent-saroyi',
        parent: 5,
      },
      {
        id: 53,
        title: 'Sovutma va isitish sistemalari',
        slug: 'sovutma-va-isitish-sistemalari',
        parent: 5,
      },
    ],
  },
]

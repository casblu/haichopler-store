/* Haichoppler catalog. Every main-page card is a category button that opens its list.
   Add a product: push one object into a category's items (or js/tees.js / js/decks.js).
   Add a category: add one object here. Item fields: id, title, description, image, imageAlt,
   width, height (or svg), tag, tagClass. Category "cover" overrides the cover image (default: first item). */
var HI_CATALOG = [
  {
    "cardId": "book",
    "listId": "sticker-books",
    "title": "Sticker Books",
    "blurb": "Hands-on books that teach Hmong clothes, scene by scene.",
    "noun": "book",
    "nounPlural": "books",
    "viewLabel": "View sticker books",
    "items": [
      {
        "image": "img/book.jpg",
        "imageAlt": "Hmong Clothes Sticker Book cover",
        "width": 1200,
        "height": 1543,
        "tagClass": "pre",
        "tag": "Pre-order soon",
        "title": "Hmong Clothes Sticker Book",
        "description": "22 pages · 8 scenes · 96 labeled stickers · Hmong glossary. Designed by Elizabeth X. Vue. Published by Haichoppler.",
        "id": "hmong-clothes-sticker-book"
      }
    ]
  },
  {
    "cardId": "ball",
    "listId": "pov-pob-balls",
    "title": "Pov Pob Balls",
    "blurb": "Soft, thud-landing balls for the New Year toss.",
    "noun": "ball",
    "nounPlural": "balls",
    "viewLabel": "View pov pob balls",
    "items": [
      {
        "image": "img/povpob.jpg",
        "imageAlt": "Haichoppler BawPaw Ball with paj ntaub panels",
        "width": 1400,
        "height": 1400,
        "tagClass": "pre",
        "tag": "Pre-order soon",
        "title": "BawPaw Ball",
        "description": "For pov pob — the Hmong New Year ball toss. Soft, pellet-filled like a cornhole bag so it lands with a thud and won’t roll into the crowd.",
        "id": "bawpaw-ball"
      }
    ]
  },
  {
    "cardId": "ornaments",
    "listId": "ornaments-list",
    "title": "Ornaments",
    "blurb": "Felt pieces with paj ntaub shapes for the tree and the house.",
    "noun": "ornament set",
    "nounPlural": "ornament sets",
    "viewLabel": "View ornaments",
    "items": [
      {
        "image": "img/ornaments.jpg",
        "imageAlt": "Paj ntaub textile detail for felt ornaments",
        "width": 1200,
        "height": 1200,
        "tagClass": "soon",
        "tag": "Coming soon",
        "title": "Felt ornaments",
        "description": "Seasonal felt pieces with paj ntaub-inspired shapes for the tree and the house. Designed by Elizabeth X. Vue.",
        "id": "felt-ornaments"
      }
    ]
  },
  {
    "cardId": "bowl",
    "listId": "ceremonial",
    "title": "Ceremonial",
    "blurb": "Pieces cast with care for family rites.",
    "noun": "piece",
    "nounPlural": "pieces",
    "viewLabel": "View ceremonial",
    "items": [
      {
        "svg": "<svg class=\"placeholder\" viewBox=\"0 0 400 400\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Placeholder pattern for bronze funeral bowl\"> <rect width=\"400\" height=\"400\" fill=\"#2a3340\"/> <ellipse cx=\"200\" cy=\"250\" rx=\"140\" ry=\"50\" fill=\"none\" stroke=\"#e8c547\" stroke-width=\"6\"/> <path d=\"M70 250 Q70 140 200 120 Q330 140 330 250\" fill=\"none\" stroke=\"#e8c547\" stroke-width=\"6\"/> <path d=\"M110 220 Q200 180 290 220\" fill=\"none\" stroke=\"#d45a5a\" stroke-width=\"4\"/> <circle cx=\"200\" cy=\"160\" r=\"10\" fill=\"#e8c547\"/> <text x=\"200\" y=\"360\" text-anchor=\"middle\" fill=\"#faf7f5\" font-family=\"Inter,sans-serif\" font-size=\"14\" letter-spacing=\"3\">CEREMONIAL</text> </svg>",
        "tagClass": "soon",
        "tag": "Coming soon",
        "title": "Bronze funeral bowl",
        "description": "For joss paper burning — ceremonial designs cast with care for family rites.",
        "id": "bronze-funeral-bowl"
      }
    ]
  },
  {
    "cardId": "skate",
    "listId": "skateboards",
    "title": "Skateboards",
    "blurb": "Decks wrapped in Hmong textile energy — rideable art with paj ntaub punch.",
    "noun": "deck",
    "nounPlural": "decks",
    "viewLabel": "View decks",
    "intro": "Coming soon. Leave an email on a deck and we’ll nudge you when pre-orders open.",
    "mediaClass": "deck-shot",
    "itemsVar": "HI_DECKS"
  },
  {
    "cardId": "socks",
    "listId": "socks-list",
    "title": "Socks",
    "blurb": "Textile stripes and flower-cloth motifs, head to toe.",
    "noun": "style",
    "nounPlural": "styles",
    "viewLabel": "View socks",
    "items": [
      {
        "image": "img/socks.jpg",
        "imageAlt": "Paj ntaub motif reference for Hmong textile tube socks",
        "width": 1400,
        "height": 1400,
        "tagClass": "soon",
        "tag": "Coming soon",
        "title": "Hmong textile tube socks",
        "description": "Cozy tube socks printed with textile stripes and flower-cloth motifs.",
        "id": "hmong-textile-tube-socks"
      }
    ]
  },
  {
    "cardId": "sweaters",
    "listId": "sweaters-list",
    "title": "Sweaters",
    "blurb": "Holiday knits and fleece with Hmong textile panels.",
    "noun": "style",
    "nounPlural": "styles",
    "viewLabel": "View sweaters",
    "items": [
      {
        "image": "img/christmas.jpg",
        "imageAlt": "Paj ntaub pattern reference for Christmas sweaters",
        "width": 1200,
        "height": 1200,
        "tagClass": "soon",
        "tag": "Coming soon",
        "title": "Christmas sweaters / sweatshirts",
        "description": "Holiday knits and fleece with Hmong textile panels — festive without the kitsch overload.",
        "id": "christmas-sweaters-sweatshirts"
      }
    ]
  },
  {
    "cardId": "scarves",
    "listId": "scarves-list",
    "title": "Scarves",
    "blurb": "Story scarves and family-tree scarves.",
    "noun": "scarf",
    "nounPlural": "scarves",
    "viewLabel": "View scarves",
    "items": [
      {
        "image": "img/story-scarf.jpg",
        "imageAlt": "Hmong story cloth textile reference for Haichoppler scarves",
        "width": 1200,
        "height": 1200,
        "tagClass": "soon",
        "tag": "Coming soon",
        "title": "Scarves",
        "description": "Two kinds: story scarves that carry scenes and motifs, and family-tree scarves for names, branches, and belonging.",
        "id": "story-family-scarves"
      }
    ]
  },
  {
    "cardId": "skirts",
    "listId": "skirts-list",
    "title": "Skirts",
    "blurb": "Everyday and ceremonial-inspired skirts with paj ntaub energy.",
    "noun": "skirt",
    "nounPlural": "skirts",
    "viewLabel": "View skirts",
    "items": [
      {
        "image": "img/skirts.jpg",
        "imageAlt": "Paj ntaub textile texture reference for Hmong textile skirts",
        "width": 1200,
        "height": 1200,
        "tagClass": "soon",
        "tag": "Coming soon",
        "title": "Hmong textile skirts",
        "description": "Everyday and ceremonial-inspired skirts with paj ntaub energy — silhouette and motif accuracy still with the founder.",
        "id": "hmong-textile-skirts"
      }
    ]
  },
  {
    "cardId": "beanies",
    "listId": "beanies-list",
    "title": "Beanies",
    "blurb": "Knit beanies inspired by traditional Hmong women’s hats.",
    "noun": "beanie",
    "nounPlural": "beanies",
    "viewLabel": "View beanies",
    "items": [
      {
        "svg": "<svg class=\"placeholder\" viewBox=\"0 0 400 400\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Placeholder: purple beanie with black-and-white wrap stripe\"> <rect width=\"400\" height=\"400\" fill=\"#2a3340\"/> <ellipse cx=\"200\" cy=\"230\" rx=\"120\" ry=\"95\" fill=\"#6b3d7a\"/> <path d=\"M90 210 Q200 155 310 210 Q310 280 200 310 Q90 280 90 210 Z\" fill=\"#5a2f68\"/> <path d=\"M115 195 L200 175 L285 195 L270 215 L200 200 L130 215 Z\" fill=\"#faf7f5\"/> <path d=\"M130 215 L200 200 L270 215\" fill=\"none\" stroke=\"#1a1a1a\" stroke-width=\"10\"/> <path d=\"M130 215 L200 200 L270 215\" fill=\"none\" stroke=\"#faf7f5\" stroke-width=\"4\"/> <path d=\"M145 225 L255 225\" stroke=\"#1a1a1a\" stroke-width=\"8\"/> <path d=\"M145 225 L255 225\" stroke=\"#faf7f5\" stroke-width=\"3\" stroke-dasharray=\"10 8\"/> <text x=\"200\" y=\"360\" text-anchor=\"middle\" fill=\"#faf7f5\" font-family=\"Inter,sans-serif\" font-size=\"13\" letter-spacing=\"2\">INSPIRED · NOT FINAL</text> </svg>",
        "tagClass": "soon",
        "tag": "Coming soon",
        "title": "Women’s beanies",
        "description": "Purple knit beanies with a black-and-white wrap stripe — inspired by traditional Hmong women’s hats, not a ceremonial replica. Accuracy stays with the founder.",
        "id": "womens-beanies"
      }
    ]
  },
  {
    "cardId": "t-shirts",
    "listId": "hmong-leaders",
    "title": "Hmong Leaders & Heroes",
    "listTitle": "Hmong Leaders & Heroes",
    "blurb": "Black tees of Hmong leaders and heroes — portraits set in paj ntaub.",
    "noun": "tee",
    "nounPlural": "tees",
    "viewLabel": "View tees",
    "intro": "Black tees, coming soon. Leave an email on a shirt and we’ll nudge you when pre-orders open.",
    "itemsVar": "HI_TEES"
  }
];

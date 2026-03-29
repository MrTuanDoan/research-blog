export interface InfluencerImage {
  file: string;
  folder: string;
  name: string;
}

export interface Influencer {
  slug: string;
  name: string;
  niche: string;
  subtitle: string;
  imageCount: number;
  images: InfluencerImage[];
}

export const INFLUENCERS: Influencer[] = [
  {
    "slug": "aiko-nakamura",
    "name": "Character Bible: Aiko Nakamura (中村あいこ)",
    "niche": "Café Culture & Coffee Content",
    "subtitle": "/ Skin Tone** | Japanese-Brazilian — warm tan-olive skin, NC30-NC32, naturally sun-kissed with slight tan lines on wrists from watch |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "amara-obi",
    "name": "Character Bible: Amara Obi",
    "niche": "Natural Hair Care & Self-Love Content",
    "subtitle": "/ Skin Tone** | Nigerian-British — deep rich brown skin, warm mahogany undertone, NC50-NC55 range, naturally luminous |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "bich-le",
    "name": "CHARACTER BIBLE — Bích Lê",
    "niche": "Đồ ăn vặt, study tools, thời trang học sinh, app review",
    "subtitle": "21, Vietnamese",
    "imageCount": 21,
    "images": [
      {
        "file": "bopa-bich-le-bopa-angle-close.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-angle-close"
      },
      {
        "file": "bopa-bich-le-bopa-angle-low.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-angle-low"
      },
      {
        "file": "bopa-bich-le-bopa-angle-overhead.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-angle-overhead"
      },
      {
        "file": "bopa-bich-le-bopa-angle-profile.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-angle-profile"
      },
      {
        "file": "bopa-bich-le-bopa-bg-cafe.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-bg-cafe"
      },
      {
        "file": "bopa-bich-le-bopa-bg-campus.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-bg-campus"
      },
      {
        "file": "bopa-bich-le-bopa-bg-library.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-bg-library"
      },
      {
        "file": "bopa-bich-le-bopa-bg-night.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-bg-night"
      },
      {
        "file": "bopa-bich-le-bopa-outfit-kpop.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-outfit-kpop"
      },
      {
        "file": "bopa-bich-le-bopa-outfit-night.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-outfit-night"
      },
      {
        "file": "bopa-bich-le-bopa-outfit-school.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-outfit-school"
      },
      {
        "file": "bopa-bich-le-bopa-outfit-sporty.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-outfit-sporty"
      },
      {
        "file": "bopa-bich-le-bopa-pose-eating.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-pose-eating"
      },
      {
        "file": "bopa-bich-le-bopa-pose-laugh.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-pose-laugh"
      },
      {
        "file": "bopa-bich-le-bopa-pose-standing.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-pose-standing"
      },
      {
        "file": "bopa-bich-le-bopa-pose-study.jpg",
        "folder": "bopa",
        "name": "bich-le-bopa-pose-study"
      },
      {
        "file": "char-sheet-bich-le-char-sheet-v1.jpg",
        "folder": "char-sheet",
        "name": "bich-le-char-sheet-v1"
      },
      {
        "file": "macro-bich-le-macro-cheek.jpg",
        "folder": "macro",
        "name": "bich-le-macro-cheek"
      },
      {
        "file": "macro-bich-le-macro-dimple.jpg",
        "folder": "macro",
        "name": "bich-le-macro-dimple"
      },
      {
        "file": "macro-bich-le-macro-lips.jpg",
        "folder": "macro",
        "name": "bich-le-macro-lips"
      }
    ]
  },
  {
    "slug": "elena-volkov",
    "name": "Character Bible: Elena Volkov",
    "niche": "Book Reviews & Literary Lifestyle",
    "subtitle": "/ Skin Tone** | Russian-American — fair with neutral-cool undertone, NC12-NC15, slightly translucent quality at temples, prone to redness around nose in cold |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "hana-kim",
    "name": "Character Bible: Hana Kim (김하나)",
    "niche": "K-Beauty & ASMR Skincare Content",
    "subtitle": "/ Skin Tone** | Korean — fair cool-toned porcelain skin with pink undertone, NC15 range, glass skin achieved through real routine (not filter) |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "hoa-vu",
    "name": "CHARACTER BIBLE — Hoa Vũ",
    "niche": "Business, career tips, phong cách công sở, đồng hồ/phụ kiện luxury",
    "subtitle": "27, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "hong-bui",
    "name": "CHARACTER BIBLE — Hồng Bùi",
    "niche": "Đồ ngọt, thời trang cô gái, phim ảnh, beauty haul giá mềm",
    "subtitle": "20, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "isla-campbell",
    "name": "Character Bible: Isla Campbell",
    "niche": "Sustainable Fashion & Thrift Styling",
    "subtitle": "/ Skin Tone** | Scottish — very fair with cool pink undertone, NC10-NC15, naturally freckled, prone to flushing |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "kim-ngo",
    "name": "CHARACTER BIBLE — Kim Ngô",
    "niche": "Mẹ và bé, đồ gia dụng, thực phẩm, skincare cho mẹ",
    "subtitle": "28, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "lan-dao",
    "name": "CHARACTER BIBLE — Lan Đào",
    "niche": "Du lịch, kem chống nắng, đồ bơi, lifestyle outdoor",
    "subtitle": "24, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "linh-pham",
    "name": "CHARACTER BIBLE — Linh Phạm",
    "niche": "Skincare, đồ uống, thời trang casual",
    "subtitle": "22, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "luna-nguyen",
    "name": "Luna Nguyễn — Character Bible",
    "niche": "Lifestyle, fashion, café culture, night city aesthetics, cozy home moments.",
    "subtitle": "22–25, Vietnamese",
    "imageCount": 10,
    "images": [
      {
        "file": "bopa-luna-nguyen-bopa-angles.jpg",
        "folder": "bopa",
        "name": "luna-nguyen-bopa-angles"
      },
      {
        "file": "bopa-luna-nguyen-bopa-backgrounds.jpg",
        "folder": "bopa",
        "name": "luna-nguyen-bopa-backgrounds"
      },
      {
        "file": "bopa-luna-nguyen-bopa-outfits.jpg",
        "folder": "bopa",
        "name": "luna-nguyen-bopa-outfits"
      },
      {
        "file": "bopa-luna-nguyen-bopa-poses.jpg",
        "folder": "bopa",
        "name": "luna-nguyen-bopa-poses"
      },
      {
        "file": "bopa-luna-nguyen-UP-01.jpg",
        "folder": "bopa",
        "name": "luna-nguyen-UP-01"
      },
      {
        "file": "char-sheet-luna-nguyen-char-sheet-v1.jpg",
        "folder": "char-sheet",
        "name": "luna-nguyen-char-sheet-v1"
      },
      {
        "file": "macro-luna-nguyen-macro-cheek.jpg",
        "folder": "macro",
        "name": "luna-nguyen-macro-cheek"
      },
      {
        "file": "macro-luna-nguyen-macro-lips.jpg",
        "folder": "macro",
        "name": "luna-nguyen-macro-lips"
      },
      {
        "file": "macro-luna-nguyen-macro-serum.jpg",
        "folder": "macro",
        "name": "luna-nguyen-macro-serum"
      }
    ]
  },
  {
    "slug": "mai-tran",
    "name": "CHARACTER BIBLE — Mai Trần",
    "niche": "Makeup, nước hoa, thời trang nữ tính",
    "subtitle": "25, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "maren-eriksen",
    "name": "Character Bible: Maren Eriksen",
    "niche": "Outdoor Adventure & Nature Photography",
    "subtitle": "|, / Skin Tone** | Norwegian — fair with cool pink undertone, NC10-NC12, wind-chapped redness on cheeks and nose that's permanent, sun-weathered for her age |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "mei-chen",
    "name": "Character Bible: Mei Chen (陈美)",
    "niche": "Wellness Tea & Traditional Chinese Medicine Lifestyle",
    "subtitle": "/ Skin Tone** | Chinese-American — porcelain-fair warm ivory skin, NC15-NC20 range, slight natural flush on cheeks |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "nadia-khoury",
    "name": "Character Bible: Nadia Khoury",
    "niche": "Minimalist Home Design & Lifestyle",
    "subtitle": "/ Skin Tone** | Lebanese-French — warm olive skin with golden undertone, NC25-NC30, naturally even with slight sun-warmth on nose and cheeks |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "sofia-reyes",
    "name": "Character Bible: Sofia Reyes",
    "niche": "Fitness & Active Lifestyle (Latina market + English crossover)",
    "subtitle": "/ Skin Tone** | Mexican-American — warm olive-bronze skin, NC35-NC40 range, sun-kissed with natural tan lines on shoulders |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "thu-hoang",
    "name": "CHARACTER BIBLE — Thu Hoàng",
    "niche": "Thời trang high fashion, trang điểm bold, phụ kiện statement, editorial looks",
    "subtitle": "26, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "thuy-nguyen",
    "name": "CHARACTER BIBLE — Thùy Nguyễn",
    "niche": "Fitness, thực phẩm healthy, supplement, activewear",
    "subtitle": "23, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "yen-duong",
    "name": "CHARACTER BIBLE — Yến Dương",
    "niche": "Lifestyle Sài Gòn, review quán ăn, streetwear, xe máy và đường phố",
    "subtitle": "25, Vietnamese",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "yuki-tanaka",
    "name": "Character Bible: Yuki Tanaka (田中ゆき)",
    "niche": "Stationery, Journaling & Cozy Productivity",
    "subtitle": "/ Skin Tone** | Japanese — fair neutral-warm skin, NC15-NC18, smooth with subtle warmth on cheeks |",
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "zara-hassan",
    "name": "Character Bible: Zara Hassan",
    "niche": "Tech Reviews & Productivity Setup Content",
    "subtitle": "/ Skin Tone** | Pakistani-Canadian — warm brown skin with olive undertone, NC40-NC42, smooth and even with slight hyperpigmentation around eyes (natural) |",
    "imageCount": 1,
    "images": []
  }
];

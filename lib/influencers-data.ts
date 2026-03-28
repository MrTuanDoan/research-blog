export interface InfluencerImage {
  file: string;
  folder: string;
  name: string;
}

export interface Influencer {
  slug: string;
  name: string;
  niche: string;
  hasBase: boolean;
  imageCount: number;
  images: InfluencerImage[];
}

export const INFLUENCERS: Influencer[] = [
  {
    "slug": "amara-obi",
    "name": "Character Bible: Amara Obi",
    "niche": "** Natural Hair Care & Self-Love Content",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "bich-le",
    "name": "CHARACTER BIBLE — Bích Lê",
    "niche": "** Đồ ăn vặt, study tools, thời trang học sinh, app review",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "hoa-vu",
    "name": "CHARACTER BIBLE — Hoa Vũ",
    "niche": "** Business, career tips, phong cách công sở, đồng hồ/phụ kiện luxury",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "hong-bui",
    "name": "CHARACTER BIBLE — Hồng Bùi",
    "niche": "** Đồ ngọt, thời trang cô gái, phim ảnh, beauty haul giá mềm",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "kim-ngo",
    "name": "CHARACTER BIBLE — Kim Ngô",
    "niche": "** Mẹ và bé, đồ gia dụng, thực phẩm, skincare cho mẹ",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "lan-dao",
    "name": "CHARACTER BIBLE — Lan Đào",
    "niche": "** Du lịch, kem chống nắng, đồ bơi, lifestyle outdoor",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "linh-pham",
    "name": "CHARACTER BIBLE — Linh Phạm",
    "niche": "** Skincare, đồ uống, thời trang casual",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "luna-nguyen",
    "name": "Luna Nguyễn — Character Bible",
    "niche": "Lifestyle, fashion, café culture, night city aesthetics, cozy home moments.",
    "hasBase": true,
    "imageCount": 9,
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
    "niche": "** Makeup, nước hoa, thời trang nữ tính",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "mei-chen",
    "name": "Character Bible: Mei Chen (陈美)",
    "niche": "** Wellness Tea & Traditional Chinese Medicine Lifestyle",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "sofia-reyes",
    "name": "Character Bible: Sofia Reyes",
    "niche": "** Fitness & Active Lifestyle (Latina market + English crossover)",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "thu-hoang",
    "name": "CHARACTER BIBLE — Thu Hoàng",
    "niche": "** Thời trang high fashion, trang điểm bold, phụ kiện statement, editorial looks",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  },
  {
    "slug": "thuy-nguyen",
    "name": "CHARACTER BIBLE — Thùy Nguyễn",
    "niche": "** Fitness, thực phẩm healthy, supplement, activewear",
    "hasBase": true,
    "imageCount": 1,
    "images": []
  }
];

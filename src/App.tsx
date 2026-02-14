import React, { useState, useEffect, useRef, type FormEvent } from 'react';
import { 
  Menu, X, MapPin, Phone, Wifi, Shield, Car, Coffee, Home, Star, 
  ChevronRight, ChevronDown, Mail, Facebook, Globe, Tv, Refrigerator, CreditCard, 
  MessageCircle, Send, Sparkles, XCircle
} from 'lucide-react';

import kLogo from './assets/k-logo.png';

// --- Gemini API Configuration ---
const apiKey: string = ""; // API Key provided by environment

// --- Types & Interfaces ---
type LanguageCode = 'th' | 'en' | 'jp' | 'cn' | 'ar';

interface TranslationData {
  label: string;
  nav: {
    home: string;
    about: string;
    rooms: string;
    facilities: string;
    contact: string;
  };
  hero: {
    location_badge: string;
    title: string;
    subtitle: string;
    cta_rooms: string;
    cta_contact: string;
  };
  about: {
    welcome: string;
    title: string;
    desc: string;
    points: string[];
    location_card: {
      label: string;
      value: string;
    };
  };
  facilities: {
    title: string;
    subtitle: string;
    items: { name: string }[];
  };
  rooms: {
    title: string;
    subtitle: string;
    disclaimer: string;
    price_start: string;
    unit: string;
    unit_label: string;
    table_headers: string[];
    extra_charges: string;
    tv: string;
    fridge: string;
    cc: string;
    types: {
      title: string;
      features: string[];
    }[];
  };
  contact: {
    title: string;
    desc: string;
    address_title: string;
    address_val: string;
    phone_title: string;
    phone_display: string;
    phone_action: string;
    email_title: string;
    email_val: string;
    social_title: string;
    social_label: string;
    map_btn: string;
  };
  footer: {
    rights: string;
  };
}

interface RoomCard {
  id: number;
  size: string;
  startPrice: string;
  image: string;
  hotPromo: boolean;
}

interface RateInfo {
  old: string;
  new: string;
}

interface RateRow {
  name: string;
  size: string;
  rates: {
    y1: RateInfo;
    m6: RateInfo;
    m3: RateInfo | null;
  };
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

// --- Data & Translations ---
const translations: Record<LanguageCode, TranslationData> = {
  th: {
    label: "ไทย",
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      rooms: "ห้องพัก & ราคา",
      facilities: "สิ่งอำนวยความสะดวก",
      contact: "ติดต่อเรา",
    },
    hero: {
      location_badge: "สุขุมวิท 71 • ปรีดีพนมยงค์ 14",
      title: "อพาร์ทเมนท์หรู สไตล์คอนโดมิเนียม",
      subtitle: "สัมผัสชีวิตคนเมืองที่ลงตัว เงียบสงบ ร่มรื่น ใกล้ BTS พระโขนง เดินทางสะดวก พร้อมสิ่งอำนวยความสะดวกครบครัน",
      cta_rooms: "ดูห้องพักราคาพิเศษ",
      cta_contact: "ติดต่อสอบถาม"
    },
    about: {
      welcome: "ยินดีต้อนรับสู่ K-House 71",
      title: "ความลงตัวของการอยู่อาศัย ใจกลางเมือง",
      desc: "K-House Sukhumvit 71 อพาร์ทเมนท์เซอร์วิสหรู ตกแต่งด้วยเฟอร์นิเจอร์สไตล์โมเดิร์น-คอนโด เน้นความโปร่งโล่งสบาย เราคัดสรรวัสดุคุณภาพเกรด A เพื่อให้บริการแก่คนรุ่นใหม่และวัยทำงานที่ต้องการความสงบ",
      points: [
        "ใกล้ BTS พระโขนง (มีวินมอเตอร์ไซค์บริการ 24 ชม.)",
        "ใกล้ทางด่วนฉลองรัช (รามอินทรา-อาจณรงค์) เดินทางสะดวก",
        "ใกล้โรงเรียนนานาชาติ Bangkok Prep และ St. Andrews",
        "หาของกินง่าย! ใกล้ MaxValu, Lotus และ Street Food เจ้าดัง (ปรีดีพนมยงค์ 2)",
        "เข้า-ออกได้หลายทาง (สุขุมวิท 71, คลองตัน, เพชรบุรี)"
      ],
      location_card: {
        label: "ทำเลศักยภาพ",
        value: "ใกล้ทางด่วน & Street Food"
      }
    },
    facilities: {
      title: "สิ่งอำนวยความสะดวก",
      subtitle: "ครบครันด้วยฟังก์ชันการใช้งาน เพื่อให้การพักอาศัยของคุณสะดวกสบายที่สุด",
      items: [
        { name: "Free High-Speed WiFi" },
        { name: "CCTV & รปภ. 24 ชม." },
        { name: "ที่จอดรถในร่ม" },
        { name: "เข้า-ออกด้วย Key Card" },
        { name: "ล็อบบี้รับแขก" },
        { name: "ลิฟต์โดยสาร" }
      ]
    },
    rooms: {
      title: "รูปแบบห้องพัก & อัตราค่าเช่า",
      subtitle: "HOT PROMOTION! โปรโมชั่นลดราคาพิเศษสำหรับทุกสัญญาเช่า",
      disclaimer: "*** ราคาอาจมีการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
      price_start: "โปรโมชั่นเริ่มต้น",
      unit: "บาท/เดือน",
      unit_label: "หน่วย: บาท (Baht)",
      table_headers: ["ประเภทห้อง (Room Type)", "สัญญา 1 ปี (1 Year)", "สัญญา 6 เดือน (6 Months)", "สัญญา 3 เดือน (3 Months)"],
      extra_charges: "ค่าใช้จ่ายเพิ่มเติม (Extra Charges)",
      tv: "โทรทัศน์ (Television) 500 บาท/เดือน",
      fridge: "ตู้เย็น (Refrigerator) 500 บาท/เดือน",
      cc: "ยินดีรับบัตรเครดิต (We accept major Credit Cards)",
      types: [
        {
          title: "Studio A (Big Balcony)",
          features: ["ระเบียงกว้าง", "เฟอร์นิเจอร์ Built-in", "แอร์ & น้ำอุ่น"]
        },
        {
          title: "Studio B (Small Balcony)",
          features: ["ระเบียงมาตรฐาน", "เตียง 6 ฟุต", "แอร์ & น้ำอุ่น"]
        },
        {
          title: "Sweet Corner (Front/Back)",
          features: ["1 ห้องนอน 1 ห้องนั่งเล่น", "มุมห้องวิวสวย", "52 - 56 ตร.ม."]
        },
        {
          title: "Suite 1 Bedroom Corner",
          features: ["ห้องสวีท 1 ห้องนอน", "พื้นที่กว้างขวาง", "52 - 54 ตร.ม."]
        }
      ]
    },
    contact: {
      title: "ติดต่อเรา",
      desc: "สนใจเข้าชมห้องพัก หรือสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ตามช่องทางด้านล่าง เปิดทำการตลอดเวลา",
      address_title: "ที่อยู่",
      address_val: "54 ซอยปรีดีพนมยงค์ 14 แยก 4 ถ.สุขุมวิท 71 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพฯ 10110",
      phone_title: "โทรศัพท์",
      phone_display: "088-524-5959",
      phone_action: "กดเพื่อโทรออก",
      email_title: "อีเมล",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "ดูแผนที่ Google Maps"
    },
    footer: {
      rights: "K-House Sukhumvit 71. สงวนลิขสิทธิ์."
    }
  },
  en: {
    label: "English",
    nav: {
      home: "Home",
      about: "About Us",
      rooms: "Rooms & Rates",
      facilities: "Facilities",
      contact: "Contact",
    },
    hero: {
      location_badge: "Sukhumvit 71 • Pridi Banomyong 14",
      title: "Luxury Apartment Condo Style",
      subtitle: "Experience perfect urban living. Quiet, private, and green. Near BTS Phra Khanong with full facilities.",
      cta_rooms: "View Rooms",
      cta_contact: "Contact Us"
    },
    about: {
      welcome: "Welcome to K-House 71",
      title: "Perfect Living in the City Center",
      desc: "K-House Sukhumvit 71 is a luxury serviced apartment decorated in modern-condo style. We select Grade A materials to serve the new generation and working people who need peace and privacy.",
      points: [
        "Near BTS Phra Khanong (24hr Motorbike taxi service)",
        "Near Chalong Rat Expressway (Easy access to city)",
        "Near Bangkok Prep & St. Andrews International Schools",
        "Foodie Heaven! Near MaxValu, Lotus & Famous Street Food (Pridi Banomyong 2)",
        "Multiple access routes (Sukhumvit 71, Khlong Tan, Phetchaburi)"
      ],
      location_card: {
        label: "Prime Location",
        value: "Near Expressway & Street Food"
      }
    },
    facilities: {
      title: "Facilities",
      subtitle: "Complete with functions to make your stay as comfortable as possible.",
      items: [
        { name: "Free High-Speed WiFi" },
        { name: "CCTV & 24hr Security" },
        { name: "Indoor Parking" },
        { name: "Key Card Access" },
        { name: "Lobby Area" },
        { name: "Elevator" }
      ]
    },
    rooms: {
      title: "Room Types & Rates",
      subtitle: "HOT PROMOTION! Special discount available for short term and long term agreements.",
      disclaimer: "*** Prices are subjected to change without prior notice.",
      price_start: "Promo starts at",
      unit: "Baht/Month",
      unit_label: "Unit: Baht",
      table_headers: ["Room Type", "1 Year Contract", "6 Months Contract", "3 Months Contract"],
      extra_charges: "Extra Charges",
      tv: "Television 500 Baht / month",
      fridge: "Refrigerator 500 Baht / month",
      cc: "We accept major Credit Cards",
      types: [
        {
          title: "Studio A (Big Balcony)",
          features: ["Big Balcony", "Built-in Furniture", "AC & Water Heater"]
        },
        {
          title: "Studio B (Small Balcony)",
          features: ["Small Balcony", "King Size Bed", "AC & Water Heater"]
        },
        {
          title: "Sweet Corner (Front/Back)",
          features: ["1 Bed 1 Living", "Nice Corner View", "52 - 56 sq.m."]
        },
        {
          title: "Suite 1 Bedroom Corner",
          features: ["1 Bedroom Suite", "Spacious", "52 - 54 sq.m."]
        }
      ]
    },
    contact: {
      title: "Contact Us",
      desc: "Interested in visiting or need more info? Contact us via channels below. Open 24/7.",
      address_title: "Address",
      address_val: "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Phra Khanong Nuea, Watthana, Bangkok 10110",
      phone_title: "Phone",
      phone_display: "+66 88-524-5959", // International format
      phone_action: "Tap to call",
      email_title: "Email",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "View Google Maps"
    },
    footer: {
      rights: "K-House Sukhumvit 71. All rights reserved."
    }
  },
  jp: {
    label: "日本語",
    nav: {
      home: "ホーム",
      about: "当アパートについて",
      rooms: "客室と料金",
      facilities: "施設・設備",
      contact: "お問い合わせ",
    },
    hero: {
      location_badge: "スクンビット71 • プリディ・パノムヨン14",
      title: "コンドミニアムスタイルの高級アパートメント",
      subtitle: "都会の完璧な生活を体験してください。静かでプライベート、そして緑豊か。BTSプラカノン駅に近く、設備も充実しています。",
      cta_rooms: "特別価格の部屋を見る",
      cta_contact: "お問い合わせ"
    },
    about: {
      welcome: "K-House 71へようこそ",
      title: "都心の完璧な住まい",
      desc: "K-House Sukhumvit 71は、モダンなコンドミニアムスタイルで装飾された高級サービスアパートメントです。静けさとプライバシーを求める新世代や社会人のために、グレードAの素材を厳選しました。",
      points: [
        "BTSプラカノン駅近く (24時間バイクタクシーあり)",
        "チャロンラット高速道路近く (市内へのアクセス便利)",
        "バンコク・プレップ ＆ セント・アンドリュース・インターナショナル・スクール近く",
        "食事に便利！マックスバリュ、ロータス、有名なストリートフード（プリディ・パノムヨン2）近く",
        "多方面からのアクセス可能 (スクンビット71, クロンタン, ペチャブリー)"
      ],
      location_card: {
        label: "好立地",
        value: "高速道路 & ストリートフード近く"
      }
    },
    facilities: {
      title: "施設・設備",
      subtitle: "快適な滞在のために、充実した機能を完備しています。",
      items: [
        { name: "無料高速Wi-Fi" },
        { name: "CCTV & 24時間警備" },
        { name: "屋内駐車場" },
        { name: "キーカード入退室" },
        { name: "ロビーエリア" },
        { name: "エレベーター" }
      ]
    },
    rooms: {
      title: "部屋タイプと料金",
      subtitle: "HOT PROMOTION! 短期・長期契約向けの特別割引あり。",
      disclaimer: "*** 価格は予告なく変更される場合があります。",
      price_start: "プロモーション価格",
      unit: "バーツ/月",
      unit_label: "単位：バーツ (Baht)",
      table_headers: ["部屋タイプ", "1年契約", "6ヶ月契約", "3ヶ月契約"],
      extra_charges: "追加料金",
      tv: "テレビ 500バーツ/月",
      fridge: "冷蔵庫 500バーツ/月",
      cc: "主要なクレジットカードをご利用いただけます",
      types: [
        {
          title: "スタジオ A (大きなバルコニー)",
          features: ["広いバルコニー", "作り付け家具", "エアコン完備"]
        },
        {
          title: "スタジオ B (スモールバルコニー)",
          features: ["スモールバルコニー", "キングサイズベッド", "エアコン完備"]
        },
        {
          title: "スイートコーナー (フロント/バック)",
          features: ["1ベッドルーム 1リビング", "角部屋 (眺望良)", "52 - 56 sq.m."]
        },
        {
          title: "スイート 1ベッドルーム コーナー",
          features: ["1ベッドルームスイート", "広々とした空間", "52 - 54 sq.m."]
        }
      ]
    },
    contact: {
      title: "お問い合わせ",
      desc: "見学ご希望や詳細については、以下のチャンネルからお問い合わせください。24時間営業。",
      address_title: "住所",
      address_val: "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Phra Khanong Nuea, Watthana, Bangkok 10110",
      phone_title: "電話",
      phone_display: "+66 88-524-5959", // International format
      phone_action: "タップして発信",
      email_title: "メール",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "Googleマップを見る"
    },
    footer: {
      rights: "K-House Sukhumvit 71. All rights reserved."
    }
  },
  cn: {
    label: "中文",
    nav: {
      home: "首页",
      about: "关于我们",
      rooms: "客房及价格",
      facilities: "设施",
      contact: "联系我们",
    },
    hero: {
      location_badge: "素坤逸 71 • 比迪·帕农荣 14",
      title: "豪华公寓式住宅",
      subtitle: "体验完美的城市生活。安静、私密且绿意盎然。靠近 BTS Phra Khanong，设施齐全。",
      cta_rooms: "查看特价客房",
      cta_contact: "联系我们"
    },
    about: {
      welcome: "欢迎来到 K-House 71",
      title: "市中心的完美居所",
      desc: "K-House Sukhumvit 71 是一家以现代公寓风格装饰的豪华服务式公寓。我们精选 A 级材料，为需要安静和隐私的新一代和上班族提供服务。",
      points: [
        "靠近 BTS Phra Khanong (24小时摩托车出租服务)",
        "靠近 Chalong Rat 高速公路 (交通便利)",
        "靠近曼谷预科国际学校 (Bangkok Prep) 和圣安德鲁斯国际学校",
        "美食天堂！靠近 MaxValu, Lotus 和著名的街头美食区 (Pridi Banomyong 2)",
        "多条通道可达 (素坤逸 71, Khlong Tan, Phetchaburi)"
      ],
      location_card: {
        label: "黄金地段",
        value: "靠近高速公路 & 街头美食"
      }
    },
    facilities: {
      title: "设施",
      subtitle: "功能齐全，让您的住宿尽可能舒适。",
      items: [
        { name: "免费高速 WiFi" },
        { name: "CCTV & 24小时保安" },
        { name: "室内停车场" },
        { name: "门禁卡出入" },
        { name: "大堂区" },
        { name: "电梯" }
      ]
    },
    rooms: {
      title: "房型及价格",
      subtitle: "HOT PROMOTION! 长短期合约均享特别折扣。",
      disclaimer: "*** 价格可能会有所变动，请联系工作人员。",
      price_start: "促销起价",
      unit: "泰铢/月",
      unit_label: "单位：泰铢 (Baht)",
      table_headers: ["房型", "1年合约", "6个月合约", "3个月合约"],
      extra_charges: "额外费用",
      tv: "电视 500泰铢/月",
      fridge: "冰箱 500泰铢/月",
      cc: "我们接受主流信用卡",
      types: [
        {
          title: "单间公寓 A (大阳台)",
          features: ["大阳台", "内置家具", "空调和热水器"]
        },
        {
          title: "单间公寓 B (小阳台)",
          features: ["小阳台", "特大号床", "空调和热水器"]
        },
        {
          title: "套房角落 (前/后)",
          features: ["1卧1厅", "景观角落房", "52 - 56 平方米"]
        },
        {
          title: "单卧套房角落",
          features: ["单卧套房", "宽敞", "52 - 54 平方米"]
        }
      ]
    },
    contact: {
      title: "联系我们",
      desc: "有兴趣参观或需要更多信息？请通过以下渠道联系我们。每天24小时营业。",
      address_title: "地址",
      address_val: "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Phra Khanong Nuea, Watthana, Bangkok 10110",
      phone_title: "电话",
      phone_display: "+66 88-524-5959", // International format
      phone_action: "点击拨打",
      email_title: "电子邮件",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "查看谷歌地图"
    },
    footer: {
      rights: "K-House Sukhumvit 71. 保留所有权利。"
    }
  },
  ar: {
    label: "العربية",
    nav: {
      home: "الرئيسية",
      about: "معلومات عنا",
      rooms: "الغرف والأسعار",
      facilities: "المرافق",
      contact: "اتصل بنا",
    },
    hero: {
      location_badge: "سوخومفيت 71 • بريدي بانوميونغ 14",
      title: "شقق فاخرة بنمط كوندومينيوم",
      subtitle: "استمتع بحياة المدينة المثالية. هدوء، خصوصية، ومساحات خضراء. بالقرب من محطة بي تي إس فرا خانونغ مع مرافق متكاملة.",
      cta_rooms: "عرض الغرف",
      cta_contact: "اتصل بنا"
    },
    about: {
      welcome: "مرحباً بكم في كي-هاوس 71",
      title: "العيش المثالي في وسط المدينة",
      desc: "كي-هاوس سوخومفيت 71 هي شقق مخدومة فاخرة مصممة بنمط كوندومينيوم حديث. نختار مواد من الدرجة الأولى لخدمة الجيل الجديد والعاملين الذين يبحثون عن الهدوء والخصوصية.",
      points: [
        "بالقرب من محطة بي تي إس فرا خانونغ (خدمة تاكسي دراجات نارية على مدار 24 ساعة)",
        "بالقرب من طريق تشالونج رات السريع (سهولة الوصول إلى المدينة)",
        "بالقرب من مدارس بانكوك بريب وسانت أندروز الدولية",
        "جنة عشاق الطعام! بالقرب من ماكس فالو، لوتس وأشهر مأكولات الشارع (بريدي بانوميونغ 2)",
        "طرق وصول متعددة (سوخومفيت 71، خلونج تان، فيتشابوري)"
      ],
      location_card: {
        label: "موقع متميز",
        value: "بالقرب من الطريق السريع والمدارس الدولية"
      }
    },
    facilities: {
      title: "المرافق",
      subtitle: "متكاملة بجميع الوظائف لجعل إقامتك مريحة قدر الإمكان.",
      items: [
        { name: "واي فاي سريع مجاني" },
        { name: "كاميرات مراقبة وأمن 24 ساعة" },
        { name: "مواقف سيارات داخلية" },
        { name: "دخول بالبطاقة الذكية" },
        { name: "منطقة اللوبي" },
        { name: "مصعد" }
      ]
    },
    rooms: {
      title: "أنواع الغرف والأسعار",
      subtitle: "HOT PROMOTION! خصم خاص للعقود.",
      note: "*** الأسعار قابلة للتغيير.",
      unit: "بات/شهر",
      price_start: "يبدأ العرض من",
      unit_label: "الوحدة: بات (Baht)",
      table_headers: ["نوع الغرفة", "عقد سنة", "عقد 6 أشهر", "عقد 3 أشهر"],
      extra_charges: "رسوم إضافية",
      tv: "تلفزيون 500 بات",
      fridge: "ثلاجة 500 بات",
      cc: "نقبل بطاقات الائتمان",
      types: [
        {
          title: "استوديو أ (شرفة كبيرة)",
          features: ["شرفة كبيرة", "أثاث مدمج", "تكييف"]
        },
        {
          title: "استوديو ب (شرفة صغيرة)",
          features: ["شرفة صغيرة", "سرير كبير", "تكييف"]
        },
        {
          title: "جناح الزاوية (أمامي/خلفي)",
          features: ["1 غرفة نوم", "إطلالة زاوية", "52 - 56 م2"]
        },
        {
          title: "جناح 1 غرفة نوم الزاوية",
          features: ["جناح 1 غرفة", "واسعة", "52 - 54 م2"]
        }
      ]
    },
    contact: {
      title: "اتصل بنا",
      desc: "مفتوح على مدار 24 ساعة.",
      address_title: "العنوان",
      address_val: "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Watthana, Bangkok 10110",
      phone_title: "الهاتف",
      phone_display: "+66 88-524-5959",
      phone_action: "انقر للاتصال",
      email_title: "البريد الإلكتروني",
      email_val: "contact@k-house71.com",
      social_title: "فيسبوك",
      social_label: "K-House Apartment",
      map_btn: "عرض خرائط جوجل"
    },
    footer: {
      rights: "كي-هاوس سوخومفيت 71. جميع الحقوق محفوظة."
    }
  }
};

// --- Data Constants ---
const roomCards: RoomCard[] = [
  {
    id: 0,
    size: "28 sq.m.",
    startPrice: "6,400",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotPromo: false
  },
  {
    id: 1,
    size: "26 sq.m.",
    startPrice: "5,900",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotPromo: false
  },
  {
    id: 2,
    size: "52 - 56 sq.m.",
    startPrice: "12,000",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotPromo: true
  },
  {
    id: 3,
    size: "52 - 54 sq.m.",
    startPrice: "13,000",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotPromo: true
  }
];

const ratesData: RateRow[] = [
  { name: "Studio A (Big Balcony)", size: "(28 Sqm.)", rates: { y1: { old: "6,900", new: "6,400" }, m6: { old: "7,200", new: "6,800" }, m3: null } },
  { name: "Studio B (Small Balcony)", size: "(26 Sqm.)", rates: { y1: { old: "6,500", new: "5,900" }, m6: { old: "6,800", new: "6,400" }, m3: null } },
  { name: "Sweet Corner / Front", size: "(52 Sqm.)", rates: { y1: { old: "15,000", new: "12,000" }, m6: { old: "16,000", new: "13,000" }, m3: { old: "18,000", new: "14,000" } } },
  { name: "Sweet Corner / Front", size: "(54 Sqm.)", rates: { y1: { old: "16,000", new: "13,000" }, m6: { old: "17,000", new: "14,000" }, m3: { old: "19,000", new: "15,000" } } },
  { name: "Sweet Corner / Back", size: "(56 Sqm.)", rates: { y1: { old: "17,000", new: "14,000" }, m6: { old: "18,000", new: "15,000" }, m3: { old: "20,000", new: "16,000" } } },
  { name: "Suite 1 Bedroom Corner", size: "(52 Sqm.)", rates: { y1: { old: "16,000", new: "13,000" }, m6: { old: "17,000", new: "14,000" }, m3: { old: "19,000", new: "15,000" } } },
  { name: "Suite 1 Bedroom Corner", size: "(54 Sqm.)", rates: { y1: { old: "17,000", new: "14,000" }, m6: { old: "18,000", new: "15,000" }, m3: { old: "20,000", new: "16,000" } } }
];

const facilityIcons = [Wifi, Shield, Car, Star, Coffee, Home];

// --- Sub-Components ---

interface NavbarProps {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: TranslationData;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languageOptions: { code: LanguageCode; label: string; fullLabel: string }[] = [
    { code: 'th', label: 'TH', fullLabel: 'ไทย' },
    { code: 'en', label: 'EN', fullLabel: 'English' },
    { code: 'cn', label: 'CN', fullLabel: '中文' },
    { code: 'jp', label: 'JP', fullLabel: '日本語' },
    { code: 'ar', label: 'AR', fullLabel: 'العربية' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section - Modified Layout: Logo Left, Text Right */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          
          {/* Logo Image - User provided PNG */}
          <div className="relative flex items-center justify-center shrink-0" style={{ width: '60px', height: '60px' }}>
             <img 
                src={kLogo} 
                alt="K-House Logo" 
                className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
             />
          </div>
          
          {/* Text Group - Moved to Right & Left Aligned */}
          <div className="flex flex-col items-start leading-none">
            {/* K-HOUSE */}
            <span className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-emerald-900' : 'text-white'}`}>
              K-HOUSE
            </span>
            {/* Sukhumvit 71 */}
            <span className={`text-sm font-light tracking-wide mt-1 ${scrolled ? 'text-emerald-700' : 'text-emerald-100'}`}>
              Sukhumvit 71
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>
          {Object.entries(t.nav).map(([key, label]) => (
            <a key={key} href={`#${key}`} className="hover:text-emerald-500 transition-colors">{label}</a>
          ))}
          
          {/* Desktop Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${scrolled ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-50' : 'border-white/50 text-white hover:bg-white/10'}`}
            >
              <Globe size={16} /> 
              <span className="text-sm font-bold uppercase">{lang}</span>
              <ChevronDown size={14} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-emerald-50 transition-colors ${lang === opt.code ? 'border-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-600'}`}
                  >
                    <span>{opt.fullLabel}</span>
                    {lang === opt.code && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button 
            className={`text-emerald-500 ${!scrolled && isMenuOpen ? 'text-emerald-500' : (!scrolled ? 'text-white' : 'text-emerald-500')}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900/50 z-40" onClick={() => setIsMenuOpen(false)}>
           <div 
             className="absolute top-0 right-0 h-full w-3/4 bg-white shadow-2xl p-6 pt-24 flex flex-col gap-6"
             onClick={(e) => e.stopPropagation()}
           >
            <div className="flex flex-col gap-4">
              {Object.entries(t.nav).map(([key, label]) => (
                <a key={key} href={`#${key}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-700 pb-2 border-b border-slate-100">{label}</a>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Select Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${lang === opt.code ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'}`}
                  >
                    {opt.fullLabel}
                  </button>
                ))}
              </div>
            </div>
           </div>
        </div>
      )}
    </nav>
  );
};

interface ComponentProps {
  t: TranslationData;
}

const Hero: React.FC<ComponentProps> = ({ t }) => (
  <header id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
        alt="Bangkok Skyline" 
        className="w-full h-full object-cover"
      />
      {/* Changed gradient to Green/Emerald tones */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-teal-800/80 to-slate-900/70"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
      <div className="md:w-2/3 lg:w-1/2">
        {/* ใช้สีตัดกัน (Accent - Copper/Bronze) ที่มีความเป็นน้ำตาลแต่ยังโดดเด่น */}
        <span className="inline-block py-1 px-4 rounded-full bg-amber-700/40 border border-amber-500/50 text-amber-200 text-sm font-semibold mb-6 backdrop-blur-sm shadow-lg shadow-amber-900/30">
          {t.hero.location_badge}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-lg text-slate-200 mb-8 font-light max-w-xl mx-auto md:mx-0">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#rooms" className="px-8 py-3 bg-emerald-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2 transform hover:-translate-y-1">
            {t.hero.cta_rooms} <ChevronRight size={18} />
          </a>
          <a href="#contact" className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1">
            {t.hero.cta_contact}
          </a>
        </div>
      </div>
    </div>
  </header>
);

const About: React.FC<ComponentProps> = ({ t }) => (
  <section id="about" className="py-20 bg-white overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 relative">
          {/* เพิ่ม Blob สีอ่อนๆ วางซ้อนกันด้านหลังรูปเพื่อลดความแข็งกระด้าง */}
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-amber-200 rounded-full opacity-60 z-0 mix-blend-multiply filter blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-teal-100 rounded-full opacity-60 z-0 mix-blend-multiply filter blur-2xl"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Interior" 
            className="relative z-10 rounded-3xl shadow-2xl object-cover h-[400px] w-full"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-slate-50 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100/60 rounded-full flex items-center justify-center text-amber-700">
                <MapPin />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t.about.location_card.label}</p>
                <p className="font-bold text-slate-800">{t.about.location_card.value}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-amber-700 font-bold tracking-widest uppercase text-xs mb-3">{t.about.welcome}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-snug">{t.about.title}</h3>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">
            {t.about.desc}
          </p>
          <ul className="space-y-4 mb-8">
            {t.about.points.map((point, i) => (
              <li key={i} className="flex items-start gap-4 text-slate-700">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold">✓</span></div>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Facilities: React.FC<ComponentProps> = ({ t }) => (
  <section id="facilities" className="py-20 bg-slate-50 relative overflow-hidden">
    {/* Background Pattern อ่อนๆ */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
       <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
       <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
    </div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.facilities.title}</h2>
      <p className="text-slate-600 mb-14 max-w-2xl mx-auto">{t.facilities.subtitle}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {t.facilities.items.map((item, index) => {
          const IconComponent = facilityIcons[index];
          return (
            <div key={index} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-slate-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-amber-600/30">
                <IconComponent className="w-6 h-6" />
              </div>
              <h4 className="font-medium text-slate-700 text-sm group-hover:text-emerald-700 transition-colors">{item.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Rooms: React.FC<ComponentProps> = ({ t }) => (
  <section id="rooms" className="py-20 bg-white relative">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">{t.rooms.title}</h2>
          <p className="text-amber-600 font-bold bg-amber-100/50 inline-block px-4 py-1.5 rounded-full shadow-sm">{t.rooms.subtitle}</p>
        </div>
      </div>

      {/* Room Cards Grid (4 Types) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {roomCards.map((room, idx) => {
           const textData = t.rooms.types[idx] || t.rooms.types[0]; // Fallback
           return (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
              <div className="h-56 overflow-hidden relative">
                {room.hotPromo && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg animate-pulse">
                    HOT PROMO
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-teal-800/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md">
                  {room.size}
                </div>
                <img src={room.image} alt={textData.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight">{textData.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {textData.features.map((feature, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-full">{feature}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">{t.rooms.price_start}</p>
                    <p className="text-xl font-extrabold text-red-600">{room.startPrice} <span className="text-xs text-slate-400 font-normal">{t.rooms.unit}</span></p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rates Table Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-8">
        <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row justify-center items-center relative">
           <h3 className="text-xl font-bold text-white uppercase tracking-wider">Room Rates</h3>
           <span className="sm:absolute sm:right-6 bg-white/20 text-white text-xs px-3 py-1 rounded-full mt-2 sm:mt-0">
             {t.rooms.unit_label}
           </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-sm font-bold text-slate-700 whitespace-nowrap">{t.rooms.table_headers[0]}</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-700 text-center whitespace-nowrap">{t.rooms.table_headers[1]}</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-700 text-center whitespace-nowrap">{t.rooms.table_headers[2]}</th>
                <th className="py-4 px-6 text-sm font-bold text-slate-700 text-center whitespace-nowrap">{t.rooms.table_headers[3]}</th>
              </tr>
            </thead>
            <tbody>
              {ratesData.map((row, index) => {
                // Determine row color based on group
                const rowBg = index < 2 ? 'bg-white' : index < 5 ? 'bg-blue-50/30' : 'bg-amber-50/30';
                return (
                  <tr key={index} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${rowBg}`}>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{row.name}</div>
                      <div className="text-xs text-slate-500">{row.size}</div>
                    </td>
                    
                    {/* 1 Year */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-400 line-through mb-0.5">{row.rates.y1.old}</span>
                        <span className="text-lg font-extrabold text-red-600">{row.rates.y1.new}</span>
                      </div>
                    </td>
                    
                    {/* 6 Months */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-400 line-through mb-0.5">{row.rates.m6.old}</span>
                        <span className="text-lg font-bold text-emerald-700">{row.rates.m6.new}</span>
                      </div>
                    </td>
                    
                    {/* 3 Months */}
                    <td className="py-4 px-6 text-center">
                      {row.rates.m3 ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs text-slate-400 line-through mb-0.5">{row.rates.m3.old}</span>
                          <span className="text-lg font-bold text-emerald-700">{row.rates.m3.new}</span>
                        </div>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extra Charges & Details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
        <div>
          <p className="text-xs text-slate-500 italic mb-4">{t.rooms.disclaimer}</p>
          <h4 className="font-bold text-red-600 mb-2">{t.rooms.extra_charges}</h4>
          <ul className="text-sm text-slate-700 space-y-2">
            <li className="flex items-center gap-2">
              <Tv size={16} className="text-slate-400" /> {t.rooms.tv}
            </li>
            <li className="flex items-center gap-2">
              <Refrigerator size={16} className="text-slate-400" /> {t.rooms.fridge}
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0">
          <p className="font-bold text-slate-800 flex items-center gap-2">
            <CreditCard size={18} className="text-emerald-600"/> {t.rooms.cc}
          </p>
          <div className="flex gap-2 items-center">
            <div className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 flex items-center justify-center h-8 w-12 hover:shadow-md transition-shadow">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="VISA" className="h-full w-full object-contain" />
            </div>
            <div className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 flex items-center justify-center h-8 w-12 hover:shadow-md transition-shadow">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-full w-full object-contain" />
            </div>
            <div className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 flex items-center justify-center h-8 w-12 hover:shadow-md transition-shadow">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
);

const Contact: React.FC<ComponentProps> = ({ t }) => (
  <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
    {/* Decorative elements - Analogous vibe (Teal & Emerald) */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600 rounded-full filter blur-[120px] opacity-20"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">{t.contact.title}</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            {t.contact.desc}
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-400">
                <MapPin />
              </div>
              <div>
                <h4 className="font-bold text-lg">{t.contact.address_title}</h4>
                <p className="text-slate-300">
                  {t.contact.address_val}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Phone />
              </div>
              <div>
                <h4 className="font-bold text-lg">{t.contact.phone_title}</h4>
                <a href={`tel:${t.contact.phone_display.replace(/[^0-9+]/g, '')}`} className="text-slate-300 text-xl font-mono hover:text-white transition-colors">{t.contact.phone_display}</a>
                <p className="text-slate-400 text-sm">{t.contact.phone_action}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Mail />
              </div>
              <div>
                <h4 className="font-bold text-lg">{t.contact.email_title}</h4>
                <a href={`mailto:${t.contact.email_val}`} className="text-slate-300 text-lg hover:text-white transition-colors">{t.contact.email_val}</a>
              </div>
            </div>

            {/* Facebook Section */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-400">
                <Facebook />
              </div>
              <div>
                <h4 className="font-bold text-lg">{t.contact.social_title}</h4>
                <a 
                  href="https://www.facebook.com/p/K-House-Apartment-100063709861884/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 text-lg hover:text-white transition-colors"
                >
                  {t.contact.social_label}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-2 h-[500px] shadow-2xl">
          <div className="w-full h-full bg-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-500 relative overflow-hidden group">
             {/* Map visual */}
             <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/100.595,13.72,15,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
             <div className="z-10 bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <MapPin className="text-red-500 w-8 h-8 mb-2" />
                <span className="font-bold text-slate-800">K-House 71</span>
                {/* Updated Google Maps Link */}
                <a 
                  href="https://maps.app.goo.gl/2Z5Mir77TxRSJdoj8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition-colors"
                >
                  {t.contact.map_btn}
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC<ComponentProps> = ({ t }) => (
  <footer className="bg-emerald-950 py-8 border-t border-emerald-900">
    <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
      <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
    </div>
  </footer>
);

// --- ChatBot Component ---
interface ChatBotProps {
  lang: LanguageCode;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am K-Bot, the AI assistant for K-House 71. How can I help you today? (I can speak Thai, English, Japanese, Chinese, and Arabic!)' }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: inputText }] }],
          systemInstruction: {
            parts: [{
              text: `You are K-Bot, a helpful and polite AI receptionist for K-House 71 (Sukhumvit 71, Bangkok).
              
              Context about K-House 71:
              - Location: 54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Phra Khanong Nuea, Watthana, Bangkok 10110.
              - Transport: Near BTS Phra Khanong, Chalong Rat Expressway. Easy access to Sukhumvit 71, Khlong Tan, Phetchaburi.
              - Nearby: MaxValu, Lotus, Street food at Pridi Banomyong 2, Bangkok Prep & St. Andrews International Schools.
              - Facilities: Free High-Speed WiFi, CCTV & 24hr Security, Indoor Parking, Key Card Access, Lobby, Elevator.
              - Room Types & Rates (Promotions):
                1. Studio A (28 sqm, Big Balcony): 1yr=6400 (norm 6900), 6mo=6800 (norm 7200).
                2. Studio B (26 sqm, Small Balcony): 1yr=5900 (norm 6500), 6mo=6400 (norm 6800).
                3. Sweet Corner / Suite (52-56 sqm): Range 12,000 - 16,000 depending on floor/view and contract length.
              - Extra Charges: TV 500 THB/mo, Fridge 500 THB/mo. Water/Elec excluded.
              - Contact: 088-524-5959, contact@k-house71.com, FB: K-House Apartment.
              - Payment: Cash, Credit Cards (Visa, Master, JCB).
              
              Instructions:
              - Answer concisely and politely.
              - Detect the user's language and reply in the same language (Thai, English, Japanese, Chinese, Arabic).
              - If asked about booking, suggest calling or emailing.
              - Emphasize the "Hot Promotion" prices.
              `
            }]
          }
        })
      });

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I am having trouble connecting right now. Please try again later.";
      
      setMessages(prev => [...prev, { role: 'model', text: aiResponseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? <XCircle size={28} /> : <div className="relative"><MessageCircle size={28} /><Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" /></div>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-linear-to-r from-emerald-600 to-teal-700 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">K-Bot Assistant ✨</h3>
              <p className="text-emerald-100 text-xs">Ask me anything about K-House!</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputText.trim()}
              className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// --- Main App Component ---
export default function App() {
  const [lang, setLang] = useState<LanguageCode>('en');
  // Fallback language to English
  const t = translations[lang] || translations['en'];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <About t={t} />
      <Facilities t={t} />
      <Rooms t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <ChatBot lang={lang} />
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Wifi,
  Shield,
  Car,
  Coffee,
  Home,
  Star,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Mail,
  Facebook,
  Globe,
  Tv,
  Refrigerator,
  Sparkles,
  Tag,
  BrainCircuit,
  Loader2,
} from "lucide-react";

// Import Logo from local assets
import kLogo from "./assets/k-logo.png";
// const kLogo = "https://placehold.co/100x100/059669/ffffff?text=K+Logo";

// --- Gemini API Configuration ---
const apiKey: string = ""; // API Key provided by environment

// --- Types & Interfaces ---
type LanguageCode = "th" | "en" | "jp" | "cn" | "ar";

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
    view_photos: string;
    ai_help_btn: string; // New
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
  promotion: {
    title: string;
    detail: string;
    cta: string;
    limited: string;
  };
  promotion_banner: {
    starting_from: string;
    unit_mo: string;
    contract_1yr: string;
  };
  room_matcher: {
    // New
    title: string;
    subtitle: string;
    placeholder: string;
    analyze_btn: string;
    result_title: string;
  };
  footer: {
    rights: string;
  };
}

interface RoomCard {
  id: number;
  size: string;
  startPrice: string;
  images: string[];
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

interface SectionProps {
  t: TranslationData;
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
      subtitle:
        "สัมผัสชีวิตคนเมืองที่ลงตัว เงียบสงบ ร่มรื่น ใกล้ BTS พระโขนง เดินทางสะดวก พร้อมสิ่งอำนวยความสะดวกครบครัน",
      cta_rooms: "ดูห้องพักราคาพิเศษ",
      cta_contact: "ติดต่อสอบถาม",
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
        "เข้า-ออกได้หลายทาง (สุขุมวิท 71, คลองตัน, เพชรบุรี)",
      ],
      location_card: {
        label: "ทำเลศักยภาพ",
        value: "ใกล้ทางด่วน & Street Food",
      },
    },
    facilities: {
      title: "สิ่งอำนวยความสะดวก",
      subtitle:
        "ครบครันด้วยฟังก์ชันการใช้งาน เพื่อให้การพักอาศัยของคุณสะดวกสบายที่สุด",
      items: [
        { name: "Free High-Speed WiFi" },
        { name: "CCTV & รปภ. 24 ชม." },
        { name: "ที่จอดรถในร่ม" },
        { name: "เข้า-ออกด้วย Key Card" },
        { name: "ล็อบบี้รับแขก" },
        { name: "ลิฟต์โดยสาร" },
      ],
    },
    rooms: {
      title: "รูปแบบห้องพัก & อัตราค่าเช่า",
      subtitle: "HOT PROMOTION! โปรโมชั่นลดราคาพิเศษสำหรับทุกสัญญาเช่า",
      disclaimer: "*** ราคาอาจมีการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
      price_start: "โปรโมชั่นเริ่มต้น",
      unit: "บาท/เดือน",
      unit_label: "หน่วย: บาท (Baht)",
      table_headers: [
        "ประเภทห้อง (Room Type)",
        "สัญญา 1 ปี (1 Year)",
        "สัญญา 6 เดือน (6 Months)",
        "สัญญา 3 เดือน (3 Months)",
      ],
      extra_charges: "ค่าใช้จ่ายเพิ่มเติม (Extra Charges)",
      tv: "โทรทัศน์ (Television) 500 บาท/เดือน",
      fridge: "ตู้เย็น (Refrigerator) 500 บาท/เดือน",
      cc: "ยินดีรับบัตรเครดิต (We accept major Credit Cards)",
      view_photos: "ดูรูปภาพเพิ่มเติม",
      ai_help_btn: "ให้ AI ช่วยเลือกห้อง",
      types: [
        {
          title: "Studio A (Big Balcony)",
          features: ["ระเบียงกว้าง", "เฟอร์นิเจอร์ Built-in", "แอร์ & น้ำอุ่น"],
        },
        {
          title: "Studio B (Small Balcony)",
          features: ["ระเบียงมาตรฐาน", "เตียง 6 ฟุต", "แอร์ & น้ำอุ่น"],
        },
        {
          title: "Sweet Corner (Front/Back)",
          features: [
            "1 ห้องนอน 1 ห้องนั่งเล่น",
            "มุมห้องวิวสวย",
            "52 - 56 ตร.ม.",
          ],
        },
        {
          title: "Suite 1 Bedroom Corner",
          features: ["ห้องสวีท 1 ห้องนอน", "พื้นที่กว้างขวาง", "52 - 54 ตร.ม."],
        },
      ],
    },
    contact: {
      title: "ติดต่อเรา",
      desc: "สนใจเข้าชมห้องพัก หรือสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ตามช่องทางด้านล่าง เปิดทำการตลอดเวลา",
      address_title: "ที่อยู่",
      address_val:
        "54 ซอยปรีดีพนมยงค์ 14 แยก 4 ถ.สุขุมวิท 71 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพฯ 10110",
      phone_title: "โทรศัพท์",
      phone_display: "088-524-5959",
      phone_action: "กดเพื่อโทรออก",
      email_title: "อีเมล",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "ดูแผนที่ Google Maps",
    },
    promotion: {
      title: "โปรโมชั่นพิเศษ! 🔥",
      detail: "ส่วนลดพิเศษสำหรับสัญญาเช่า 6 เดือน และ 1 ปี",
      cta: "ดูราคาและจองเลย",
      limited: "ด่วน! ห้องมีจำนวนจำกัด",
    },
    promotion_banner: {
      starting_from: "เริ่มต้นเพียง",
      unit_mo: "/เดือน",
      contract_1yr: "สัญญา 1 ปี",
    },
    room_matcher: {
      title: "AI Room Matcher ✨",
      subtitle:
        "ไม่แน่ใจว่าจะเลือกห้องไหน? บอกความต้องการของคุณ แล้วให้ AI แนะนำให้สิครับ!",
      placeholder:
        "เช่น: อยากได้ห้องเงียบๆ งบประมาณ 7,000 บาท อยู่ประมาณ 6 เดือน...",
      analyze_btn: "วิเคราะห์หาห้องที่ใช่",
      result_title: "ห้องที่แนะนำสำหรับคุณ:",
    },
    footer: {
      rights: "K-House Sukhumvit 71. สงวนลิขสิทธิ์.",
    },
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
      subtitle:
        "Experience perfect urban living. Quiet, private, and green. Near BTS Phra Khanong with full facilities.",
      cta_rooms: "View Rooms",
      cta_contact: "Contact Us",
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
        "Multiple access routes (Sukhumvit 71, Khlong Tan, Phetchaburi)",
      ],
      location_card: {
        label: "Prime Location",
        value: "Near Expressway & Street Food",
      },
    },
    facilities: {
      title: "Facilities",
      subtitle:
        "Complete with functions to make your stay as comfortable as possible.",
      items: [
        { name: "Free High-Speed WiFi" },
        { name: "CCTV & 24hr Security" },
        { name: "Indoor Parking" },
        { name: "Key Card Access" },
        { name: "Lobby Area" },
        { name: "Elevator" },
      ],
    },
    rooms: {
      title: "Room Types & Rates",
      subtitle:
        "HOT PROMOTION! Special discount available for short term and long term agreements.",
      disclaimer: "*** Prices are subjected to change without prior notice.",
      price_start: "Promo starts at",
      unit: "Baht/Month",
      unit_label: "Unit: Baht",
      table_headers: [
        "Room Type",
        "1 Year Contract",
        "6 Months Contract",
        "3 Months Contract",
      ],
      extra_charges: "Extra Charges",
      tv: "Television 500 Baht / month",
      fridge: "Refrigerator 500 Baht / month",
      cc: "We accept major Credit Cards",
      view_photos: "View Photos",
      ai_help_btn: "Help Me Choose (AI)",
      types: [
        {
          title: "Studio A (Big Balcony)",
          features: ["Big Balcony", "Built-in Furniture", "AC & Water Heater"],
        },
        {
          title: "Studio B (Small Balcony)",
          features: ["Small Balcony", "King Size Bed", "AC & Water Heater"],
        },
        {
          title: "Sweet Corner (Front/Back)",
          features: ["1 Bed 1 Living", "Nice Corner View", "52 - 56 sq.m."],
        },
        {
          title: "Suite 1 Bedroom Corner",
          features: ["1 Bedroom Suite", "Spacious", "52 - 54 sq.m."],
        },
      ],
    },
    contact: {
      title: "Contact Us",
      desc: "Interested in visiting or need more info? Contact us via channels below. Open 24/7.",
      address_title: "Address",
      address_val:
        "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Watthana, Bangkok 10110",
      phone_title: "Phone",
      phone_display: "+66 88-524-5959", // International format
      phone_action: "Tap to call",
      email_title: "Email",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "View Google Maps",
    },
    promotion: {
      title: "Special Promotion! 🔥",
      detail: "Special discount for 6-month & 1-year contracts.",
      cta: "See Rates & Book",
      limited: "Hurry! Limited Availability",
    },
    promotion_banner: {
      starting_from: "Starting from",
      unit_mo: "/mo",
      contract_1yr: "1 Year Contract",
    },
    room_matcher: {
      title: "AI Room Matcher ✨",
      subtitle:
        "Unsure which room fits you best? Tell us your needs and let AI decide!",
      placeholder:
        "e.g., I need a quiet room for 6 months, budget around 7,000 THB...",
      analyze_btn: "Find My Room",
      result_title: "AI Recommendation:",
    },
    footer: {
      rights: "K-House Sukhumvit 71. All rights reserved.",
    },
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
      subtitle:
        "都会の完璧な生活を体験してください。静かでプライベート、そして緑豊か。BTSプラカノン駅に近く、設備も充実しています。",
      cta_rooms: "特別価格の部屋を見る",
      cta_contact: "お問い合わせ",
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
        "多方面からのアクセス可能 (スクンビット71, クロンタン, ペチャブリー)",
      ],
      location_card: {
        label: "好立地",
        value: "高速道路 & ストリートフード近く",
      },
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
        { name: "エレベーター" },
      ],
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
      view_photos: "写真を見る",
      ai_help_btn: "AIで部屋を選ぶ",
      types: [
        {
          title: "スタジオ A (大きなバルコニー)",
          features: ["広いバルコニー", "作り付け家具", "エアコン完備"],
        },
        {
          title: "スタジオ B (スモールバルコニー)",
          features: [
            "スモールバルコニー",
            "キングサイズベッド",
            "エアコン完備",
          ],
        },
        {
          title: "スイートコーナー (フロント/バック)",
          features: [
            "1ベッドルーム 1リビング",
            "角部屋 (眺望良)",
            "52 - 56 sq.m.",
          ],
        },
        {
          title: "スイート 1ベッドルーム コーナー",
          features: [
            "1ベッドルームスイート",
            "広々とした空間",
            "52 - 54 sq.m.",
          ],
        },
      ],
    },
    contact: {
      title: "お問い合わせ",
      desc: "見学ご希望や詳細については、以下のチャンネルからお問い合わせください。24時間営業。",
      address_title: "住所",
      address_val:
        "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Phra Khanong Nuea, Watthana, Bangkok 10110",
      phone_title: "電話",
      phone_display: "+66 88-524-5959", // International format
      phone_action: "タップして発信",
      email_title: "メール",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "Googleマップを見る",
    },
    promotion: {
      title: "特別プロモーション！ 🔥",
      detail: "6ヶ月および1年契約の特別割引。",
      cta: "料金を見る",
      limited: "お早めに！空室わずか",
    },
    promotion_banner: {
      starting_from: "最低価格",
      unit_mo: "/月",
      contract_1yr: "1年契約",
    },
    room_matcher: {
      title: "AIルームマッチャー ✨",
      subtitle:
        "どの部屋がいいか迷っていますか？AIがあなたにぴったりの部屋を提案します！",
      placeholder: "例：静かな部屋、予算7,000バーツ、6ヶ月滞在...",
      analyze_btn: "部屋を探す",
      result_title: "AIのおすすめ：",
    },
    footer: {
      rights: "K-House Sukhumvit 71. All rights reserved.",
    },
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
      subtitle:
        "体验完美的城市生活。安静、私密且绿意盎然。靠近 BTS Phra Khanong，设施齐全。",
      cta_rooms: "查看特价客房",
      cta_contact: "联系我们",
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
        "多条通道可达 (素坤逸 71, Khlong Tan, Phetchaburi)",
      ],
      location_card: {
        label: "黄金地段",
        value: "靠近高速公路 & 街头美食",
      },
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
        { name: "电梯" },
      ],
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
      view_photos: "查看照片",
      ai_help_btn: "AI 帮我选房",
      types: [
        {
          title: "单间公寓 A (大阳台)",
          features: ["大阳台", "内置家具", "空调和热水器"],
        },
        {
          title: "单间公寓 B (小阳台)",
          features: ["小阳台", "特大号床", "空调和热水器"],
        },
        {
          title: "套房角落 (前/后)",
          features: ["1卧1厅", "景观角落房", "52 - 56 平方米"],
        },
        {
          title: "单卧套房角落",
          features: ["单卧套房", "宽敞", "52 - 54 平方米"],
        },
      ],
    },
    contact: {
      title: "联系我们",
      desc: "有兴趣参观或需要更多信息？请通过以下渠道联系我们。每天24小时营业。",
      address_title: "地址",
      address_val:
        "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Phra Khanong Nuea, Watthana, Bangkok 10110",
      phone_title: "电话",
      phone_display: "+66 88-524-5959", // International format
      phone_action: "点击拨打",
      email_title: "电子邮件",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "查看谷歌地图",
    },
    promotion: {
      title: "特别促销！ 🔥",
      detail: "6个月和1年合约的特别折扣。",
      cta: "查看价格",
      limited: "数量有限，欲订从速！",
    },
    promotion_banner: {
      starting_from: "最低起价",
      unit_mo: "/月",
      contract_1yr: "1年合约",
    },
    room_matcher: {
      title: "AI 选房助手 ✨",
      subtitle: "不确定选哪个房间？告诉我们您的需求，让 AI 为您推荐！",
      placeholder: "例如：我需要一个安静的房间，预算 7,000 泰铢，住 6 个月...",
      analyze_btn: "开始分析",
      result_title: "AI 推荐：",
    },
    footer: {
      rights: "K-House Sukhumvit 71. 保留所有权利。",
    },
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
      subtitle:
        "استمتع بحياة المدينة المثالية. هدوء، خصوصية. بالقرب من محطة بي تي إس فرا خانونغ.",
      cta_rooms: "عرض الغرف",
      cta_contact: "اتصل بنا",
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
        "طرق وصول متعددة (سوخومفيت 71، خلونج تان، فيتشابوري)",
      ],
      location_card: {
        label: "موقع متميز",
        value: "بالقرب من الطريق السريع والمدارس الدولية",
      },
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
        { name: "مصعد" },
      ],
    },
    rooms: {
      title: "أنواع الغرف والأسعار",
      subtitle: "HOT PROMOTION! خصم خاص للعقود.",
      disclaimer: "*** الأسعار قابلة للتغيير.",
      unit: "بات/شهر",
      price_start: "يبدأ العرض من",
      unit_label: "الوحدة: بات (Baht)",
      table_headers: ["نوع الغرفة", "عقد سنة", "عقد 6 أشهر", "عقد 3 أشهر"],
      extra_charges: "رسوم إضافية",
      tv: "تلفزيون 500 بات",
      fridge: "ثلاجة 500 بات",
      cc: "نقبل بطاقات الائتمان",
      view_photos: "عرض الصور",
      ai_help_btn: "مساعد AI لاختيار الغرفة",
      types: [
        {
          title: "استوديو أ (شرفة كبيرة)",
          features: ["شرفة كبيرة", "أثاث مدمج", "تكييف"],
        },
        {
          title: "استوديو ب (شرفة صغيرة)",
          features: ["شرفة صغيرة", "سرير كبير", "تكييف"],
        },
        {
          title: "جناح الزاوية (أمامي/خلفي)",
          features: ["1 غرفة نوم", "إطلالة زاوية", "52 - 56 م2"],
        },
        {
          title: "جناح 1 غرفة نوم الزاوية",
          features: ["جناح 1 غرفة", "واسعة", "52 - 54 م2"],
        },
      ],
    },
    contact: {
      title: "اتصل بنا",
      desc: "مفتوح على مدار 24 ساعة.",
      address_title: "العنوان",
      address_val:
        "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Watthana, Bangkok 10110",
      phone_title: "الهاتف",
      phone_display: "+66 88-524-5959",
      phone_action: "انقر للاتصال",
      email_title: "البريد الإلكتروني",
      email_val: "contact@k-house71.com",
      social_title: "فيسبوك",
      social_label: "K-House Apartment",
      map_btn: "عرض خرائط جوجل",
    },
    promotion: {
      title: "عرض خاص! 🔥",
      detail: "خصم خاص لعقود 6 أشهر وسنة واحدة.",
      cta: "عرض الأسعار",
      limited: "بسرعة! الأماكن محدودة",
    },
    promotion_banner: {
      starting_from: "تبدأ من",
      unit_mo: "/شهر",
      contract_1yr: "عقد لمدة سنة",
    },
    room_matcher: {
      title: "مستشار الغرف الذكي ✨",
      subtitle:
        "لست متأكداً أي غرفة تختار؟ أخبرنا باحتياجاتك وسيقوم الذكاء الاصطناعي باقتراح الأفضل!",
      placeholder: "مثال: أحتاج غرفة هادئة لمدة 6 أشهر، ميزانية 7000 بات...",
      analyze_btn: "تحليل واقتراح",
      result_title: "توصية الذكاء الاصطناعي:",
    },
    footer: {
      rights: "كي-هاوس سوخومفيت 71. جميع الحقوق محفوظة.",
    },
  },
};

// --- Data Constants ---
const roomCards: RoomCard[] = [
  {
    id: 0,
    size: "28 sq.m.",
    startPrice: "6,400",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    hotPromo: false,
  },
  {
    id: 1,
    size: "26 sq.m.",
    startPrice: "5,900",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    hotPromo: false,
  },
  {
    id: 2,
    size: "52 - 56 sq.m.",
    startPrice: "12,000",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    hotPromo: true,
  },
  {
    id: 3,
    size: "52 - 54 sq.m.",
    startPrice: "13,000",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    hotPromo: true,
  },
];

const ratesData: RateRow[] = [
  {
    name: "Studio A (Big Balcony)",
    size: "(28 Sqm.)",
    rates: {
      y1: { old: "6,900", new: "6,400" },
      m6: { old: "7,200", new: "6,800" },
      m3: null,
    },
  },
  {
    name: "Studio B (Small Balcony)",
    size: "(26 Sqm.)",
    rates: {
      y1: { old: "6,500", new: "5,900" },
      m6: { old: "6,800", new: "6,400" },
      m3: null,
    },
  },
  {
    name: "Sweet Corner / Front",
    size: "(52 Sqm.)",
    rates: {
      y1: { old: "15,000", new: "12,000" },
      m6: { old: "16,000", new: "13,000" },
      m3: { old: "18,000", new: "14,000" },
    },
  },
  {
    name: "Sweet Corner / Front",
    size: "(54 Sqm.)",
    rates: {
      y1: { old: "16,000", new: "13,000" },
      m6: { old: "17,000", new: "14,000" },
      m3: { old: "19,000", new: "15,000" },
    },
  },
  {
    name: "Sweet Corner / Back",
    size: "(56 Sqm.)",
    rates: {
      y1: { old: "17,000", new: "14,000" },
      m6: { old: "18,000", new: "15,000" },
      m3: { old: "20,000", new: "16,000" },
    },
  },
  {
    name: "Suite 1 Bedroom Corner",
    size: "(52 Sqm.)",
    rates: {
      y1: { old: "16,000", new: "13,000" },
      m6: { old: "17,000", new: "14,000" },
      m3: { old: "19,000", new: "15,000" },
    },
  },
  {
    name: "Suite 1 Bedroom Corner",
    size: "(54 Sqm.)",
    rates: {
      y1: { old: "17,000", new: "14,000" },
      m6: { old: "18,000", new: "15,000" },
      m3: { old: "20,000", new: "16,000" },
    },
  },
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languageOptions: {
    code: LanguageCode;
    label: string;
    fullLabel: string;
  }[] = [
    { code: "en", label: "EN", fullLabel: "English" },
    { code: "th", label: "TH", fullLabel: "ไทย" },
    { code: "cn", label: "CN", fullLabel: "中文" },
    { code: "jp", label: "JP", fullLabel: "日本語" },
    { code: "ar", label: "AR", fullLabel: "العربية" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md border-b border-stone-200 py-3" : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section - Modified Layout: Logo Left, Text Right */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {/* Logo Image */}
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{ width: "60px", height: "60px" }}
          >
            <img
              src={kLogo}
              alt="K-House Logo"
              className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text Group - Moved to Right & Left Aligned */}
          <div className="flex flex-col items-start leading-none">
            {/* K-HOUSE */}
            <span
              className={`text-2xl font-bold tracking-tight uppercase ${scrolled ? "text-stone-900" : "text-white"}`}
              style={{ fontFamily: "serif" }}
            >
              K-HOUSE
            </span>
            {/* Sukhumvit 71 */}
            <span
              className={`text-xs font-medium tracking-widest mt-1 uppercase ${scrolled ? "text-stone-600" : "text-stone-200"}`}
            >
              Sukhumvit 71
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? "text-stone-700" : "text-stone-100"}`}
        >
          {Object.entries(t.nav).map(([key, label]) => (
            <a
              key={key}
              href={`#${key}`}
              className={`uppercase text-sm tracking-wider hover:text-amber-600 transition-colors ${scrolled ? "" : "text-shadow-sm"}`}
            >
              {label}
            </a>
          ))}

          {/* Desktop Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${scrolled ? "border-stone-300 text-stone-700 hover:border-amber-600 hover:text-amber-600" : "border-white/50 text-white hover:bg-white/10"}`}
            >
              <Globe size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">
                {lang}
              </span>
              <ChevronDown size={14} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-stone-50 transition-colors uppercase tracking-wider ${lang === opt.code ? "text-amber-700 font-bold bg-amber-50" : "text-stone-600"}`}
                  >
                    <span>{opt.fullLabel}</span>
                    {lang === opt.code && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-700"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button
            className={`${!scrolled && isMenuOpen ? "text-stone-900" : !scrolled ? "text-white" : "text-stone-900"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-stone-900/90 z-40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-3/4 bg-white shadow-2xl p-8 pt-24 flex flex-col gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6">
              {Object.entries(t.nav).map(([key, label]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-stone-800 uppercase tracking-widest border-b border-stone-100 pb-2"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
                Select Language
              </p>
              <div className="grid grid-cols-2 gap-3">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${lang === opt.code ? "border-amber-700 bg-amber-50 text-amber-800" : "border-stone-200 text-stone-600"}`}
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

const Hero: React.FC<SectionProps> = ({ t }) => (
  <header
    id="home"
    className="relative h-[700px] flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="Bangkok Skyline"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay for classic luxury feel */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block py-1.5 px-6 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md rounded-full">
          {t.hero.location_badge}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif tracking-wide shadow-black drop-shadow-lg">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-stone-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#rooms"
            className="px-10 py-4 bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl rounded-full"
          >
            {t.hero.cta_rooms}
          </a>
          <a
            href="#contact"
            className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-full"
          >
            {t.hero.cta_contact}
          </a>
        </div>
      </div>
    </div>
  </header>
);

const About: React.FC<SectionProps> = ({ t }) => (
  <section id="about" className="py-24 bg-stone-50 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 relative p-4">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-700/30 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-700/30 rounded-br-3xl"></div>

          <img
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Interior"
            className="relative z-10 shadow-2xl object-cover h-[500px] w-full grayscale-[10%] hover:grayscale-0 transition-all duration-700 rounded-2xl"
          />

          <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl z-20 hidden md:block max-w-xs border border-stone-100 rounded-2xl">
            <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-2">
              {t.about.location_card.label}
            </p>
            <p className="font-serif text-2xl text-stone-900 leading-tight">
              {t.about.location_card.value}
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-amber-700 font-bold uppercase tracking-[0.2em] text-sm mb-4">
            {t.about.welcome}
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8 leading-tight">
            {t.about.title}
          </h3>
          <p className="text-stone-600 mb-8 leading-relaxed text-lg font-light">
            {t.about.desc}
          </p>
          <ul className="space-y-4 mb-10">
            {t.about.points.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-4 text-stone-700">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2.5 shrink-0"></div>
                <span className="leading-relaxed font-light">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Facilities: React.FC<SectionProps> = ({ t }) => (
  <section
    id="facilities"
    className="py-24 bg-white relative overflow-hidden border-t border-stone-100"
  >
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">
        {t.facilities.title}
      </h2>
      <div className="w-20 h-1 bg-amber-700 mx-auto mb-6 rounded-full"></div>
      <p className="text-stone-500 mb-16 max-w-2xl mx-auto uppercase tracking-wide text-sm">
        {t.facilities.subtitle}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {t.facilities.items.map((item: { name: string }, index: number) => {
          const IconComponent = facilityIcons[index];
          return (
            <div
              key={index}
              className="group p-6 border border-stone-200 hover:border-amber-700/50 transition-colors duration-300 rounded-xl"
            >
              <div className="w-12 h-12 mx-auto mb-4 text-stone-400 group-hover:text-amber-700 transition-colors duration-300">
                <IconComponent size={48} strokeWidth={1} />
              </div>
              <h4 className="font-medium text-stone-800 text-sm uppercase tracking-wide">
                {item.name}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// --- AI Room Matcher Modal ---
interface RoomMatcherProps {
  t: TranslationData;
  isOpen: boolean;
  onClose: () => void;
}

const RoomMatcherModal: React.FC<RoomMatcherProps> = ({
  t,
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: query }] }],
            systemInstruction: {
              parts: [
                {
                  text: `You are an AI Room Matcher for K-House 71. 
              Available Rooms:
              1. Studio A (28sqm, Big Balcony): 1yr=6400, 6mo=6800. Good for fresh air lovers.
              2. Studio B (26sqm, Small Balcony): 1yr=5900, 6mo=6400. Budget friendly.
              3. Sweet Corner (52-56sqm): 1yr=12000+. 1 Bedroom, separate living room. Good for couples/space lovers.
              4. Suite (52-54sqm): 1yr=13000+. 1 Bedroom.
              
              Task: Analyze user requirements and suggest ONE best room option with a short reason.
              Language: Match user language.`,
                },
              ],
            },
          }),
        },
      );
      const data = await response.json();
      setResult(
        data.candidates?.[0]?.content?.parts?.[0]?.text || "Please try again.",
      );
    } catch {
      setResult("Error connecting to AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border-t-4 border-amber-600">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4 text-amber-700">
          <BrainCircuit size={28} />
          <h3 className="font-serif text-2xl font-bold">
            {t.room_matcher.title}
          </h3>
        </div>

        <p className="text-stone-600 mb-4 text-sm">{t.room_matcher.subtitle}</p>

        <textarea
          className="w-full border border-stone-300 rounded-xl p-3 text-sm focus:border-amber-600 focus:outline-none min-h-[100px]"
          placeholder={t.room_matcher.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !query}
          className="w-full bg-amber-700 text-white font-bold uppercase tracking-widest py-3 mt-4 hover:bg-amber-800 disabled:opacity-50 flex justify-center items-center gap-2 transition-colors rounded-xl"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}{" "}
          {t.room_matcher.analyze_btn}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-stone-50 border border-stone-200 rounded-xl animate-in slide-in-from-top-2">
            <h4 className="font-bold text-stone-800 text-sm mb-2">
              {t.room_matcher.result_title}
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Image Gallery Modal Component ---
interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const ImageGalleryModal: React.FC<GalleryProps> = ({
  isOpen,
  onClose,
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
      >
        <X size={40} strokeWidth={1} />
      </button>

      <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4">
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-4 p-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`Gallery Image ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />

        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-4 p-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        )}

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 transition-all rounded-full ${idx === currentIndex ? "w-8 bg-white" : "w-4 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Rooms: React.FC<SectionProps> = ({ t }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [matcherOpen, setMatcherOpen] = useState(false);

  const openGallery = (id: number) => setSelectedRoomId(id);
  const closeGallery = () => setSelectedRoomId(null);

  const currentImages =
    selectedRoomId !== null
      ? roomCards.find((r) => r.id === selectedRoomId)?.images || []
      : [];

  return (
    <section id="rooms" className="py-24 bg-stone-100 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
            {t.rooms.title}
          </h2>
          <div className="w-20 h-1 bg-amber-700 mx-auto mb-6 rounded-full"></div>
          <p className="text-amber-800 font-bold uppercase tracking-widest text-sm">
            {t.rooms.subtitle}
          </p>

          {/* AI Button */}
          {/* <button 
          onClick={() => setMatcherOpen(true)}
          className="absolute top-0 right-0 hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-50 transition-colors shadow-sm"
        >
          <Sparkles size={16} /> {t.rooms.ai_help_btn}
        </button> */}
        </div>

        {/* NEW: Promotion Banner (Classic Style) */}
        <div className="bg-stone-900 text-white rounded-3xl shadow-2xl mb-16 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-10 md:p-12 md:w-2/3 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">
                <Star size={14} fill="currentColor" />{" "}
                {t.promotion.limited || "LIMITED TIME OFFER"}
              </div>
              <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                {t.promotion.title}
              </h3>
              <p className="text-stone-300 text-lg font-light mb-8 max-w-lg">
                {t.promotion.detail}
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
                    {t.promotion_banner.starting_from}
                  </p>
                  <p className="text-5xl font-serif text-white">
                    5,900
                    <span className="text-base text-stone-400 font-light ml-1">
                      {t.promotion_banner.unit_mo}
                    </span>
                  </p>
                </div>
                <div className="h-12 w-px bg-stone-700"></div>
                <div>
                  <p className="text-amber-500 font-bold uppercase tracking-wider text-sm">
                    {t.promotion_banner.contract_1yr}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-amber-700 relative overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <Tag
                size={120}
                className="text-amber-800/40 absolute -right-10 -bottom-10 rotate-12"
              />
              <div className="relative z-10 text-center">
                <p className="text-white/90 font-serif italic text-xl mb-2">
                  Exclusive Offer
                </p>
                <p className="text-4xl font-bold text-white mb-1">SAVE BIG</p>
                <p className="text-white/80 uppercase tracking-widest text-sm">
                  On Long Term Stays
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Cards Grid (Classic Style) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {roomCards.map((room, idx) => {
            const textData = t.rooms.types[idx] || t.rooms.types[0]; // Fallback
            return (
              <div
                key={idx}
                className="bg-white shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col border border-stone-200 rounded-2xl overflow-hidden"
              >
                <div
                  className="h-64 overflow-hidden relative cursor-pointer"
                  onClick={() => openGallery(room.id)}
                >
                  {room.hotPromo && (
                    <div className="absolute top-0 right-0 bg-amber-700 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest z-10 rounded-bl-xl">
                      Hot Deal
                    </div>
                  )}

                  {/* Overlay Icon for Gallery */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className="text-white border border-white px-6 py-2 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-full">
                      {t.rooms.view_photos}
                    </div>
                  </div>
                  <img
                    src={room.images[0]}
                    alt={textData.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-lg font-bold text-stone-900 mb-2 uppercase tracking-wide group-hover:text-amber-700 transition-colors">
                    {textData.title}
                  </h3>
                  <div className="flex justify-center gap-2 mb-6">
                    <div className="h-px w-8 bg-amber-700"></div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {textData.features.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[10px] text-stone-500 uppercase tracking-wider border border-stone-200 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">
                      {t.rooms.price_start}
                    </p>
                    <p className="text-2xl font-serif text-stone-900">
                      {room.startPrice}{" "}
                      <span className="text-xs text-stone-400 font-sans font-normal">
                        {t.rooms.unit}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedRoomId !== null && (
          <ImageGalleryModal
            isOpen={true}
            onClose={closeGallery}
            images={currentImages}
          />
        )}

        {/* AI Room Matcher Modal */}
        <RoomMatcherModal
          t={t}
          isOpen={matcherOpen}
          onClose={() => setMatcherOpen(false)}
        />

        {/* Rates Table Section (Classic) */}
        <div className="bg-white border border-stone-200 shadow-sm mb-12 rounded-3xl overflow-hidden">
          <div className="bg-stone-900 px-8 py-5 flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">
              Room Rates
            </h3>
            <span className="text-stone-400 text-xs uppercase tracking-wider mt-2 sm:mt-0">
              {t.rooms.unit_label}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-xs uppercase tracking-widest">
                  <th className="py-5 px-8 font-medium">
                    {t.rooms.table_headers[0]}
                  </th>
                  <th className="py-5 px-8 font-medium text-center">
                    {t.rooms.table_headers[1]}
                  </th>
                  <th className="py-5 px-8 font-medium text-center">
                    {t.rooms.table_headers[2]}
                  </th>
                  <th className="py-5 px-8 font-medium text-center">
                    {t.rooms.table_headers[3]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ratesData.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-stone-100 hover:bg-stone-50 transition-colors"
                    >
                      <td className="py-5 px-8">
                        <div className="font-bold text-stone-800 text-sm uppercase tracking-wide">
                          {row.name}
                        </div>
                        <div className="text-xs text-stone-500 mt-1 font-serif italic">
                          {row.size}
                        </div>
                      </td>

                      {/* 1 Year */}
                      <td className="py-5 px-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs text-stone-400 line-through mb-1">
                            {row.rates.y1.old}
                          </span>
                          <span className="text-lg font-serif font-bold text-amber-700">
                            {row.rates.y1.new}
                          </span>
                        </div>
                      </td>

                      {/* 6 Months */}
                      <td className="py-5 px-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs text-stone-400 line-through mb-1">
                            {row.rates.m6.old}
                          </span>
                          <span className="text-base font-serif text-stone-700">
                            {row.rates.m6.new}
                          </span>
                        </div>
                      </td>

                      {/* 3 Months */}
                      <td className="py-5 px-8 text-center">
                        {row.rates.m3 ? (
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-xs text-stone-400 line-through mb-1">
                              {row.rates.m3.old}
                            </span>
                            <span className="text-base font-serif text-stone-700">
                              {row.rates.m3.new}
                            </span>
                          </div>
                        ) : (
                          <span className="text-stone-300">-</span>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-stone-50 p-8 border border-stone-200 rounded-3xl">
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-4 border-b border-amber-700 pb-2 inline-block">
              {t.rooms.extra_charges}
            </h4>
            <ul className="text-sm text-stone-600 space-y-3 font-light">
              <li className="flex items-center gap-3">
                <Tv size={16} className="text-amber-700" /> {t.rooms.tv}
              </li>
              <li className="flex items-center gap-3">
                <Refrigerator size={16} className="text-amber-700" />{" "}
                {t.rooms.fridge}
              </li>
            </ul>
            <p className="text-xs text-stone-400 italic mt-6">
              {t.rooms.disclaimer}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 mt-4 md:mt-0">
            <p className="font-bold text-stone-800 text-sm uppercase tracking-widest flex items-center gap-2">
              {t.rooms.cc}
            </p>
            {/* Removed grayscale and opacity classes here */}
            <div className="flex gap-3 items-center">
              <div className="bg-white px-3 py-2 border border-stone-200 flex items-center justify-center h-10 w-14 rounded-lg shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                  alt="VISA"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="bg-white px-3 py-2 border border-stone-200 flex items-center justify-center h-10 w-14 rounded-lg shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="MasterCard"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="bg-white px-3 py-2 border border-stone-200 flex items-center justify-center h-10 w-14 rounded-lg shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg"
                  alt="JCB"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC<SectionProps> = ({ t }) => (
  <section
    id="contact"
    className="py-24 bg-stone-900 text-white relative overflow-hidden"
  >
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800 rounded-full filter blur-[120px] opacity-20"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <div className="mb-10">
            <h2 className="text-4xl font-serif mb-4">{t.contact.title}</h2>
            <div className="w-16 h-0.5 bg-amber-700"></div>
          </div>
          <p className="text-stone-400 mb-10 leading-relaxed font-light text-lg">
            {t.contact.desc}
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-amber-500 shrink-0 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">
                  {t.contact.address_title}
                </h4>
                <p className="text-stone-400 font-light leading-relaxed">
                  {t.contact.address_val}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-amber-500 shrink-0 rounded-lg">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">
                  {t.contact.phone_title}
                </h4>
                <a
                  href={`tel:${t.contact.phone_display.replace(/[^0-9+]/g, "")}`}
                  className="text-2xl font-serif text-white hover:text-amber-500 transition-colors"
                >
                  {t.contact.phone_display}
                </a>
                <p className="text-stone-500 text-xs mt-1 uppercase tracking-wider">
                  {t.contact.phone_action}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-amber-500 shrink-0 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">
                  {t.contact.email_title}
                </h4>
                <a
                  href={`mailto:${t.contact.email_val}`}
                  className="text-stone-300 hover:text-white transition-colors border-b border-stone-700 hover:border-white pb-0.5"
                >
                  {t.contact.email_val}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-blue-400 shrink-0 rounded-lg">
                <Facebook size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">
                  {t.contact.social_title}
                </h4>
                <a
                  href="https://www.facebook.com/p/K-House-Apartment-100063709861884/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  {t.contact.social_label}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-150 bg-stone-800 relative group overflow-hidden rounded-3xl">
          {/* Map visual - Stylized dark map */}
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/100.595,13.72,15,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce">
              <MapPin size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-serif text-white mb-6">K-House 71</h3>
            <a
              href="https://maps.app.goo.gl/2Z5Mir77TxRSJdoj8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors rounded-full"
            >
              {t.contact.map_btn}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC<SectionProps> = ({ t }) => (
  <footer className="bg-black py-10 border-t border-stone-800">
    <div className="container mx-auto px-4 text-center">
      <div className="mb-6 flex justify-center items-center gap-2 opacity-50">
        <span className="text-xl font-serif text-white tracking-widest">
          K-HOUSE 71
        </span>
      </div>
      <p className="text-stone-600 text-xs uppercase tracking-widest">
        &copy; {new Date().getFullYear()} {t.footer.rights}
      </p>
    </div>
  </footer>
);

// --- Promotion Toast Component (Classic Minimal) ---
const PromotionToast = ({
  t,
  isOpen,
  onClose,
}: {
  t: TranslationData;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 max-w-sm w-full animate-in slide-in-from-bottom-20 fade-in duration-700">
      <div className="bg-white shadow-2xl border-l-4 border-amber-700 p-6 relative rounded-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4">
          <div className="text-amber-700 mt-1">
            <Star size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">
              {t.promotion.title}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              {t.promotion.detail}
            </p>
            <a
              href="#rooms"
              onClick={onClose}
              className="text-xs font-bold text-stone-900 uppercase tracking-widest hover:text-amber-700 transition-colors border-b border-stone-900 hover:border-amber-700 pb-0.5"
            >
              {t.promotion.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [lang, setLang] = useState<LanguageCode>("en");
  const [showPromo, setShowPromo] = useState(false);

  // Fallback language to English
  const t = translations[lang] || translations["en"];

  useEffect(() => {
    // Show promo popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="font-sans text-stone-800 bg-stone-50 min-h-screen selection:bg-amber-700 selection:text-white"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <About t={t} />
      <Facilities t={t} />
      <Rooms t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <PromotionToast
        t={t}
        isOpen={showPromo}
        onClose={() => setShowPromo(false)}
      />
    </div>
  );
}

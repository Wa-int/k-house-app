import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Phone, Wifi, Shield, Car, ChevronRight, ChevronDown, ChevronLeft, 
  Mail, Facebook, Globe, Tv, Refrigerator, Tag,
  CalendarCheck, CheckCircle, Dumbbell, ArrowUpCircle, Star, Loader2
} from 'lucide-react';

// Import Logo from local assets
// import kLogo from './assets/k-logo.png';
const kLogo = "https://placehold.co/100x100/059669/ffffff?text=K+Logo";

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
    book_now: string;
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
  reservation: {
    title: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    room_type: string;
    select_room: string;
    details: string;
    submit: string;
    success_title: string;
    success_msg: string;
    close: string;
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
      book_now: "จองเลย",
    },
    hero: {
      location_badge: "สุขุมวิท 71 • ปรีดีพนมยงค์ 14",
      title: "อพาร์ทเมนท์หรู สไตล์คอนโดมิเนียม",
      subtitle: "สัมผัสชีวิตคนเมืองที่ลงตัว เงียบสงบ เป็นส่วนตัว ในทำเลศักยภาพ ใกล้ BTS พระโขนง",
      cta_rooms: "ดูห้องพักราคาพิเศษ",
      cta_contact: "ติดต่อสอบถาม"
    },
    about: {
      welcome: "ยินดีต้อนรับสู่ K-House 71",
      title: "ความลงตัวของการอยู่อาศัย ใจกลางเมือง",
      desc: "K-House Sukhumvit 71 อพาร์ทเมนท์เซอร์วิสหรู 60 ห้อง ตกแต่งสไตล์บูติคโมเดิร์นคอนโดมิเนียม เน้นความโปร่งโล่งสบาย เฟอร์นิเจอร์คุณภาพสูง พร้อมสิ่งอำนวยความสะดวกครบครัน เพื่อไลฟ์สไตล์ที่สมบูรณ์แบบของคุณ",
      points: [
        "ทำเลเงียบสงบ เป็นส่วนตัว เพียง 3 นาทีจาก BTS พระโขนง",
        "ใกล้ทางด่วนฉลองรัช (รามอินทรา-อาจณรงค์) เดินทางสะดวก",
        "ใกล้ MaxValu 24 ชม., ร้านอาหาร และ Street Food เจ้าดัง",
        "ระบบรักษาความปลอดภัย Hi-tech ปลอดภัยไร้กังวล",
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
        { name: "ลิฟต์โดยสาร" },
        { name: "ห้องฟิตเนส" }
      ]
    },
    rooms: {
      title: "รูปแบบห้องพัก & อัตราค่าเช่า",
      subtitle: "HOT PROMOTION! โปรโมชั่นลดราคาพิเศษสำหรับทุกสัญญาเช่า",
      disclaimer: "*** ราคาและเงื่อนไขอาจมีการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า (ไม่รวมค่าน้ำ-ค่าไฟ)",
      price_start: "โปรโมชั่นเริ่มต้น",
      unit: "บาท/เดือน",
      unit_label: "หน่วย: บาท (Baht)",
      table_headers: ["ประเภทห้อง (Room Type)", "สัญญา 1 ปี (1 Year)", "สัญญา 6 เดือน (6 Months)", "สัญญา 3 เดือน (3 Months)"],
      extra_charges: "ค่าใช้จ่ายเพิ่มเติม (Extra Charges)",
      tv: "โทรทัศน์ (Television) 500 บาท/เดือน",
      fridge: "ตู้เย็น (Refrigerator) 500 บาท/เดือน",
      cc: "ยินดีรับบัตรเครดิต (We accept major Credit Cards)",
      view_photos: "ดูรูปภาพเพิ่มเติม",
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
          title: "Sweet Corner / Suite",
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
    promotion: {
      title: "โปรโมชั่นพิเศษ! 🔥",
      detail: "ส่วนลดพิเศษสำหรับสัญญาเช่า 6 เดือน และ 1 ปี",
      cta: "ดูราคาและจองเลย",
      limited: "ด่วน! ห้องมีจำนวนจำกัด"
    },
    promotion_banner: {
      starting_from: "เริ่มต้นเพียง",
      unit_mo: "/เดือน",
      contract_1yr: "สัญญา 1 ปี"
    },
    reservation: {
      title: "แบบฟอร์มจองห้องพัก",
      firstname: "ชื่อ",
      lastname: "นามสกุล",
      email: "อีเมล",
      phone: "เบอร์โทรศัพท์",
      room_type: "ประเภทห้อง",
      select_room: "--- กรุณาเลือกประเภทห้อง ---",
      details: "รายละเอียดเพิ่มเติม",
      submit: "ส่งข้อมูลจอง",
      success_title: "ส่งข้อมูลสำเร็จ!",
      success_msg: "ขอบคุณที่สนใจจองห้องพักกับเรา เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุดครับ",
      close: "ปิด"
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
      book_now: "Book Now",
    },
    hero: {
      location_badge: "Sukhumvit 71 • Pridi Banomyong 14",
      title: "Luxury Apartment Condo Style",
      subtitle: "Experience perfect urban living. Quiet, private, and green. Near BTS Phra Khanong with full facilities.",
      cta_rooms: "View Rooms",
      cta_contact: "Contact Us"
    },
    about: {
      welcome: "Welcome to K-House Sukhumvit 71",
      title: "A Real Home From Home",
      desc: "Apartment for lease with exclusive 60 rooms provides the perfect lifestyle location situated in quiet residential surroundings yet only 3 minutes away from Pra Kanong BTS station. Boasting state-of-the-art boutique design, modern contemporary finishings, and high-quality furniture.",
      points: [
        "Only 3 minutes away from Pra Kanong BTS station",
        "Near Chalong Rat Expressway (Easy access to city)",
        "Cosmopolitan district near MaxValu, restaurants & street food",
        "Hi-tech security systems for complete peace of mind",
        "Professional interior design with high quality furniture"
      ],
      location_card: {
        label: "Prime Location",
        value: "Near Expressway & BTS"
      }
    },
    facilities: {
      title: "Facilities",
      subtitle: "Complete with functions to make your stay as comfortable as possible.",
      items: [
        { name: "Free High-Speed WiFi" },
        { name: "CCTV & 24hr Security" },
        { name: "Secure Indoor Parking" },
        { name: "Key Card Access" },
        { name: "Elevator" },
        { name: "Fitness Room" }
      ]
    },
    rooms: {
      title: "Room Types & Rates",
      subtitle: "HOT PROMOTION! Special discount available for short term and long term agreements.",
      disclaimer: "*** Prices are subjected to change without prior notice. (Electricity and water supply charges are excluded)",
      price_start: "Promo starts at",
      unit: "Baht/Month",
      unit_label: "Unit: Baht",
      table_headers: ["Room Type", "1 Year Contract", "6 Months Contract", "3 Months Contract"],
      extra_charges: "Extra Charges",
      tv: "Television 500 Baht / month",
      fridge: "Refrigerator 500 Baht / month",
      cc: "We accept major Credit Cards",
      view_photos: "View Photos",
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
      address_val: "54 Soi Pridi Banomyong 14, Sukhumvit 71 Rd, Watthana, Bangkok 10110",
      phone_title: "Phone",
      phone_display: "+66 88-524-5959",
      phone_action: "Tap to call",
      email_title: "Email",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "View Google Maps"
    },
    promotion: {
      title: "Special Promotion! 🔥",
      detail: "Special discount for 6-month & 1-year contracts.",
      cta: "See Rates & Book",
      limited: "Hurry! Limited Availability"
    },
    promotion_banner: {
      starting_from: "Starting from",
      unit_mo: "/mo",
      contract_1yr: "1 Year Contract"
    },
    reservation: {
      title: "Reservation Form",
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      phone: "Telephone",
      room_type: "Room Type",
      select_room: "--- Select Room Type ---",
      details: "Details",
      submit: "Send Reservation",
      success_title: "Submission Successful!",
      success_msg: "Thank you for your interest. Our staff will contact you shortly.",
      close: "Close"
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
      book_now: "予約する",
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
      desc: "K-House Sukhumvit 71は、限定60室の高級サービスアパートメントです。静かな住宅街にありながら、BTSプラカノン駅からわずか3分。ブティックデザイン、モダンコンテンポラリーな仕上げ、高品質の家具を備えています。",
      points: [
        "BTSプラカノン駅からわずか3分",
        "チャロンラット高速道路近く (市内へのアクセス便利)",
        "マックスバリュ、レストラン、ストリートフードに近い便利な立地",
        "安心のハイテクセキュリティシステム",
        "フィットネスルームと安全な屋内駐車場完備"
      ],
      location_card: {
        label: "好立地",
        value: "高速道路 & BTS近く"
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
        { name: "エレベーター" },
        { name: "フィットネスルーム" }
      ]
    },
    rooms: {
      title: "部屋タイプと料金",
      subtitle: "HOT PROMOTION! 短期・長期契約向けの特別割引あり。",
      disclaimer: "*** 価格は予告なく変更される場合があります（水道光熱費は含まれません）。",
      price_start: "プロモーション価格",
      unit: "バーツ/月",
      unit_label: "単位：バーツ (Baht)",
      table_headers: ["部屋タイプ", "1年契約", "6ヶ月契約", "3ヶ月契約"],
      extra_charges: "追加料金",
      tv: "テレビ 500バーツ/月",
      fridge: "冷蔵庫 500バーツ/月",
      cc: "主要なクレジットカードをご利用いただけます",
      view_photos: "写真を見る",
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
      phone_display: "+66 88-524-5959",
      phone_action: "タップして発信",
      email_title: "メール",
      email_val: "contact@k-house71.com",
      social_title: "Facebook",
      social_label: "K-House Apartment",
      map_btn: "Googleマップを見る"
    },
    promotion: {
      title: "特別プロモーション！ 🔥",
      detail: "6ヶ月および1年契約の特別割引。",
      cta: "料金を見る",
      limited: "お早めに！空室わずか"
    },
    promotion_banner: {
      starting_from: "最低価格",
      unit_mo: "/月",
      contract_1yr: "1年契約"
    },
    reservation: {
      title: "予約フォーム",
      firstname: "名",
      lastname: "姓",
      email: "メールアドレス",
      phone: "電話番号",
      room_type: "部屋タイプ",
      select_room: "--- 部屋タイプを選択 ---",
      details: "詳細",
      submit: "予約送信",
      success_title: "送信成功！",
      success_msg: "お問い合わせありがとうございます。担当者よりすぐにご連絡いたします。",
      close: "閉じる"
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
      book_now: "立即预订",
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
      desc: "K-House Sukhumvit 71 是一家拥有60间客房的豪华服务式公寓，以现代精品风格装饰。提供高品质家具和完备的设施，距离 BTS Phra Khanong 仅3分钟。",
      points: [
        "距离 BTS Phra Khanong 仅 3 分钟",
        "靠近 Chalong Rat 高速公路 (交通便利)",
        "靠近 MaxValu 24小时超市、餐厅和著名街头美食",
        "高科技安保系统，让您住得安心",
        "设有健身房和安全的室内停车场"
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
        { name: "电梯" },
        { name: "健身房" }
      ]
    },
    rooms: {
      title: "房型及价格",
      subtitle: "HOT PROMOTION! 长短期合约均享特别折扣。",
      disclaimer: "*** 价格可能会有所变动，恕不另行通知。（不含水电费）",
      price_start: "促销起价",
      unit: "泰铢/月",
      unit_label: "单位：泰铢 (Baht)",
      table_headers: ["房型", "1年合约", "6个月合约", "3个月合约"],
      extra_charges: "额外费用",
      tv: "电视 500泰铢/月",
      fridge: "冰箱 500泰铢/月",
      cc: "我们接受主流信用卡",
      view_photos: "查看照片",
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
    promotion: {
      title: "特别促销！ 🔥",
      detail: "6个月和1年合约的特别折扣。",
      cta: "查看价格",
      limited: "数量有限，欲订从速！"
    },
    promotion_banner: {
      starting_from: "最低起价",
      unit_mo: "/月",
      contract_1yr: "1年合约"
    },
    reservation: {
      title: "预订表格",
      firstname: "名字",
      lastname: "姓氏",
      email: "电子邮件",
      phone: "电话",
      room_type: "房型",
      select_room: "--- 选择房型 ---",
      details: "详情",
      submit: "提交预订",
      success_title: "提交成功！",
      success_msg: "感谢您的关注。我们的工作人员将尽快与您联系。",
      close: "关闭"
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
      book_now: "احجز الآن",
    },
    hero: {
      location_badge: "سوخومفيت 71 • بريدي بانوميونغ 14",
      title: "شقق فاخرة بنمط كوندومينيوم",
      subtitle: "استمتع بحياة المدينة المثالية. هدوء، خصوصية. بالقرب من محطة بي تي إس فرا خانونغ.",
      cta_rooms: "عرض الغرف",
      cta_contact: "اتصل بنا"
    },
    about: {
      welcome: "مرحباً بكم في كي-هاوس 71",
      title: "العيش المثالي في وسط المدينة",
      desc: "كي-هاوس سوخومفيت 71 هي شقق مخدومة فاخرة تضم 60 غرفة حصرية، مصممة بنمط كوندومينيوم حديث. توفر موقعاً مثالياً هادئاً ومع ذلك تبعد 3 دقائق فقط عن محطة BTS.",
      points: [
        "على بعد 3 دقائق فقط من محطة بي تي إس فرا خانونغ",
        "بالقرب من طريق تشالونج رات السريع (سهولة الوصول إلى المدينة)",
        "منطقة عالمية بالقرب من ماكس فالو والمطاعم ومأكولات الشارع",
        "أنظمة أمان عالية التقنية لراحة بال تامة",
        "غرفة لياقة بدنية ومواقف سيارات داخلية آمنة"
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
        { name: "مصعد" },
        { name: "غرفة اللياقة البدنية" }
      ]
    },
    rooms: {
      title: "أنواع الغرف والأسعار",
      subtitle: "HOT PROMOTION! خصم خاص للعقود قصيرة وطويلة الأجل.",
      disclaimer: "*** الأسعار قابلة للتغيير دون إشعار مسبق. (رسوم الكهرباء والمياه غير مشمولة)",
      unit: "بات/شهر",
      price_start: "يبدأ العرض من",
      unit_label: "الوحدة: بات (Baht)",
      table_headers: ["نوع الغرفة", "عقد سنة", "عقد 6 أشهر", "عقد 3 أشهر"],
      extra_charges: "رسوم إضافية",
      tv: "تلفزيون 500 بات",
      fridge: "ثلاجة 500 بات",
      cc: "نقبل بطاقات الائتمان",
      view_photos: "عرض الصور",
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
          features: ["1 غرفة نوم", "إطلالة زاوية", "52 - 56 متر مربع"]
        },
        {
          title: "جناح 1 غرفة نوم الزاوية",
          features: ["جناح 1 غرفة", "واسعة", "52 - 54 متر مربع"]
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
    promotion: {
      title: "عرض خاص! 🔥",
      detail: "خصم خاص لعقود 6 أشهر وسنة واحدة.",
      cta: "عرض الأسعار",
      limited: "بسرعة! الأماكن محدودة"
    },
    promotion_banner: {
      starting_from: "تبدأ من",
      unit_mo: "/شهر",
      contract_1yr: "عقد لمدة سنة"
    },
    reservation: {
      title: "نموذج الحجز",
      firstname: "الاسم الأول",
      lastname: "اسم العائلة",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      room_type: "نوع الغرفة",
      select_room: "--- اختر نوع الغرفة ---",
      details: "التفاصيل",
      submit: "إرسال الحجز",
      success_title: "تم الإرسال بنجاح!",
      success_msg: "شكراً لاهتمامك. سيتصل بك موظفونا قريباً.",
      close: "إغلاق"
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
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    hotPromo: false
  },
  {
    id: 1,
    size: "26 sq.m.",
    startPrice: "5,900",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    hotPromo: false
  },
  {
    id: 2,
    size: "52 - 56 sq.m.",
    startPrice: "12,000",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    hotPromo: true
  },
  {
    id: 3,
    size: "52 - 54 sq.m.",
    startPrice: "13,000",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
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

const facilityIcons = [Wifi, Shield, Car, Star, ArrowUpCircle, Dumbbell];

// --- Sub-Components ---

interface NavbarProps {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: TranslationData;
  onOpenBooking: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t, onOpenBooking }) => {
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md border-b border-stone-200 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section - Modified Layout: Logo Left, Text Right */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          
          {/* Logo Image */}
          <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
             <img 
                src={kLogo} 
                alt="K-House Logo" 
                className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
             />
          </div>
          
          {/* Text Group - Moved to Right & Left Aligned */}
          <div className="flex flex-col items-start leading-none">
            {/* K-HOUSE */}
            <span className={`text-2xl font-bold tracking-tight uppercase ${scrolled ? 'text-stone-900' : 'text-white'}`} style={{ fontFamily: 'serif' }}>
              K-HOUSE
            </span>
            {/* Sukhumvit 71 */}
            <span className={`text-xs font-medium tracking-widest mt-1 uppercase ${scrolled ? 'text-stone-600' : 'text-stone-200'}`}>
              Sukhumvit 71
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? 'text-stone-700' : 'text-stone-100'}`}>
          {Object.entries(t.nav).map(([key, label]) => {
             if (key === 'book_now') return null; // Skip book now to render it separately
             return (
               <a key={key} href={`#${key}`} className={`uppercase text-sm tracking-wider hover:text-amber-600 transition-colors ${scrolled ? '' : 'text-shadow-sm'}`}>{label}</a>
             );
          })}
          
          {/* Book Now Button */}
          <button 
             onClick={onOpenBooking}
             className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all transform hover:scale-105"
          >
             {t.nav.book_now}
          </button>

          {/* Desktop Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${scrolled ? 'border-stone-300 text-stone-700 hover:border-amber-600 hover:text-amber-600' : 'border-white/50 text-white hover:bg-white/10'}`}
            >
              <Globe size={14} /> 
              <span className="text-xs font-bold uppercase tracking-wider">{lang}</span>
              <ChevronDown size={14} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-stone-50 transition-colors uppercase tracking-wider ${lang === opt.code ? 'text-amber-700 font-bold bg-amber-50' : 'text-stone-600'}`}
                  >
                    <span>{opt.fullLabel}</span>
                    {lang === opt.code && <div className="w-1.5 h-1.5 rounded-full bg-amber-700"></div>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button 
            className={`${!scrolled && isMenuOpen ? 'text-stone-900' : (!scrolled ? 'text-white' : 'text-stone-900')}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-stone-900/90 z-40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
           <div 
             className="absolute top-0 right-0 h-full w-3/4 bg-white shadow-2xl p-8 pt-24 flex flex-col gap-8 rounded-l-3xl"
             onClick={(e) => e.stopPropagation()}
           >
            <div className="flex flex-col gap-6">
              {Object.entries(t.nav).map(([key, label]) => {
                if (key === 'book_now') return (
                   <button 
                      key={key}
                      onClick={() => {
                        onOpenBooking();
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-3 bg-amber-600 text-white font-bold uppercase tracking-widest rounded-xl text-center shadow-md"
                   >
                     {label}
                   </button>
                );
                return (
                  <a key={key} href={`#${key}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-stone-800 uppercase tracking-widest border-b border-stone-100 pb-2">{label}</a>
                );
              })}
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Select Language</p>
              <div className="grid grid-cols-2 gap-3">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${lang === opt.code ? 'border-amber-700 bg-amber-50 text-amber-800' : 'border-stone-200 text-stone-600'}`}
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

// --- Reservation Modal Component ---
interface ReservationModalProps {
  t: TranslationData;
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ t, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    roomType: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
       // eslint-disable-next-line react-hooks/set-state-in-effect
       setFormData({ firstname: '', lastname: '', email: '', phone: '', roomType: '', details: '' });
       setIsSuccess(false);
       setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-80 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
        {isSuccess ? (
           <div className="p-10 text-center animate-in zoom-in-95">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
               <CheckCircle size={32} />
             </div>
             <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{t.reservation.success_title}</h3>
             <p className="text-stone-600 mb-6">{t.reservation.success_msg}</p>
             <button onClick={onClose} className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
               {t.reservation.close}
             </button>
           </div>
        ) : (
           <>
            <div className="bg-stone-900 px-6 py-4 flex justify-between items-center">
               <div className="flex items-center gap-2 text-white">
                  <CalendarCheck size={20} className="text-amber-500" />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-widest">{t.reservation.title}</h3>
               </div>
               <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
                 <X size={20} />
               </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t.reservation.firstname}</label>
                    <input required name="firstname" value={formData.firstname} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t.reservation.lastname}</label>
                    <input required name="lastname" value={formData.lastname} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-sm" />
                  </div>
               </div>
               
               <div>
                 <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t.reservation.email}</label>
                 <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-sm" />
               </div>

               <div>
                 <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t.reservation.phone}</label>
                 <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-sm" />
               </div>

               <div>
                 <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t.reservation.room_type}</label>
                 <select required name="roomType" value={formData.roomType} onChange={handleChange} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-sm bg-white">
                    <option value="">{t.reservation.select_room}</option>
                    <option value="Studio A">Studio A (Big Balcony)</option>
                    <option value="Studio B">Studio B (Small Balcony)</option>
                    <option value="Sweet Corner">Sweet Corner (1 Bed)</option>
                    <option value="Suite">Suite 1 Bedroom Corner</option>
                 </select>
               </div>

               <div>
                 <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{t.reservation.details}</label>
                 <textarea name="details" value={formData.details} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 text-sm resize-none" />
               </div>

               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
               >
                 {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : t.reservation.submit}
               </button>
            </form>
           </>
        )}
      </div>
    </div>
  );
};

const Hero: React.FC<SectionProps> = ({ t }) => (
  <header id="home" className="relative h-[700px] flex items-center justify-center overflow-hidden">
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
          <a href="#rooms" className="px-10 py-4 bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl rounded-full">
            {t.hero.cta_rooms}
          </a>
          <a href="#contact" className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-full">
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
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-700/30 rounded-tl-[3rem]"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-700/30 rounded-br-[3rem]"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Interior" 
            className="relative z-10 shadow-2xl object-cover h-[500px] w-full grayscale-[10%] hover:grayscale-0 transition-all duration-700 rounded-2xl"
          />
          
          <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl z-20 hidden md:block max-w-xs border border-stone-100 rounded-2xl">
             <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-2">{t.about.location_card.label}</p>
             <p className="font-serif text-2xl text-stone-900 leading-tight">{t.about.location_card.value}</p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-amber-700 font-bold uppercase tracking-[0.2em] text-sm mb-4">{t.about.welcome}</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8 leading-tight">{t.about.title}</h3>
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
  <section id="facilities" className="py-24 bg-white relative overflow-hidden border-t border-stone-100">
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">{t.facilities.title}</h2>
      <div className="w-20 h-1 bg-amber-700 mx-auto mb-6 rounded-full"></div>
      <p className="text-stone-500 mb-16 max-w-2xl mx-auto uppercase tracking-wide text-sm">{t.facilities.subtitle}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {t.facilities.items.map((item: {name: string}, index: number) => {
          const IconComponent = facilityIcons[index];
          return (
            <div key={index} className="group p-6 border border-stone-200 hover:border-amber-700/50 transition-colors duration-300 rounded-3xl">
              <div className="w-12 h-12 mx-auto mb-4 text-stone-400 group-hover:text-amber-700 transition-colors duration-300">
                <IconComponent size={48} strokeWidth={1} />
              </div>
              <h4 className="font-medium text-stone-800 text-sm uppercase tracking-wide">{item.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// --- Image Gallery Modal Component ---
interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const ImageGalleryModal: React.FC<GalleryProps> = ({ isOpen, onClose, images }) => {
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
    <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-in fade-in duration-300" onClick={onClose}>
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
          className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-2xl"
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
              className={`h-1.5 transition-all rounded-full ${idx === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/30'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};


const Rooms: React.FC<SectionProps> = ({ t }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const openGallery = (id: number) => setSelectedRoomId(id);
  const closeGallery = () => setSelectedRoomId(null);
  
  const currentImages = selectedRoomId !== null 
    ? roomCards.find(r => r.id === selectedRoomId)?.images || [] 
    : [];

  return (
  <section id="rooms" className="py-24 bg-stone-100 relative">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16 relative">
        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">{t.rooms.title}</h2>
        <div className="w-20 h-1 bg-amber-700 mx-auto mb-6 rounded-full"></div>
        <p className="text-amber-800 font-bold uppercase tracking-widest text-sm">{t.rooms.subtitle}</p>
      </div>
      
      {/* NEW: Promotion Banner (Classic Style) */}
      <div className="bg-stone-900 text-white rounded-3xl shadow-2xl mb-16 overflow-hidden">
        <div className="flex flex-col md:flex-row">
           <div className="p-10 md:p-12 md:w-2/3 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">
                 <Star size={14} fill="currentColor" /> {t.promotion.limited || "LIMITED TIME OFFER"}
              </div>
              <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                 {t.promotion.title}
              </h3>
              <p className="text-stone-300 text-lg font-light mb-8 max-w-lg">
                 {t.promotion.detail}
              </p>
              <div className="flex items-center gap-6">
                 <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{t.promotion_banner.starting_from}</p>
                    <p className="text-5xl font-serif text-white">5,900<span className="text-base text-stone-400 font-light ml-1">{t.promotion_banner.unit_mo}</span></p>
                 </div>
                 <div className="h-12 w-px bg-stone-700"></div>
                 <div>
                    <p className="text-amber-500 font-bold uppercase tracking-wider text-sm">{t.promotion_banner.contract_1yr}</p>
                 </div>
              </div>
           </div>
           <div className="md:w-1/3 bg-amber-700 relative overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <Tag size={120} className="text-amber-800/40 absolute -right-10 -bottom-10 rotate-12" />
              <div className="relative z-10 text-center">
                 <p className="text-white/90 font-serif italic text-xl mb-2">Exclusive Offer</p>
                 <p className="text-4xl font-bold text-white mb-1">SAVE BIG</p>
                 <p className="text-white/80 uppercase tracking-widest text-sm">On Long Term Stays</p>
              </div>
           </div>
        </div>
      </div>

      {/* Room Cards Grid (Classic Style) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {roomCards.map((room, idx) => {
           const textData = t.rooms.types[idx] || t.rooms.types[0]; // Fallback
           return (
            <div key={idx} className="bg-white shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col border border-stone-200 rounded-2xl overflow-hidden">
              <div 
                className="h-64 overflow-hidden relative cursor-pointer"
                onClick={() => openGallery(room.id)}
              >
                {room.hotPromo && (
                  <div className="absolute top-0 right-0 bg-amber-700 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest z-10 rounded-bl-2xl">
                    Hot Deal
                  </div>
                )}
                
                {/* Overlay Icon for Gallery */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                   <div className="text-white border border-white px-6 py-2 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-full">
                      {t.rooms.view_photos}
                   </div>
                </div>
                <img src={room.images[0]} alt={textData.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-8 flex flex-col flex-grow text-center">
                <h3 className="text-lg font-bold text-stone-900 mb-2 uppercase tracking-wide group-hover:text-amber-700 transition-colors">{textData.title}</h3>
                <div className="flex justify-center gap-2 mb-6">
                   <div className="h-px w-8 bg-amber-700"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {textData.features.map((feature: string, idx: number) => (
                    <span key={idx} className="text-[10px] text-stone-500 uppercase tracking-wider border border-stone-200 px-2 py-1 rounded-full">{feature}</span>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">{t.rooms.price_start}</p>
                  <p className="text-2xl font-serif text-stone-900">{room.startPrice} <span className="text-xs text-stone-400 font-sans font-normal">{t.rooms.unit}</span></p>
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

      {/* Rates Table Section (Classic) */}
      <div className="bg-white border border-stone-200 shadow-sm mb-12 rounded-3xl overflow-hidden">
        <div className="bg-stone-900 px-8 py-5 flex flex-col sm:flex-row justify-between items-center">
           <h3 className="text-lg font-bold text-white uppercase tracking-widest">Room Rates</h3>
           <span className="text-stone-400 text-xs uppercase tracking-wider mt-2 sm:mt-0">
             {t.rooms.unit_label}
           </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-xs uppercase tracking-widest">
                <th className="py-5 px-8 font-medium">{t.rooms.table_headers[0]}</th>
                <th className="py-5 px-8 font-medium text-center">{t.rooms.table_headers[1]}</th>
                <th className="py-5 px-8 font-medium text-center">{t.rooms.table_headers[2]}</th>
                <th className="py-5 px-8 font-medium text-center">{t.rooms.table_headers[3]}</th>
              </tr>
            </thead>
            <tbody>
              {ratesData.map((row, index) => {
                return (
                  <tr key={index} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="py-5 px-8">
                      <div className="font-bold text-stone-800 text-sm uppercase tracking-wide">{row.name}</div>
                      <div className="text-xs text-stone-500 mt-1 font-serif italic">{row.size}</div>
                    </td>
                    
                    {/* 1 Year */}
                    <td className="py-5 px-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs text-stone-400 line-through mb-1">{row.rates.y1.old}</span>
                        <span className="text-lg font-serif font-bold text-amber-700">{row.rates.y1.new}</span>
                      </div>
                    </td>
                    
                    {/* 6 Months */}
                    <td className="py-5 px-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs text-stone-400 line-through mb-1">{row.rates.m6.old}</span>
                        <span className="text-base font-serif text-stone-700">{row.rates.m6.new}</span>
                      </div>
                    </td>
                    
                    {/* 3 Months */}
                    <td className="py-5 px-8 text-center">
                      {row.rates.m3 ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs text-stone-400 line-through mb-1">{row.rates.m3.old}</span>
                          <span className="text-base font-serif text-stone-700">{row.rates.m3.new}</span>
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
          <h4 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-4 border-b border-amber-700 pb-2 inline-block">{t.rooms.extra_charges}</h4>
          <ul className="text-sm text-stone-600 space-y-3 font-light">
            <li className="flex items-center gap-3">
              <Tv size={16} className="text-amber-700" /> {t.rooms.tv}
            </li>
            <li className="flex items-center gap-3">
              <Refrigerator size={16} className="text-amber-700" /> {t.rooms.fridge}
            </li>
          </ul>
          <p className="text-xs text-stone-400 italic mt-6">{t.rooms.disclaimer}</p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-4 mt-4 md:mt-0">
          <p className="font-bold text-stone-800 text-sm uppercase tracking-widest flex items-center gap-2">
             {t.rooms.cc}
          </p>
          <div className="flex gap-3 items-center">
            <div className="bg-white px-3 py-2 border border-stone-200 flex items-center justify-center h-10 w-14 rounded-lg shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="VISA" className="h-full w-full object-contain" />
            </div>
            <div className="bg-white px-3 py-2 border border-stone-200 flex items-center justify-center h-10 w-14 rounded-lg shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-full w-full object-contain" />
            </div>
            <div className="bg-white px-3 py-2 border border-stone-200 flex items-center justify-center h-10 w-14 rounded-lg shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  );
};

const Contact: React.FC<SectionProps> = ({ t }) => (
  <section id="contact" className="py-24 bg-stone-900 text-white relative overflow-hidden">
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
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-amber-500 shrink-0 rounded-2xl">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">{t.contact.address_title}</h4>
                <p className="text-stone-400 font-light leading-relaxed">
                  {t.contact.address_val}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-amber-500 shrink-0 rounded-2xl">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">{t.contact.phone_title}</h4>
                <a href={`tel:${t.contact.phone_display.replace(/[^0-9+]/g, '')}`} className="text-2xl font-serif text-white hover:text-amber-500 transition-colors">{t.contact.phone_display}</a>
                <p className="text-stone-500 text-xs mt-1 uppercase tracking-wider">{t.contact.phone_action}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-amber-500 shrink-0 rounded-2xl">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">{t.contact.email_title}</h4>
                <a href={`mailto:${t.contact.email_val}`} className="text-stone-300 hover:text-white transition-colors border-b border-stone-700 hover:border-white pb-0.5">{t.contact.email_val}</a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 border border-stone-700 flex items-center justify-center text-blue-400 shrink-0 rounded-2xl">
                <Facebook size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">{t.contact.social_title}</h4>
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

        <div className="h-[600px] bg-stone-800 relative group overflow-hidden rounded-3xl shadow-xl border border-stone-200">
          <iframe
            src="https://maps.google.com/maps?q=K-House%2071%20Sukhumvit%2071&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            // Adjust filter to be less pale (not grayscale) but slightly muted/darker
            style={{ border: 0, filter: 'saturate(0.8) brightness(0.9)' }} 
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full object-cover"
          ></iframe>
      
          {/* Overlay Button */}
          <div className="absolute bottom-6 left-6 z-10">
             <a 
               href="https://maps.app.goo.gl/2Z5Mir77TxRSJdoj8" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 hover:bg-white text-stone-900 text-xs font-bold uppercase tracking-widest shadow-lg rounded-full backdrop-blur-sm transition-all hover:scale-105"
             >
               <MapPin size={16} className="text-amber-600" />
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
        <span className="text-xl font-serif text-white tracking-widest">K-HOUSE 71</span>
      </div>
      <p className="text-stone-600 text-xs uppercase tracking-widest">&copy; {new Date().getFullYear()} {t.footer.rights}</p>
    </div>
  </footer>
);

// --- Promotion Toast Component (Classic Minimal) ---
const PromotionToast = ({ t, isOpen, onClose }: { t: TranslationData, isOpen: boolean, onClose: () => void }) => {
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
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">{t.promotion.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-3">{t.promotion.detail}</p>
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
  const [lang, setLang] = useState<LanguageCode>('en');
  const [showPromo, setShowPromo] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Fallback language to English
  const t = translations[lang] || translations['en'];

  useEffect(() => {
    // Show promo popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans text-stone-800 bg-stone-50 min-h-screen selection:bg-amber-700 selection:text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} setLang={setLang} t={t} onOpenBooking={() => setIsBookingOpen(true)} />
      <Hero t={t} />
      <About t={t} />
      <Facilities t={t} />
      <Rooms t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <PromotionToast t={t} isOpen={showPromo} onClose={() => setShowPromo(false)} />
      <ReservationModal t={t} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
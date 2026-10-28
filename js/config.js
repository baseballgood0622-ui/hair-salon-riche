/**
 * ==========================================================================
 * Hair Salon RICHE - サイト設定・予約リンク一元管理ファイル (config.js)
 * ==========================================================================
 * 
 * 【初心者向け説明】
 * このファイルは、Webサイト全体の「店舗情報」や「予約リンク」を一括で管理する設定ファイルです。
 * ホットペッパービューティーのURLや電話番号、住所などが確定した際は、
 * 下記の各項目のクォーテーション（" "）の中身を変更するだけで、
 * トップページ、メニューページ、サロン情報ページすべてのリンクや表示が自動的に更新されます。
 */

const SALON_CONFIG = {
  // ★サロンの基本情報
  salonName: "Hair Salon RICHE",
  salonNameJa: "ヘアサロン リッシュ",
  conceptCatch: "表参道で出逢う、研ぎ澄まされた美しさと心地よい静寂",

  // ★予約リンク（ここを変更するだけで全ページの予約ボタンが一括で切り替わります）
  reservation: {
    // ホットペッパービューティーのサロンURL（※確定後に正式URLへ書き換えてください）
    hotpepperUrl: "https://beauty.hotpepper.jp/slnH000000000/",
    
    // LINE公式アカウントの友達追加URL
    lineUrl: "https://line.me/R/ti/p/@riche_sample",
    
    // お電話番号（表示用：ハイフンあり）
    telDisplay: "03-5468-XXXX",
    // お電話番号（発信用：ハイフンなし）
    telLink: "0354680000",
    
    // 予約ボタンを押した時の動作設定
    // "modal" : 親切な予約方法選択画面（WEB・LINE・電話）を表示（推奨）
    // "direct": 直接ホットペッパーの予約画面を別タブで開く
    actionType: "modal",
  },

  // ★店舗所在地・アクセス情報
  address: {
    postalCode: "150-0001",
    prefecture: "東京都",
    city: "渋谷区神宮前4丁目XX-XX",
    building: "RICHE 表参道ビル 2F",
    fullAddress: "東京都渋谷区神宮前4丁目XX-XX RICHE 表参道ビル 2F",
    accessRoute: "東京メトロ銀座線・半蔵門線・千代田線「表参道駅」A2出口より徒歩3分",
    googleMapsUrl: "https://maps.google.com/?q=表参道駅"
  },

  // ★営業時間・定休日
  businessHours: {
    weekday: "平日 11:00 - 20:30（最終受付 カット 19:30 / カラー・パーマ 18:30）",
    weekend: "土日祝 10:00 - 19:30（最終受付 カット 18:30 / カラー・パーマ 17:30）",
    regularHoliday: "毎週火曜日、第1・第3月曜日（祝日の場合は営業、翌平日振替）",
    seats: "8席（全席半個室・フルフラットシャンプー台4台完備）"
  },

  // ★公式SNS
  sns: {
    instagram: "https://www.instagram.com/riche_omotesando_sample/",
    youtube: "https://www.youtube.com/@riche_sample"
  },

  // ★仮データ表示設定
  isMockData: true,
  mockNoticeText: "※掲載されている住所・電話番号・スタッフ情報は制作サンプルの仮情報です。"
};

// ブラウザ環境でグローバルに公開
if (typeof window !== "undefined") {
  window.SALON_CONFIG = SALON_CONFIG;
}

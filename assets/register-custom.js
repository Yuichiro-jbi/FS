// (() => {
//   console.log('スクリプト開始');
//   const observer = new MutationObserver((mutations, obs) => {
//     const targetNode = document.querySelector('.cf-react-target');
//     if (targetNode) {
//       console.log('create_customer loaded');
//       obs.disconnect();
//       init();
//     }
//   });

//   observer.observe(document, {
//     childList: true,
//     subtree: true
//   });

//   console.log('Observer設定完了');

//   const init = () => {
//     console.log('init関数開始');

//     CF.ready(function() {
//       console.log('CF.ready開始');
//       var $myForm = document.querySelector('form[data-cf-form="pvteNx"]');
//       if (!$myForm) {
//         console.error('フォームが見つかりません');
//         return;
//       }
//       var cfForm = $myForm.cfForm;

//       const zipInput = document.querySelector('[name="default_address.zip"]');
//       if (!zipInput) {
//         console.error('郵便番号入力フィールドが見つかりません');
//         return;
//       }

//       zipInput.addEventListener('input', (e) => {
//         if (!e.target.value.match(/^\d{3}-?\d{4}$/)) {
//           return;
//         }

//         fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + e.target.value)
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.results && data.results[0]) {
//               const pref = data.results[0].address1;
//               const city = data.results[0].address2;
//               const street = data.results[0].address3;

//               cfForm.setFieldValue("prefectures", pref);
//               cfForm.setFieldValue("default_address.city", city);
//               cfForm.setFieldValue("default_address.address1", street);

//               console.log('住所情報をセットしました:', { pref, city, street });

//               // pressクラスの削除
//               setTimeout(() => {
//                 const prefectureFields = document.querySelectorAll('div[data-cf-field-id="122728"]');
//                 console.log('都道府県フィールド要素数:', prefectureFields.length);

//                 prefectureFields.forEach((field, index) => {
//                   console.log(`要素 ${index + 1} のクラスリスト (削除前):`, field.className);
//                   if (field.classList.contains('press')) {
//                     field.classList.remove('press');
//                     console.log(`要素 ${index + 1} からpressクラスを削除しました`);
//                   } else {
//                     console.log(`要素 ${index + 1} にpressクラスが存在しません`);
//                   }
//                   console.log(`要素 ${index + 1} のクラスリスト (削除後):`, field.className);
//                 });

//                 if (prefectureFields.length === 0) {
//                   console.error('都道府県フィールドが見つかりません (ID: 122728)');
//                 }
//               }, 100); // 少し遅延を入れて、DOMの更新を待つ
//             }
//           })
//           .catch((err) => console.error('郵便番号検索エラー:', err));
//       });

//       console.log('郵便番号のイベントリスナー設定完了');
//     });
//   };
// })();

(()=>{
console.log('スクリプト開始');
  const observer = new MutationObserver((mutations, obs) => {
    const targetNode = document.querySelector('.cf-react-target');
    if (targetNode) {
      console.log('create_customer loaded');
      obs.disconnect();
      init();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });

  console.log('Observer設定完了');

  const init = () => {
    console.log('init関数開始');

document.addEventListener('DOMContentLoaded', function() {
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });
});


    CF.ready(function() {
      // Find a CF form on the page with an ID of a34Kl0
      var $myForm = document.querySelector('form[data-cf-form="pvteNx"]');
      var cfForm = $myForm.cfForm;

      setTimeout(() => {

        

        document.querySelector('[name="default_address.zip"]').addEventListener('input', (e) => {

          // 郵便番号のフォーマット（ハイフンあり7桁もしくはハイフンなし7桁）ではなければreturn
          if (!e.target.value.match(/^\d{3}-?\d{4}$/)) {
            return;
          }

          fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + e.target.value).then((res) => {
            return res.json();
          }).then((data) => {

            const pref = data.results[0].address1;
            const city = data.results[0].address2;
            const street = data.results[0].address3;

            cfForm.setFieldValue("default_address.province", getPrefToEn(pref));
            cfForm.setFieldValue("default_address.city", city);
            cfForm.setFieldValue("default_address.address1", street);

           

          }).catch((err) => {});

        });


      // id 574680の　都道府県が英語なら日本語に変換
          document.getElementById('156614').querySelectorAll('option').forEach((option) => {
        // option.textContent が英字なら日本語に変換
        if(option.textContent.match(/^[a-zA-Z]+$/)){
          option.textContent = getPrefToEn(option.textContent, 'ja');
        }
      });

      },2000);

      const telValidation = {
        comparator: function isValid(value){
          // 電話番号の桁数が10桁もしくは11桁でハイフンが入っているかどうか
          return value.match(/^\d{2,5}-?\d{1,4}-?\d{4}$/);
        },

        errorMessage: '電話番号の形式で入力ください',

        async: false,
      };

      // cfForm.addValidator(telValidation, 'default_address.phone');

    });

  }


  function getPrefToEn(pref, type='en'){
    const prefList = {
      '北海道': 'Hokkaido',
      '青森県': 'Aomori',
      '岩手県': 'Iwate',
      '宮城県': 'Miyagi',
      '秋田県': 'Akita',
      '山形県': 'Yamagata',
      '福島県': 'Fukushima',
      '茨城県': 'Ibaraki',
      '栃木県': 'Tochigi',
      '群馬県': 'Gunma',
      '埼玉県': 'Saitama',
      '千葉県': 'Chiba',
      '東京都': 'Tokyo',
      '神奈川県': 'Kanagawa',
      '新潟県': 'Niigata',
      '富山県': 'Toyama',
      '石川県': 'Ishikawa',
      '福井県': 'Fukui',
      '山梨県': 'Yamanashi',
      '長野県': 'Nagano',
      '岐阜県': 'Gifu',
      '静岡県': 'Shizuoka',
      '愛知県': 'Aichi',
      '三重県': 'Mie',
      '滋賀県': 'Shiga',
      '京都府': 'Kyoto',
      '大阪府': 'Osaka',
      '兵庫県': 'Hyogo',
      '奈良県': 'Nara',
      '和歌山県': 'Wakayama',
      '鳥取県': 'Tottori',
      '島根県': 'Shimane',
      '岡山県': 'Okayama',
      '広島県': 'Hiroshima',
      '山口県': 'Yamaguchi',
      '徳島県': 'Tokushima',
      '香川県': 'Kagawa',
      '愛媛県': 'Ehime',
      '高知県': 'Kochi',
      '福岡県': 'Fukuoka',
      '佐賀県': 'Saga',
      '長崎県': 'Nagasaki',
      '熊本県': 'Kumamoto',
      '大分県': 'Oita',
      '宮崎県': 'Miyazaki',
      '鹿児島県': 'Kagoshima',
      '沖縄県': 'Okinawa'
    }

    if(type == 'en'){
      // ローマ字の方を返す
      return prefList[pref];
    }else{
      // 日本語の方を返す
      for (let key in prefList) {
        if(prefList[key] == pref){
          return key;
        }
      }
    }

    // return prefList[pref];
  }


})();

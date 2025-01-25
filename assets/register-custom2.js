(()=>{

  // create_customer が読み込まれるまで待つ
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 &&  node.classList.contains('cf-react-target')) {
          console.log('create_customer loaded');
          observer.disconnect();
          init();
        }
      });
    });
  });

document.addEventListener('DOMContentLoaded', function() {
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });
});



  const init = ()=>{

    CF.ready(function() {
      // Find a CF form on the page with an ID of a34Kl0
      var $myForm = document.querySelector('form[data-cf-form="a0tbL2"]');
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
          document.getElementById('184484').querySelectorAll('option').forEach((option) => {
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

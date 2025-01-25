if (window.location.href.includes('/en/')) {
    waitForElement('.cf-field')
        .then(elements => {
            elements.forEach(element => {
                const label = element.querySelector('label');
                if (label) {
                    const labelText = label.textContent.trim();
                    if (labelText === '姓') {
                        label.textContent = 'Last name';
                        element.querySelector('input').setAttribute('placeholder', 'Last name');
                    } else if (labelText === '名') {
                        label.textContent = 'First name';
                        element.querySelector('input').setAttribute('placeholder', 'First name');
                    } else if (labelText === '性別') {
                        label.textContent = 'Sex';
                        const selectElement = element.querySelector('select');
                        selectElement.setAttribute('placeholder', 'Please select');
                        Array.from(selectElement.options).forEach(option => {
                            if (option.value === '女性') {
                                option.text = 'Female';
                            } else if (option.value === '男性') {
                                option.text = 'Male';
                            } else if (option.value === 'その他') {
                                option.text = 'Other';
                            } else if (option.value === '') {
                                option.text = 'Please select';
                            }
                        });
                    } else if (labelText === '生年月日') {
                        label.textContent = 'Date of Birth';
                        const selectElement = element.querySelector('select');
                        if (selectElement.getAttribute('placeholder') === '月') {
                            selectElement.setAttribute('placeholder', 'Month');
                            Array.from(selectElement.options).forEach(option => {
                                if (option.value === '') {
                                    option.text = 'Month';
                                }
                            });
                        } else if (selectElement.getAttribute('placeholder') === '日') {
                            selectElement.setAttribute('placeholder', 'Day');
                            Array.from(selectElement.options).forEach(option => {
                                if (option.value === '') {
                                    option.text = 'Day';
                              }
                        });  
                        }
                    }else if (labelText === '郵便番号') {
                        label.textContent = 'Postal Code';

                      
                  } else if (labelText === '都道府県') {
    label.textContent = 'Prefecture';
    const selectElement = element.querySelector('select');
        Array.from(selectElement.options).forEach(option => {
            if (option.value === '') {
                option.text = 'Please select';
            } else if (option.value === '北海道') {
                option.text = 'Hokkaido';
            } else if (option.value === '青森県') {
                option.text = 'Aomori';
            } else if (option.value === '岩手県') {
                option.text = 'Iwate';
            } else if (option.value === '宮城県') {
                option.text = 'Miyagi';
            } else if (option.value === '秋田県') {
                option.text = 'Akita';
            } else if (option.value === '山形県') {
                option.text = 'Yamagata';
            } else if (option.value === '福島県') {
                option.text = 'Fukushima';
            } else if (option.value === '茨城県') {
                option.text = 'Ibaraki';
            } else if (option.value === '栃木県') {
                option.text = 'Tochigi';
            } else if (option.value === '群馬県') {
                option.text = 'Gunma';
            } else if (option.value === '埼玉県') {
                option.text = 'Saitama';
            } else if (option.value === '千葉県') {
                option.text = 'Chiba';
            } else if (option.value === '東京都') {
                option.text = 'Tokyo';
            } else if (option.value === '神奈川県') {
                option.text = 'Kanagawa';
            } else if (option.value === '新潟県') {
                option.text = 'Niigata';
            } else if (option.value === '富山県') {
                option.text = 'Toyama';
            } else if (option.value === '石川県') {
                option.text = 'Ishikawa';
            } else if (option.value === '福井県') {
                option.text = 'Fukui';
            } else if (option.value === '山梨県') {
                option.text = 'Yamanashi';
            } else if (option.value === '長野県') {
                option.text = 'Nagano';
            } else if (option.value === '岐阜県') {
                option.text = 'Gifu';
            } else if (option.value === '静岡県') {
                option.text = 'Shizuoka';
            } else if (option.value === '愛知県') {
                option.text = 'Aichi';
            } else if (option.value === '三重県') {
                option.text = 'Mie';
            } else if (option.value === '滋賀県') {
                option.text = 'Shiga';
            } else if (option.value === '京都府') {
                option.text = 'Kyoto';
               } else if (option.value === '大阪府') {
                option.text = 'Osaka';
            } else if (option.value === '兵庫県') {
                option.text = 'Hyogo';
            } else if (option.value === '奈良県') {
                option.text = 'Nara';
            } else if (option.value === '和歌山県') {
                option.text = 'Wakayama';
            } else if (option.value === '鳥取県') {
                option.text = 'Tottori';
            } else if (option.value === '島根県') {
                option.text = 'Shimane';
            } else if (option.value === '岡山県') {
                option.text = 'Okayama';
            } else if (option.value === '広島県') {
                option.text = 'Hiroshima';
            } else if (option.value === '山口県') {
                option.text = 'Yamaguchi';
            } else if (option.value === '徳島県') {
                option.text = 'Tokushima';
            } else if (option.value === '香川県') {
                option.text = 'Kagawa';
            } else if (option.value === '愛媛県') {
                option.text = 'Ehime';
            } else if (option.value === '高知県') {
                option.text = 'Kochi';
            } else if (option.value === '福岡県') {
                option.text = 'Fukuoka';
            } else if (option.value === '佐賀県') {
                option.text = 'Saga';
            } else if (option.value === '長崎県') {
                option.text = 'Nagasaki';
            } else if (option.value === '熊本県') {
                option.text = 'Kumamoto';
            } else if (option.value === '大分県') {
                option.text = 'Oita';
            } else if (option.value === '宮崎県') {
                option.text = 'Miyazaki';
            } else if (option.value === '鹿児島県') {
                option.text = 'Kagoshima';
            } else if (option.value === '沖縄県') {
                option.text = 'Okinawa';
            }
        });
                    }else if (labelText === '市区町村') {
                        label.textContent = 'City/Ward/Town/Village';
                        element.querySelector('input').setAttribute('placeholder', 'Chuo Ward, Ginza');
                    } else if (labelText === '番地') {
                        label.textContent = 'House Number';
                    } else if (labelText === 'マンション名、部屋番号等') {
                        label.textContent = 'Apartment Name, Room Number, etc.';
                        element.querySelector('input').setAttribute('placeholder', 'Ginza Otake Residence 201');
                    } else if (labelText === 'メールアドレス') {
                        label.textContent = 'Email Address';
                    } else if (labelText === '電話番号') {
                        label.textContent = 'Phone Number';
                    } else if (labelText === 'パスワード 6文字以上の英数字') {
                        label.textContent = 'Password (6 or more alphanumeric characters)';
                    }
                }
            });
          const actionButtons = document.querySelector('.cf-form-actions');
            if (actionButtons) {
                const cancelButton = actionButtons.querySelector('.cf-cancel span');
                if (cancelButton && cancelButton.textContent.trim() === 'キャンセルする') {
                    cancelButton.textContent = 'Cancel';
                }

                const submitButton = actionButtons.querySelector('.cf-submit-form span');
                if (submitButton && submitButton.textContent.trim() === 'アカウントを作成する') {
            submitButton.textContent = 'Create Account';
        } else if (submitButton && submitButton.textContent.trim() === 'アカウントを更新する') {
            submitButton.textContent = 'Update Account';
        }
            }
            console.log('Updates completed.');
        })
        .catch(error => {
            console.log('Element not found.', error);
        });
} else {
    console.log('This page is not the English version.');
}

if (window.location.href.includes('/zh/')) {
    waitForElement('.cf-field')
        .then(elements => {
            elements.forEach(element => {
                const label = element.querySelector('label');
                if (label) {
                    const labelText = label.textContent.trim();
                    if (labelText === '姓') {
                        label.textContent = '姓氏';
                        element.querySelector('input').setAttribute('placeholder', '请输入姓氏');
                    } else if (labelText === '名') {
                        label.textContent = '名字';
                        element.querySelector('input').setAttribute('placeholder', '请输入名字');
                    } else if (labelText === '性別') {
                        label.textContent = '性别';
                        const selectElement = element.querySelector('select');
                        selectElement.setAttribute('placeholder', '请选择');
                        Array.from(selectElement.options).forEach(option => {
                            if (option.value === '女性') {
                                option.text = '女';
                            } else if (option.value === '男性') {
                                option.text = '男';
                            } else if (option.value === 'その他') {
                                option.text = '其他';
                            } else if (option.value === '') {
                                option.text = '请选择';
                            }
                        });
                    } else if (labelText === '生年月日') {
                        label.textContent = '出生日期';
                        const selectElement = element.querySelector('select');
                        if (selectElement.getAttribute('placeholder') === '月') {
                            selectElement.setAttribute('placeholder', '月');
                            Array.from(selectElement.options).forEach(option => {
                                if (option.value === '') {
                                    option.text = '月';
                                }
                            });
                        } else if (selectElement.getAttribute('placeholder') === '日') {
                            selectElement.setAttribute('placeholder', '日');
                            Array.from(selectElement.options).forEach(option => {
                                if (option.value === '') {
                                    option.text = '日';
                              }
                        });  
                        }
                    }else if (labelText === '郵便番号') {
                        label.textContent = '邮政编码';

                      
                  } else if (labelText === '都道府県') {
    label.textContent = '县/直辖市';
    const selectElement = element.querySelector('select');
        Array.from(selectElement.options).forEach(option => {
            if (option.value === '') {
                option.text = '请选择';
            } else if (option.value === '北海道') {
                option.text = '北海道';
            } else if (option.value === '青森県') {
                option.text = '青森县';
            } else if (option.value === '岩手県') {
                option.text = '岩手县';
            } else if (option.value === '宮城県') {
                option.text = '宫城县';
            } else if (option.value === '秋田県') {
                option.text = '秋田县';
            } else if (option.value === '山形県') {
                option.text = '山形县';
            } else if (option.value === '福島県') {
                option.text = '福岛县';
            } else if (option.value === '茨城県') {
                option.text = '茨城县';
            } else if (option.value === '栃木県') {
                option.text = '栃木县';
            } else if (option.value === '群馬県') {
                option.text = '群马县';
            } else if (option.value === '埼玉県') {
                option.text = '埼玉县';
            } else if (option.value === '千葉県') {
                option.text = '千叶县';
            } else if (option.value === '東京都') {
                option.text = '东京都';
            } else if (option.value === '神奈川県') {
                option.text = '神奈川县';
            } else if (option.value === '新潟県') {
                option.text = '新潟县';
            } else if (option.value === '富山県') {
                option.text = '富山县';
            } else if (option.value === '石川県') {
                option.text = '石川县';
            } else if (option.value === '福井県') {
                option.text = '福井县';
            } else if (option.value === '山梨県') {
                option.text = '山梨县';
            } else if (option.value === '長野県') {
                option.text = '长野县';
            } else if (option.value === '岐阜県') {
                option.text = '岐阜县';
            } else if (option.value === '静岡県') {
                option.text = '静冈县';
            } else if (option.value === '愛知県') {
                option.text = '爱知县';
            } else if (option.value === '三重県') {
                option.text = '三重县';
            } else if (option.value === '滋賀県') {
                option.text = '滋贺县';
            } else if (option.value === '京都府') {
                option.text = '京都府';
            } else if (option.value === '大阪府') {
                option.text = '大阪府';
            } else if (option.value === '兵庫県') {
                option.text = '兵库县';
            } else if (option.value === '奈良県') {
                option.text = '奈良县';
            } else if (option.value === '和歌山県') {
                option.text = '和歌山县';
            } else if (option.value === '鳥取県') {
                option.text = '鸟取县';
            } else if (option.value === '島根県') {
                option.text = '岛根县';
            } else if (option.value === '岡山県') {
                option.text = '冈山县';
            } else if (option.value === '広島県') {
                option.text = '广岛县';
            } else if (option.value === '山口県') {
                option.text = '山口县';
            } else if (option.value === '徳島県') {
                option.text = '德岛县';
            } else if (option.value === '香川県') {
                option.text = '香川县';
            } else if (option.value === '愛媛県') {
                option.text = '爱媛县';
            } else if (option.value === '高知県') {
                option.text = '高知县';
            } else if (option.value === '福岡県') {
                option.text = '福冈县';
            } else if (option.value === '佐賀県') {
                option.text = '佐贺县';
            } else if (option.value === '長崎県') {
                option.text = '长崎县';
            } else if (option.value === '熊本県') {
                option.text = '熊本县';
            } else if (option.value === '大分県') {
                option.text = '大分县';
            } else if (option.value === '宮崎県') {
                option.text = '宫崎县';
            } else if (option.value === '鹿児島県') {
                option.text = '鹿儿岛县';
            } else if (option.value === '沖縄県') {
                option.text = '冲绳县';
            }
        });
                    } else if (labelText === '市区町村') {
                        label.textContent = '市/区/镇/村';
                        element.querySelector('input').setAttribute('placeholder', '中央区，银座');
                    } else if (labelText === '番地') {
                        label.textContent = '门牌号';
                    } else if (labelText === 'マンション名、部屋番号等') {
                        label.textContent = '公寓名，房间号等';
                        element.querySelector('input').setAttribute('placeholder', '银座大岳公寓201');
                    } else if (labelText === 'メールアドレス') {
                        label.textContent = '电子邮件地址';
                    } else if (labelText === '電話番号') {
                        label.textContent = '电话号码';
                    } else if (labelText === 'パスワード 6文字以上の英数字') {
                        label.textContent = '密码（6个或更多字母数字字符）';
                    }
                }
            });
          const actionButtons = document.querySelector('.cf-form-actions');
if (actionButtons) {
    const cancelButton = actionButtons.querySelector('.cf-cancel span');
    if (cancelButton && cancelButton.textContent.trim() === 'キャンセルする') {
        cancelButton.textContent = '取消';
    }

    const submitButton = actionButtons.querySelector('.cf-submit-form span');
    if (submitButton && submitButton.textContent.trim() === 'アカウントを作成する') {
            submitButton.textContent = '创建帐户';
        } else if (submitButton && submitButton.textContent.trim() === 'アカウントを更新する') {
            submitButton.textContent = '更新帐户';
        }
}
            console.log('更新完成。');
        })
        .catch(error => {
            console.log('元素未找到。', error);
        });
} else {
    console.log('此页不是中文版。');
}

function waitForElement(selector) {
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                clearInterval(intervalId);
                resolve(elements);
            }
        }, 100);
    });
}

const config = { childList: true, subtree: true };
const targetNode = document.querySelector('body'); // この例ではbody全体を監視対象とします

// ミューテーションを監視するコールバック関数
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const errorMessages = document.querySelectorAll('.cf-field-errors div');
            errorMessages.forEach(errorDiv => {
                const errorMessage = errorDiv.textContent.trim();

                if (window.location.href.includes('/en/')) {
                    if (errorMessage === '入力されていません。') {
                        errorDiv.textContent = 'This field is required.';
                    } else if (errorMessage === '選択されていません。') {
                        errorDiv.textContent = 'Please select an option.';
                    } else if (errorMessage === 'パスワードが短すぎます。') {
                        errorDiv.textContent = 'Password is too short.';
                    } else if (errorMessage === '有効なメールアドレスを入力してください。') {
                        errorDiv.textContent = 'Please enter a valid email address.';
                    } else if (errorMessage === '正しく入力してください') {
                        errorDiv.textContent = 'Please enter a valid input.';
                    }
                } else if (window.location.href.includes('/zh/')) {
                    if (errorMessage === '入力されていません。') {
                        errorDiv.textContent = '此字段为必填项。';
                    } else if (errorMessage === '選択されていません。') {
                        errorDiv.textContent = '请选择一个选项。';
                    } else if (errorMessage === 'パスワードが短すぎます。') {
                        errorDiv.textContent = '密码太短。';
                    } else if (errorMessage === '有効なメールアドレスを入力してください。') {
                        errorDiv.textContent = '请输入有效的电子邮件地址。';
                    } else if (errorMessage === '正しく入力してください') {
                        errorDiv.textContent = '请输入有效的输入。';
                    }
                }
            });
        }
    }
};

// MutationObserverインスタンスの作成
const observer = new MutationObserver(callback);

// 監視の開始
observer.observe(targetNode, config);

// h1要素を取得
let heading = document.getElementById("cf-edit-account-heading");

// 元のテキストを取得
let originalText = heading.textContent.trim();

// ページのURLによって表示言語を判定し、テキストを設定
if (window.location.href.includes('/en/')) {
    if (originalText === 'アカウント情報を変更する') {
        heading.textContent = 'Change Account Information';
    }
} else if (window.location.href.includes('/zh/')) {
    if (originalText === 'アカウント情報を変更する') {
        heading.textContent = '更改账户信息';
    }
}
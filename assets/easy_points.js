function formatBigNumber(int) {
  return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function insertPointValue(ele) {
  var currencyCostString = ele.getAttribute("data-loyal-currency-cost");
  var regex = /[^\d]/g;
  var currencyCost = currencyCostString.replace(regex, "") / (100 * EasyPointsCore.Currency.getRate());

  var points = currencyCost * pointRulePercent;

  var bonusPointAttributes = ele.getAttribute("data-loyal-bonus-points");

  if (bonusPointAttributes) {
    bonusPointAttributes = JSON.parse(bonusPointAttributes);
    var bonusPointPercent = bonusPointAttributes.pointValue / bonusPointAttributes.currencyValue;
    bonusPointAttributes.bonusPoints = Math.floor(currencyCost * bonusPointPercent);
    ele.setAttribute("data-loyal-bonus-points", JSON.stringify(bonusPointAttributes));
    points += bonusPointAttributes.bonusPoints;
  }

  if (ele.hasAttribute("data-loyal-cart-subtotal")) {
    points += totalBonusPoints();
  }

  if (ele.getAttribute("data-loyal-round") == "up") {
    points = Math.ceil(points);
  } else {
    points = Math.floor(points);
  }

  insertPointValueIntoElement(ele, points);
}

function insertPointValueIntoElement(ele, pointValue) {
  ele.querySelectorAll('[data-loyal-target="point-value-location"]').forEach(function(target) {
    target.innerHTML = formatBigNumber(pointValue);
  });
}

function totalBonusPoints() {
  var eles = document.querySelectorAll("[data-loyal-bonus-points]");
  var productBonusPoints = {};
  var points = 0;

  eles.forEach(function(ele) {
    var bonusPointAttributes = ele.getAttribute("data-loyal-bonus-points");
    bonusPointAttributes = JSON.parse(bonusPointAttributes);

    var productPoints = bonusPointAttributes.bonusPoints;
    var currentProductPoints = productBonusPoints[bonusPointAttributes.productId];

    if (!currentProductPoints || currentProductPoints < productPoints) {
      productBonusPoints[bonusPointAttributes.productId] = productPoints;
    }
  });

  var values = Object.values(productBonusPoints);

  for (i = 0; i < values.length; i++) {
    points += values[i];
  }

  return points;
}

function updateRedemptionForm() {
  var shownPointsEle = document.getElementById("shown-point-value");
  if (shownPointsEle) {
    var points = shownPointsEle.value;
    var redemptionPointValue = document.getElementById(
      "redemption-point-value"
    );
    if (redemptionPointValue) {
      redemptionPointValue.value = points;
    }

    if (!EasyPointsCore.Validate.pointRedemption()) {
      shownPointsEle.classList.add("invalid");
    } else {
      shownPointsEle.classList.remove("invalid");
    }
  }
}

var pointRulePointValue;
var pointRuleCurrencyValue;

if (greaterScriptVersion("0-3-2")) {
  var easyPointsSession = getEasyPointsSession();
  pointRulePointValue = easyPointsSession.customerPointRulePointValue;
  pointRuleCurrencyValue = easyPointsSession.customerPointRuleCurrencyValue;
} else {
  pointRulePointValue = sessionStorage.getItem("customerPointRulePointValue");
  pointRuleCurrencyValue = sessionStorage.getItem("customerPointRuleCurrencyValue");
}

var pointRulePercent = null;

function htmlRedirectInput() {
  var input = document.createElement("input");
  input.type = "text";
  input.setAttribute("name", "html_redirect");
  input.value = "true";
  return input;
}

function buildForm(action) {
  var virtualForm = document.getElementById("point-redemption-form");
  if (virtualForm) {
    var inputs = Array.from(virtualForm.getElementsByTagName("input"));

    var form = document.createElement("form");
    form.method = "post";
    form.action = action;
    form.classList.add("easy-points-hide");

    inputs.forEach(function(input, ind) {
      form.appendChild(input.cloneNode());
    });

    form.appendChild(htmlRedirectInput());
    return form;
  } else {
    return null;
  }
}

function submitForm(form) {
  document.body.appendChild(form);
  form.submit();
}

function submitRedemptionForm() {
  updateRedemptionForm();

  if (EasyPointsCore.Validate.pointRedemption()) {
    if (
      (widgetRedemptionButton = document.getElementById(
        "widget-redemption-button"
      ))
    ) {
      widgetRedemptionButton.setAttribute("disabled", true);
      animateButton(
        "widget-redemption-button",
        'Redeeming points'
      );
    }

    updateDisplayedDiscount();
    var form = buildForm("/apps/loyalty/redeem");

    if (form) {
      submitForm(form);
    }
  }
}

function updateDisplayedDiscount() {
  var pointValue = document.getElementById("shown-point-value");

  if (greaterScriptVersion("0-3-2")) {
    setEasyPointsSessionItem("appliedDiscount", pointValue.value);
  } else {
    sessionStorage.setItem("appliedDiscount", pointValue.value);
  }

  displayDiscount(pointValue.value.toString());
}

function submitResetForm() {
  var widgetResetButton = document.getElementById("widget-reset-button");
  if (widgetResetButton) {
    widgetResetButton.setAttribute("disabled", true);
    animateButton(
      "widget-reset-button",
      'Resetting'
    );
  }

  if (greaterScriptVersion("0-3-2")) {
    removeEasyPointsSessionItem("appliedDiscount");
  } else {
    sessionStorage.removeItem("appliedDiscount");
  }

  displayDiscount("0");

  var form = buildForm("/apps/loyalty/reset");

  if (form) {
    submitForm(form);
  }
}

function animateButton(buttonId, startingText) {
  var button = document.getElementById(buttonId);
  if (button) {
    button.innerText = startingText;

    var animation = function() {
      if (button.innerText.includes("...")) {
        button.innerText = startingText;
      } else {
        button.innerText = button.innerText + ".";
      }

      setTimeout(animation, 500);
    };

    animation();
  }
}

function expandWidget() {
  var widget = document.getElementById("widget-container");
  if (widget) {
    widget.classList.remove("easy-points-hide");
  }

  var minWidget = document.getElementById("widget-minimized");
  if (minWidget) {
    minWidget.classList.add("easy-points-hide");
  }
}

function collapseWidget() {
  var widget = document.getElementById("widget-container");
  if (widget) {
    widget.classList.add("easy-points-hide");
  }

  var minWidget = document.getElementById("widget-minimized");
  if (minWidget) {
    minWidget.classList.remove("easy-points-hide");
  }
}

function hideWidget() {
  if (greaterScriptVersion("0-3-2")) {
    setEasyPointsSessionItem("widgetHidden", true);
  } else {
    localStorage.setItem("easyPointsWidgetHidden", true);
  }

  collapseWidget();
}

function showWidget() {
  if (greaterScriptVersion("0-3-2")) {
    removeEasyPointsSessionItem("widgetHidden");
  } else {
    localStorage.removeItem("easyPointsWidgetHidden");
  }

  expandWidget();
}

function updateDiscountInfo() {
  var shownPointValue = document.getElementById("shown-point-value");
  if (shownPointValue) {
    shownPointValue.setAttribute("disabled", true);
  }

  var widgetResetButton = document.getElementById("widget-reset-button");
  if (widgetResetButton) {
    widgetResetButton.classList.remove("easy-points-hide");
  }

  var widgetRedemptionButton = document.getElementById(
    "widget-redemption-button"
  );

  if (widgetRedemptionButton) {
    widgetRedemptionButton.classList.add("easy-points-hide");
  }
}

function displayDiscount(value) {
  var currencyValue = "¥";
  var currencyRatio = "1.0";
  currencyValue += formatBigNumber(value / currencyRatio).toString();

  if (greaterScriptVersion("0-3-2")) {
    var easyPointsSession = getEasyPointsSession();
    easyPointsSession.appliedDiscount = value;
    easyPointsSession.appliedDiscountCurrency = currencyValue;
    setEasyPointsSession(easyPointsSession);
  } else {
    sessionStorage.setItem("appliedDiscount", value);
    sessionStorage.setItem("appliedDiscountCurrency", currencyValue);
  }

  displayAppliedDiscount();
}

function displayAppliedDiscount() {
  if (greaterScriptVersion("0-3-2")) {
    var { appliedDiscount } = getEasyPointsSession();
  } else {
    var appliedDiscount = sessionStorage.getItem('appliedDiscount');
  }

  if (!appliedDiscount) {
    return;
  }

  EasyPointsUI.insertAppliedDiscount(appliedDiscount);

  var shownPointValue = document.getElementById('shown-point-value');
  if (shownPointValue) {
    var valueNum = appliedDiscount.toString().replace(/[^\d]/g, "");
    var valueInt = parseInt(valueNum);
    shownPointValue.value = valueInt;
  }
}

function updatePointValueTargets() {
  pointRulePercent = pointRulePointValue / pointRuleCurrencyValue;
  var targetNodes = document.querySelectorAll('[data-loyal-target="point-value"]');
  var targets = Array.prototype.slice.call(targetNodes);

  var bonusPointTargets = [];
  var noBonusPointTargets = [];

  targets.forEach(function(target) {
    var bonus = target.getAttribute("data-loyal-bonus-points");
    (bonus ? bonusPointTargets : noBonusPointTargets).push(target);
  });

  bonusPointTargets.concat(noBonusPointTargets).forEach(function(ele) {
    insertPointValue(ele);
  });
}

function updateLoyaltyTargets() {
  var pointBalance;
  var expirationDate;

  if (greaterScriptVersion("0-3-2")) {
    var easyPointsSession = getEasyPointsSession();
    pointBalance = easyPointsSession.pointBalance;
    expirationDate = easyPointsSession.expirationDate;
  } else {
    pointBalance = localStorage.getItem("pointBalance");
  }

  var targetNodes = document.querySelectorAll("[data-loyal-target]");
  var targets = Array.prototype.slice.call(targetNodes);

  targets.find(function(ele) {
    var target = ele.getAttribute("data-loyal-target");

    if (target == "shop-point-rule-currency-value") {
      pointRuleCurrencyValue = pointRuleCurrencyValue || ele.value;
    } else if (target == "shop-point-rule-point-value") {
      pointRulePointValue = pointRulePointValue || ele.value;
    } else if ((typeof pointBalance == "number") && target == "balance") {
      ele.textContent = formatBigNumber(pointBalance);
    } else if (expirationDate && target == 'balance-expiration') {
      EasyPointsUI.renderBalanceExpiration(expirationDate);
    }
  });

  if (pointRulePointValue && pointRuleCurrencyValue) {
    updatePointValueTargets();
  }
}

function toggleWidgetTierData() {
  var widgetMain = document.getElementById("widget-main");
  widgetMain.classList.toggle("easy-points-hide");
  var tierData = document.getElementById("widget-tier-data");
  tierData.classList.toggle("easy-points-hide");

  var dataToggleOnEles = document.getElementsByClassName('widget-tier-data-toggle-on');
  var dataToggleOnTargets = Array.prototype.slice.call(dataToggleOnEles);
  var dataToggleOffEles = document.getElementsByClassName('widget-tier-data-toggle-off');
  var dataToggleOffTargets = Array.prototype.slice.call(dataToggleOffEles);

  dataToggleOnTargets.concat(dataToggleOffTargets).forEach(function(target) {
    target.classList.toggle("easy-points-hide");
  });
}

function showTierDataToggleSection() {
  var container = document.getElementById("widget-tier-data-toggle-container");

  if (container) {
    container.classList.remove("easy-points-hide");
  }
}

function updateRankMaintenanceData() {
  var easyPointsSession = getEasyPointsSession();
  var rankMaintenanceData = easyPointsSession.rankMaintenanceData;

  if (rankMaintenanceData) {
    var rankMaintenanceAmountEles = document.querySelectorAll('[data-loyal-target="rank-maintenance-amount"]');
    var rankMaintenanceAmountTargets = Array.prototype.slice.call(rankMaintenanceAmountEles);

    rankMaintenanceAmountTargets.forEach(function(target) {
      target.textContent = rankMaintenanceData.amount;
    });

    var rankMaintenanceDeadline;

    if (rankMaintenanceData.deadline) {
      rankMaintenanceDeadline = new Date(rankMaintenanceData.deadline);
      rankMaintenanceDeadline = rankMaintenanceDeadline.toLocaleDateString("en");
    } else {
      rankMaintenanceDeadline = "N/A";
    }

    var rankMaintenanceDeadlineEles = document.querySelectorAll('[data-loyal-target="rank-maintenance-deadline"]');
    var rankMaintenanceDeadlineTargets = Array.prototype.slice.call(rankMaintenanceDeadlineEles);

    rankMaintenanceDeadlineTargets.forEach(function(target) {
      target.textContent = rankMaintenanceDeadline;
    });
  }

  var rankAdvancementData = easyPointsSession.rankAdvancementData;

  if (rankAdvancementData) {
    var rankAdvancementAmountEles = document.querySelectorAll('[data-loyal-target="rank-advancement-amount"]');
    var rankAdvancementAmountTargets = Array.prototype.slice.call(rankAdvancementAmountEles);

    rankAdvancementAmountTargets.forEach(function(target) {
      target.textContent = rankAdvancementData.amount;
    });

    var rankAdvancementDeadline;

    if (rankAdvancementData.deadline) {
      rankAdvancementDeadline = new Date(rankAdvancementData.deadline);
      rankAdvancementDeadline = rankAdvancementDeadline.toLocaleDateString("en");
    } else {
      rankAdvancementDeadline = "N/A";
    }

    var rankAdvancementDeadlineEles = document.querySelectorAll('[data-loyal-target="rank-advancement-deadline"]');
    var rankAdvancementDeadlineTargets = Array.prototype.slice.call(rankAdvancementDeadlineEles);

    rankAdvancementDeadlineTargets.forEach(function(target) {
      target.textContent = rankAdvancementDeadline;
    });

    var rankAdvancementTierNameEles = document.querySelectorAll('[data-loyal-target="rank-advancement-tier-name"]');
    var rankAdvancementTierNameTargets = Array.prototype.slice.call(rankAdvancementTierNameEles);

    rankAdvancementTierNameTargets.forEach(function(target) {
      target.textContent = rankAdvancementData.tier_name;
    });
  }
}

function getEasyPointsSession() {
  var easyPointsSession = sessionStorage.getItem("easyPoints");

  if (easyPointsSession) {
    easyPointsSession = JSON.parse(easyPointsSession);
  } else {
    easyPointsSession = {};
  }

  return easyPointsSession;
}

function setEasyPointsSession(easyPointsSession) {
  sessionStorage.setItem("easyPoints", JSON.stringify(easyPointsSession));
}

function setEasyPointsSessionItem(key, value) {
  var easyPointsSession = getEasyPointsSession();
  easyPointsSession[key] = value;
  setEasyPointsSession(easyPointsSession);
}

function removeEasyPointsSessionItem(key) {
  var easyPointsSession = getEasyPointsSession();
  delete easyPointsSession[key];
  setEasyPointsSession(easyPointsSession);
}

function greaterScriptVersion(version) {
  var scriptVersion = "1-14-3";

  if (scriptVersion) {
    var regex = /(\d+)\-(\d+)\-(\d+)/;
    var match = scriptVersion.match(regex);
    var major = parseInt(match[1]);
    var minor = parseInt(match[2]);
    var patch = parseInt(match[3]);

    var challengeMatch = version.match(regex);
    var challengeMajor = parseInt(challengeMatch[1]);
    var challengeMinor = parseInt(challengeMatch[2]);
    var challengePatch = parseInt(challengeMatch[3]);

    if (major > challengeMajor) {
      return true;
    } else if (major == challengeMajor) {
      if (minor > challengeMinor) {
        return true;
      } else if (minor == challengeMinor) {
        if (patch > challengePatch) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return true;
  }
}

var EasyPointsCore = {

  Selectors: {
    TARGETS: {
      BALANCE: '[data-loyal-target="balance"]',
      APPLIED_DISCOUNT: '[data-loyal-target="applied-discount"]'
    },

    REDEMPTION: {
      POINTS_VALUE: '#redemption-point-value',
      POINTS_MAX: '#redemption-max-points'
    },
  },

  Currency: {
    getFormatOptions() {
      if (EasyPointsData && EasyPointsData.shop) {
        var { money_format_options = null } =  EasyPointsData.shop;
        return money_format_options;
      }

      return null;
    },

    getRate: function() {
      return (Shopify && Shopify.currency && Shopify.currency.rate) || 1;
    },

    getActiveString: function(fallback = 'JPY') {
      return (Shopify && Shopify.currency && Shopify.currency.active) || fallback;
    },

    format(amount, {convert = false, multiplier = 1, format = null} = {}) {
      amount = Math.round((convert ? amount * EasyPointsCore.Currency.getRate() : amount) * multiplier);
      var money = amount / 100 + ' ' + EasyPointsCore.Currency.getActiveString();

      if (Shopify && Shopify.formatMoney !== undefined && (EasyPointsData && EasyPointsData.shop.money_format || format)) {
        money = Shopify.formatMoney(amount, format || EasyPointsData.shop.money_format);
      }

      return money;
    }
  },

  Validate: {
    pointRedemption: function({points = null, balance = null, max = null} = {}) {
      var rNumbersOnly = /[^\d]/;

      if (!points) {
        var pointsInputEl = document.querySelector(EasyPointsCore.Selectors.REDEMPTION.POINTS_VALUE);

        if (!pointsInputEl) {
          return false;
        }

        if (pointsInputEl.value.match(rNumbersOnly) != null) {
          return false;
        }

        points = parseInt(pointsInputEl.value);
      }

      if (!balance) {
        var balanceText = '0';

        document.querySelectorAll(EasyPointsCore.Selectors.TARGETS.BALANCE)
          .forEach(node => balanceText = node.textContent);

        balance = parseInt(balanceText.replace(/[^\d]/g, ''));
      }

      if (!max) {
        var pointsMaxEl = document.querySelector(EasyPointsCore.Selectors.REDEMPTION.POINTS_MAX);

        if (!pointsMaxEl) {
          return false;
        }

        if (pointsMaxEl.value.match(rNumbersOnly) != null) {
          return false;
        }

        max = parseInt(pointsMaxEl.value);
      }

      max = max / (100 * EasyPointsCore.Currency.getRate());
      max *= 1.0;
      max = Math.floor(max);

      return 0 < points && points <= Math.min(balance, max);
    }
  }

};

var EasyPointsUI = {

  BALANCE_EXPIRATION_CONTAINER_SELECTOR: '[data-loyal-target="balance-expiration"]',
  BALANCE_EXPIRATION_DATE_SELECTORS: {
    YY: '[data-loyal-target="balance-expiration__yy"]',
    MM: '[data-loyal-target="balance-expiration__mm"]',
    DD: '[data-loyal-target="balance-expiration__dd"]',
  },

  renderBalanceExpiration: function(date) {
    var containers = document.body.querySelectorAll(EasyPointsUI.BALANCE_EXPIRATION_CONTAINER_SELECTOR);

    if (containers.length == 0) {
      return;
    }

    if (date == null) {
      containers.forEach(function(container) {
        container.classList.add('easy-points-hide');
      });

      return;
    }

    date = new Date(date);

    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    containers.forEach(function(container) {
      container.classList.remove('easy-points-hide');

      container
        .querySelectorAll(EasyPointsUI.BALANCE_EXPIRATION_DATE_SELECTORS.YY)
        .forEach(function(el) { el.textContent = yy; });

      container
        .querySelectorAll(EasyPointsUI.BALANCE_EXPIRATION_DATE_SELECTORS.MM)
        .forEach(function(el) {el.textContent = mm; });

      container
        .querySelectorAll(EasyPointsUI.BALANCE_EXPIRATION_DATE_SELECTORS.DD)
        .forEach(function(el) { el.textContent = dd; });
    });
  },

  insertAppliedDiscount: function(discount) {
    var formatOptions =
      EasyPointsCore.Currency.getFormatOptions() || { convert: true, multiplier: 100 };

    document.querySelectorAll(EasyPointsCore.Selectors.TARGETS.APPLIED_DISCOUNT)
      .forEach(el => el.innerHTML = EasyPointsCore.Currency.format(discount, formatOptions));
  }
};

window.addEventListener("load", function() {
  var easyPointsSession = getEasyPointsSession();
  var cartItemCountEle = document.getElementById("cart-item_count");

  var appliedDiscount = easyPointsSession.appliedDiscount;

  if (appliedDiscount && parseInt(appliedDiscount) > 0) {
    displayAppliedDiscount();
    updateDiscountInfo();
  }

  if (
    easyPointsSession.widgetHidden !== true &&
    cartItemCountEle &&
    cartItemCountEle.value > 0
  ) {
    if (window.screen.width > 1200 && window.screen.height > 1300) {
      expandWidget();
    }
  }

  updateLoyaltyTargets();

  var redemptionButton = document.getElementById("redemption_button");
  if (redemptionButton) {
    redemptionButton.addEventListener("click", submitRedemptionForm);
  }

  if (
    (widgetRedemptionButton = document.getElementById(
      "widget-redemption-button"
    ))
  ) {
    widgetRedemptionButton.addEventListener("click", submitRedemptionForm);
  }

  var widgetResetButton = document.getElementById("widget-reset-button");
  if (widgetResetButton) {
    widgetResetButton.addEventListener("click", submitResetForm);
  }

  var widgetCloseButton = document.getElementById("widget-close-btn");
  if (widgetCloseButton) {
    widgetCloseButton.addEventListener("click", hideWidget);
  }

  var showWidgetButton = document.getElementById("widget-minimized");
  if (showWidgetButton) {
    showWidgetButton.addEventListener("click", showWidget);
  }

  var shownPointValue = document.getElementById("shown-point-value");
  if (shownPointValue) {
    shownPointValue.addEventListener("change", updateRedemptionForm);

    shownPointValue.addEventListener("focus", function() {
      shownPointValue.setAttribute("placeholder", "");
    });

    shownPointValue.addEventListener("blur", function() {
      shownPointValue.setAttribute("placeholder", "0");
    });
  }

  if (greaterScriptVersion("0-3-2")) {
    var tierDataToggleEles = document.getElementsByClassName("widget-tier-data-toggle");
    var tierDataToggleTargets = Array.prototype.slice.call(tierDataToggleEles);
    tierDataToggleTargets.forEach(function(target) {
      target.addEventListener("click", toggleWidgetTierData);
    });

    var tierName = easyPointsSession.tierName;

    if (tierName) {
      var tierNameEles = document.querySelectorAll('[data-loyal-target="tier-name"]');
      var tierNameTargets = Array.prototype.slice.call(tierNameEles);
      tierNameTargets.forEach(function(target) {
        target.textContent = tierName;
      });

      showTierDataToggleSection();
    }

    updateRankMaintenanceData();
  }

  function async(fn, callback) {
    setTimeout(function() {
      fn();
    }, 0);
  }

  var shopDomainEle = document.getElementById("shopDomain");
  var shopDomain = shopDomainEle ? shopDomainEle.value : null;

  var redirectUrlEle = document.body.querySelector(
    'input[data-loyal-target="redirect_url"]'
  );
  if (redirectUrlEle) {
    redirectUrlEle.value = window.location.pathname;
  }

  var custIdEle = document.getElementById("customerId");
  var custId = custIdEle ? custIdEle.value : null;
  var custHashEle = document.getElementById("customerHash");
  var custHash = custHashEle ? custHashEle.value : null;

  function fetchPointRule() {
    if (shopDomain) {
      var route = "/apps/loyalty/order_point_rule";

      if (custId && custHash) {
        route = route + "?sid=" + custId + "&hash=" + custHash;
      }

      var xhr = new XMLHttpRequest();
      var url = "https://" + shopDomain + route;
      xhr.open("GET", url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var easyPointsSession = getEasyPointsSession();

          var percentEle = document.body.querySelector(
            'input[data-loyal-target="shop-point-rule-percent"]'
          );
          var pointValueEle = document.body.querySelector(
            'input[data-loyal-target="shop-point-rule-point-value"]'
          );
          var currencyValueEle = document.body.querySelector(
            'input[data-loyal-target="shop-point-rule-currency-value"]'
          );

          var resp = JSON.parse(xhr.response);
          var percentage = parseInt(resp.percentage);
          var pointValue = parseInt(resp.point_value);
          var currencyValue = parseInt(resp.currency_value);
          var tierName = resp.tier_name;

          var eles = document.querySelectorAll('[data-loyal-target="tier-name"]');
          var targets = Array.prototype.slice.call(eles);
          targets.forEach(function(target) {
            target.textContent = tierName;
          });
          showTierDataToggleSection();

          percentEle.value = percentage;
          pointValueEle.value = pointValue;
          currencyValueEle.value = currencyValue;

          if (easyPointsSession) {
            easyPointsSession.customerPointRulePointValue = pointValue;
            easyPointsSession.customerPointRuleCurrencyValue = currencyValue;
            easyPointsSession.tierName = tierName;

            if (resp.tier_maintenance_data) {
              easyPointsSession.rankMaintenanceData = resp.tier_maintenance_data.maintenance_data;
              easyPointsSession.rankAdvancementData = resp.tier_maintenance_data.advancement_data;
              setEasyPointsSession(easyPointsSession);
              updateRankMaintenanceData();
            }
          }

          eles = document.querySelectorAll('[data-loyal-target="point-value"]');
          targets = Array.prototype.slice.call(eles);
          var bonusPointTargets = [];
          var noBonusPointTargets = [];

          targets.forEach(function(target) {
            var bonus = target.getAttribute("data-loyal-bonus-points");
            (bonus ? bonusPointTargets : noBonusPointTargets).push(target);
          });

          bonusPointTargets.concat(noBonusPointTargets).forEach(function(ele) {
            var currencyCost = parseInt(ele.dataset.loyalCurrencyCost) / (100 * EasyPointsCore.Currency.getRate());
            var points = currencyCost * (pointValue / currencyValue);
            var target = ele.querySelector(
              '[data-loyal-target="point-value-location"]'
            );

            var bonusPointAttributes = ele.getAttribute("data-loyal-bonus-points");

            if (bonusPointAttributes) {
              bonusPointAttributes = JSON.parse(bonusPointAttributes);
              var bonusPointPercent = bonusPointAttributes.pointValue / bonusPointAttributes.currencyValue;
              bonusPointAttributes.bonusPoints = Math.floor(currencyCost * bonusPointPercent);
              ele.setAttribute("data-loyal-bonus-points", JSON.stringify(bonusPointAttributes));
              points += bonusPointAttributes.bonusPoints;
            }

            if (ele.hasAttribute("data-loyal-cart-subtotal")) {
              points += totalBonusPoints();
            }

            if (ele.dataset.loyalRound === "up") {
              points = Math.ceil(points);
            } else {
              points = Math.floor(points);
            }

            target.textContent = formatBigNumber(points);
          });
        }
      };
      xhr.send();
    }
  }

  function fetchPointBalance() {
    if (custId && custHash && shopDomain) {
      var route =
        "/apps/loyalty/point_balances?sid=" + custId + "&hash=" + custHash;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://" + shopDomain + route);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var resp = JSON.parse(xhr.response);

          var balanceFields = document.body.querySelectorAll(
            '[data-loyal-target="balance"]'
          );

          var easyPointsSession = getEasyPointsSession();

          if (easyPointsSession) {
            easyPointsSession.pointBalance = resp.balance;
            easyPointsSession.expirationDate = resp.expiration_date;
          }

          balanceFields.forEach(function(balanceField) {
            balanceField.textContent = formatBigNumber(resp.balance);
          });

          EasyPointsUI.renderBalanceExpiration(resp.expiration_date);

          var maxRedeemablePoints = document.getElementById(
            "max-redeemable-points"
          );

          if (maxRedeemablePoints) {
            var orderTotal = parseInt(
              maxRedeemablePoints.textContent.replace(/[^\d]/g, "")
            );

            maxRedeemablePoints.textContent = formatBigNumber(
              Math.min(orderTotal, resp.balance)
            );
          }

          if (typeof resp.coupon_value === "number" && resp.coupon_value > 0) {
            var displayRedemptionField = document.getElementById(
              "shown-point-value"
            );

            if (displayRedemptionField) {
              displayRedemptionField.value = resp.coupon_value;
            }

            var trueRedemptionField = document.getElementById(
              "redemption-point-value"
            );

            if (trueRedemptionField) {
              trueRedemptionField.value = resp.coupon_value;
            }

            EasyPointsUI.insertAppliedDiscount(resp.coupon_value);

            if (easyPointsSession) {
              easyPointsSession.appliedDiscount = resp.coupon_value;
              easyPointsSession.appliedDiscountCurrency = resp.coupon_currency;
              setEasyPointsSession(easyPointsSession);
            }

            updateDiscountInfo();
          } else {
            if (easyPointsSession) {
              delete easyPointsSession.appliedDiscount;
              delete easyPointsSession.appliedDiscountCurrency;
            }
          }

          if (easyPointsSession) {
            setEasyPointsSession(easyPointsSession);
          }
        }
      };
      xhr.send();
    }
  }

  function fetchOrderDetails() {
    orderIds = [];
    var orderDetailNodes = document.querySelectorAll("[data-loyal-order-points]");
    var orderDetails = Array.prototype.slice.call(orderDetailNodes);

    orderDetails.forEach(function(orderDetail) {
      var orderEleNodes = orderDetail.querySelectorAll("[data-loyal-order-id]");
      var orderEles = Array.prototype.slice.call(orderEleNodes);

      orderEles.forEach(function(orderEle) {
        var orderId = orderEle.getAttribute("data-loyal-order-id");
        orderIds.push(orderId);
      });
    });

    if (orderIds.length > 0 && custId && custHash && shopDomain) {
      var route = "/apps/loyalty/orders";
      var data = {
        "sid": custId,
        "hash": custHash,
        "order_ids": orderIds
      };

      var params = new URLSearchParams(data);
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://" + shopDomain + route + "?" + params.toString());

      xhr.onload = function() {
        if (xhr.status === 200) {
          var resp = JSON.parse(xhr.response);

          orderDetails.forEach(function(orderDetail) {
            var orderEleNodes = orderDetail.querySelectorAll("[data-loyal-order-id]");
            var orderEles = Array.prototype.slice.call(orderEleNodes);

            orderEles.forEach(function(orderEle) {
              var orderId = orderEle.getAttribute("data-loyal-order-id");
              var orderData = resp.orders[orderId];

              if (orderData) {
                orderEle.querySelectorAll("[data-loyal-target]").forEach(function(target) {
                  var loyaltyTarget = target.getAttribute("data-loyal-target");

                  if (loyaltyTarget == "awardable-points") {
                    target.innerHTML = formatBigNumber(orderData.awardable_points);
                  } else if (loyaltyTarget == "points-redeemed") {
                    target.innerHTML = formatBigNumber(orderData.points_redeemed);
                  } else if (loyaltyTarget == "points-awarded") {
                    target.innerHTML = formatBigNumber(orderData.points_awarded);
                  }
                });
              }
            });
          });
        }
      };

      xhr.send();
    }
  }

  async(fetchPointRule);
  async(fetchPointBalance);
  async(fetchOrderDetails);
});

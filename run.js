

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function randomInt(min,max)
{
    var result = Math.floor((Math.random() * max) + min);
    return result;
}

var htmlInputTypes = {
  "color" : function(){
    return '#'+pad(Math.floor(Math.random()*16777215).toString(16), 6);
  },
  "date" : function(){
    var rndDate = randomDate(new Date(1977, 8, 1), new Date(2999, 8, 1));
    var result = [
      rndDate.getFullYear(),
      "-",
      pad(rndDate.getMonth() + 1, 2),
      "-",
      pad(rndDate.getDay() + 1, 2), 
    ].join('');
    return result;
  },
  "datetime-local" : "",
  "email" : "internet.email",
  "month" : function(){
    var rndDate = randomDate(new Date(1977, 8, 1), new Date(2999, 8, 1));
    var result = [
      rndDate.getFullYear(),
      "-",
      pad(rndDate.getMonth() + 1, 2)
    ].join('');
    return result;
  },
  "number" : "random.number",
  "range" : function(el){
    var minValue= parseInt($(el).prop('min'), 10);
    var maxValue = parseInt($(el).prop('max'), 10);
    return randomInt(minValue, maxValue);
  },
  "search" : "lorem.words",
  "tel" : "phone.phoneNumber",
  "url" : "internet.url",
  "week" : function(){
    var rndDate = randomDate(new Date(1977, 8, 1), new Date(2999, 8, 1));
    var onejan = new Date(rndDate.getFullYear(),0,1);
    var weeknumber = Math.ceil((((rndDate - onejan) / 86400000) + onejan.getDay()+1)/7);
    var result = rndDate.getFullYear() + "-W" + pad(weeknumber, 2);
    return result;
  },
  "radio" : selectRandomRadio,
  "checkbox" : function(el){
    var randomBoolean = Math.random() >= 0.5;
    $(el).attr("checked", randomBoolean);
  }
};

var fakerCultures = ["az", "cz", "de", "de_AT", "de_CH", "en", "en_AU", "en_BORK", "en_CA", "en_GB", "en_IE", "en_IND", "en_US", "en_au_ocker", "es", "es_MX", "fa", "fr", "fr_CA", "ge", "id_ID", "it", "ja", "ko", "nb_NO", "nep", "nl", "pl", "pt_BR", "ru", "sk", "sv", "tr", "uk", "vi", "zh_CN", "zh_TW"];


function selectRandomRadio(el){
  var groupName = $(el).attr("name");
  var radios = $("input:radio:enabled[name='" + groupName + "']");
  var idx = randomInt(0, radios.length - 1);
  $(radios[idx]).prop("checked", true);
}

var randomizeInputValue = function(el){
  if ($(el).length != 0){
    switch( $(el)[0].nodeName.toLowerCase() ) {
      case "input":
        var type = $(el).attr('type');
        var value = faker.lorem.word();
        var fakerMethod = htmlInputTypes[type];
        if (fakerMethod){
          if (isFunction(fakerMethod)){
            value = fakerMethod(el);
          } else {
            value = faker.fake("{{" + fakerMethod + "}}")
          }
        }
        $(el).focus().val(value);
        break;
      case "select":
        var opts = $(el)[0].options;
        var idx = randomInt(0, opts.length - 1);
        var val = opts[idx].value;
        $(el).focus().val(val);
        break; 
      case "textarea":
        $(el).focus().val(faker.lorem.sentences());
        break;
    }  
  }
};
var autocheckout = function(el){
  if ($(el).length != 0){
    switch( $(el)[0].nodeName.toLowerCase() ) {
      case "button":
       $(el).focus().click();
        break;
      case "a":
      var type = $(el).attr('href');
      if(type == "/cart/")
        alert("asdf");
      //$(el).focus().click();
      break;
      case "input":

        var type = $(el).attr('name');
        var  checkboxtype = $(el).attr('id');
        if( checkboxtype == "order_terms_and_conditions")
              $(el).attr("checked", true);        

        if((type == "checkout[email]") || (type == "order[email]"))
          chrome.storage.sync.get(/* String or Array */["email"], function(items){
            $(el).focus().val(items.email);
          });
          if((type == "checkout[shipping_address][first_name]") || (type == "firstname") || (type == "order[bill_address_attributes][firstname]"))
          chrome.storage.sync.get(/* String or Array */["firstname"], function(items){
            $(el).focus().val(items.firstname);
          });
          if((type == "checkout[shipping_address][last_name]") || (type == "lastname") || (type == "order[bill_address_attributes][lastname]"))
          chrome.storage.sync.get(/* String or Array */["lastname"], function(items){
            $(el).focus().val(items.lastname);
          });
          if((type == "checkout[shipping_address][company]") || (type == "company"))
          chrome.storage.sync.get(/* String or Array */["company"], function(items){
            $(el).focus().val(items.company);
          });
          if((type == "checkout[shipping_address][address1]") || (type == "street[]") || (type == "order[billing_address]")|| (type == "order[bill_address_attributes][address1]"))
          chrome.storage.sync.get(/* String or Array */["address"], function(items){
            $(el).focus().val(items.address);
          });
          if((type == "checkout[shipping_address][address2]")|| (type == "order[bill_address_attributes][address2]"))
          chrome.storage.sync.get(/* String or Array */["apartment"], function(items){
            $(el).focus().val(items.apartment);
          });
          if((type == "checkout[shipping_address][city]") || (type == "city") || (type == "order[billing_city]") || (type == "order[bill_address_attributes][city]"))
          chrome.storage.sync.get(/* String or Array */["city"], function(items){
            $(el).focus().val(items.city);
          });
          if((type == "checkout[shipping_address][country]") || (type == "country") || (type == "order[bill_address_attributes][country_id]"))
          chrome.storage.sync.get(/* String or Array */["country"], function(items){
            $(el).focus().val(items.country);
          });
          if((type == "checkout[shipping_address][province]") || (type == "region") || (type == "order[billing_state]"))
          chrome.storage.sync.get(/* String or Array */["state"], function(items){
            $(el).focus().val(items.state);
          });
          if((type == "checkout[shipping_address][zip]") || (type == "postcode") || (type == "order[billing_zip]") || (type == "order[bill_address_attributes][zipcode]"))
          chrome.storage.sync.get(/* String or Array */["zip"], function(items){
            $(el).focus().val(items.zip);
          });
          if((type == "checkout[shipping_address][phone]") || (type == "telephone") || (type == "order[tel]") || (type == "order[bill_address_attributes][phone]"))
          chrome.storage.sync.get(/* String or Array */["phone"], function(items){
            $(el).focus().val(items.phone);
          });

          if((type == "checkout[card_number]") || (type == "credit_card[cnb]") || (type == "payment_source[9][cardholder_name]"))
          chrome.storage.sync.get(/* String or Array */["number"], function(items){
            $(el).focus().val(items.number);
          });
          if((type == "checkout[different_billing_address]") || (type == "payment_source[9][number]"))
          chrome.storage.sync.get(/* String or Array */["phone"], function(items)
          {
            $(el).focus().val(items.phone);
          });
          if(type == "checkout[remember_me]")
          chrome.storage.sync.get(/* String or Array */["expiry"], function(items){
            $(el).focus().val(items.expiry);
          });
          if((type == "checkout[reduction_code]") || (type == "credit_card[vval]") || (type == "payment_source[9][verification_value]"))
          chrome.storage.sync.get(/* String or Array */["verification_value"], function(items){
            $(el).focus().val(items.verification_value);
          });
          
          

          if((type == "commit"))
          {
          $(el).focus().parents().submit();

                $(el).focus().parents().parents().parents().submit();
              
              //  $(el).focus().parents().parents().submit();
          }


        break;
      case "select":
        var opts = $(el)[0].options;
        var idx = randomInt(0, opts.length - 1);
        var val = opts[idx].value;
        $(el).focus().val(val);
        break; 
      case "textarea":
        $(el).focus().val(faker.lorem.sentences());
        break;
    }  
  }
};
chrome.extension.sendRequest({
  "action": "getOptions",
  "args": []
}, function(response){
  if (deepAutofillChromeExtensionSettings){
    if (deepAutofillChromeExtensionSettings.randomLocale){
      console.info("setting locale", deepAutofillChromeExtensionSettings.randomLocale);
      faker.locale = deepAutofillChromeExtensionSettings.randomLocale
    }
    for(var i = 0; i < deepAutofillChromeExtensionSettings.fields.length; i++){
      var field = deepAutofillChromeExtensionSettings.fields[i];
      var value = faker.lorem.word();
      if (field.static){
        value = field.static;
      }
      if (field.random){
        value = faker.fake(field.random);
      }
      
      if (!field.static && !field.random){
        randomizeInputValue($(field.selector));
      } else {
        $(field.selector).focus().val(value);  
      }
      console.debug(field.selector, value);   
    }
  } else {
    $("input:enabled, select:enabled, textarea:enabled,form:enabled, button:enabled, a:enabled").not(':hidden,input[readonly]').each(function(){
      autocheckout(this);
    }); 
  }
});  
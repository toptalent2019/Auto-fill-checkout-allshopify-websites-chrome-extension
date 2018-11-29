function msg(title, message){
  chrome.notifications.create(
    'name-for-notification', {   
      type: 'basic', 
      iconUrl: 'icon48.png', 
      title: title, 
      message: message
    }, 
    function() {}  
  ); 
}

var demoSettings =  {
  "Deep Auto Fill Chrome Demo" : {
    "randomLocale" : "de",
    "fields" : [
      {
        "selector" : "#textbox2",
        "random": "A bunch of random values: {{name.lastName}}, {{name.firstName}} {{name.suffix}}"
      },
      {
        "selector" : "input[name=textbox1]",
        "random": "A bunch of another random values: {{internet.email}}, {{helpers.createCard}} {{address.secondaryAddress}}",
        "static" : "A static value"
      },
      {
        "selector" : "#textbox4",
        "static" : "A static value"
      } 
    ]
  }
}
$(document).ready(function(){
  var formInputs = $('input[type="email"],input[type="password"],input[type="text"]');
  formInputs.focus(function() {
       $(this).parent().children('p.formLabel').addClass('formTop');
       $('div#formWrapper').addClass('darken-bg');
       $('div.logo').addClass('logo-active');
  });
  formInputs.focusout(function() {
    if ($.trim($(this).val()).length == 0){
    $(this).parent().children('p.formLabel').removeClass('formTop');
    }
    $('div#formWrapper').removeClass('darken-bg');
    $('div.logo').removeClass('logo-active');
  });
  $('p.formLabel').click(function(){
     $(this).parent().children('.form-style').focus();
  });
  $("#add_btn").click(function(){
    chrome.storage.sync.set({'email':$("#email").val()},function (){
      console.log("email set");
    });
    chrome.storage.sync.set({'firstname':$("#firstname").val()},function (){
      console.log("firstname set");
    });
    chrome.storage.sync.set({'lastname':$("#lastname").val()},function (){
      console.log("lastname set");
    });
    chrome.storage.sync.set({'company':$("#company").val()},function (){
      console.log("company set");
    });
    chrome.storage.sync.set({'address':$("#address").val()},function (){
      console.log("address set");
    });
    chrome.storage.sync.set({'apartment':$("#apartment").val()},function (){
      console.log("apartment set");
    });
    chrome.storage.sync.set({'city':$("#city").val()},function (){
      console.log("city set");
    });
    chrome.storage.sync.set({'country':$("#country").val()},function (){
      console.log("country set");
    });
    chrome.storage.sync.set({'city':$("#city").val()},function (){
      console.log("city set");
    });
    chrome.storage.sync.set({'zip':$("#zip").val()},function (){
      console.log("zip set");
    });
    chrome.storage.sync.set({'phone':$("#phone").val()},function (){
      console.log("phone set");
    });
    chrome.storage.sync.set({'number':$("#number").val()},function (){
      console.log("number set");
    });
    chrome.storage.sync.set({'name':$("#name").val()},function (){
      console.log("name set");
    });
    chrome.storage.sync.set({'expiry':$("#expiry").val()},function (){
      console.log("expiry set");
    });
    chrome.storage.sync.set({'verification_value':$("#verification_value").val()},function (){
      console.log("verification_value set");
    });
    alert("Saved successfully!");
  })
});

 
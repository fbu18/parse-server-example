Parse.Cloud.define('pushNewMessage', function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var params = request.params;
  var user = request.user;

  var customData = params.customData;
  var receiver = params.receiver;
  var message = params.message;
  var sender = params.sender;

  // use to custom tweak whatever payload you wish to send
  var pushQuery = new Parse.Query(Parse.Installation);
  
  if (receiver) {
    pushQuery.equalTo("username", receiver);
    console.log("workingggggg");
  } else {
    pushQuery.equalTo("deviceType", "android");
  }
  
  var payload = {};
  if(customData){
    payload.customData = customData;
  }
  
  if(message){
    payload.message = message;
  }
  
  if(sender){
    payload.sender = sender;
  }
  
  // Note that useMasterKey is necessary for Push notifications to succeed.

  Parse.Push.send({
  where: pushQuery,      // for sending to a specific channel
  data: payload,
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});

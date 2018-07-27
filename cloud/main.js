Parse.Cloud.define('pushNewMessage', function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var params = request.params;
  var user = request.user;

  var customData = params.customData;
  var receiver = params.reciever;

  // use to custom tweak whatever payload you wish to send
  var pushQuery = new Parse.Query(Parse.Installation);
  
  if (receiver) {
    pushQuery.equalTo("user", receiver);
    console.log(receiver);
  } else {
    pushQuery.equalTo("deviceType", "android");
  }

  var payload = {};

  if (customData) {
      payload.customdata = customData;
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

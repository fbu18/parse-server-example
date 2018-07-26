Parse.Cloud.define('pushNewMessage', function(request, response) {

//parameters: params passed by the client and the authorized user
  var params = request.params;
  var user = request.user;

  var newData = params.newData;
  var receiver = params.receiver;

  // set audience of push notification and data
  var pushQuery = new Parse.Query(Parse.Installation);
  if (receiver) {
    pushQuery.equalTo("user", receiver.getUsername());
    console.log(receiver);
  } else {
    pushQuery.equalTo("deviceType", "android");
  }

  var payload = {};

  if (newData) {
      payload.mydata = newData;
  }

  console.log(pushQuery.toString());
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

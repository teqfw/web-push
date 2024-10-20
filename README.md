# @teqfw/web-push

| CAUTION: TeqFW is an unstable project without backward compatibility. Use it at your own risk. |
|------------------------------------------------------------------------------------------------|

This `teq` plugin adds WebPush functionality to Tequila Framework apps.

## Overview

### CLI

* `TeqFw_Web_Push_Back_Cli_Key_Create`: Creates VAPID keys to use for server authentication within the WebPush API.
* `TeqFw_Web_Push_Back_Cli_Send`: Sends WebPush notifications to the specified front.

### Local Config

```json
{
  "@teqfw/web-push": {
    "email": "user@email.com"
  }
}
```

### RDB Schema

* `web_push_subscript`: The subscriptions with keys used to send notifications using the WebPush API.

### Web API

* `TeqFw_Web_Push_Back_Web_Api_Key_Load`: Loads WebPush subscription keys from the back.
* `TeqFw_Web_Push_Back_Web_Api_Subscript_Create`: Creates the WebPush subscription on the back.
* `TeqFw_Web_Push_Back_Web_Api_Subscript_Delete`: Deletes the WebPush subscription on the back.

### Models

#### Front

* `TeqFw_Web_Push_Front_Mod_Subscription`: The WebPush subscription model encapsulates the logic to work with the
  WebPush API.
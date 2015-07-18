AWS CloudFront Sign
===================

This is a Meteor package that allows you create signed URL's using Amazon S3 and CloudFront. This means 
you can secure content such as videos and temporarily give access to authenticated users for instance. 

The package wraps and (mildly) extends [jasonsims's aws-cloudfront-sign](https://github.com/jasonsims/aws-cloudfront-sign) npm package. 
Many thanks for his work and MIT generosity. 

###Setup

1. Create a CloudFront Distribution 
2. Configure your origin with the following settings:
   **Origin Domain Name:** {your-s3-bucket}  
   **Restrict Bucket Access:** Yes  
   **Grant Read Permissions on Bucket:** Yes, Update Bucket Policy  
3. Create CloudFront Key Pair.

###Usage:

```javascript
Meteor.methods({

  'getSignedUrl': function(requestedResource) {
  
    if (!this.user) {
      throw new Meteor.error('403', 'You are not authorized to access this content');
    }
    
    return CloudFront.sign({       
      s3ObjectPath: requestedResource,
      cfnDistribution: 'xxxxxxxxxx.cloudfront.net',
      keypairId: 'ABCDEFGHIJK123456789',
      privateKeyString: process.env.CFN_PRIVATE_KEY
    });
  
  }

});
```

#### Options
* `cfnDistribution` (**Required**) - This is the root url of the distribution
* `s3ObjectPath` (**Required**) - Path to the file in the S3. If you provided a path within your origin bucket to the CFN distribution, you may need adjust this path accordingly.
* `protocol`  (**Optional** - Default: http) - The protocol to use ahead of the URL
* `expireTime` (**Optional** - Default: 30s) - The time when the URL should expire. Accepted values are:
    * number - Time in milliseconds (`new Date().getTime() + 30000`)
    * moment - Valid [momentjs][moment_docs] object (`moment().add(1, 'day')`)
    * Date - Javascript Date object (`new Date(2016, 0, 1)`)
* `keypairId` (**Required**) - The access key ID from your Cloudfront keypair
* `privateKeyString` || `privateKeyPath` (**Required**) - The private key from your Cloudfront keypair. It can be provided as either a string or a path to the .pem file.
  **Note:** When providing the private key as a string, ensure that the newline character is also included.

  ```js
  var privateKeyString =
    '-----BEGIN RSA PRIVATE KEY-----\n'
    'MIIJKAIBAAKCAgEAwGPMqEvxPYQIffDimM9t3A7Z4aBFAUvLiITzmHRc4UPwryJp\n'
    'EVi3C0sQQKBHlq2IOwrmqNiAk31/uh4FnrRR1mtQm4x4IID58cFAhKkKI/09+j1h\n'
    'tuf/gLRcOgAXH9o3J5zWjs/y8eWTKtdWv6hWRxuuVwugciNckxwZVV0KewO02wJz\n'
    'jBfDw9B5ghxKP95t7/B2AgRUMj+r47zErFwo3OKW0egDUpV+eoNSBylXPXXYKvsL\n'
    'AlznRi9xNafFGy9tmh70pwlGG5mVHswD/96eUSuLOZ2srcNvd1UVmjtHL7P9/z4B\n'
    'KdODlpb5Vx+54+Fa19vpgXEtHgfAgGW9DjlZMtl4wYTqyGAoa+SLuehjAQsxT8M1\n'
    'BXqfMJwE7D9XHjxkqCvd93UGgP+Yxe6H+HczJeA05dFLzC87qdM45R5c74k=\n'
    '-----END RSA PRIVATE KEY-----'
  ```
  Also, here are some examples if prefer to store your private key as a string
  but within an environment variable.
  ```sh
  # Local env example
  CF_PRIVATE_KEY="$(cat your-private-key.pem)"

  # Heroku env
  heroku config:set CF_PRIVATE_KEY="$(cat your-private-key.pem)"  
  ```
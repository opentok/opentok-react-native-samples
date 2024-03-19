# Basic Video Chat sample

This version tests a bug fixed in the `fix-screenshare-no-camera-permission` branch (the source code for this PR)

**The bug:** If you deny access to the camera, you should be able to publish a screen-sharing stream. But you get an error in Android (in v2.27.1 of the OpenTok React Native SDK).

## To show the bug in the shipping version (2.27.1):

1. Check out my test branch locally: . The BasicVideoChat app has been modified to publish a screen-sharing stream, but the AndroidManifest.xml files have been modified to prevent camera access (which shouldn't matter in a screen-sharing stream).

2. Ed the BasicVideoChat/package.json file, change the source for opentok-react-native to this:

```
    "opentok-react-native": "2.27.1",
```

3. Install the node modules and run the app in Android.

   Publishing fails. Note the errors in the console:

```
 LOG  OTRN JS: There was an error:  {"permissionsDenied": ["android.permission.CAMERA"], "type": "Permissions error"}
 LOG  OTRN JS: There was an error:  {"message": "Error publishing. Could not find native publisher instance."}
```

## To test the fix:

1. Revert the change you made (above) in the BasicVideoChat/package.json file.

2. Remove the installed opentok-react-native module:

  ```
  rm -rf BasicVideoChat/node_modules/opentok-react-native
  ```

2. Re-install the opentok-react-native module (it will come from source branch for my opentok-react-native PR to fix this bug)

  ```
  npm install
  ````

3. Run the app in Android.

   You will see no error.

You can see the published screen-sharing stream in Playground:
https://tokbox.com/developer/tools/playground/connect?v=2.27&token=T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTZlMGUyMDEyYjY4NmI3MWI2ZTg5MWNlYjQ2NzYxYjkyNzUyMzM3YmY6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNVEE0TURVMk5UazJOVEotVWxkemFIQkVPRW8zUWt4eGFGbDBRMjUzUkRKdmIyNUdmbjUtJmNyZWF0ZV90aW1lPTE3MTA4MDU2NjAmbm9uY2U9MC44MjcyMTM0Mzg2ODkwNDg4JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MTMzOTc2NjAmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=


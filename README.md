# CatMask Wallet project

<img width="200" src="/readme/overView.png" />
<img width="500" src="/readme/message.png" />

## USE

#### get accoudId
```js
catMask.getAccoutId(e => {
    console.log(e) // accoundID
})
```
 #### sign
 ```js
catMask.signTransaction('you messageText..', (e)=>{
    console.log(e) // {message:{publicKey: '', signature: 'base64'}}
})
 ```


# CatMask Wallet project

![overview](/readme/overview.png)
![message](/readme/message.png)

## USE

#### get accoudId
```js
catMask.getAccoutId(e => {
    console.log(e) // accoundID
})
```
 #### sign
 ```js
catMask.signTransaction('message', (e)=>{
    console.log(e) // {message:{publicKey: '', signature: ''}}
})
 ```


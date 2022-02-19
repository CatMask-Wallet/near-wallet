# CatMask Wallet project

<img width="200" src="/readme/overView.png" />
<img width="500" src="/readme/message.png" />

## Add Catmask to browser

### Import crx

[Catmask.crx](https://github.com/CatMask-Wallet/near-wallet/blob/main/figpfhmohkmngdecpfpheomfdgekgiap_main.crx)
### google 

[Catmask](https://chrome.google.com/webstore/detail/catmask/figpfhmohkmngdecpfpheomfdgekgiap)


## Developer documentation

### Demo

[Demo Live](https://catmask-wallet.github.io/near-wallet/demo/live.html)

### Install

**src**
 
 ```
 https://raw.githubusercontent.com/CatMask-Wallet/near-wallet/main/public/web.js
 ```

**npm**

```
TODO
```

#### get accoudId
```js
catMask.getAccoutId(e => {
    console.log(e) // accoundID
})
```
 #### sign Message
 ```js
catMask.signMessage('you messageText..', (e)=>{
    console.log(e) // {message:{publicKey: '', signature: 'base64'}}
})
 ```
 #### sign Transaction
 ```js
catMask.signTransaction(new Uint8Array([2, 88]).toString() /*transaction hash*/, (e)=>{
    console.log(e) // {message:{publicKey: '', signature: Uint8Array.toString()}}
})
```
Project use examples： /demo/live.html


#### sign TransactionAndSendRaw
* transaction and send
```ts
catMask.signTransactionAndSendRaw({
    contractId: 'wrap.testnet',
    actions: [
        // FunctionCall
        {
          methodName: 'near_deposit2',
          args: {},
          gas: '10000000000000',
          deposit: '1000000000000000000000000',
        },
        // transfer
        {
            deposit: '1000000000000000000000000'
        },
        // stake
        {
            stake: '1000000000000000000000000',
            publicKey: ''
        }
      ],
}, (e) => {
    console.log(e)
})
```

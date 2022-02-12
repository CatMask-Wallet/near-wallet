# CatMask Wallet project

<img width="200" src="/readme/overView.png" />
<img width="500" src="/readme/message.png" />

## Add Catmask to browser
* to chrome://extensions/
* Import dist file
## Developer documentation

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
Project use examples： /tests/signtansaction.tsx


#### sign TransactionAndSendRaw
* transaction and send
```ts
catMask.signTransactionAndSendRaw({
    contractId: 'wrap.testnet',
    actions: [
        {
          methodName: 'near_deposit2',
          args: {},
          gas: '10000000000000',
          deposit: '1000000000000000000000000',
        },
      ],
}, (e) => {
    console.log(e)
})
```

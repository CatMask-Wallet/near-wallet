import { Card } from "@/view/com/Card"
import { Header } from "@/view/com/head"
import { Button, Input, message } from 'antd'
import { useState } from "react"
import { useHistory, useIntl } from "umi"
import { useAccount } from '@/hooks.ts/wallet';

const PASSPHRASE = 12
export default () => {
    const intl = useIntl()
    const history = useHistory()
    const {updateAccount} = useAccount()
    const [passphrase, setPassphrase] = useState('')
    const isInvalid = passphrase.split(' ').filter((e) => e.replace('/s', '') !== '').length < PASSPHRASE
    const [loading, setLoding] = useState(false)
    const onSubmit = async () => {
        console.log('passphrase----->', passphrase.substring(0, 7))
        setLoding(true)
        const res = await updateAccount(localStorage.recoverySeedPhrase = passphrase)
        setLoding(false)
        if(!res){
            return message.info('Not find Account!')
        }
        history.replace('/')
    }
    return <>
        <Header />
        <Card>
            <div style={{height: 20}}></div>
            <h2 style={{fontWeight: 700}}>{intl.formatMessage({ id: 'recover.title' })}</h2>
            <div style={{height: 20}}></div>
            <p className="gray">{intl.formatMessage({ id: 'recover.enter-info' })}</p>
            <div style={{height: 20}}></div>
            <b>{intl.formatMessage({ id: 'recover.passphraseInput' })}</b>
            <div style={{height: 10}}></div>
            <Input
                style={{ height: 48, borderRadius: 8 }}
                placeholder={intl.formatMessage({ id: 'recover.inputPlaceholder' })}
                value={passphrase}
                onInput={(event: any) => setPassphrase(event?.target?.value)}
            />
            <div style={{height: 30}}></div>
            <Button
                type="primary"
                shape="round"
                block
                style={{ height: 48 }}
                onClick={onSubmit}
                disabled={isInvalid || !passphrase}
                loading={loading}
            >
                {intl.formatMessage({ id: 'recover.submintButton' })}
            </Button>
        </Card>
    </>
}
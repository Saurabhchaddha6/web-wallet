/* eslint-disable react/jsx-key */
'use client'
import { Keypair } from '@solana/web3.js'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import { Wallet } from 'ethers'
import { HDNodeWallet } from 'ethers'
import React, { useState } from 'react'
import nacl from 'tweetnacl'

const WalletGenerator = () => {
    const [mnemonic, setMnemonic] = useState("")
    const[currentIndex,setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([])
    const [address, setAddress] = useState([]);

    const createMnemonic =async  () =>{
        const mn = await generateMnemonic();
        setMnemonic(mn)
    }

    const createSolWallet = async () =>{
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex+1);
        setPublicKeys([...publicKeys,keypair.publicKey])
    }

    const createEthWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex+1)
        setAddress([...address,wallet.address]);
    }

    return (
    <div>
        <div>
        <button onClick={createMnemonic}>Create seed Phrase</button>
        </div>
        <div>
        <input type='text' value={mnemonic}></input>
        </div>


        <div>
            <button onClick={createSolWallet}>Add wallet</button>
        </div>
        <div>
            {publicKeys.map(p => <div>
                {p.toBase58()}</div>)}
        </div>
        <div>
            <button onClick={createEthWallet}>Add wallet</button>
        </div>
        <div>
            {address.map(p => <div>
                {p}</div>)}
        </div>
    </div>

  )
}


export default WalletGenerator

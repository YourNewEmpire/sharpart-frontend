import { ethers } from 'ethers'
import { useState } from 'react'

//todo - add argument for determining the format
const ethersBytes = async (name: string) => {
    const bytes = ethers.utils.formatBytes32String(name)
    console.log(name, 'to', bytes)
    return bytes
}
export default ethersBytes

export const useEthersFormat =
    (initialValue: string): string => {
        const [value, setValue] = useState(ethers.utils.formatBytes32String(initialValue))
        return value
    }
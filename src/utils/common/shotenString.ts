const shorten = (word: string, maxLength: number) => {
    let trimmedString = word.substr(0, maxLength)
    if (word.split('').length <= maxLength) return trimmedString = word
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...'
}

export default shorten

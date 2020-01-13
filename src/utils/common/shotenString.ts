const shorten = (world: string, maxLength: number) => {
    let trimmedString = world.substr(0, maxLength)
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...'
}

export default shorten

module.exports = (string) => {
    return Buffer.from(string, 'base64').toString('utf-8')
}
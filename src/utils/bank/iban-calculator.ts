export default function generateIban(length) {
    const characters ='0123456789';
    let result = 'IT60X';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
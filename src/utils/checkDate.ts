export const checkDate = ( date: Date, time:string ): boolean => {
    
    if(!date || !time) return false
    console.log('date', date, time)
    const dateFormated = new Date(date)

    const day = dateFormated.getDate()
    const month = dateFormated.getMonth()+1
    const year = dateFormated.getFullYear()

    const dateTime = new Date(`${year}-${month}-${day} ${time}`)
    console.log('dateTime', dateTime, new Date())
    console.log('dateTime < new Date()', dateTime < new Date())
    if(dateTime < new Date()) return false

    return true
}
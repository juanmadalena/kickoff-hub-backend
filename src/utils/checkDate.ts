export const checkDate = ( date: Date, time:string ): boolean => {
    
    if(!date || !time) return false

    if(typeof date === 'string') date = new Date(date)
        
    // Match Date
    const [ dateFormated ] = new Date(date).toISOString().split('T')
    const dateTime = new Date(`${dateFormated}T${time}:00.000Z`)

    // Date in Ireland
    const currentDateIreland = new Date().toLocaleDateString('en-IE', {timeZone:'Europe/Dublin', day:'2-digit', month:'2-digit', year:'numeric',hour:'2-digit', minute:'2-digit', second:'2-digit'})
    const [ currentDate, currentTime ] = currentDateIreland.split(',')
    const [ day, month, year ] = currentDate.split('/')

    const currentDateFormatted = new Date(`${year}-${month}-${day}T${currentTime.trim()}.000Z`)

    // Verify if the date is in the past
    if(dateTime.getTime() < currentDateFormatted.getTime()) return false

    return true
}
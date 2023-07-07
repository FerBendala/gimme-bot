const getFormattedDate = () => {
    const currentDate = new Date()

    const formatDateComponent = ( component ) => String( component ).padStart( 2, '0' )

    const formattedDate = [
        formatDateComponent( currentDate.getDate() ),
        formatDateComponent( currentDate.getMonth() + 1 ),
        String( currentDate.getFullYear() )
    ].join( '' )

    const formattedHour = [
        formatDateComponent( currentDate.getHours() ),
        formatDateComponent( currentDate.getMinutes() ),
        formatDateComponent( currentDate.getSeconds() )
    ].join( '' )

    return `${formattedDate}-${formattedHour}`
}

module.exports = { getFormattedDate }
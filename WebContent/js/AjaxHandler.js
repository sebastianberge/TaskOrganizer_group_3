async function main() {
    const url='../TaskServices/broker/allstatuses'

    try {
        const response = await fetch(url,{method: "GET"})
        try {
            const text = await response.text()
            console.log(text)
        } catch (error) {
            console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
}

main()

export default async function fetchRetry(url) {
    let i = 0;
    while (true) {
        try {
            console.log("Fecthing...");
            const res = await fetch(url);
            return res;
        } catch (err) {
            console.log("Fetch Err: ", err)
        }
        // Wait 500ms*i between requests
        await new Promise(r => setTimeout(r, 500*i*(Math.random()+0.5)));
    }
}
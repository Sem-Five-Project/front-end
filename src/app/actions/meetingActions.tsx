"use server"

export async function generateJitsiTokenAction(roomName: string, userName: string) {
    const token = await  fetch(`${process.env.BACK_END_URL}api/meeting/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ roomName, userName }),
    });


    const data = await token.json();
    console.log("Data",data)
    return data.token;
}
export async function generateJitsiTokenActionlater(roomName: string) {
    const token11 = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbmVAZ21haWwuY29tIiwiaWF0IjoxNzU0OTkxNzkzLCJleHAiOjE3NTUwNzgxOTN9.wpb79NkwTi00eHTbkoNJtRLt1BHWu4Gj4MXkItGZsBQ"
    const token = await  fetch(`${process.env.BACK_END_URL}api/jitsi/token?roomName=${roomName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token11}`
        },
    
    });


    const data = await token.json();
    console.log("Data",data)
    return data.token;
}


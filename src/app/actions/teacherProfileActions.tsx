"use server"

interface sessionType {
    session_name: string;
    tutor_id: number;
    subject_id: number;
    start_time: Date;
    end_time: Date;
    status: string;
    link_for_meeting: string;
    notification_sent: boolean;
}

export async function addSession(data:sessionType) {

    console.log("Adding session:", data);

    const response = await fetch(`${process.env.BACK_END_URL}api/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to add session");
    }

    return await response.json();
}
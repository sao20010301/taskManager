export async function CreateFetch(issue, formData, user) {
    const issueOwner = issue[0]
    const issueRepo = issue[1]
    return await fetch(`https://api.github.com/repos/${issueOwner}/${issueRepo}/issues`, {
        method: "POST",
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization": `Bearer ${user}`
        },
        body: JSON.stringify({
            labels: [formData.label],
            title: formData.title,
            body: formData.body
        })
    })
}

export async function UpdateFetch(issue, formData, user, issueNumber) {
    const issueOwner = issue[0]
    const issueRepo = issue[1]
    return await fetch(`https://api.github.com/repos/${issueOwner}/${issueRepo}/issues/${issueNumber}`, {
        method: "PATCH",
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization": `Bearer ${user}`
        },
        body: JSON.stringify({
            issue_number: issueNumber,
            labels: [formData.label],
            title: formData.title,
            body: formData.body
        })
    })
} 

export async function DeleteFetch(issue, user, issueNumber) {
    const issueOwner = issue[0]
    const issueRepo = issue[1]
    return await fetch(`https://api.github.com/repos/${issueOwner}/${issueRepo}/issues/${issueNumber}`, {
        method: "PATCH",
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization": `Bearer ${user}`
        },
        body: JSON.stringify({
            issue_number: issueNumber,
            state: "closed",
        })
    })
}
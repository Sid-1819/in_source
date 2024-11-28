export function generateNameFromUsername(user_name: string): string {
    return user_name
        .split('_') // Split the username by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words with spaces
}

export function modifyUsernames<T extends { username: string }>(users: Array<T>) { // ensures T must an property of named 'username' of type string
    return users.map(user => ({
        ...user,
        username: generateNameFromUsername(user.username),
    }));
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function parseJsonArray(jsonString: string): string[] {
    console.log("Json", jsonString);

    const parsed: string = JSON.parse(jsonString) as string;
    if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return parsed;
    } else {
        return [""];
        // throw new Error('The JSON string does not represent an array of strings.');
    }
}
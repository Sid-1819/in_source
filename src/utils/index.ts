export function generateNameFromUsername(user_name: string): string {
    return user_name
        .split('_') // Split the username by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words with spaces
}

export function modifyUsernames(users: any[]) {
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
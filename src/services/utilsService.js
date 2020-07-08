export const fullDate = str => new Date(Number(str) * 1000).toLocaleString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

export const getSlugName = (name) => {
    return name.replace(/\s+/g, '-').toLowerCase();
}
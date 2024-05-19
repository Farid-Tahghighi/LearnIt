export const logError = (e: any) => {
    console.log(e.response.data + "\nCode: " +  e.response.status);
}
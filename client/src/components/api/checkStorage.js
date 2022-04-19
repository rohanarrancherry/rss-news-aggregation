export const checkStorage = () => {
    try {
        sessionStorage.setItem('check', 'check');
        sessionStorage.removeItem('check');
        return true;
    } catch (err) {
        return false;
    }
};
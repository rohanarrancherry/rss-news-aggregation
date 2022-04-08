export const hasStorage = () => {
	try {
		sessionStorage.setItem('test', 'test');
		sessionStorage.removeItem('test');
		return true;
	} catch (err) {
		return false;
	}
};

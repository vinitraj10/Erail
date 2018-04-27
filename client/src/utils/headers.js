export function tokenHeader(){
	const token =localStorage.getItem('token');
	if(token)
		return {headers:{Authorization: `${token}`}};
	return {}
}

export const checkCookieExists = (cookieName: string) => {
  if (document.cookie.split(';').some((item) => item.trim().startsWith(`${cookieName}=`))) {
    return true;
  } else {
    return false;
  }
}

export const getCookieValue = (cookieName: string) => {
  return ('; '+document.cookie).split(`; ${cookieName}=`).pop()!.split(';')[0];
}

export const setCookie = (name:string, value:string) => {
  document.cookie = `${name}=${value}; SameSite=Lax; Secure`;
}
